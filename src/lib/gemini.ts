import OpenAI from 'openai';

let client: OpenAI | null = null;

export function getOpenRouterClient(): OpenAI {
  if (!client) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY environment variable is not set');
    }
    client = new OpenAI({
      apiKey,
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Promptly',
      },
    });
  }
  return client;
}

export async function generateWithGemini(
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  const ai = getOpenRouterClient();

  const response = await ai.chat.completions.create({
    model: 'openrouter/auto',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user',   content: userMessage },
    ],
  });

  return response.choices[0]?.message?.content ?? '';
}