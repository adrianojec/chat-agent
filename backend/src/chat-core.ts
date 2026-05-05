import { initGroqModel } from "./langchain-model";
import { type ChatResult, ChatResultSchema } from "./schema";

export const structuredChat = async (query: string): Promise<ChatResult> => {
  const { model } = initGroqModel();

  const systemContent =
    "Youa re a concise assistant. Return only the requested JSON.";
  const userContent =
    `Summarize for a beginner:\n` +
    `"${query}"\n` +
    `Return fields: Summary (short paragraph), Confidence (0..1)`;

  const structuredModel = model.withStructuredOutput(ChatResultSchema);

  const response = await structuredModel.invoke([
    {
      role: "system",
      content: systemContent,
    },
    {
      role: "user",
      content: userContent,
    },
  ]);

  return response;
};
