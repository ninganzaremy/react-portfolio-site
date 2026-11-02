// Projects, flagship first. status: 'live' | 'repo' | 'internal' | 'lab'
export const featured = {
  slug: 'ringanswered',
  name: 'RingAnswered',
  kicker: 'Agentic receptionist platform',
  tagline: 'Every ring. Answered.',
  status: 'live',
  period: '2025 — present',
  links: { live: 'https://ringanswered.com' },
  description:
    'A multi-tenant AI receptionist for small businesses. It answers phone calls and website chat, books, reschedules and cancels real appointments on live Google Calendars behind identity-verification guardrails, captures leads, and alerts the team. One deployment serves every tenant; onboarding a business is a content operation, not an engineering one.',
  highlights: [
    {
      title: 'One agent, many tools, every channel.',
      text: 'The receptionist is a GPT-4o tool-calling agent shared by phone (Vapi · Deepgram · ElevenLabs), web chat and SMS. Its tools check availability, book, reschedule and cancel on the live calendar, add callers to a standby list and capture leads, with a last-second free/busy re-check to beat the double-booking race.',
    },
    {
      title: 'Supervisor agent as QA.',
      text: 'An LLM-as-judge scores every finished client conversation against the platform\'s own hard rules. It runs asynchronously, never in the request path, and its verdicts land in an admin review queue with full transcripts.',
    },
    {
      title: 'Instant demo builder.',
      text: 'A shop owner types their name and city. The platform pulls their Google listing, probes their website for brand color, fonts and hours, and assembles a themed demo tenant with working chat and browser voice in about a minute. Deterministic build, no model in the path, nothing of Google\'s stored.',
    },
    {
      title: 'Dead-slot rescue.',
      text: 'When a booking is cancelled, a daemon texts the standby list the freed slot at once, honours quiet hours, and lets the first caller to answer claim it. Opt-in consent is captured by the agent itself.',
    },
    {
      title: 'Estimate rescue.',
      text: 'Owners upload estimates that went quiet; the platform sends email follow-ups in their voice and the AI answers and books whoever comes back. The agent never cold-dials a list.',
    },
    {
      title: 'Config, not code, per tenant.',
      text: 'Three-layer prompt assembly (base + vertical overlay + tenant substitutions) is rendered and validated at boot; a missing key fails the deploy, not the caller. Seven vertical templates, from dental to insurance to trades.',
    },
    {
      title: 'Guardrails that hold under abuse.',
      text: 'Per-IP sliding windows, daily spend caps and per-demo budgets keep the public demos from becoming a free LLM proxy. Outbound SMS and email are live only on ECS, behind a break-glass kill switch.',
    },
    {
      title: 'Test-gated releases.',
      text: 'Ships from main only, through a release script that runs the full suite, builds the image, rolls ECS Fargate, syncs the frontend and smoke-checks production. A daily read-only health check grades the last 24 hours OK, WARN or ALERT.',
    },
  ],
  metrics: [
    { value: '573', label: 'commits since May 2026' },
    { value: '1,642', label: 'backend tests' },
    { value: '52k', label: 'lines (Py + JSX)' },
    { value: '7', label: 'vertical templates' },
  ],
  stack: ['Python 3.12', 'FastAPI', 'GPT-4o function calling', 'Vapi', 'Deepgram', 'ElevenLabs', 'React + Vite', 'Tailwind', 'SQLModel', 'Twilio', 'Stripe', 'Google Calendar API', 'ECS Fargate', 'CloudFront', 'CloudFormation', 'Secrets Manager'],
  // Nodes/edges for the animated architecture diagram.
  architecture: {
    nodes: [
      { id: 'caller', label: 'Caller / Visitor', sub: 'phone · web chat · SMS', col: 0 },
      { id: 'vapi', label: 'Vapi', sub: 'STT → LLM → TTS', col: 1 },
      { id: 'api', label: 'FastAPI', sub: 'tenant-scoped /api/t/{slug}', col: 1 },
      { id: 'agent', label: 'Agent loop', sub: 'GPT-4o · tool calling', col: 2 },
      { id: 'tools', label: 'Tools', sub: 'check_availability · book_appointment', col: 3 },
      { id: 'calendar', label: 'Google Calendar', sub: 'source of truth', col: 4 },
      { id: 'supervisor', label: 'Supervisor', sub: 'LLM-as-judge QA', col: 3 },
      { id: 'alerts', label: 'Twilio / Email', sub: 'emergency escalation', col: 4 },
      { id: 'dash', label: 'Owner dashboard', sub: 'leads · bookings · transcripts', col: 4 },
    ],
    edges: [
      ['caller', 'vapi'], ['caller', 'api'], ['vapi', 'agent'], ['api', 'agent'],
      ['agent', 'tools'], ['tools', 'calendar'], ['agent', 'supervisor'],
      ['agent', 'alerts'], ['api', 'dash'],
    ],
  },
};

