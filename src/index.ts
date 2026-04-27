import {
  Client,
  Events,
  GatewayIntentBits,
  Partials,
} from "discord.js";
import { handlePrefixCommand, handleSlashCommand, registerSlashCommands } from "./commands.js";
import { loadConfig } from "./config.js";
import { startHealthServer } from "./health.js";
import { createRuntimeState } from "./runtime-state.js";

async function main(): Promise<void> {
  const config = loadConfig();
  const runtimeState = createRuntimeState();
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
    partials: [
      Partials.Channel,
      Partials.Message,
    ],
  });

  client.once(Events.ClientReady, async (readyClient) => {
    runtimeState.readyAt = new Date().toISOString();
    console.log(`Restore-Base ready as ${readyClient.user.tag}`);
    await registerSlashCommands(config);
    console.log("Slash commands registered.");
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    await handleSlashCommand(interaction).catch(async (error) => {
      runtimeState.lastError = error instanceof Error ? error.message : String(error);
      console.error("Slash command failed:", error);

      if (interaction.replied || interaction.deferred) {
        await interaction.editReply("Command failed.");
        return;
      }

      await interaction.reply({
        content: "Command failed.",
        ephemeral: true,
      });
    });
  });

  client.on(Events.MessageCreate, async (message) => {
    await handlePrefixCommand(message, config.BOT_PREFIX).catch((error) => {
      runtimeState.lastError = error instanceof Error ? error.message : String(error);
      console.error("Prefix command failed:", error);
    });
  });

  client.on(Events.Error, (error) => {
    runtimeState.lastError = error.message;
    console.error("Discord client error:", error);
  });

  process.once("SIGINT", () => shutdown(client, "SIGINT"));
  process.once("SIGTERM", () => shutdown(client, "SIGTERM"));

  startHealthServer(client, config.PORT, runtimeState);
  await client.login(config.DISCORD_BOT_TOKEN);
}

async function shutdown(client: Client, signal: string): Promise<void> {
  console.log(`Received ${signal}; closing Discord client.`);
  client.destroy();
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
