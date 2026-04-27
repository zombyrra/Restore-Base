# Restore-Base

A small, self-hostable Discord bot wrapper inspired by RestoreBase.

This repository is intentionally tiny. It is a public starter for running a custom Discord bot with a clean event wrapper, a slash command, a prefix command, and a health endpoint. It does not include the private RestoreBase dashboard, billing, database schema, member recovery system, or production credentials.

## What It Includes

- Discord gateway client setup with `discord.js`
- Safe environment variable validation
- `/ping` slash command registration
- `!ping` prefix command example
- Express health endpoint at `/health`
- TypeScript build and dev scripts

## Quick Start

```bash
npm install
cp .env.example .env
npm run dev
```

Fill in `.env` before starting:

```bash
DISCORD_BOT_TOKEN=your_bot_token
DISCORD_CLIENT_ID=your_application_client_id
DISCORD_GUILD_ID=optional_test_guild_id
BOT_PREFIX=!
PORT=3000
```

If `DISCORD_GUILD_ID` is set, slash commands register to that guild for fast testing. If it is omitted, commands register globally and may take longer to appear in Discord.

## Scripts

```bash
npm run dev
npm run check
npm run build
npm start
```

## Discord Setup

1. Create an application in the Discord Developer Portal.
2. Add a bot user and copy its token into `.env`.
3. Enable the Message Content Intent if you want prefix commands.
4. Invite the bot with `bot` and `applications.commands` scopes.
5. Start the wrapper and test `/ping` or `!ping`.

## Security Notes

- Never commit `.env` or bot tokens.
- Rotate a token immediately if it is posted publicly.
- Keep privileged intents off unless the feature needs them.

## License

MIT