export const projects = [
  {
    slug: 'mcp-agent-lab',
    name: 'MCP Agent Lab',
    kicker: 'Workflow vs. agent vs. multi-agent',
    status: 'lab',
    period: '2026',
    description:
      'An MCP tool server (FastMCP: typed tools, guiding error contracts, approval-gated writes) modeling five backend systems, plus three orchestrations over the same tools: a fixed workflow, a single-agent loop with runtime tool discovery, and a supervisor multi-agent with least-privilege specialists, critic review before any write and human-in-the-loop approval.',
    takeaway: 'The production autonomy dial end to end: step budgets, structured outputs, full call tracing.',
    stack: ['Python', 'FastMCP', 'Model Context Protocol', 'Claude API', 'Structured outputs', 'Tracing'],
  },
  {
    slug: 'comparison-engine',
    name: 'Comparison Engine',
    kicker: 'Zero-code validation for distributed journeys',
    status: 'internal',
    period: '2025 — present · American Express',
    description:
      'Engineers write Gherkin + CSV; the engine seeds databases, fires HTTP triggers, polls Kafka, compares across tables and fields, correlates DLQ events and reports. Adding a validation mode is one @Component with zero changes to the runner.',
    takeaway: 'Adopted across multiple teams. Test automation 80%+ faster.',
    stack: ['Java 21', 'Spring Boot', 'Cucumber 7', 'Kafka', 'Resilience4j'],
  },
  {
    slug: 'requirement-to-code',
    name: 'Requirement → Code',
    kicker: 'Amex Hackathon 2025 · #1 first round',
    status: 'internal',
    period: '2025 · American Express',
    description:
      'An agentic tool that reads a product requirement from its source system and generates clean, commit-ready code in one click. Paired with a requirement-vs-code validation engine that flags every gap between spec and implementation.',
    takeaway: 'Implementation time down 70%+. Bug turnaround down 50%+.',
    stack: ['LLM agents', 'Java', 'Spring Boot', 'Prompt engineering'],
  },
  {
    slug: 'rag-observability',
    name: 'RAG + Log Aggregation',
    kicker: 'Grounded answers, one log endpoint',
    status: 'internal',
    period: '2025 · American Express',
    description:
      'Containerized vector database over the indexed internal knowledge base, with the LLM constrained to indexed data only. Alongside it, a single log endpoint aggregating distributed microservices across regions.',
    takeaway: 'Troubleshooting time down 90%.',
    stack: ['Vector DB', 'RAG', 'Splunk', 'Kubernetes', 'Java'],
  },
  {
    slug: 'stockpulse',
    name: 'StockPulse',
    kicker: 'Polyglot gRPC microservices',
    status: 'repo',
    period: '2025',
    links: { repo: 'https://github.com/ninganzaremy/stock-pulse' },
    image: '/img/projects/pulse-stock-grpc.png',
    description:
      'Real-time stock monitoring: a Python FastAPI stock service and a Java Spring Boot 3 notification service talking gRPC, streamed to a React 18 + TypeScript UI over WebSockets.',
    stack: ['gRPC', 'FastAPI', 'Spring Boot 3', 'Java 17', 'React 18', 'TypeScript', 'WebSocket', 'PostgreSQL'],
  },
  {
    slug: 'goalglo',
    name: 'GoalGlo',
    kicker: 'Full-stack on AWS',
    status: 'repo',
    period: '2024',
    links: { repo: 'https://github.com/ninganzaremy/goalglo' },
    image: '/img/projects/goalglo.png',
    video: '/img/projects/goalglo-preview.mp4',
    description:
      'Spring Boot + React application with JWT auth via Spring Security, Stripe webhooks and PostgreSQL. Dockerized, pushed to ECR, run on ECS, frontend on S3 + CloudFront, CI/CD through Jenkins.',
    stack: ['Java', 'Spring Boot', 'Spring Security', 'React', 'Redux', 'Stripe', 'PostgreSQL', 'ECS', 'ECR', 'Jenkins'],
  },
];

export const statusMeta = {
  live: { label: 'Live in production', tone: 'live' },
  repo: { label: 'Open source', tone: 'accent' },
  internal: { label: 'Internal · American Express', tone: 'violet' },
  lab: { label: 'Research build', tone: 'warn' },
};

export default projects;
