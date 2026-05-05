import { Hono } from "hono";
import { cors } from "hono/cors";
import { loadEnv } from "./env";
import { structuredChat } from "./chat-core";

loadEnv();

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "DELETE", "OPTIONS"],
    credentials: false,
  }),
);

app.post("/ask", async (c) => {
  try {
    const { query } = await c.req.json();

    if (!query) return c.json({ error: "Field query is required." }, 400);

    const result = await structuredChat(query);

    return c.json(result, 200);
  } catch (error) {
    return c.json({ error: "Failed to answer" }, 500);
  }
});

export default app;
