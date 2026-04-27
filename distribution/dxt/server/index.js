#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PERSONAS_DIR = join(__dirname, "personas");

// Load all bundled persona files. Filenames carry a -operator suffix
// which is stripped from the lookup key.
const PERSONAS = Object.fromEntries(
  readdirSync(PERSONAS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const slug = f.replace(/\.md$/, "").replace(/-operator$/, "");
      const body = readFileSync(join(PERSONAS_DIR, f), "utf8");
      return [slug, body];
    })
);

const OPERATOR_BLURBS = {
  "tim-cook": "Apple CEO, former COO. Supply chain at planetary scale; the company-as-execution-machine; restraint in public, precision in private.",
  "andy-grove": "Intel CEO; *High Output Management*, *Only the Paranoid Survive*. OKRs; the manager as output multiplier; strategic inflection points.",
  "charlie-munger": "Berkshire vice-chairman; *Poor Charlie's Almanack*. Mental models; the latticework of disciplines; invert, always invert.",
  "patty-mccord": "Netflix's first chief talent officer; *Powerful*. People-ops as design; 'we hire adults'; freedom and responsibility.",
  "w-edwards-deming": "Statistician; the 14 points; Total Quality. Process is destiny; variation is the enemy; eliminate the slogans, fix the system.",
  "taiichi-ohno": "Architect of the Toyota Production System. Just-in-time; jidoka; the seven wastes; the workshop floor as the place where truth lives.",
  "ben-horowitz": "Andreessen Horowitz; *The Hard Thing About Hard Things*. Wartime/peacetime CEO; the Struggle; ops at startup velocity.",
  "sam-walton": "Walmart founder; *Made in America*. Retail logistics; the customer is the only boss; spend money like it's your own.",
  "herb-kelleher": "Southwest Airlines co-founder. Ops-as-culture; the airline that knew what it wasn't; profitability through positioning.",
};

const OPERATOR_ALIASES = {
  "cook": "tim-cook",
  "tim": "tim-cook",
  "grove": "andy-grove",
  "andy": "andy-grove",
  "munger": "charlie-munger",
  "charlie": "charlie-munger",
  "mccord": "patty-mccord",
  "patty": "patty-mccord",
  "deming": "w-edwards-deming",
  "edwards": "w-edwards-deming",
  "ohno": "taiichi-ohno",
  "taiichi": "taiichi-ohno",
  "horowitz": "ben-horowitz",
  "ben": "ben-horowitz",
  "walton": "sam-walton",
  "sam": "sam-walton",
  "kelleher": "herb-kelleher",
  "herb": "herb-kelleher",
};

function resolveOperator(input) {
  if (!input) {
    throw new Error("Persona name is required.");
  }
  const normalized = input.toLowerCase().trim();
  // Warren Buffett lives in great-minds (cross-dispatchable for strategic capital allocation).
  if (normalized === "buffett" || normalized === "warren" || normalized === "warren-buffett") {
    throw new Error(
      `Warren Buffett lives in great-minds as the strategic-capital persona. great-operators handles execution craft (Cook, Grove, Deming, Ohno); great-minds handles strategic capital allocation (Buffett). Cross-dispatch via Agent({subagent_type: "great-minds:warren-buffett-persona", ...}).`
    );
  }
  const slug = OPERATOR_ALIASES[normalized] || normalized;
  if (!PERSONAS[slug]) {
    const valid = Object.keys(OPERATOR_BLURBS).join(", ");
    throw new Error(
      `Unknown persona "${input}". Valid: ${valid} (short forms: cook, grove, munger, mccord, deming, ohno, horowitz, walton, kelleher).`
    );
  }
  return { slug, body: PERSONAS[slug] };
}

const server = new Server(
  { name: "great-operators", version: "0.1.0" },
  { capabilities: { tools: {} } }
);

