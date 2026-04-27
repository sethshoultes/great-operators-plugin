# Orchestrating great-operators

Notes for AI agents (or humans) running an operations project that uses this plugin's skills as sub-agents.

## The core distinction

The operator personas in this plugin are *specialists at the operations threshold.* They bring craft for supply chain, management, quality, production flow, people ops, retail logistics, decision-quality, and ops-as-culture — the trade-offs that working operators make every day.

The orchestrator (you, when you are running a project) is *not a specialist.* The orchestrator coordinates: reads the operating context, the manifest, the existing systems, briefs the right operator persona for the question at hand, integrates the output, ships.

**The single most consequential mistake an orchestrator can make is to write the operating plan / review / playbook yourself.** Cook doesn't think the way Grove thinks doesn't think the way Munger thinks. Generic operations prose is generic. The fix is always to dispatch the right persona.

If you find yourself reaching for the Write tool to put a plan in `operations/plans/`, stop. Have you dispatched the right persona for this? If not, that's the next move.

## Who handles what

| Question | Persona to dispatch |
|---|---|
| How does the supply chain actually work, end to end? | `tim-cook-operator` |
| Are we measuring output or activity? Where is the multiplier? | `andy-grove-operator` |
| What's the second-order effect we're not seeing? Invert, always invert. | `charlie-munger-operator` |
| Are we treating people like adults or like children? | `patty-mccord-operator` |
| Where is the variation coming from? Is the system or the worker the problem? | `w-edwards-deming-operator` |
| Where is the workshop floor lying to us? What's the actual flow? | `taiichi-ohno-operator` |
| Are we in wartime or peacetime, and is the team operating accordingly? | `ben-horowitz-operator` |
| Is every penny serving the customer, or just the org chart? | `sam-walton-operator` |
| What is the company NOT, and is that visible in the ops? | `herb-kelleher-operator` |
| Is this strategic capital allocation rather than execution? | `great-minds:warren-buffett-persona` (cross-plugin) |

When two personas would honestly answer differently, that's a debate (filed for v1.0 as `/operators-debate`).

## A typical orchestration flow

For an operating plan:

```
1. Read the project — README, CLAUDE.md, prior plans, prior reviews, the actual system being operated
2. Read the project bible at .great-authors/ if this is a cross-craft project
3. /operators-project-init   (if operations/ doesn't already exist)
4. /operators-write-plan <focus> [--persona <name>]
   → produces operations/plans/<slug>.md
5. /operators-ops-review operations/plans/<slug>.md
   → produces operations/reviews/<slug>.md (default panel: Cook + Grove + Deming)
6. Iterate on the plan based on review
7. Commit incrementally
```

For an ops review of an existing system:

```
1. /operators-ops-review src/billing/  --personas grove,deming
   → reviews/billing-2026-04-27.md
2. Read the review; address findings
3. Re-review if substantial changes
```

For a people-ops question:

```
1. Read the existing org structure, performance reviews, hiring funnel
2. /operators-channel mccord
3. Discuss the question directly; substantive proposals save to operations/plans/
4. Optionally /operators-channel grove for the management-craft check
```

## Brief-writing as leverage

The single best investment you can make as an orchestrator is writing better briefs.

**A thin brief:**
> "Review our ops."

**A self-contained brief:**
> "Review the customer-support operation at `operations/systems/support-runbook.md` for output multiplier and quality. Read these in order: the runbook itself, the prior post-mortem at `operations/reviews/q1-support-2026.md`, the staffing model at `operations/plans/support-headcount-2026.md`, and the volume data at `data/support-tickets-q1.csv`. Specific concerns: (1) we tripled headcount in Q1 and CSAT did not move; (2) we have a ten-page runbook that the team admits to reading once. What to focus on: where the system is producing variation that the staffing model is paying to absorb. What to leave alone: the brand voice in the canned responses (already locked). Save to `operations/reviews/support-2026-04-27.md`. Report under 400 words on the two highest-leverage changes."

The thin brief produces a generic review. The self-contained brief produces a review that can be acted on.

## When to operate yourself

Two narrow cases:

