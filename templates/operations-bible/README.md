# operations/ — operations-stage artifacts

This is the directory `/operators-project-init` copies into a project's root, sibling to `manuscript/` (great-authors), `film/` (great-filmmakers), `publishers/` (great-publishers), `marketing/` (great-marketers), `engineering/` (great-engineers), `design/` (great-designers).

## Subdirectories

| Subdir | Owner | Contents |
|---|---|---|
| `plans/` | Cook, Grove, Munger, etc. (persona-driven by signal) | Operating plans, playbooks, runbooks, OKRs |
| `reviews/` | Default panel: Cook + Grove + Deming (override available) | Process reviews, post-mortems, operational audits |
| `systems/` | Deming, Ohno, McCord (depending on layer) | SOPs, system documentation, dashboards |

## Slug convention

Each artifact saves as `<slug>.md` under the appropriate subdir. The slug is set in `CLAUDE.md`'s `## Operations` section's `Current plan` field. A single project may have multiple operating plans in flight (different functions, different quarters) — update the current-plan field as you move between them.

## Filename suffixes

Persona-specific alternatives use suffixes:

- `<slug>.md` — primary plan (auto-selected persona, default Grove for management)
- `<slug>-okrs.md` — OKR format
- `<slug>-postmortem.md` — incident review format
- `<slug>-cook-supply.md`, `<slug>-deming-quality.md`, etc. — when the same focus gets multiple persona drafts for comparison

The orchestrator picks which to ship; the alternatives stay on disk as the operations conversation.

## Why this lives at the project level

Operations artifacts depend on the project's actual systems, metrics, and people. They cannot be project-agnostic. So they live at the project root, owned by the project, committed to the project's repo. The plugin scaffolds the directory; the project owns it from then on.