// ---------- Tool listing ----------

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "list_operators",
      description:
        "List the nine operations personas with one-line descriptions.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "operators_channel",
      description:
        "Load a named operations persona into the conversation for direct collaboration. Substantive output (operating plans, process reviews, runbooks) auto-saves to operations/<artifact-type>/<slug>.md. Valid: tim-cook, andy-grove, charlie-munger, patty-mccord, w-edwards-deming, taiichi-ohno, ben-horowitz, sam-walton, herb-kelleher (short forms accepted). For strategic capital allocation, dispatch great-minds:warren-buffett-persona instead.",
      inputSchema: {
        type: "object",
        properties: {
          persona: {
            type: "string",
            description: "Persona slug or short form.",
          },
        },
        required: ["persona"],
      },
    },
    {
      name: "operators_project_init",
      description:
        "Scaffold an operations/ directory at the project root, sibling to manuscript/, film/, publishers/, marketing/, engineering/, design/. Subdirs: plans/, reviews/, systems/. Updates CLAUDE.md with an ## Operations section. Reads the project specification (README, CLAUDE.md, prior plans, SOPs) to import context.",
      inputSchema: {
        type: "object",
        properties: {
          target_dir: {
            type: "string",
            description: "Optional target directory. If omitted, uses the current working directory.",
          },
          slug: {
            type: "string",
            description: "Optional starting plan slug. Defaults to project-derived.",
          },
        },
      },
    },
    {
      name: "operators_write_plan",
      description:
        "Produce an operating plan / playbook / runbook for a focus area, function, or quarter. Default persona auto-selected by signal; override available. Saves to operations/plans/<slug>.md. Format: Context → Goal → Strategy → Metrics → Resources → Risks → Cadence → Open questions.",
      inputSchema: {
        type: "object",
        properties: {
          focus: {
            type: "string",
            description: "The focus, function, or quarter to plan. Required.",
          },
          persona: {
            type: "string",
            description: "Optional persona override. Default auto-selected by signal: cook (supply chain), grove (management/OKRs), munger (decision-quality), mccord (people), deming (quality), ohno (production flow), horowitz (startup wartime), walton (retail), kelleher (culture-as-strategy).",
          },
        },
        required: ["focus"],
      },
    },
    {
      name: "operators_ops_review",
      description:
        "Dispatch one or more operations personas to review an existing process, system, or operating plan. Default panel for parallel review: Tim Cook (supply chain discipline), Andy Grove (output multiplier), W. Edwards Deming (system vs. people). Override with --personas. Output: consolidated review with per-persona verdicts and a single highest-leverage recommendation. Saves to operations/reviews/<slug>.md.",
      inputSchema: {
        type: "object",
        properties: {
          path: {
            type: "string",
            description: "Path to review — file, directory, or glob. Required.",
          },
          personas: {
            type: "array",
            items: { type: "string" },
            description: "Optional comma-separated persona slugs. Default: tim-cook, andy-grove, w-edwards-deming.",
          },
        },
        required: ["path"],
      },
    },
  ],
}));

