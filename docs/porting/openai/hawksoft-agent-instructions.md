# OpenAI / ChatGPT HawkSoft Agent Instructions

ChatGPT's Skills feature uses the same `SKILL.md` convention as this repo, so no
manual porting is needed — the build produces an upload-ready bundle for you.

```bash
npm run build:chatgpt
```

Output: `dist/chatgpt/hawksoft-operations/` (zip that folder and upload it) plus
`dist/chatgpt/README.md` with the exact zip and upload steps, availability notes,
and fallbacks for workspaces without Skills (ChatGPT Projects or a Custom GPT).

The build copies the skill and adapts only the Claude-specific bits (rewrites
`${CLAUDE_SKILL_DIR}` routing to relative paths, drops the `$ARGUMENTS` tail, omits
`.claude-plugin/`), then validates the result. Keep the same safety rules: verify
the client, avoid unsupported facts, pause before save/submit/bind/cancel/delete
actions, and test only with fabricated data first.

See `docs/development.md` for how the translation works and how to add more
vendors.
