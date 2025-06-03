import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, you should proxy through your backend
});

export const generateStoryContent = async (responses: Record<string, string>) => {
  try {
    const prompt = `Create a heartfelt narrative based on these life story responses:
${Object.entries(responses)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}

Write it in a warm, personal style that captures the essence of their life story.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating story:', error);
    throw error;
  }
};