1. **Mechanical edits.** Surgical fixes — a typo in a runbook, a renamed metric, a one-line policy clarification. Surgical, not creative.
2. **The user explicitly asks you to.** *"Just draft the OKR here."* Honor that.

In all other cases: dispatch.

## The bible is the spine

For operations-heavy projects, the "bible" is the project's operating context:

- `README.md` — what the business does, who runs it
- `CLAUDE.md` — orchestrator-mode notes for AI agents working in the project
- `operations/systems/` — SOPs, runbooks, dashboards, the actual operating documentation
- `operations/plans/` — operating plans, OKRs, playbooks (this plugin writes here)
- `operations/reviews/` — process reviews, post-mortems (this plugin writes here)
- Operating data — metrics, dashboards, financial summaries

For cross-craft projects (a publishing imprint with operations, a film studio with production ops), `.great-authors/project.md` is also part of the bible. Operator personas read both.

When the operations bible is missing, the FIRST move on any new operations project is to scaffold one — at minimum a CLAUDE.md and an `operations/systems/overview.md`. The bible is the constellation's coordination layer.

## Stall-resolution dispatch — see great-designers

The "force the build-or-kill decision when an autonomous pipeline accumulates analysis docs without commits" pattern is documented in [`great-designers-plugin/ORCHESTRATING.md`](https://github.com/sethshoultes/great-designers-plugin/blob/main/ORCHESTRATING.md), because the canonical decision-forcer is **Marty Cagan** and his persona file lives in great-designers (`great-designers:marty-cagan-designer`). Product discovery is a design-management craft, not an operations craft. Cross-dispatch from there. Full pattern: [`great-minds-plugin/docs/STALLED-PIPELINES.md`](https://github.com/sethshoultes/great-minds-plugin/blob/main/docs/STALLED-PIPELINES.md). Worked case study: [`shipyard-ai/docs/PRODUCT-MANAGEMENT-GAP.md`](https://github.com/sethshoultes/shipyard-ai/blob/main/docs/PRODUCT-MANAGEMENT-GAP.md).

## Cross-plugin orchestration

The operators plugin composes with the rest of the constellation:

- `great-minds:warren-buffett-persona` — strategic capital allocation; "is this the right business to be in" rather than "are we running it well"
- `great-minds:steve-jobs-visionary` — product/strategy when the ops question is really a product question
- `great-minds:elon-musk-persona` — first-principles when the ops convention is wrong
- `great-engineers:dhh-engineer` — when the ops constraint is engineering-real (the system can't sustain this load, the migration takes N quarters)
- `great-designers:julie-zhuo-designer` — when the ops question is design-management-shaped
- `great-authors:hemingway-persona` — when the runbook copy needs muscle and concision
- `great-marketers:rory-sutherland-behavioral` — when the ops question is behavioral (why aren't people following the SOP)

The dispatch syntax: `Agent({subagent_type: "<plugin>:<persona>-persona", ...})`. The orchestrator routes; the personas speak.

## What this plugin does NOT do

- **Run the operation.** This plugin produces plans, reviews, system docs. The actual operating is the user's. (For agency-style autonomous execution, use `/agency-execute` in `great-minds`.)
- **Replace strategic capital allocation.** Buffett handles that, in great-minds. Cross-dispatch when the question is "is this the right business" rather than "are we running it well."
- **Write product copy.** That's `great-marketers`. When the ops needs voice/tone work, dispatch back.
- **Build the dashboard.** That's `great-engineers`. When the ops needs an actual data tool, dispatch.

When a question reaches into a different craft, surface it explicitly: *"This is a behavioral-economics question — let me dispatch Sutherland in great-marketers."* Don't paper over the gap.

## Anti-patterns

These all produce generic operations artifacts:

- Writing the plan / review / playbook yourself instead of dispatching
- Pattern-matching a persona's voice in your own context (Grove's bluntness, Cook's restraint, Munger's lattice) without dispatching the actual persona
- Skipping the read of the operating context / system / data before dispatching
- Thin briefs ("review our ops")
- Letting the persona choice get made silently — surface why you picked Cook over Ohno, or Munger over Buffett
- Operating the system yourself (beyond the two narrow cases above)

The anti-pattern that catches most orchestrators is the first one. Watch for it.
