import { googleAI } from '@genkit-ai/google-genai';
import { genkit, z } from 'genkit';

const ai = genkit({
  plugins: [googleAI()],
  promptDir: './prompts',
});
export const queryIntentFlow = ai.defineFlow(
  {
    name: 'queryIntentFlow',
    inputSchema: z.object({ query: z.string() }),
    outputSchema: z.object({
      intent: z.string()
    }),
  },
  async ({ query }) => {
    const { text } = await ai.generate({
      model: googleAI.model('gemini-flash-latest'),
      prompt: `
      You are an expert e-commerce AI assistant who understands the intent of customer query.
      Guess the intent of query : '${query}' and map it to to exactly one of the 
      following intent as string : order-status, order-cancellation, order-refund, generl-query.
      if intent is order-status and query contains order id, return 'order-status|{id}' as output.
      for any other intent, just return intent.
      `,
    });
    return { intent: text };
  },
);
