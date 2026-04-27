import {
  Client,
  Events,
  GatewayIntentBits,
  Partials,
} from "discord.js";
import { handlePrefixCommand, handleSlashCommand, registerSlashCommands } from "./commands.js";
import { loadConfig } from "./config.js";
import { startHealthServer } from "./health.js";

async function main(): Promise<void> {
  const config = loadConfig();
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
    console.log(`Restore-Base ready as ${readyClient.user.tag}`);
    await registerSlashCommands(config);
    console.log("Slash commands registered.");
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    await handleSlashCommand(interaction).catch(async (error) => {
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
      console.error("Prefix command failed:", error);
    });
  });

  startHealthServer(client, config.PORT);
  await client.login(config.DISCORD_BOT_TOKEN);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
