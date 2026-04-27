---
name: operators-write-plan
description: Produce an operating plan / playbook / runbook for a focus area, function, or quarter. Reads the project specification (README, CLAUDE.md, prior plans, prior reviews, SOPs), then dispatches an operator persona to draft the plan in their register. Default persona auto-selected by signal — Cook for supply chain, Grove for management/OKRs, Munger for decision-quality, McCord for people, Deming for quality, Ohno for production flow, Horowitz for startup wartime, Walton for retail, Kelleher for ops-as-culture. Override with --persona. Output saves to operations/plans/<slug>.md. Use when a function or quarter needs a structured operating plan.
---

# /operators-write-plan <focus> [--persona <name>]

Produce an operating plan, playbook, or runbook for a focus area or function.

## What this does

This skill is the operations equivalent of `/engineers-write-spec` — the upstream artifact that downstream work obeys. Before the operation runs, the plan establishes the goal, the strategy, the metrics, the resources, the risks, the cadence, and what's still open.

The plan serves three downstream consumers:

1. The team executing the operation — they read the plan and run accordingly.
2. The reviewer (you, the orchestrator, or a peer) — they check whether execution matches the plan.
3. The future operator — they read the plan months later to understand why a given choice was made.

## When to use

- A function, quarter, or operating focus is non-trivial enough that an explicit plan makes execution clearer and review easier.
- Multiple operating approaches are possible and the team needs to decide between them.
- A new system, runbook, or playbook needs a load-bearing rationale captured before commitment.
- A wartime pivot needs a documented decision trail.

Not for: line-level metric tweaks (use `/operators-ops-review`); craft conversations about a single decision (use `/operators-channel <persona>`); auto-generated documentation.

## Instructions for Claude

When this skill is invoked with a `<focus>` argument and optional `--persona`:

1. **Resolve the project root** the same way `/operators-project-init` does. Verify `CLAUDE.md` (or `README.md`) exists and the `operations/` directory is present. If `operations/` is missing, recommend running `/operators-project-init` first; do not auto-create.

2. **Read the project specification:**
   - `CLAUDE.md` — orchestrator-mode notes, current plan slug, conventions
   - `README.md` — what the business does, who runs it
   - Prior operating plans at `operations/plans/`
   - Prior reviews at `operations/reviews/`
   - SOPs at `operations/systems/`
   - The manifest (`package.json`, `pyproject.toml`, etc.)
   - Operating data — metrics, dashboards, financial summaries
   - `.great-authors/project.md` if cross-craft project

3. **Resolve the persona to dispatch.** If `--persona` is given, use it. Otherwise auto-select by signal:

   | Signal in the focus description / project | Default persona |
   |---|---|
   | "supply chain", "manufacturing", "vendor", "inventory", scale | `tim-cook-operator` |
   | "OKRs", "management", "1:1", "output", "leverage", "inflection" | `andy-grove-operator` |
   | "decision quality", "mental model", "invert", "second-order", "moat" | `charlie-munger-operator` |
   | "people", "hiring", "culture", "freedom", "performance review" | `patty-mccord-operator` |
   | "quality", "variation", "control chart", "PDSA", "process" | `w-edwards-deming-operator` |
   | "production", "flow", "lean", "waste", "kaizen", "kanban" | `taiichi-ohno-operator` |
   | "wartime", "layoffs", "struggle", "runway", "pivot" | `ben-horowitz-operator` |
   | "retail", "logistics", "customer-first", "EDLP", store-level | `sam-walton-operator` |
   | "culture", "what we are not", positioning-via-ops | `herb-kelleher-operator` |
   | None of the above | `andy-grove-operator` (the management default) |

   Document the choice in the plan's frontmatter.

4. **Dispatch the persona** via the Agent tool with `subagent_type: "great-operators:<persona-slug>-operator"`. The brief must include:
   - The focus description (the user's `<focus>` argument, plus any context the user provided)
   - All bible files read above (paths only — the persona reads them)
   - Operating data (metrics, dashboards)
   - Prior plans and reviews that inform this decision
   - The output target: `operations/plans/<slug>.md`
   - The required structure (below)
   - Length target: 600-1,200 words

5. **The output structure:**

```markdown
---
title: <Focus / function name>
slug: <slug>
persona: <persona-slug>
created: YYYY-MM-DD
status: draft | proposed | accepted | in-execution | superseded
---

# Operating plan: <Title>

## Context

<One paragraph. What is the business doing, what is the function for, what changed that prompted this plan?>

## Goal

<One paragraph. The outcome the plan is committing to. Measurable. Dated.>

## Strategy

<2-4 paragraphs. The chosen approach, described concretely enough that the team can execute it. Include key tactics, sequencing, dependencies.>

## Metrics

<Bulleted list. The metrics that prove the goal is being achieved. Each metric has a baseline, a target, and a cadence for review.>

## Resources

<Bulleted list. Headcount, budget, tools, partnerships required. Honest about what is committed and what is wished for.>

## Risks

<Bulleted list. What could go wrong. The top three risks each get a mitigation.>

## Cadence

<One paragraph. How the plan will be reviewed and updated. Weekly? Monthly? Tied to which existing meeting?>

## Open questions

<Bulleted list. Things the plan does not yet answer. The executor is allowed to make these calls; the planner is acknowledging the gaps.>
```

6. **Save the doc** to `operations/plans/<slug>.md`. If the file exists, ask the user whether to overwrite, save as `<slug>-v2.md`, or skip.

7. **Report:**
   ```
   📝 Saved to operations/plans/<slug>.md (<word-count> words, drafted by <persona>).

   Goal:       <one-line summary>
   Strategy:   <one-line summary>

   Next:
   - /operators-ops-review operations/plans/<slug>.md to dispatch a panel for review
   - /operators-channel <other-persona> to refine specific sections (e.g., Deming on the metrics, McCord on the people resourcing)
   ```

## What the skill does NOT do

- Does not run the operation. The plan describes; the team executes. (For autonomous execution, use `/agency-execute` in `great-minds`.)
- Does not deploy, ship, or run. It produces a doc.
- Does not auto-decide between alternatives — the persona presents the strategy with trade-offs. The user (or the orchestrator) makes the call.
- Does not invent constraints. Every constraint in the plan must trace to operating data, prior plans, the manifest, or stated user requirements. No hallucinated headcount budgets.

## Notes

- The plan is the contract. If execution diverges from the plan, fix the plan first; then continue. Don't let execution silently overwrite the strategy.
- A project may have multiple plans over time (one per function, one per quarter). Each gets its own slug — set via `CLAUDE.md`'s `Current plan:` field.
- For OKRs specifically, use `--persona grove` and request the OKR format explicitly. Filed for v1.0 as `/operators-write-okrs`.
