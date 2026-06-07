export type AITarget = 'ChatGPT' | 'Claude' | 'Gemini' | 'Cursor' | 'GitHub Copilot';

export interface GenerateRequest {
  thoughts: string;
  target: AITarget;
}

export interface GenerateResponse {
  prompt: string;
  error?: string;
}
