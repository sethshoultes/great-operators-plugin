---
name: operators-ops-review
description: Dispatch one or more operator personas to review an existing process, system, operating plan, or post-mortem. Default panel for parallel review — Tim Cook (supply chain discipline), Andy Grove (output multiplier check), W. Edwards Deming (system vs. people). Override with --personas. Reads the project specification + the target file/directory + relevant adjacent context, produces a consolidated review with per-persona verdicts and a single highest-leverage recommendation. Output saves to operations/reviews/<slug>.md.
---

# /operators-ops-review <path> [--personas <list>]

Review an existing process, system, operating plan, or operating function.

## What this does

Dispatches operator personas to review the artifact at `<path>`. Default panel runs three personas in parallel (Cook, Grove, Deming), each with a different lens. Output is a consolidated review — per-persona verdicts marked up, then a single recommended highest-leverage change.

## When to use

- An operating function (support, fulfillment, hiring, deployment, manufacturing) needs a structured audit.
- An operating plan needs scrutiny before commitment.
- A process is "working but feels wrong" and you need named diagnoses.
- A post-mortem needs a multi-persona review before becoming a permanent record.

Not for: individual performance reviews (use `/operators-channel mccord` instead — McCord has views on whether you should be doing them at all); tactical line-level metric tweaks; auto-generated documentation.

## Instructions for Claude

When this skill is invoked with a `<path>` argument and optional `--personas`:

1. **Resolve the project root** the same way `/operators-project-init` does. Verify `CLAUDE.md` exists or warn that the operations bible is missing.

2. **Read the project specification:**
   - `CLAUDE.md`, `README.md`, prior plans at `operations/plans/`, prior reviews at `operations/reviews/`, SOPs at `operations/systems/`
   - Operating data (metrics, dashboards, financial summaries) if present
   - `.great-authors/project.md` if cross-craft project

3. **Read the target.** `<path>` may be:
   - A single file (a plan, a runbook, an SOP, a post-mortem)
   - A directory (a function's documentation)
   - A glob (`operations/plans/*.md`)

   Read the target file(s) in full. Read adjacent context — sibling files, the operating data the plan references, the prior reviews that motivated the current plan. The reviewer can't review what they can't see.

4. **Resolve the panel.** If `--personas` is given (comma-separated), use those. Otherwise default panel:

   - `tim-cook-operator` — supply chain discipline, end-to-end execution, restraint
   - `andy-grove-operator` — output multiplier, where is the leverage, OKR honesty
   - `w-edwards-deming-operator` — system vs. worker, where the variation lives

   Common alternative panels:

   - **Quality / process review:** `w-edwards-deming-operator` + `taiichi-ohno-operator` — variation and flow
   - **Decision-quality review:** `charlie-munger-operator` + `andy-grove-operator` — invert and inflection point
   - **People-ops review:** `patty-mccord-operator` + `andy-grove-operator` — adults and leverage
   - **Wartime / startup review:** `ben-horowitz-operator` + `andy-grove-operator` — the struggle and the metric
   - **Retail / customer-facing review:** `sam-walton-operator` + `herb-kelleher-operator` — the customer and the culture
   - **Supply chain / manufacturing review:** `tim-cook-operator` + `taiichi-ohno-operator` — scale and flow

5. **Dispatch the panel in parallel** via the Agent tool. Each persona gets:
   - The full target content (file or directory contents)
   - The bible context (CLAUDE.md, prior plans, prior reviews, operating data)
   - Specific instruction to produce a review in their voice with: **Verdict** (one sentence top-line), **Marked passages** (3-8 quoted excerpts with strikethroughs for cuts and `[→ replacement]` for substitutions), **Hand-off** (if a different persona would serve better).

6. **Consolidate the parallel returns.** The output is a single review file:

```markdown
---
title: Operations review of <path>
slug: <slug>
panel: [<persona-1>, <persona-2>, <persona-3>]
created: YYYY-MM-DD
target: <path>
target_lines: <N>
---

# Operations review: <path>

## Per-persona verdicts

### <persona-1>
**Verdict:** <one sentence top-line reaction>

**Marked passages:**
- <quoted excerpt 1>
- <quoted excerpt 2>
- ...

**Hand-off:** <if a different persona would serve better; or omit>

### <persona-2>
[same structure]

### <persona-3>
[same structure]

## Where they agree

<1-3 points where the panel converges. The strongest signal — when independent reviewers with different lenses flag the same thing, it's almost certainly real.>

## Where they disagree

<1-2 points where the panel diverges. Often the most useful section — disagreement reveals the genuine trade-off the operator is making.>

## Highest-leverage change

<ONE recommendation. The single change that, if made, would make the operation meaningfully better. Not a list. The orchestrator's job is to pick the highest-leverage move; this skill picks it for them.>

## Suggested next step

<One of: implement the change, escalate to leadership, request a v2 from the plan author, run /operators-debate <topic> <persona-A> <persona-B> if the disagreement is structural, cross-dispatch great-minds:warren-buffett-persona if the question is strategic capital rather than execution.>
```

7. **Save the review** to `operations/reviews/<slug>.md`. Slug derived from the target path or from `CLAUDE.md`'s `Current plan:` field.

8. **Report:**
   ```
   📝 Saved to operations/reviews/<slug>.md (review of <path>, <word-count> words).

   Panel:           <persona-1>, <persona-2>, <persona-3>
   Convergence:     <one-line summary of the agreement>
   Highest-leverage change: <one-line summary>

   Next:
   - Address the highest-leverage change
   - Or run /operators-debate <topic> <a> <b> if the disagreement is structural
   - Or cross-dispatch great-minds:warren-buffett-persona if the question is strategic capital
   ```

## What the skill does NOT do

- Does not modify the target. It reviews; the operator (human or AI) edits.
- Does not approve or reject. It surfaces the review's findings; the orchestrator decides.
- Does not run the operation. (For autonomous execution, use `/agency-execute` in `great-minds`.)
- Does not auto-pick the panel based on opaque heuristics. The default panel is documented; alternatives are documented; the user can override explicitly.

## Notes

- Parallel dispatch means the personas don't see each other's reviews when forming their own. This is intentional — independent verdicts produce stronger signal at consolidation time.
- For very large targets (>2,000 lines, or a whole function's documentation), the dispatch brief should ask each persona to focus on the most-critical sections only — pick a sample, don't try to review the whole thing. Better to do three high-quality reviews of focused sections than three shallow reviews of everything.
- Review fatigue is real. Don't run `/operators-ops-review` on every weekly plan; use it for non-trivial changes where the consolidated lens is worth the dispatch cost.
