# Great Operators — User Manual

Complete reference for the `great-operators` Claude Code plugin. For the executive summary, see [README.md](./README.md). For orchestration patterns, see [ORCHESTRATING.md](./ORCHESTRATING.md).

## 1. Install

```
/plugin marketplace add sethshoultes/great-operators-plugin
/plugin install great-operators@sethshoultes
```

For Claude Desktop, build the DXT bundle:
```bash
cd distribution/dxt && npm install && npx @anthropic-ai/dxt pack
```

## 2. The nine personas

Personas are dispatched as sub-agents in clean contexts. Each persona file at `agents/<slug>.md` carries its own identity, voice, principles, before-decision protocol (read the project's operating specification), and what it never does.

### Supply chain and execution at scale

| Persona | Real-world identity | Dispatch when |
|---|---|---|
| `tim-cook-operator` | Apple CEO; former COO and SVP of Worldwide Operations | Supply chain at scale, manufacturing partnerships, ops-as-execution-machine |
| `sam-walton-operator` | Walmart founder, *Made in America* | Retail logistics, the customer-as-only-boss principle, frugal-ops-as-moat |

### Management craft and output

| Persona | Real-world identity | Dispatch when |
|---|---|---|
| `andy-grove-operator` | Intel CEO; *High Output Management*, *Only the Paranoid Survive* | Management craft, OKRs, output measurement, strategic inflection points |
| `patty-mccord-operator` | Netflix's first chief talent officer; *Powerful* | People ops, hiring as design, freedom and responsibility, "we hire adults" |

### Decision quality and process

| Persona | Real-world identity | Dispatch when |
|---|---|---|
| `charlie-munger-operator` | Berkshire vice-chairman; *Poor Charlie's Almanack* | Mental models, multi-disciplinary lattice, invert-always-invert, decision quality |
| `w-edwards-deming-operator` | Statistician; the 14 points; the quality movement | Process design, statistical process control, system-vs-worker, eliminate-the-slogans |

### Production and flow

| Persona | Real-world identity | Dispatch when |
|---|---|---|
| `taiichi-ohno-operator` | Architect of the Toyota Production System | Just-in-time, jidoka, kaizen, the seven wastes, the workshop floor as truth |

### Startup velocity

| Persona | Real-world identity | Dispatch when |
|---|---|---|
| `ben-horowitz-operator` | Andreessen Horowitz; *The Hard Thing About Hard Things* | Wartime/peacetime CEO, the struggle, ops at startup velocity, layoffs and survival |

### Ops as culture

| Persona | Real-world identity | Dispatch when |
|---|---|---|
| `herb-kelleher-operator` | Southwest Airlines co-founder | Ops-as-culture, the airline that knew what it wasn't, profitability through positioning |

### Cross-dispatchable from `great-minds`

| Persona | Where | Dispatch when |
|---|---|---|
| `warren-buffett-persona` | `great-minds` | Strategic capital allocation; "is this the right business" rather than "are we running it well." Use `Agent({subagent_type: "great-minds:warren-buffett-persona", ...})`. |

## 3. The four MVP skills

### `/operators-channel <persona>`

Loads an operator persona into the current conversation for direct collaboration. Substantive output (operating plans, process reviews, runbooks) auto-saves.

```
/operators-channel cook
/operators-channel grove
/operators-channel munger
```

Output paths by artifact type:

| Artifact type | Path |
|---|---|
| Operating plan / playbook / runbook | `operations/plans/<slug>.md` |
| OKRs | `operations/plans/<slug>-okrs.md` |
| Process review / operational audit | `operations/reviews/<slug>.md` |
| Post-mortem / incident review | `operations/reviews/<slug>-postmortem.md` |
| SOP / system documentation | `operations/systems/<slug>.md` |

Save triggers (explicit) and opt-out flags work the same as `/authors-channel`. See `skills/operators-channel/SKILL.md`.

### `/operators-project-init`

Scaffolds an `operations/` directory at the project root. Reads the project's specification (`README.md`, `CLAUDE.md`, manifest) to import context. Creates the subdirs `plans/`, `reviews/`, `systems/`. Updates `CLAUDE.md` (or creates one if absent) to note the operations directory's existence and the `Current spec:` field.

### `/operators-write-plan <focus> [--persona <name>]`

Produces an operating plan / playbook / runbook. Default persona by signal:

| Signal | Default persona |
|---|---|
| Supply chain / manufacturing / scale | `tim-cook-operator` |
| OKRs / management / output measurement | `andy-grove-operator` |
| Mental models / decision-quality / second-order | `charlie-munger-operator` |
| People / hiring / culture / freedom-and-responsibility | `patty-mccord-operator` |
| Quality / process / variation / 14 points | `w-edwards-deming-operator` |
| Production / flow / lean / waste | `taiichi-ohno-operator` |
| Startup / wartime / layoffs / the struggle | `ben-horowitz-operator` |
| Retail / logistics / customer-first | `sam-walton-operator` |
| Culture / positioning / "what we are not" | `herb-kelleher-operator` |
| Otherwise | `andy-grove-operator` (the management default) |

Output: `operations/plans/<slug>.md`. Format: context → goal → strategy → metrics → resources → risks → cadence → open questions.

### `/operators-ops-review <path> [--personas <list>]`

Dispatches persona(s) to review an existing process, system, or operating plan.

Default panel (parallel review):
- `tim-cook-operator` — supply chain discipline, end-to-end execution
- `andy-grove-operator` — output multiplier, where is the leverage
- `w-edwards-deming-operator` — system vs. worker, where the variation lives

Override with `--personas munger,mccord` (etc.). Output: `operations/reviews/<slug>.md`. Format: per-persona verdict + marked passages, then consolidated highest-leverage change.

## 4. Project structure

```
.great-authors/                 # the bible (when project is cross-craft)
README.md                       # the spec for ops-only projects
CLAUDE.md                       # orchestrator-mode notes
operations/                     # great-operators writes here (this plugin)
├── plans/                      #   operating plans, playbooks, runbooks, OKRs
├── reviews/                    #   process reviews, post-mortems
└── systems/                    #   SOPs, dashboards, system documentation
```

For software-heavy projects, `operations/` lives alongside `engineering/` and `design/`. For cross-craft projects, `.great-authors/` is the shared spine across all eight plugins.

## 5. Conventions

These are encoded across the constellation. Operators inherits all of them.

1. **Orchestrator vs. specialist.** Personas are dispatched. The orchestrator never produces the artifact in-context.
2. **Default-save behavior.** Every generative skill saves to disk before showing in chat.
3. **Bible reading.** Every persona reads the project specification before deciding (README, CLAUDE.md, manifest, prior reviews, SOPs; `.great-authors/` for cross-craft).
4. **Honest claim discipline.** No plans that promise what the operation cannot deliver. No reviews that soften the verdict to be liked.
5. **Cross-plugin dispatch.** When a question reaches into another craft, dispatch the right plugin's persona. The constellation composes.
6. **No execution.** This plugin produces plans, reviews, system docs — not running the operation. (For autonomous execution, use `/agency-execute` in `great-minds`.)

## 6. Cross-plugin orchestration

The operators plugin sits within the full constellation:

| Plugin | Role |
|---|---|
| `great-minds` | Strategy, board reviews, `warren-buffett-persona` for strategic capital cross-dispatched |
| `great-authors` | Prose, copy, voice |
| `great-filmmakers` | Motion, storyboards, sequence design |
| `great-publishers` | Publication form (book covers, jacket copy) |
| `great-marketers` | Marketing — positioning, ad copy, demand generation |
| `great-engineers` | Software-engineering craft |
| `great-designers` | Product, UX, visual-design craft |
| `great-operators` | Operations, management, execution craft (this plugin) |

Dispatch syntax: `Agent({subagent_type: "<plugin>:<persona>-persona", ...})`.

The v0.1 personas of this plugin were drafted via cross-plugin orchestration — each operator drafted by a great-authors writer whose register fits the subject. The constellation pattern is the build pattern.

## 7. What's deferred to v1.0

- `/operators-write-okrs <quarter>` — OKR drafting and review
- `/operators-debate <topic> <persona-A> <persona-B>` — 2-round craft debate (mirror `/authors-debate`)
- `/operators-critique <path>` — fast 3-bullet verdict from N personas in parallel
- `/operators-postmortem <incident>` — incident review with multi-persona lens
- `/operators-edit <file>` — multi-persona marked-up review

## 8. Smoke tests

Run before tagging a release:

```bash
bash tests/smoke.sh
```

Validates: SKILL.md frontmatter, persona frontmatter, persona-count alignment between `agents/` and `distribution/dxt/server/personas/`, version coherence across `package.json` / `plugin.json` / DXT manifest, DXT tool definitions matched by handlers, Buffett cross-dispatch redirect presence.

## 9. The constellation context

| Plugin | Domain | Status |
|---|---|---|
| [great-minds](https://github.com/sethshoultes/great-minds-plugin) | Strategy + constellation entry point | v1.4 |
| [great-authors](https://github.com/sethshoultes/great-authors-plugin) | Prose | v1.6 |
| [great-filmmakers](https://github.com/sethshoultes/great-filmmakers-plugin) | Film | v1.10 |
| [great-publishers](https://github.com/sethshoultes/great-publishers-plugin) | Publication form | v0.1 |
| [great-marketers](https://github.com/sethshoultes/great-marketers-plugin) | Marketing | v0.1 |
| [great-engineers](https://github.com/sethshoultes/great-engineers-plugin) | Software-engineering craft | v0.1 |
| [great-designers](https://github.com/sethshoultes/great-designers-plugin) | Product, UX, visual-design craft | v0.1 |
| **great-operators** (this) | Operations, management, execution craft | **v0.1** |

The constellation roadmap lives in the brain vault at `projects/caseproof-ai-company-constellation.md`. Each plugin owns one craft. Cross-plugin dispatch composes them.
