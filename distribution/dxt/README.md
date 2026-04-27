# Great Operators — DXT Bundle

Claude Desktop extension for `great-operators`. Same nine personas and four MVP tools as the Claude Code plugin, packaged as a Desktop Extension (DXT) for double-click install.

## Build the bundle

```bash
cd distribution/dxt
npm install
npx @anthropic-ai/dxt pack
```

The pack command produces `great-operators.dxt` in this directory. Share that file with collaborators — they double-click it to install.

## Tools exposed

The MCP server in `server/index.js` exposes five tools:

| Tool | Maps to |
|---|---|
| `list_operators` | Browse the nine personas with one-line blurbs |
| `operators_channel` | The Claude Code skill `/operators-channel <persona>` |
| `operators_project_init` | The Claude Code skill `/operators-project-init` |
| `operators_write_plan` | The Claude Code skill `/operators-write-plan <focus>` |
| `operators_ops_review` | The Claude Code skill `/operators-ops-review <path>` |

`operators_project_init`, `operators_write_plan`, and `operators_ops_review` require Claude Desktop's filesystem access to be configured for the user's project directory. Without filesystem access, the tools still return useful guidance text but cannot actually scaffold or save artifacts.

## Warren Buffett (cross-dispatched)

Warren Buffett lives in the `great-minds` plugin as the strategic-capital persona — not duplicated here. If a user asks `operators_channel` to load Buffett, the server raises a clear error directing the caller to `Agent({subagent_type: "great-minds:warren-buffett-persona", ...})` instead. great-operators handles execution craft (Cook, Grove, Deming, Ohno); great-minds handles strategic capital allocation (Buffett). One Buffett, two registers depending on the question.

## Persona files

Each tool that loads a persona reads from `server/personas/`. These are byte-for-byte copies of the persona files in `agents/` at the plugin root. The smoke test (`tests/smoke.sh`) verifies the two directories stay in sync — if you edit a persona, run:

```bash
cp agents/*.md distribution/dxt/server/personas/
```

then re-run `tests/smoke.sh` to confirm the counts match.

## Versioning

The DXT version must match `package.json` and `.claude-plugin/plugin.json`. The smoke test validates this. To bump versions, update all four:

```
.claude-plugin/plugin.json
package.json
distribution/dxt/manifest.json
distribution/dxt/package.json
```

Then run `bash tests/smoke.sh` to confirm coherence.

## Notes

- The DXT bundle is intentionally a thin wrapper over the persona files and the skill prompts. The MCP server returns prompt text; Claude Desktop interprets it the same way Claude Code interprets the SKILL.md files.
- Filesystem-touching tools (`project_init`, `write_plan`, `ops_review`) return prompt text that *describes* what should happen on disk; the actual filesystem work happens through Claude Desktop's filesystem MCP integration. This pattern matches the great-authors, great-filmmakers, great-publishers, great-marketers, great-engineers, and great-designers DXT bundles.
- For the Claude Code experience, install the plugin instead: `/plugin install great-operators@sethshoultes`.
