# Great Operators

Nine operations personas (Tim Cook, Andy Grove, Charlie Munger, Patty McCord, W. Edwards Deming, Taiichi Ohno, Ben Horowitz, Sam Walton, Herb Kelleher) and four operational skills for operating plans, process reviews, and project initialization. A Claude Code plugin. Eighth in the Caseproof persona constellation:

- [`great-minds-plugin`](https://github.com/sethshoultes/great-minds-plugin) — strategic decision-makers
- [`great-authors-plugin`](https://github.com/sethshoultes/great-authors-plugin) — prose craft
- [`great-filmmakers-plugin`](https://github.com/sethshoultes/great-filmmakers-plugin) — film craft
- [`great-publishers-plugin`](https://github.com/sethshoultes/great-publishers-plugin) — publication form
- [`great-marketers-plugin`](https://github.com/sethshoultes/great-marketers-plugin) — marketing
- [`great-engineers-plugin`](https://github.com/sethshoultes/great-engineers-plugin) — software-engineering craft
- [`great-designers-plugin`](https://github.com/sethshoultes/great-designers-plugin) — product, UX, visual-design craft
- **`great-operators-plugin`** (this repo) — operations, management, execution craft

> **New to the Caseproof persona constellation?** Start with [`/constellation-start`](https://github.com/sethshoultes/great-minds-plugin) in `great-minds` — it asks 2-3 questions about your project shape and routes to the right plugin.

## Install

**Claude Code:**
```
/plugin marketplace add sethshoultes/great-operators-plugin
/plugin install great-operators@sethshoultes
```

**Claude Desktop** (DXT bundle):
```bash
cd distribution/dxt && npm install && npx @anthropic-ai/dxt pack
```

## What's in v0.1

### 9 Personas — at the operations threshold

| Persona | Strength |
|---|---|
| `tim-cook-operator` | Apple CEO, former COO. Supply chain at planetary scale; the company-as-execution-machine; restraint in public, precision in private. |
| `andy-grove-operator` | Intel CEO, *High Output Management*, *Only the Paranoid Survive*. OKRs; the manager as output multiplier; strategic inflection points. |
| `charlie-munger-operator` | Berkshire Hathaway vice-chairman, *Poor Charlie's Almanack*. Mental models; the latticework of disciplines; invert, always invert. |
| `patty-mccord-operator` | Netflix's first chief talent officer, *Powerful*. People ops as design; "we hire adults"; freedom and responsibility. |
| `w-edwards-deming-operator` | Statistician; the 14 points; Total Quality. Process is destiny; variation is the enemy; eliminate the slogans, fix the system. |
| `taiichi-ohno-operator` | Architect of the Toyota Production System. Just-in-time; jidoka; the seven wastes; the workshop floor as the place where truth lives. |
| `ben-horowitz-operator` | Andreessen Horowitz co-founder, *The Hard Thing About Hard Things*. Wartime/peacetime CEO; the struggle; ops at startup velocity. |
| `sam-walton-operator` | Walmart founder, *Made in America*. Retail logistics; the customer is the only boss; spend money like it's your own. |
| `herb-kelleher-operator` | Southwest Airlines co-founder. Ops-as-culture; the airline that knew what it wasn't; profitability from positioning, not from cost-cutting alone. |

### How the personas were drafted

The v0.1 persona files were drafted via cross-plugin orchestration — each operator written by a great-authors persona whose register fits the subject (Hemingway on Cook, McCarthy on Grove, Wallace on Munger, Orwell on McCord, McPhee on Deming, Morrison on Ohno, King on Horowitz, Baldwin on Walton, Vonnegut on Kelleher). Then `great-authors:gottlieb-persona` did a threshold pass and named cuts. Fourth production use of the constellation pattern after great-marketers v0.1, great-engineers v0.1, and great-designers v0.1.

### See also: `great-minds:warren-buffett-persona`

Warren Buffett — Berkshire Hathaway, capital allocation as the executive's primary craft — lives in [`great-minds`](https://github.com/sethshoultes/great-minds-plugin) as the strategic-capital persona. He's cross-dispatchable for any project where the question is allocation rather than execution:

```
Agent({
  subagent_type: "great-minds:warren-buffett-persona",
  prompt: "<self-contained capital-allocation brief>"
})
```

We didn't duplicate him here. One Buffett, two registers: great-minds handles strategic capital allocation; great-operators handles execution craft (Munger covers the mental-models lattice that informs both).

### 4 MVP Skills

| Skill | What it does |
|---|---|
| `/operators-channel <persona>` | Load an operations persona into your current conversation. Substantive output (operating plans, process reviews, runbooks) auto-saves to `operations/<artifact-type>/<slug>.md`. |
| `/operators-project-init` | Scaffold an `operations/` directory at the project root, sibling to `manuscript/`, `film/`, `publishers/`, `marketing/`, `engineering/`, `design/`. Subdirs: `plans/`, `reviews/`, `systems/`. |
| `/operators-write-plan <focus>` | Produces an operating plan / playbook / runbook, persona-driven register. Default Cook for supply chain, Grove for management, Deming for quality, Ohno for production, Horowitz for startup, McCord for people, Walton for retail, Munger for decision-quality, Kelleher for culture. Override available. Output: `operations/plans/<slug>.md`. |
| `/operators-ops-review <path>` | Dispatches persona(s) to review an existing process, system, or operating plan. Default panel for parallel review: Cook (supply chain discipline), Grove (output multiplier check), Deming (system vs. people). Override available. Output: `operations/reviews/<slug>.md`. |

## Why this plugin

The constellation could create artifacts (prose, film, publication, marketing copy), build software (engineers), and design product surfaces (designers) — but couldn't yet **operate the business** that delivers them. Operations is its own craft register: distinct from strategy (Buffett, Jobs, Musk in great-minds), distinct from people management at the team-design level (Zhuo in designers), distinct from engineering or design execution. It's the discipline of running the machine.

great-operators fills that gap. Cook covers supply chain at scale, Grove covers management craft and OKRs, Munger covers decision-quality lattices, McCord covers people ops, Deming covers process and quality, Ohno covers production flow, Horowitz covers startup-velocity ops, Walton covers retail logistics, Kelleher covers ops-as-culture. Different lenses, different vocabularies, different decisions.

## Conventions inherited from the constellation

- **Orchestrator vs. specialist.** Personas are dispatched as sub-agents in clean contexts. The orchestrator never produces the artifact in-context.
- **Default-save.** Every generative skill saves output to disk before showing it in chat. Save to `operations/<subdir>/<slug>.md`. Document the path in the response.
- **Bible reading.** Every persona reads the project's specification before deciding — `README.md`, `CLAUDE.md`, the manifest, any operating docs in `operations/systems/`, prior reviews in `operations/reviews/`. For cross-craft projects, the persona also reads `.great-authors/project.md` if it exists.
- **Cross-plugin orchestration.** When an operations question reaches into another craft (the engineering reality of an SLA, the design constraint behind a service flow, the brand voice of a customer-comms playbook), the orchestrator dispatches the right plugin's persona. The constellation composes; this plugin doesn't replicate.

## Project structure

```
.great-authors/                 # the bible — shared with great-authors (when present)
manuscript/                     # great-authors writes here (when present)
film/                           # great-filmmakers writes here (when present)
publishers/                     # great-publishers writes here (when present)
marketing/                      # great-marketers writes here (when present)
engineering/                    # great-engineers writes here (when present)
design/                         # great-designers writes here (when present)
operations/                     # great-operators writes here (this plugin)
├── plans/                      #   operating plans, playbooks, runbooks, OKRs
├── reviews/                    #   process reviews, post-mortems, operational audits
└── systems/                    #   process documentation, SOPs, dashboards
```

For software-only or business-only projects, `operations/` lives alongside whatever else the project needs.

## Roadmap

- **v0.1** (this release) — nine personas, four MVP skills, DXT bundle.
- **v1.0** — Add `/operators-write-okrs`, `/operators-debate <topic> <a> <b>` (mirror `/authors-debate`), `/operators-critique <path>` (fast 3-bullet verdict from N personas), `/operators-postmortem <incident>`, `/operators-edit <file>` (multi-persona marked-up review). ~12 skills total. Matches the breadth of the trilogy.

## License

MIT. See [LICENSE](./LICENSE).
