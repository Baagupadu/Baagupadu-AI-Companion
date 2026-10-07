---
description: Defines persona archetypes, trait mappings, synthesis rules, and career
  affinities for building comprehensive user personas from life-stage data. Includes
  trait dictionary, input schema, conflict resolution, learning styles, and ethical
  guardrails.
id: okf-persona_framework
name: "Persona Framework \u2014 Baagupadu"
type: framework
version: '2.0'
---

# Persona Framework — Baagupadu


## Trait Dictionary
**Description:** Central source of truth for all traits used in the framework. Defines core meaning and levels.


### Traits

#### Curiosity
**Core Meaning:** Desire to explore, learn, and understand the world


##### Levels
**Low:** Prefers familiar routines, avoids new information

**Medium:** Interested in learning when it's relevant

**High:** Actively seeks new knowledge, asks questions, explores deeply


#### Creativity
**Core Meaning:** Ability to generate novel ideas and solutions


##### Levels
**Low:** Prefers established methods, follows rules

**Medium:** Occasionally generates new ideas

**High:** Consistently innovates, sees connections others miss


#### Empathy
**Core Meaning:** Ability to understand and share others' feelings


##### Levels
**Low:** Struggles to understand others' emotions

**Medium:** Generally aware of others' feelings

**High:** Deeply attuned to others' emotional states


#### Leadership
**Core Meaning:** Ability to guide, inspire, and influence others


##### Levels
**Low:** Prefers to follow, avoids taking charge

**Medium:** Steps up when needed

**High:** Naturally takes initiative, inspires others


#### Resilience
**Core Meaning:** Ability to recover from setbacks and persist


##### Levels
**Low:** Gives up easily, discouraged by failure

**Medium:** Recovers with effort

**High:** Bounces back quickly, learns from setbacks


#### Adaptability
**Core Meaning:** Ability to adjust to changing circumstances


##### Levels
**Low:** Struggles with change, prefers stability

**Medium:** Manages change with some effort

**High:** Thrives on change, flexible and resilient


#### Problem Solving
**Core Meaning:** Ability to analyze and solve complex problems


##### Levels
**Low:** Avoids complex problems

**Medium:** Solves problems with effort

**High:** Naturally breaks down complex problems, finds solutions


#### Communication
**Core Meaning:** Ability to convey and exchange ideas clearly


##### Levels
**Low:** Struggles to articulate thoughts

**Medium:** Communicates adequately

**High:** Articulate, persuasive, listens deeply


#### Collaboration
**Core Meaning:** Ability to work effectively with others


##### Levels
**Low:** Prefers working alone

**Medium:** Works well with others when necessary

**High:** Thrives in teams, supports others


#### Analytical Thinking
**Core Meaning:** Ability to break down complex information into parts


##### Levels
**Low:** Struggles with complex analysis

**Medium:** Analyzes when needed

**High:** Naturally analytical, sees patterns


#### Execution
**Core Meaning:** Ability to turn plans into action and results


##### Levels
**Low:** Struggles to follow through

**Medium:** Completes tasks with effort

**High:** Reliable, action-oriented, gets things done


#### Independence
**Core Meaning:** Ability to work autonomously and self-direct


##### Levels
**Low:** Requires direction and support

**Medium:** Works independently with minimal oversight

**High:** Thrives on autonomy, self-directed


#### Ambition
**Core Meaning:** Desire to achieve, excel, and make an impact


##### Levels
**Low:** Satisfied with current state

**Medium:** Occasionally seeks growth

**High:** Driven to achieve significant goals


#### Discipline
**Core Meaning:** Ability to maintain focus and consistency


##### Levels
**Low:** Struggles with consistency

**Medium:** Consistent with effort

**High:** Naturally disciplined, reliable


#### Wisdom
**Core Meaning:** Deep understanding of life and human nature


##### Levels
**Low:** Limited perspective

**Medium:** Thoughtful and reflective

**High:** Deep insight, sees beyond the surface


#### Intellectual Humility
**Core Meaning:** Openness to new ideas and willingness to admit limitations


##### Levels
**Low:** Defensive about knowledge, resistant to new ideas

**Medium:** Open to new ideas with effort

**High:** Naturally curious, embraces learning


## Input Schema Definition
**Description:** Defines the expected input data for persona synthesis


