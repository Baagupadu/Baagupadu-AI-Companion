from langgraph.graph import StateGraph, START, END
from langchain_core.messages import HumanMessage, AIMessage
from backend.agent.state import AgentState
from backend.agent.agents.planner_agent import PlannerAgent
from backend.agent.agents.executor_agent import ExecutorAgent
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.models import Message
import asyncio

async def search_node(state: AgentState):
    query = state.get("search_query")
    if query:
        try:
            from langchain_community.tools import DuckDuckGoSearchRun
            # We must run this in a thread because DuckDuckGoSearchRun is blocking
            search = DuckDuckGoSearchRun()
            results = await asyncio.to_thread(search.invoke, query)
            print(f"WEB SEARCH EXECUTED: '{query}'", flush=True)
            return {"tool_context": f"Live Web Search Results for '{query}':\n{results}"}
        except Exception as e:
            print(f"Web search failed: {e}", flush=True)
            return {"tool_context": None}
    return {"tool_context": None}

class SahayamAgent:
    def __init__(self):
        workflow = StateGraph(AgentState)
        
        # Instantiate Agents
        planner = PlannerAgent()
        executor = ExecutorAgent()
        
        # Add Nodes
        workflow.add_node("planner", planner.invoke)
        workflow.add_node("search", search_node)
        workflow.add_node("executor", executor.invoke)
        
        # 1. Routing
        workflow.add_edge(START, "planner")
        workflow.add_edge("planner", "search")
        workflow.add_edge("search", "executor")
        workflow.add_edge("executor", END)
        
        self.app = workflow.compile()

    async def chat_async(self, user_input: str, profile: dict, session_id: str, db: AsyncSession) -> str:
        conversation_id = profile.get("conversation_id")
        
        chat_history = []
        if conversation_id:
            result = await db.execute(
                select(Message)
                .where(Message.conversation_id == conversation_id)
                .order_by(Message.timestamp.desc())
                .limit(4)
            )
            raw_messages = result.scalars().all()
            raw_messages.reverse()
            
            for msg in raw_messages:
                if msg.content == user_input and msg.role == "user" and msg == raw_messages[-1]:
                    pass
                elif msg.role == "user":
                    chat_history.append(HumanMessage(content=msg.content))
                elif msg.role == "ai":
                    chat_history.append(AIMessage(content=msg.content))

        chat_history.append(HumanMessage(content=user_input))

        state = {
            "messages": chat_history,
            "profile": profile,
            "current_phase": profile.get("session_progress", {}).get("current_phase", "trust"),
            "inferences_made": False,
            "alerts": [],
            "errors": [],
            "new_phase": None,
            "micro_phase": profile.get("session_progress", {}).get("micro_phase", None),
            "chat_ended": False,
            "db_session": db,
            "user_input": user_input,
            "proposed_plan": None,
            "is_approved": None,
            "evaluator_feedback": None,
            "extracted_traits": {"traits_uncovered": profile.get("persona", {}).get("traits_uncovered", [])}
        }

        result = await self.app.ainvoke(state, config={"recursion_limit": 15})
        
        updated_messages = result.get("messages", [])
        ai_response = ""
        
        if updated_messages:
            last_msg = updated_messages[-1]
            if last_msg.type == "ai":
                ai_response = last_msg.content
                
        if "profile" in result:
            profile.update(result["profile"])
            
        # Update progress phase based on graph result
        if result.get("new_phase"):
            profile.setdefault("session_progress", {})["current_phase"] = result.get("new_phase")
        if result.get("micro_phase"):
            profile.setdefault("session_progress", {})["micro_phase"] = result.get("micro_phase")

        return ai_response

    async def chat_stream(self, user_input: str, profile: dict, session_id: str, db: AsyncSession):
        conversation_id = profile.get("conversation_id")
        
        chat_history = []
        if conversation_id:
            result = await db.execute(
                select(Message)
                .where(Message.conversation_id == conversation_id)
                .order_by(Message.timestamp.desc())
                .limit(4)
            )
            raw_messages = result.scalars().all()
            raw_messages.reverse()
            
            for msg in raw_messages:
                if msg.content == user_input and msg.role == "user" and msg == raw_messages[-1]:
                    pass
                elif msg.role == "user":
                    chat_history.append(HumanMessage(content=msg.content))
                elif msg.role == "ai":
                    chat_history.append(AIMessage(content=msg.content))

        chat_history.append(HumanMessage(content=user_input))

        state = {
            "messages": chat_history,
            "profile": profile,
            "current_phase": profile.get("session_progress", {}).get("current_phase", "trust"),
            "inferences_made": False,
            "alerts": [],
            "errors": [],
            "new_phase": None,
            "micro_phase": profile.get("session_progress", {}).get("micro_phase", None),
            "chat_ended": False,
            "db_session": None,
            "user_input": user_input,
            "proposed_plan": None,
            "is_approved": None,
            "evaluator_feedback": None,
            "extracted_traits": {"traits_uncovered": profile.get("persona", {}).get("traits_uncovered", [])}
        }

        async for event in self.app.astream_events(state, version="v2", config={"recursion_limit": 15}):
            kind = event["event"]
            if kind == "on_chat_model_stream":
                if event.get("metadata", {}).get("langgraph_node") == "executor":
                    chunk = event["data"]["chunk"]
                    if hasattr(chunk, 'content') and chunk.content:
                        yield {"type": "token", "content": chunk.content}
            elif kind == "on_chain_end":
                if event.get("name") == "executor":
                    # Extract the updated state out of the executor output
                    output_data = event.get("data", {}).get("output", {})
                    
                    # Merge profile data if present
                    if "profile" in output_data:
                        profile.update(output_data["profile"])
                    
                    new_phase = output_data.get("new_phase")
                    micro_phase = output_data.get("micro_phase")
                    
                    if new_phase:
                        profile.setdefault("session_progress", {})["current_phase"] = new_phase
                    if micro_phase:
                        profile.setdefault("session_progress", {})["micro_phase"] = micro_phase
                        
                    yield {"type": "metadata", "current_phase": profile.get("session_progress", {}).get("current_phase", "trust")}

# Expose the compiled graph for LangGraph Studio visualization
graph = SahayamAgent().app
