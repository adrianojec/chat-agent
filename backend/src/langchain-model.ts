import { ChatGroq } from "@langchain/groq";
import { loadEnv } from "./env";

export const initGroqModel = () => {
  loadEnv();

  const model = new ChatGroq({
    model: "llama-3.1-8b-instant",
    temperature: 0,
  });

  return { model };
};