// ---------- Tool calls ----------

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: args } = req.params;

  if (name === "list_operators") {
    const lines = Object.entries(OPERATOR_BLURBS).map(
      ([k, v]) => `- **${k}** — ${v}`
    );
    const text = `# Great Operators Roster\n\n## Nine personas\n\n${lines.join("\n")}\n\nDispatch any of them via \`operators_channel\` (Claude Desktop) or \`/operators-channel <name>\` (Claude Code). Short forms accepted: cook, grove, munger, mccord, deming, ohno, horowitz, walton, kelleher.\n\n## Cross-dispatchable from great-minds\n\n- **warren-buffett-persona** — Berkshire Hathaway; capital allocation as the executive's primary craft. For strategic capital allocation; "is this the right business" rather than "are we running it well." Dispatch via \`Agent({subagent_type: "great-minds:warren-buffett-persona", ...})\`.`;
    return { content: [{ type: "text", text }] };
  }

  if (name === "operators_channel") {
    const { slug, body } = resolveOperator(args.persona);
    const text = `You are now channeling the following operations persona. Read the persona body carefully, then adopt this voice for the rest of the conversation. The user will collaborate with you as this persona on operations-stage work — supply chain, management, quality, production flow, people-ops, retail, startup wartime, or ops-as-culture.\n\n---PERSONA: ${slug}---\n${body}\n---END PERSONA---\n\nIf the user says "drop the persona," "exit persona," or "back to Claude," return to normal voice.\n\nWhen you produce a substantive artifact (operating plan, process review, runbook, OKR set, post-mortem, SOP), save it to disk before showing it to the user. Path conventions:\n\n| Artifact | Path |\n|---|---|\n| Operating plan / playbook / runbook | operations/plans/<slug>.md |\n| OKRs | operations/plans/<slug>-okrs.md |\n| Process review / operational audit | operations/reviews/<slug>.md |\n| Post-mortem / incident review | operations/reviews/<slug>-postmortem.md |\n| SOP / system documentation | operations/systems/<slug>.md |\n\nResolve <slug> from CLAUDE.md's ## Operations section's Current plan field. If the user says "preview only" or "don't save this one" before you produce the artifact, skip the save for that one block.\n\nRead the project specification before producing substantive work: README.md, CLAUDE.md, prior plans at operations/plans/, prior reviews at operations/reviews/, SOPs at operations/systems/. For cross-craft projects, also read .great-authors/project.md.\n\nFor strategic capital allocation at the executive register, dispatch warren-buffett-persona from great-minds via Agent({subagent_type: "great-minds:warren-buffett-persona", ...}) — Buffett stays in great-minds and is cross-dispatchable.\n\nBegin as ${slug} now.`;
    return { content: [{ type: "text", text }] };
  }

  if (name === "operators_project_init") {
    const target = args.target_dir || "<user's current working directory>";
    const slug = args.slug || "<project-derived plan slug>";
    const text = `You are scaffolding the operations/ directory for a project. Target directory: ${target}.\n\n1. Use the current working directory unless the user specifies otherwise.\n2. Check whether operations/ already exists. If it does, ask whether to overwrite the scaffold (default skip).\n3. Read existing project context: README.md, CLAUDE.md, prior operations docs (plans, runbooks, dashboards), the manifest, .great-authors/project.md (if cross-craft project). Note signals for next-steps recommendations.\n4. Ask one question: "What's the slug for the plan or focus you're starting with? Default: ${slug}." Accept any kebab-case identifier.\n5. Create operations/ at the target with three subdirectories: plans/, reviews/, systems/.\n6. Update CLAUDE.md by appending an ## Operations section (or creating CLAUDE.md if absent):\n\n   ## Operations\n\n   **Path:** operations/ (at project root)\n   **Current plan:** <slug>\n\n   Commands that generate operations artifacts (operators_channel save behavior, operators_write_plan, operators_ops_review) write to operations/<subdir>/<current-plan>.md by default.\n\n   The operator personas read this file plus the project's README.md, prior plans, prior reviews, and SOPs. For cross-craft projects, they also read .great-authors/project.md.\n\n   For strategic capital allocation at the executive register, cross-dispatch great-minds:warren-buffett-persona.\n\n7. Report what was created, the detected project context, and suggest next steps:\n   - Best-fit personas based on signals (e.g., Cook for supply chain, Grove for management cadence, Deming for quality)\n   - operators_write_plan to draft an operating plan\n   - operators_ops_review to review existing process or system\n   - For strategic capital: Agent({subagent_type: "great-minds:warren-buffett-persona", ...})\n\nBegin.`;
    return { content: [{ type: "text", text }] };
  }

  if (name === "operators_write_plan") {
    const focus = args.focus;
    const personaOverride = args.persona ? `\nUser-specified persona: ${args.persona}` : "";
    const text = `You are producing an operating plan for a focus area, function, or quarter.\n\nFocus: ${focus}${personaOverride}\n\n1. Resolve the project root (current working directory unless otherwise stated). Verify CLAUDE.md or README.md exists and operations/ is present. If operations/ is missing, recommend running operators_project_init first; do not auto-create.\n\n2. Read the project specification:\n   - CLAUDE.md\n   - README.md\n   - Prior operating plans at operations/plans/\n   - Prior reviews at operations/reviews/\n   - SOPs at operations/systems/\n   - Operating data (metrics, dashboards, financial summaries)\n   - .great-authors/project.md if cross-craft project\n\n3. Resolve the persona to dispatch. If --persona was given, use it. Otherwise auto-select by signal in the focus description:\n   - "supply chain", "manufacturing", "vendor", "inventory", scale → tim-cook\n   - "OKRs", "management", "1:1", "output", "leverage" → andy-grove\n   - "decision quality", "mental model", "invert", "moat" → charlie-munger\n   - "people", "hiring", "culture", "freedom" → patty-mccord\n   - "quality", "variation", "PDSA", "process" → w-edwards-deming\n   - "production", "flow", "lean", "waste", "kaizen" → taiichi-ohno\n   - "wartime", "layoffs", "struggle", "runway" → ben-horowitz\n   - "retail", "logistics", "EDLP", store-level → sam-walton\n   - "culture-as-strategy", "what we are not" → herb-kelleher\n   - Otherwise → andy-grove (management default)\n\n4. Dispatch the persona via the Agent tool (subagent_type great-operators:<persona-slug>-operator). Brief includes: focus description, paths to bible files read, operating data, prior plans/reviews, output target operations/plans/<slug>.md, structure (Context / Goal / Strategy / Metrics / Resources / Risks / Cadence / Open questions), length target 600-1200 words.\n\n5. Save to operations/plans/<slug>.md. If the file exists, ask whether to overwrite, save as -v2, or skip.\n\n6. Report path, word count, persona, goal one-liner, strategy one-liner, next steps (operators_ops_review on the plan; operators_channel <other-persona> for refinement).\n\nDo NOT run the operation. The plan describes; the team executes. Do NOT invent constraints — every constraint must trace to operating data, prior plans, manifest, or stated requirements. Do NOT auto-decide between alternatives — present, name trade-offs, recommend.\n\nBegin.`;
    return { content: [{ type: "text", text }] };
  }

  if (name === "operators_ops_review") {
    const path = args.path;
    const personas = Array.isArray(args.personas) && args.personas.length > 0
      ? args.personas.map((p) => resolveOperator(p).slug)
      : ["tim-cook", "andy-grove", "w-edwards-deming"];
    const text = `You are dispatching an operations-review panel against ${path}. Panel: ${personas.join(", ")}.\n\n1. Resolve the project root. Read the project specification (CLAUDE.md, README.md, prior plans, prior reviews, SOPs, operating data, .great-authors/ if cross-craft).\n\n2. Read the target at ${path}. May be a single file, a directory, or a glob. Read in full — adjacent context, sibling files, the operating data the plan references, the prior reviews that motivated the current plan.\n\n3. Dispatch the panel in parallel via the Agent tool. Each persona (subagent_type great-operators:<persona>-operator) gets:\n   - Full target content\n   - Bible context\n   - Instruction to produce: Verdict (one sentence top-line), Marked passages (3-8 quoted excerpts with strikethroughs / [→ replacement]), Hand-off (if a different persona would serve better).\n\n4. Consolidate the parallel returns into one review file at operations/reviews/<slug>.md:\n   - Per-persona verdicts (each persona's Verdict + Marked passages + Hand-off)\n   - Where they agree (1-3 points; convergence = strongest signal)\n   - Where they disagree (1-2 points; reveals the genuine trade-off)\n   - Highest-leverage change (ONE recommendation, not a list)\n   - Suggested next step (implement / escalate / request v2 / cross-dispatch great-minds:warren-buffett-persona for strategic capital)\n\n5. Save to operations/reviews/<slug>.md. Slug from CLAUDE.md's Current plan field, or derived from the target path.\n\n6. Report path, panel, convergence one-liner, highest-leverage change one-liner, next step.\n\nDo NOT modify the target. Reviews don't edit; the operator (human or AI) edits. Do NOT auto-pick the panel based on hidden heuristics — the default panel is tim-cook + andy-grove + w-edwards-deming; alternatives documented in the SKILL.md; user can override explicitly.\n\nBegin.`;
    return { content: [{ type: "text", text }] };
  }

  throw new Error(`Unknown tool: ${name}`);
});

// ---------- Boot ----------

const transport = new StdioServerTransport();
await server.connect(transport);
