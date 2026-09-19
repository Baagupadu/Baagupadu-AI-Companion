'use client';

import { useCallback } from 'react';
import { useChatStore } from '@/lib/store/chatStore';
import { useUserProfileStore } from '@/stores/userProfileStore';
import { useAuth } from '@clerk/nextjs';
import { chatWithSahayamStream } from '@/lib/api';

export function useDemoChat() {
  const {
    addMessage,
    setAgentState,
    setPhase,
    completePhase,
    setShowVisualization,
    appendChunk,
    currentPhase,
    activeSessionId,
    setActiveSessionId,
  } = useChatStore();
  const { loadProfile } = useUserProfileStore();
  const { getToken } = useAuth();

  const sendMessage = useCallback(
    async (text: string, isVoiceSession = false) => {
      // Add user message
      addMessage({ sender: 'user', text, phase: currentPhase });
      setAgentState('listening');

      try {
        setAgentState('thinking');
        
        const token = await getToken();
        if (!token) {
          throw new Error("You must be logged in to chat.");
        }
        
        let sessionId = activeSessionId;
        if (!sessionId) {
          sessionId = crypto.randomUUID();
          setActiveSessionId(sessionId);
        }
        
        // Fetch from backend using api.ts which passes the token and session ID
        let accumulatedReply = '';
        const data = await chatWithSahayamStream(text, sessionId, token, isVoiceSession, (chunk) => {
          if (accumulatedReply.length === 0) {
            setAgentState('typing');
          }
          accumulatedReply += chunk;
          appendChunk(chunk);
        });
        
        let reply = accumulatedReply;

        // Force a re-fetch of the profile from the backend to instantly sync new health metrics
        await loadProfile(token);

        // Sync phase with backend
        const backendPhase = data.current_phase || 'discovery';
        if (backendPhase !== currentPhase) {
          completePhase(currentPhase);
          setPhase(backendPhase);
          
          if (backendPhase === 'synthesis' || backendPhase === 'guidance') {
            setShowVisualization(true);
          }
          
        }
        
        // Check if the AI indicated the chat should end
        if (reply.includes('[END_CHAT]') || data.chat_completed) {
           reply = reply.replace('[END_CHAT]', '').trim();
           setAgentState('celebrating');
        } else {
           setAgentState('idle');
        }

      } catch (error) {
        console.error("Error communicating with backend:", error);
        setAgentState('idle');
        addMessage({
          sender: 'system',
          text: `Error: Could not reach the Sahayam backend. ${error}`,
          phase: currentPhase,
        });
      }
    },
    [addMessage, setAgentState, setPhase, completePhase, setShowVisualization, currentPhase, activeSessionId, setActiveSessionId, getToken, loadProfile]
  );

  return { sendMessage };
}