### Schema

#### Childhood Data
**Type:** object


##### Properties

###### Stories
**Type:** array

**Description:** User's childhood stories and experiences


###### Traits Identified
**Type:** array

**Description:** Traits identified from childhood


###### Key Memories
**Type:** array

**Description:** Significant childhood memories


#### Teenage Data
**Type:** object


##### Properties

###### Stories
**Type:** array

**Description:** User's teenage stories and experiences


###### Traits Identified
**Type:** array

**Description:** Traits identified from teenage years


###### Identity Patterns
**Type:** array

**Description:** Identity patterns that emerged


#### Adulthood Data
**Type:** object


##### Properties

###### Stories
**Type:** array

**Description:** User's adult stories and experiences


###### Traits Identified
**Type:** array

**Description:** Traits identified from adulthood


###### Career Data
**Type:** object

**Description:** Career-related information


###### Purpose Data
**Type:** object

**Description:** Purpose-related information


#### Traits Summary
**Type:** object

**Description:** Aggregated trait list with confidence scores


##### Properties

###### Traits
**Type:** array


####### Items
**Type:** object


#### Patterns Identified
**Type:** array

**Description:** Patterns identified across life stages


## Persona Archetypes

### The Curious Explorer
**Id:** archetype_001

**Name:** The Curious Explorer

**Tagline:** Always learning, always questioning, always seeking.

**Description:** You are driven by an insatiable curiosity about the world. You love exploring ideas, understanding how things work, and connecting dots across different domains. Your mind is never at rest — and that's your greatest strength.


#### Key Traits
- curiosity
- creativity
- adaptability
- intellectual_humility

#### Trait Combinations
**Operator:** OR


##### Combinations
- ['high_curiosity', 'high_creativity']
- ['high_curiosity', 'high_adaptability']
- ['high_adaptability', 'high_problem_solving']

#### Strengths
- Natural pattern recognition
- Intellectual versatility
- Lifelong learning orientation
- Openness to new experiences

#### Growth Areas
- Depth over breadth — sometimes need to go deeper
- Follow-through on ideas
- Decision-making with limited information

#### Shadow Traits
- analysis_paralysis
- overthinking
- restlessness

#### Shadow Validation Prompts
**Analysis Paralysis:** I notice you sometimes get stuck in overthinking. Does that feel familiar?

**Overthinking:** It seems like your mind is always active. How do you quiet it when needed?

**Restlessness:** Do you ever feel the need to always be exploring something new?


#### Learning Style

##### Preferred Methods
- Self-directed learning
- Exploration
- Discussion
- Research
**Environment:** Quiet, flexible, intellectually stimulating

**Motivation:** Intrinsic curiosity, desire to understand


#### Core Motivations
**Primary:** Discovery and understanding

**Secondary:** Sharing knowledge

**Tertiary:** Intellectual challenge


#### Career Affinities

##### Primary
**Role Type:** Researcher


###### Industries
- Research & Development
- Science
- Academia
**Role Type:** Analyst


###### Industries
- Data Science
- Technology
- Analytics
**Role Type:** Creator


###### Industries
- Content Creation
- Journalism
- Media

##### Secondary
**Role Type:** Educator


###### Industries
- Education
- Consulting
**Role Type:** Innovator


###### Industries
- Entrepreneurship
- Innovation

##### Work Environment
- Autonomous, flexible work settings
- Environments that value intellectual curiosity
- Opportunities for continuous learning
- Collaborative, idea-rich teams

##### Work Style
- Thrives with intellectual freedom
- Enjoys deep dives into topics
- Prefers variety over routine
- Values learning over hierarchy
**Description For User:** You're someone who sees the world as a place to explore, not just to exist in. You have a gift for making connections others miss and finding joy in understanding. In your career, you need work that feeds your mind and gives you room to discover.


### The Compassionate Builder
**Id:** archetype_002

**Name:** The Compassionate Builder

**Tagline:** Building a better world, one connection at a time.

**Description:** You are driven by a deep desire to help others and create meaningful impact. You see the potential in people and systems, and you work tirelessly to build things that make lives better.


#### Key Traits
- empathy
- leadership
- collaboration
- resilience

#### Trait Combinations
**Operator:** OR


##### Combinations
- ['high_empathy', 'high_leadership']
- ['high_empathy', 'high_collaboration']
- ['high_leadership', 'high_resilience']

