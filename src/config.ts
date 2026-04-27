import "dotenv/config";
import { z } from "zod";

const environmentSchema = z.object({
  BOT_PREFIX: z.string().trim().min(1).default("!"),
  DISCORD_BOT_TOKEN: z.string().trim().min(1, "DISCORD_BOT_TOKEN is required"),
  DISCORD_CLIENT_ID: z.string().trim().min(1, "DISCORD_CLIENT_ID is required"),
  DISCORD_GUILD_ID: z.string().trim().optional(),
  PORT: z.coerce.number().int().positive().default(3000),
});

export type AppConfig = z.infer<typeof environmentSchema>;

export function loadConfig(): AppConfig {
  const result = environmentSchema.safeParse(process.env);

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    throw new Error(`Invalid environment configuration:\n${details}`);
  }

  return result.data;
}
