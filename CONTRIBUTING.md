# Contributing

Thanks for taking a look at Restore-Base.

## Local Setup

```bash
npm install
cp .env.example .env
npm run check
```

Use `npm run dev` while working locally. Use `npm run build` before opening a pull request.

## Pull Request Guidelines

- Keep changes focused and easy to review.
- Include documentation updates when behavior changes.
- Do not commit credentials, tokens, logs, or private RestoreBase product code.
- Prefer small command modules over large event handlers.
- Keep the wrapper useful as a public starter, not a mirror of the private platform.

## Commit Style

Short, imperative commit messages are preferred:

```text
Add health check metadata
Document command registration flow
```