#### Strengths
- Deep emotional intelligence
- Natural ability to unite people
- Resilience in the face of challenges
- Commitment to meaningful work

#### Growth Areas
- Setting boundaries — giving without depleting
- Delegating effectively
- Balancing empathy with pragmatism

#### Shadow Traits
- people_pleasing
- hyper_independence
- burnout_prone

#### Shadow Validation Prompts
**People Pleasing:** I notice you often prioritize others' needs. How do you feel when you do that?

**Hyper Independence:** It sounds like you've always been very self-reliant. Where do you think that came from?

**Burnout Prone:** I notice you give a lot of yourself. Do you sometimes feel depleted after helping others?


#### Learning Style

##### Preferred Methods
- Collaborative learning
- Mentorship
- Real-world projects
- Group discussions
**Environment:** Supportive, nurturing, and collaborative

**Motivation:** Purpose, impact, helping others


#### Core Motivations
**Primary:** Helping others and making an impact

**Secondary:** Building communities

**Tertiary:** Creating lasting change


#### Career Affinities

##### Primary
**Role Type:** Caregiver


###### Industries
- Healthcare
- Medicine
- Therapy
**Role Type:** Educator


###### Industries
- Education
- Teaching
- Training
**Role Type:** Community Leader


###### Industries
- Social Work
- Non-Profit
- Community Building

##### Secondary
**Role Type:** People Leader


###### Industries
- HR
- People Operations
- Organizational Development
**Role Type:** Advocate


###### Industries
- Public Policy
- Advocacy
- CSR

##### Work Environment
- Purpose-driven organizations
- Supportive, collaborative cultures
- Environments that value empathy
- Opportunities to make a visible impact

##### Work Style
- Collaborative and team-oriented
- Finds meaning in helping others succeed
- Values purpose over prestige
- Thrives in supportive, growth-oriented environments
**Description For User:** You're someone who genuinely cares about others and wants to make a difference. You have a gift for understanding people and bringing them together. In your career, you need work that feels meaningful and allows you to contribute to something bigger than yourself.


### The Independent Thinker
**Id:** archetype_003

**Name:** The Independent Thinker

**Tagline:** Self-reliant, analytical, and fiercely independent.

**Description:** You value your autonomy above all. You think for yourself, question authority, and trust your own judgment. Your independence is not rebellion — it's a deep need for self-determination.


#### Key Traits
- independence
- analytical_thinking
- resilience
- problem_solving

#### Trait Combinations
**Operator:** OR


##### Combinations
- ['high_independence', 'high_analytical_thinking']
- ['high_independence', 'high_problem_solving']
- ['high_resilience', 'high_independence']

#### Strengths
- Self-reliance and autonomy
- Sharp analytical mind
- Resilience under pressure
- Ability to think outside the box

#### Growth Areas
- Collaboration — learning to trust others
- Vulnerability — asking for help when needed
- Balancing independence with connection

#### Shadow Traits
- hyper_independence
- isolation
- defensiveness

#### Shadow Validation Prompts
**Hyper Independence:** I notice you often handle things alone. How does it feel to ask for help?

**Isolation:** Do you sometimes feel like you're carrying everything on your own?

**Defensiveness:** How do you respond when someone challenges your ideas?


#### Learning Style

##### Preferred Methods
- Independent study
- Self-paced courses
- Analytical problem-solving
- Research
**Environment:** Quiet, focused, with minimal distractions

**Motivation:** Mastery, autonomy, intellectual challenge


#### Core Motivations
**Primary:** Autonomy and self-direction

**Secondary:** Mastery of skills and knowledge

**Tertiary:** Intellectual independence


#### Career Affinities

##### Primary
**Role Type:** Engineer


###### Industries
- Engineering
- Software Development
- Technology
**Role Type:** Researcher


###### Industries
- Research
- Science
- Academia
**Role Type:** Strategist


###### Industries
- Strategy
- Consulting
- Analysis

##### Secondary
**Role Type:** Creator


###### Industries
- Design
- Writing
- Innovation
**Role Type:** Entrepreneur


###### Industries
- Entrepreneurship
- Startups

##### Work Environment
- Autonomous, independent work settings
- Minimal bureaucracy
- Opportunities for self-direction
- Environments that respect expertise

