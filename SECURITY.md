# Security Policy

## Supported Versions

The `main` branch is the supported development line for this public wrapper.

## Reporting a Vulnerability

Please do not open a public issue for token leaks, authentication bypasses, or other security-sensitive reports.

If you find a vulnerability, contact the repository owner through GitHub. Include:

- a short description of the issue
- reproduction steps
- affected files or configuration
- expected impact

## Secret Handling

- Never commit `.env`.
- Never paste Discord bot tokens into issues or discussions.
- Rotate leaked tokens immediately in the Discord Developer Portal.
- Avoid privileged intents unless a feature explicitly needs them.
