import { serve } from "@hono/node-server";
import app from "./app";

const server = serve(
  {
    fetch: app.fetch,
    port: 4000,
    hostname: "0.0.0.0",
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