##### Work Style
- Prefers working independently
- Values intellectual freedom
- Thrives with minimal oversight
- Sees the big picture and works backward
**Description For User:** You're someone who needs the freedom to think and act independently. You trust your own judgment and often find your own way. In your career, you need autonomy and the space to work on your own terms.


### The Creative Connector
**Id:** archetype_004

**Name:** The Creative Connector

**Tagline:** Bridging ideas, people, and possibilities.

**Description:** You see the connections that others miss. You're creative and expressive, but also deeply social. You bring people together, bridge different perspectives, and create something new from what already exists.


#### Key Traits
- creativity
- empathy
- communication
- adaptability

#### Trait Combinations
**Operator:** OR


##### Combinations
- ['high_creativity', 'high_empathy']
- ['high_creativity', 'high_communication']
- ['high_empathy', 'high_communication']

#### Strengths
- Creative problem-solving
- Strong interpersonal skills
- Ability to bridge different worlds
- Expressive and engaging communication

#### Growth Areas
- Focus — bringing ideas to completion
- Structure — balancing creativity with discipline
- Self-promotion — sharing your work confidently

#### Shadow Traits
- people_pleasing
- overcommitment
- self_doubt

#### Shadow Validation Prompts
**People Pleasing:** I notice you often prioritize others' needs. How do you feel when you do that?

**Overcommitment:** It seems like you say 'yes' to many things. What happens when you take on too much?

**Self Doubt:** Do you sometimes second-guess your creative ideas?


#### Learning Style

##### Preferred Methods
- Brainstorming
- Group discussions
- Creative projects
- Collaborative learning
**Environment:** Dynamic, collaborative, and expressive

**Motivation:** Creative expression, connection with others


#### Core Motivations
**Primary:** Creative expression and connection

**Secondary:** Building bridges and communities

**Tertiary:** Making ideas tangible


#### Career Affinities

##### Primary
**Role Type:** Designer


###### Industries
- Design
- Creative Direction
- UI/UX
**Role Type:** Communicator


###### Industries
- Marketing
- PR
- Communications
**Role Type:** Product Leader


###### Industries
- Product Management
- Innovation

##### Secondary
**Role Type:** Educator


###### Industries
- Teaching
- Education
**Role Type:** Creative


###### Industries
- Theater
- Media
- Arts

##### Work Environment
- Creative, collaborative cultures
- Fast-paced, dynamic environments
- Opportunities for creative expression
- Environments that value fresh ideas

##### Work Style
- Thrives in collaborative settings
- Loves brainstorming and ideation
- Values creative freedom
- Sees patterns and connections others miss
**Description For User:** You're someone who sees the world in connections — between ideas, between people, between possibilities. You have a gift for creativity and bringing people together. In your career, you need work that lets you express yourself and build bridges.


### The Driven Achiever
**Id:** archetype_005

**Name:** The Driven Achiever

**Tagline:** Ambitious, disciplined, and determined to succeed.

**Description:** You have big dreams and the discipline to make them real. You're driven to achieve, to excel, and to leave your mark. Your ambition is not about ego — it's about proving what's possible.


#### Key Traits
- ambition
- discipline
- execution
- leadership

#### Trait Combinations
**Operator:** OR


##### Combinations
- ['high_ambition', 'high_discipline']
- ['high_ambition', 'high_execution']
- ['high_discipline', 'high_leadership']

#### Strengths
- Unwavering determination
- Strong work ethic and discipline
- Ability to execute complex plans
- Natural leadership and vision

#### Growth Areas
- Work-life balance — avoiding burnout
- Delegation — trusting others
- Patience — accepting that success takes time

#### Shadow Traits
- perfectionism
- burnout_prone
- impatience

#### Shadow Validation Prompts
**Perfectionism:** Excellence seems really important to you. What happens when things aren't perfect?

**Burnout Prone:** I notice you push yourself hard. Do you sometimes feel depleted?

**Impatience:** Do you sometimes struggle with waiting for results?


#### Learning Style

##### Preferred Methods
- Goal-oriented projects
- Challenges and competitions
- Structured learning
- Mentorship
**Environment:** High-performance, ambitious, fast-paced

**Motivation:** Achievement, recognition, impact


#### Core Motivations
**Primary:** Achievement and impact

