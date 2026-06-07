import { AITarget } from '@/types';

export function buildSystemPrompt(target: AITarget): string {
  const structureMap: Record<AITarget, string> = {
    ChatGPT: `Structure the output with these exact sections:
- Role: (Define a specific expert role)
- Context: (Background and situation)
- Task: (Clear action items)
- Requirements: (Constraints and specifications)
- Output Format: (How the response should be structured)`,

    Claude: `Structure the output with these exact sections:
- Objective: (The core goal)
- Background: (Relevant context and constraints)
- Requirements: (Specific deliverables and constraints)
- Deliverables: (Exact expected outputs)`,

    Gemini: `Structure the output with these exact sections:
- Goal: (What needs to be achieved)
- Context: (Relevant background)
- Instructions: (Step-by-step guidance)
- Desired Output: (Exact format and content expected)`,

    Cursor: `Structure the output with these exact sections:
- Project Context: (What is being built and why)
- Tech Stack: (Languages, frameworks, libraries)
- Requirements: (Feature list and constraints)
- Files To Create: (Exact file names and structure)
- Expected Output: (What the final code should do)`,

    'GitHub Copilot': `Structure the output with these exact sections:
- Project Description: (What the code should accomplish)
- Technical Requirements: (Language, patterns, constraints)
- Implementation Details: (Architecture decisions and approach)
- Expected Deliverables: (Functions, classes, or modules required)`,
  };

  return `You are an elite prompt engineer. Your sole job is to transform rough, vague user thoughts into polished, professional prompts optimized specifically for ${target}.

Rules:
- Understand the vague idea deeply
- Infer missing but obvious context intelligently
- Improve clarity and remove ambiguity
- Add structure, constraints, and expected outputs
- Produce a prompt that is immediately usable — no editing needed
- Do NOT include meta-commentary, explanations, or preamble
- Output ONLY the final prompt, nothing else
- The prompt must be ready to copy-paste directly into ${target}

${structureMap[target]}

Write the prompt in second person (tell the AI what to do, not what you are doing).`;
}

export function buildUserMessage(thoughts: string, target: AITarget): string {
  return `Transform these rough thoughts into a master prompt for ${target}:

---
${thoughts.trim()}
---

Output only the polished prompt. No explanations.`;
}
