import express from "express";
import type { Client } from "discord.js";
import type { RuntimeState } from "./runtime-state.js";

export function startHealthServer(client: Client, port: number, runtimeState: RuntimeState): void {
  const app = express();

  app.get("/health", (_request, response) => {
    response.json({
      ok: true,
      lastError: runtimeState.lastError,
      ready: client.isReady(),
      readyAt: runtimeState.readyAt,
      startedAt: runtimeState.startedAt,
      user: client.user?.tag ?? null,
      uptimeSeconds: Math.round(process.uptime()),
    });
  });

  app.listen(port, () => {
    console.log(`Health endpoint listening on http://localhost:${port}/health`);
  });
}