**Secondary:** Recognition and excellence

**Tertiary:** Mastery and leadership


#### Career Affinities

##### Primary
**Role Type:** Executive


###### Industries
- Executive Leadership
- Management
**Role Type:** Entrepreneur


###### Industries
- Entrepreneurship
- Startups
**Role Type:** Strategist


###### Industries
- Management Consulting
- Strategy

##### Secondary
**Role Type:** Operator


###### Industries
- Operations
- Finance
**Role Type:** Leader


###### Industries
- Law
- Politics

##### Work Environment
- High-performance cultures
- Fast-paced, ambitious settings
- Opportunities for leadership
- Environments that reward excellence

##### Work Style
- Goal-oriented and results-driven
- Thrives on challenge and competition
- Values recognition and achievement
- Seeks leadership and impact
**Description For User:** You're someone who dreams big and is willing to do the work to make those dreams real. You have the discipline and determination to achieve what others consider impossible. In your career, you need work that challenges you and allows you to lead.


### The Wise Guide
**Id:** archetype_006

**Name:** The Wise Guide

**Tagline:** Mentoring others, sharing wisdom, and building lasting impact.

**Description:** You are a natural mentor and guide. You have a deep understanding of people and life, and you find fulfillment in helping others grow. Your wisdom comes from experience, reflection, and a genuine care for others.


#### Key Traits
- wisdom
- empathy
- communication
- leadership

#### Trait Combinations
**Operator:** OR


##### Combinations
- ['high_wisdom', 'high_empathy']
- ['high_wisdom', 'high_communication']
- ['high_empathy', 'high_leadership']

#### Strengths
- Deep wisdom and perspective
- Exceptional listening skills
- Ability to guide and mentor
- Emotional intelligence and patience

#### Growth Areas
- Assertiveness — being a guide, not just a listener
- Taking credit — owning your contributions
- Balancing giving with receiving

#### Shadow Traits
- people_pleasing
- over_giving
- avoidance

#### Shadow Validation Prompts
**People Pleasing:** I notice you often prioritize others' needs. How do you feel when you do that?

**Over Giving:** I notice you give a lot of yourself. Do you sometimes feel depleted?

**Avoidance:** Do you sometimes avoid taking credit for your contributions?


#### Learning Style

##### Preferred Methods
- Mentoring
- Reflection
- Deep listening
- Sharing wisdom
**Environment:** Calm, nurturing, and purposeful

**Motivation:** Helping others grow, sharing wisdom


#### Core Motivations
**Primary:** Guiding and mentoring others

**Secondary:** Sharing wisdom and perspective

**Tertiary:** Building lasting impact


#### Career Affinities

##### Primary
**Role Type:** Mentor


###### Industries
- Teaching
- Education
- Coaching
**Role Type:** Guide


###### Industries
- Counseling
- Therapy
- Social Work
**Role Type:** People Leader


###### Industries
- Leadership
- HR
- Management

##### Secondary
**Role Type:** Community Leader


###### Industries
- Community Building
- Non-Profit
**Role Type:** Developer


###### Industries
- Organizational Development

##### Work Environment
- Supportive, nurturing cultures
- Opportunities to mentor others
- Environments that value people development
- Purpose-driven organizations

##### Work Style
- Collaborative and relationship-focused
- Finds meaning in helping others grow
- Values wisdom and perspective
- Thrives in supportive, nurturing environments
**Description For User:** You're someone who finds purpose in helping others grow. You have deep wisdom and a gift for guiding people. In your career, you need work that allows you to mentor, teach, and make a lasting impact on others.


## Persona Components

### Core Identity
**Description:** The central archetype that best describes the user

**Format:** The [Archetype Name]


### Tagline
**Description:** A memorable one-line summary of the persona

**Format:** [Tagline from archetype]


### Description
**Description:** 2-3 sentences explaining the persona to the user

**Format:** [Description from archetype]


### Description For User
**Description:** 1-2 sentences in first person, directly addressing the user

**Format:** You're someone who...


### Key Strengths
**Description:** Top 3-5 strengths with brief evidence


