import {
  ChatInputCommandInteraction,
  Message,
  REST,
  Routes,
  SlashCommandBuilder,
} from "discord.js";
import type { AppConfig } from "./config.js";

export const slashCommands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check whether the bot is online.")
    .toJSON(),
];

export async function registerSlashCommands(config: AppConfig): Promise<void> {
  const rest = new REST({ version: "10" }).setToken(config.DISCORD_BOT_TOKEN);

  if (config.DISCORD_GUILD_ID) {
    await rest.put(
      Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, config.DISCORD_GUILD_ID),
      { body: slashCommands },
    );
    return;
  }

  await rest.put(
    Routes.applicationCommands(config.DISCORD_CLIENT_ID),
    { body: slashCommands },
  );
}

export async function handleSlashCommand(interaction: ChatInputCommandInteraction): Promise<void> {
  if (interaction.commandName !== "ping") {
    return;
  }

  await interaction.reply({
    content: "Pong from Restore-Base.",
    ephemeral: true,
  });
}

export async function handlePrefixCommand(message: Message, prefix: string): Promise<void> {
  if (message.author.bot || !message.content.startsWith(prefix)) {
    return;
  }

  const [commandName] = message.content
    .slice(prefix.length)
    .trim()
    .split(/\s+/);

  if (commandName?.toLowerCase() === "ping") {
    await message.reply("Pong from Restore-Base.");
  }
}
