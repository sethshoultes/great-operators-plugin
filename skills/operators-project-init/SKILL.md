---
name: operators-project-init
description: Scaffold an operations/ directory at the project root, sibling to manuscript/, film/, publishers/, marketing/, engineering/, design/. Adds an Operations section to CLAUDE.md (or creates one if absent) so operations-stage commands know where to write. Use when starting the operations work for a project — supply chain, management, ops culture, or cross-craft.
---

# /operators-project-init

Scaffold the `operations/` directory and register it in the project's `CLAUDE.md`.

## What this does

Creates an `operations/` folder at the current working directory's project root with three subdirectories:

```
operations/
├── plans/        # Operating plans, playbooks, runbooks, OKRs
├── reviews/      # Process reviews, post-mortems, operational audits
└── systems/      # SOPs, system documentation, dashboards
```

Then adds (or creates) a `## Operations` section in `CLAUDE.md`:

```markdown
## Operations

**Path:** `operations/` (at project root)
**Current plan:** `<user-chosen-slug>` (the plan or focus you're actively working on)

Commands that generate operations artifacts (`/operators-channel` save behavior, `/operators-write-plan`, `/operators-ops-review`) write to `operations/<subdir>/<current-plan>.md` by default. Update `Current plan` when moving to a different focus or quarter.

The operator personas read this file plus the project's `README.md`, prior plans at `operations/plans/`, prior reviews at `operations/reviews/`, and SOPs at `operations/systems/`. For cross-craft projects, they also read `.great-authors/project.md`.

For strategic capital allocation at the executive register, cross-dispatch `great-minds:warren-buffett-persona` — he stays in great-minds.
```

## When to use

- Starting operations work on a business (supply chain, management, ops culture, retail, startup ops).
- Extending an existing project (great-authors / great-filmmakers / great-publishers / great-marketers / great-engineers / great-designers) with operations work — for example, the production ops behind a film, the fulfillment ops behind a book, the support ops behind a SaaS product.
- Before invoking `/operators-channel` with save triggers (which need to know where to write).

## Instructions for Claude

When this skill is invoked:

1. **Resolve the project root.** Use the current working directory unless the user specifies otherwise.

2. **Check for existing `operations/` directory.** If it exists, ask: "An `operations/` directory already exists. Overwrite the scaffold (destroys existing content) or skip (leaves it alone)? (overwrite/skip)" — default skip.

3. **Read existing project context.** Look for these files and read them if present:
   - `README.md`
   - `CLAUDE.md`
   - Prior operations docs (plans, runbooks, dashboards)
   - The manifest (`package.json`, `pyproject.toml`, etc.) — informs which operators might be most relevant
   - `.great-authors/project.md` (if cross-craft project)

   This context informs which operator personas the user should know about (e.g., if there's a supply chain question, mention Cook; if there's a management cadence question, mention Grove; if there's a quality concern, mention Deming).

4. **Ask the plan-slug question.** One question:
   - "What's the slug for the plan or focus you're starting with? Default: based on what's in the project. Accept any kebab-case identifier (e.g., `q2-supply-plan`, `support-ops-2026`, `startup-wartime-pivot`)."

5. **Create the directory tree.** Three empty subdirectories under `operations/`:
   - `plans/`
   - `reviews/`
   - `systems/`

6. **Update `CLAUDE.md`.** Read the existing file. If it doesn't exist, create one with a minimal header plus the `## Operations` section. If it exists and has an `## Operations` section, ask whether to overwrite. If it exists without one, append the `## Operations` block documented above.

7. **Report:**
   ```
   Created operations/ with subdirs:
     plans/  reviews/  systems/

   Updated CLAUDE.md with ## Operations section.
   Current plan: <slug>

   Detected project context:
   - <Operations summary: supply chain / SaaS support / retail / etc.>
   - <Key files present: prior plans, runbooks, etc.>

   Next:
   - /operators-channel <persona> for direct collaboration. The personas best-fit to this project are <list 2-3 based on signals>.
   - /operators-write-plan <focus> to draft an operating plan.
   - /operators-ops-review <path> to review an existing process or system.

   For strategic capital allocation, dispatch warren-buffett-persona from great-minds:
     Agent({subagent_type: "great-minds:warren-buffett-persona", ...})
   ```

## Notes

- This skill does not commit to git. The user owns their repository.
- The `operations/` directory is for ARTIFACTS at the operations stage. The actual running of the operation is the user's. Operations artifacts describe, review, and decide; they don't replace the doing.
- For software-only projects, no `.great-authors/` is needed. For cross-craft projects, `.great-authors/` is the bible spine and operator personas read it alongside the operations context.
- The `current-plan` slug names "what we're working on right now." Update it when you move to a different focus.
