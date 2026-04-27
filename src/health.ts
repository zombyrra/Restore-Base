import express from "express";
import type { Client } from "discord.js";

export function startHealthServer(client: Client, port: number): void {
  const app = express();

  app.get("/health", (_request, response) => {
    response.json({
      ok: true,
      ready: client.isReady(),
      user: client.user?.tag ?? null,
      uptimeSeconds: Math.round(process.uptime()),
    });
  });

  app.listen(port, () => {
    console.log(`Health endpoint listening on http://localhost:${port}/health`);
  });
}
