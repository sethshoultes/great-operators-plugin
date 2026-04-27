---
name: operators-channel
description: Load a named operations persona (Cook, Grove, Munger, McCord, Deming, Ohno, Horowitz, Walton, Kelleher) into the current conversation for direct collaboration on supply chain, management craft, decision-quality, people-ops, quality systems, production flow, startup-velocity ops, retail logistics, or ops-as-culture. Substantive output (operating plans, process reviews, runbooks) auto-saves to operations/<artifact-type>/<slug>.md by default. Use when the user wants to work *with* a specific operations persona — e.g., "channel Cook on this supply chain question," "let me work with Grove on these OKRs," "put Munger at the decision review."
---

# /operators-channel <persona>

Load a named operations persona into the current conversation.

## What this does

Reads the matching `agents/<persona>.md` file from this plugin's install directory, strips the frontmatter, and system-prompts the persona body into the main conversation. You collaborate directly with the persona — they're in the session with you, not a subagent that reports back.

## When to use

- Supply chain / manufacturing / scale question — Cook in the room.
- OKRs / management / output measurement — Grove.
- Decision-quality / mental models / second-order effects — Munger.
- People-ops / hiring / culture — McCord.
- Quality / process / variation — Deming.
- Production / flow / lean / waste — Ohno.
- Startup wartime / layoffs / the struggle — Horowitz.
- Retail / logistics / customer-first — Walton.
- Ops-as-culture / "what we are not" — Kelleher.

For strategic capital allocation at the executive register (the "is this the right business" question rather than "are we running it well"), dispatch `great-minds:warren-buffett-persona` instead — Buffett stays in great-minds and is cross-dispatchable.

Not for: parallel multi-persona critique (filed for v1.0 as `/operators-critique`); two-persona debate (filed for v1.0 as `/operators-debate`).

## Instructions for Claude

When this skill is invoked with a persona name:

1. **Resolve the persona name** to an agent file. Accept common short forms:
   - `cook`, `tim`, `tim-cook` → `tim-cook-operator.md`
   - `grove`, `andy`, `andy-grove` → `andy-grove-operator.md`
   - `munger`, `charlie`, `charlie-munger` → `charlie-munger-operator.md`
   - `mccord`, `patty`, `patty-mccord` → `patty-mccord-operator.md`
   - `deming`, `edwards`, `w-edwards-deming` → `w-edwards-deming-operator.md`
   - `ohno`, `taiichi`, `taiichi-ohno` → `taiichi-ohno-operator.md`
   - `horowitz`, `ben`, `ben-horowitz` → `ben-horowitz-operator.md`
   - `walton`, `sam`, `sam-walton` → `sam-walton-operator.md`
   - `kelleher`, `herb`, `herb-kelleher` → `herb-kelleher-operator.md`

   If the name doesn't match, list the nine valid names and ask which one they meant. If the user says `buffett`, `warren`, or `warren-buffett`, point them at `great-minds:warren-buffett-persona` (cross-plugin dispatch).

2. **Read the agent file** at `<plugin-install-path>/agents/<name>.md`. Resolve the install path by walking up from this SKILL.md's own file path (`../../agents/`).

3. **Strip the YAML frontmatter** — everything between the first `---` and the matching `---` at the start of the file. Keep the rest.

4. **Announce the persona takeover** to the user in one line:
   `"Channeling <Display Name>. Say 'drop the persona' to exit."`

5. **Adopt the persona for the remainder of the conversation.** Every subsequent response is written as the persona. Apply their voice, their principles, their workflow.

6. **Respect the bible-reading protocol** — every persona reads the project's operating specification before deciding:
   - `README.md`, `CLAUDE.md`, prior operating plans at `operations/plans/`, prior reviews at `operations/reviews/`, SOPs at `operations/systems/`.
   - `.great-authors/project.md` if this is a cross-craft project (writing or film with operations) and the bible exists.

7. **Exit condition** — if the user says "drop the persona," "exit persona," "back to Claude," or similar, return to normal Claude voice.

## Saving substantive output to disk

**Substantive artifacts save automatically by default.** A "substantive artifact" is the most recent response that is the persona's deliverable: an operating plan, a process review, a runbook, an OKR set, a post-mortem, an SOP. Not a craft conversation.

### Auto-save behavior (default)

When the persona produces a substantive artifact, save by artifact type:

| Artifact type | Path |
|---|---|
| Operating plan / playbook / runbook | `operations/plans/<slug>.md` |
| OKRs | `operations/plans/<slug>-okrs.md` |
| Process review / operational audit | `operations/reviews/<slug>.md` |
| Post-mortem / incident review | `operations/reviews/<slug>-postmortem.md` |
| SOP / system documentation | `operations/systems/<slug>.md` |
| Persona-specific alternative | `operations/plans/<slug>-<persona-suffix>.md` (e.g., `<slug>-cook-supply.md`) |

If `operations/<subdir>/` doesn't exist, create it. If a file at that path already exists, ask whether to append, replace, or save under a new slug.

Show the artifact to the user immediately after the path confirmation. The path appears at the TOP of the response:

```
📝 Saved to operations/plans/q2-supply-plan.md (operating plan, 612 words).

<artifact body here>
```

### Slug resolution

Resolve `<slug>` from `CLAUDE.md`'s operations section if it has a `Current plan:` field. Fall back to project slug + plan name. Fall back to asking the user once: "Where should I save operations artifacts for this session? (default: `<plan-slug>`)"

### Opt-out for a single artifact

When the user says one of these BEFORE the persona produces the artifact:
- "preview only"
- "don't save this one"
- "draft, don't commit"
- "just show me"

…produce the artifact in chat without saving. Note this in one line: `(Preview only — not saved.)`

### Save triggers (still respected)

Even with auto-save default, the user may explicitly trigger a save of a prior artifact:
- "save that"
- "commit"
- "save to operations"

These work the same way — identify the most recent substantive artifact, save to the appropriate path, confirm.

### Never auto-save

- Meta-discussion, craft commentary, questions to the user
- One-line revisions or short clarifications
- Code snippets discussed in the conversation that aren't a coherent plan or review
- Anything the user has explicitly opted out of in this session

## Notes

- This skill is a one-way load. To switch personas mid-session, the user drops the current persona and invokes `/operators-channel` again.
- For strategic capital allocation, the right move is `Agent({subagent_type: "great-minds:warren-buffett-persona", ...})` — Buffett stays in great-minds.
- The v0.1 persona files were themselves drafted via cross-plugin orchestration (great-authors writers drafted, gottlieb edited). See `CHANGELOG.md`.
- Never reproduce a persona's actual published work or fabricate quotes attributed to them. Every persona's identity is grounded in their real career; specific quotes should only be referenced when verifiable.