#### Format
- Strength 1: [Evidence from user's story]
- Strength 2: [Evidence from user's story]

### Growth Areas
**Description:** 2-3 areas for development with compassion


#### Format
- Area 1: [Compassionate framing]
- Area 2: [Compassionate framing]

### Shadow Traits
**Description:** Hidden patterns with compassionate acknowledgment


#### Format
- Shadow 1: [Acknowledgment without judgment]
- Shadow 2: [Acknowledgment without judgment]

### Learning Style
**Description:** How the user prefers to learn


#### Format
- Preferred methods: [list]
- Environment: [description]
- Motivation: [description]

### Core Motivations
**Description:** What drives the user


#### Format
- Primary: [motivation]
- Secondary: [motivation]
- Tertiary: [motivation]

### Career Affinities
**Description:** Aligned career directions with reasoning


#### Format
- Career 1: [Why it fits the persona]
- Career 2: [Why it fits the persona]

### Work Environment
**Description:** Environments where the user will thrive


#### Format
- Environment 1
- Environment 2

### Work Style
**Description:** How the user prefers to work


#### Format
- Style 1
- Style 2

### Traits Synthesized
**Description:** List of traits that contributed to this persona


#### Format
- trait_1
- trait_2
- trait_3

## Synthesis Rules

### Primary Archetype Selection
**Description:** How to select the primary archetype


#### Rules
- If 3+ traits match a single archetype → select that archetype
- If traits match multiple archetypes → select the one with the most HIGH confidence traits
- If no clear match → select the archetype with the strongest HIGH confidence trait
- If still unclear → default to 'The Curious Explorer'

### Secondary Archetype
**Description:** When to include a secondary archetype


#### Rules
- If 2+ traits match a secondary archetype → include it
- If the user shows a clear secondary pattern → include it
- Secondary archetype is presented as 'with qualities of [Archetype Name]'

### Strength Extraction
**Description:** How to extract strengths from the persona


#### Rules
- Map user's life stories to the archetype's strengths
- Include specific evidence from the user's own words
- Prioritize strengths mentioned multiple times across life stages

### Growth Area Extraction
**Description:** How to extract growth areas


#### Rules
- Identify patterns that were mentioned as challenges
- Frame with compassion, not judgment
- Connect to shadow traits when applicable

### Shadow Trait Extraction
**Description:** How to identify shadow traits with ethical guardrails


#### Rules
- Only identify if 2+ indicators are present
- Must be validated with user's own words
- USE TENTATIVE LANGUAGE: 'It seems you might lean towards...' NOT 'You are...'
- Frame with compassion: 'I notice you tend to...'
- Do NOT identify if user might feel judged
- Never use clinical language (avoid 'diagnosis', 'disorder', etc.)

#### Ethical Guardrails
- Shadow traits are observations, not diagnoses
- Always use tentative, open-ended language
- Validate the user's experience without labeling
- If user disagrees, accept their perspective immediately
- Never use shadow traits to pathologize normal behavior

### Career Affinity Mapping
**Description:** How to map to career affinities


#### Rules
- Use primary career affinities from archetype
- Refine based on user's specific interests (from Adult phase)
- Provide 2-3 specific career paths
- Explain WHY each path fits the user's persona
- Include role types (Individual Contributor, Manager, Strategist, Creator) in recommendations

## Conflict Resolution Rules
**Description:** How to handle contradictory traits or paradoxical user data


### Rules
**Type:** internal_contradiction

**Description:** User shows traits from opposite ends of a spectrum

**Resolution:** Label as 'balanced' or 'adaptive' personality. Example: 'You show both high independence and high collaboration, suggesting you can work well alone AND in teams.'

**Type:** cross_stage_contradiction

**Description:** User showed different traits in different life stages

**Resolution:** Label as 'evolved' or 'learned' trait. Example: 'You were shy as a child, but developed confidence as a teenager — that's real growth.'

**Type:** stated_vs_inferred_contradiction

**Description:** User says one thing, but their stories suggest another

**Resolution:** Give more weight to stories over stated beliefs. Example: 'You say you're not a leader, but I noticed you often took charge in your stories.'

**Type:** archetype_conflict

**Description:** User fits two conflicting archetypes equally well

**Resolution:** Present both archetypes as complementary. Example: 'You show qualities of both The Curious Explorer and The Compassionate Builder — you might be someone who explores to help others.'


## Confidence Scoring
**Description:** How to calculate confidence for trait matches


### Scoring Rules
**Criterion:** Mentioned in 2+ life stages

**Weight:** 3

**Criterion:** Explicitly stated by the user as a core identifier

**Weight:** 2

**Criterion:** Mentioned in 1 life stage with strong evidence

**Weight:** 1.5

**Criterion:** Mentioned in 1 life stage with limited evidence

**Weight:** 1

**Criterion:** Implied but not explicitly stated

**Weight:** 0.5


### Confidence Thresholds

#### High
**Score:** 4+ points

**Description:** Strong evidence across multiple life stages

**Presentation:** You consistently show [trait]


#### Medium
**Score:** 2-3 points

**Description:** Good evidence, may need more validation

**Presentation:** I notice a pattern of [trait]


#### Low
**Score:** 1 point

**Description:** Limited evidence, preliminary inference

**Presentation:** I wonder if you might be [trait]


## Validation Rules

### User Confirmation
**Description:** How to validate the persona with the user


#### Rules
- Always ask for user confirmation: 'Does this feel like you?'
- If user disagrees, ask: 'What would you add or change?'
- Be open to correction and refinement
- The user is the expert on themselves
- Use the user's response to refine the persona

### Fallback Persona
**Description:** If no archetype matches well


#### Rules
- Use 'The Curious Explorer' as default
- Note: 'This is a preliminary persona based on the data available'
- Encourage user to continue the journey for a more accurate persona
- Present as 'emerging persona' rather than definitive

## Persona Output Schema
**Description:** Strict JSON schema for persona output (for UI rendering)

**Type:** object


### Properties

#### Core Identity
**Type:** object


##### Properties

###### Archetype Name
**Type:** string


###### Tagline
**Type:** string


###### Description
**Type:** string


###### Description For User
**Type:** string


#### Strengths
**Type:** array


##### Items
**Type:** object


###### Properties

####### Trait
**Type:** string


####### Evidence
**Type:** string


#### Growth Areas
**Type:** array


##### Items
**Type:** object


###### Properties

####### Area
**Type:** string


####### Compassionate Framing
**Type:** string


#### Shadow Traits
**Type:** array


##### Items
**Type:** object


###### Properties

####### Trait
**Type:** string


####### Acknowledgment
**Type:** string


#### Learning Style
**Type:** object


##### Properties

###### Preferred Methods
**Type:** array


####### Items
**Type:** string


###### Environment
**Type:** string


###### Motivation
**Type:** string


#### Core Motivations
**Type:** object


##### Properties

###### Primary
**Type:** string


###### Secondary
**Type:** string


###### Tertiary
**Type:** string


#### Career Affinities
**Type:** array


##### Items
**Type:** object


###### Properties

####### Role Type
**Type:** string


####### Industries
**Type:** array


######## Items
**Type:** string


####### Reasoning
**Type:** string


#### Work Environment
**Type:** array


##### Items
**Type:** string


#### Work Style
**Type:** array


##### Items
**Type:** string


#### Traits Synthesized
**Type:** array


##### Items
**Type:** string


### Required
- core_identity
- strengths
- growth_areas
- career_affinities

## Career Mapping Reverse Index
**Description:** Reverse index: Search by career to find the archetype


### Healthcare
- the_compassionate_builder
- the_wise_guide

### Education
- the_wise_guide
- the_compassionate_builder
- the_curious_explorer

### Technology
- the_curious_explorer
- the_independent_thinker

### Engineering
- the_independent_thinker
- the_curious_explorer

### Research
- the_curious_explorer
- the_independent_thinker

### Design
- the_creative_connector
- the_curious_explorer

### Entrepreneurship
- the_driven_achiever
- the_independent_thinker
- the_creative_connector

### Leadership
- the_driven_achiever
- the_compassionate_builder
- the_wise_guide

### Marketing
- the_creative_connector
- the_curious_explorer

### Social Work
- the_compassionate_builder
- the_wise_guide

### Consulting
- the_driven_achiever
- the_independent_thinker
- the_curious_explorer

### Law
- the_independent_thinker
- the_driven_achiever

### Hr
- the_compassionate_builder
- the_wise_guide
- the_creative_connector

### Finance
- the_independent_thinker
- the_driven_achiever

### Product Management
- the_creative_connector
- the_curious_explorer
- the_driven_achiever

### Strategy
- the_independent_thinker
- the_driven_achiever
- the_curious_explorer
