# Changelog

All notable changes to `great-operators` are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/) with [SemVer](https://semver.org/) versioning.

## [0.1.0] — 2026-04-26 — MVP

The initial release. Eighth plugin in the Caseproof persona constellation. Sibling to `great-minds`, `great-authors`, `great-filmmakers`, `great-publishers`, `great-marketers`, `great-engineers`, `great-designers`. Closes the gap between Buffett's strategic-capital role in great-minds and the hands-on craft of running the machine.

### Added

**Nine operations personas** — `agents/`

- `tim-cook-operator` — Apple CEO, former COO; supply chain at planetary scale
- `andy-grove-operator` — Intel CEO, *High Output Management*; OKRs, output multiplier
- `charlie-munger-operator` — Berkshire vice-chairman; mental models, the lattice
- `patty-mccord-operator` — Netflix CTO, *Powerful*; "we hire adults," freedom and responsibility
- `w-edwards-deming-operator` — the 14 points; process is destiny, variation is the enemy
- `taiichi-ohno-operator` — Toyota Production System; just-in-time, jidoka, the workshop floor
- `ben-horowitz-operator` — *The Hard Thing About Hard Things*; wartime/peacetime, the struggle
- `sam-walton-operator` — Walmart, *Made in America*; the customer is the only boss
- `herb-kelleher-operator` — Southwest Airlines; ops-as-culture, the airline that knew what it wasn't

**Drafted via cross-plugin orchestration.** Each persona file was drafted by a great-authors writer whose register fits the subject:

| Subject | Drafter | Lens |
|---|---|---|
| Cook | Hemingway | Iceberg theory — the binary that ships, the supply chain below the waterline |
| Grove | McCarthy | Brutal clarity; "only the paranoid survive" as McCarthy line |
| Munger | Wallace | Recursive multidisciplinary lattice; mental models as footnoted system |
| McCord | Orwell | Plain language about people; refusal of management euphemism |
| Deming | McPhee | Patient observational discipline; statistical process control as architecture |
| Ohno | Morrison | Lyric attention to objects; the workshop floor as cultural space |
| Horowitz | King | Popular war-story voice; "the struggle" as field report |
| Walton | Baldwin | Moral urgency about service; small-town America as moral architecture |
| Kelleher | Vonnegut | Warm direct humor; the airline that took itself seriously by not taking itself seriously |

Final pass: `great-authors:gottlieb-persona` did a threshold edit across the corpus. Cuts applied surgically. All nine personas land in the 70-110 line target range.

**Warren Buffett stays in great-minds** as `warren-buffett-persona` and is cross-dispatchable. great-operators handles execution craft (Cook for supply chain, Grove for management, Deming for quality, Ohno for production); great-minds handles strategic capital allocation (Buffett). One Buffett, two registers depending on the question.

**Four operational skills** — `skills/`

- `/operators-channel <persona>` — load a persona into the conversation; substantive output auto-saves to `operations/<artifact-type>/<slug>.md`
- `/operators-project-init` — scaffold `operations/` at the project root (sibling to `manuscript/`, `film/`, `publishers/`, `marketing/`, `engineering/`, `design/`)
- `/operators-write-plan <focus>` — produces an operating plan / playbook / runbook; persona-driven register
- `/operators-ops-review <path>` — dispatches persona(s) to review an existing process, system, or operating plan; default panel Cook + Grove + Deming

**Distribution**

- Claude Code plugin (this repo)
- Claude Desktop DXT bundle at `distribution/dxt/`

### Architecture decisions

- **One Buffett.** Warren Buffett stays in great-minds as the strategic-capital persona. great-operators references him cross-dispatchably rather than duplicating. Same principle that kept Margaret Hamilton in great-minds for engineers, Jony Ive in great-minds for designers — the constellation composes; plugins don't replicate.
- **Bible reading is operations-aware.** Operator personas read README, CLAUDE.md, manifest, prior reviews in `operations/reviews/`, SOPs in `operations/systems/`. For cross-craft projects with a fiction bible, they also read `.great-authors/project.md`.
- **Cross-plugin orchestration as build pattern.** Fourth production use after great-marketers v0.1, great-engineers v0.1, and great-designers v0.1. Nine great-authors writers drafted nine operator personas in parallel; Gottlieb edited; cuts applied. The constellation pattern is the build pattern.

### Deferred to v1.0

- `/operators-write-okrs` — OKR drafting and review
- `/operators-debate <topic> <a> <b>` — 2-round craft debate (mirror `/authors-debate`)
- `/operators-critique <path>` — fast 3-bullet verdict from N personas
- `/operators-postmortem <incident>` — incident review with multi-persona lens
- `/operators-edit <file>` — multi-persona marked-up review

Total at v1.0: ~12 skills. Matches the trilogy's breadth.
