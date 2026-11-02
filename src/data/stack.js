// Grouped technology stack. `primary` items get the accent treatment.
export const stack = [
  {
    group: 'Languages',
    items: [
      { name: 'Java 21', primary: true },
      { name: 'Python', primary: true },
      { name: 'TypeScript', primary: true },
      { name: 'JavaScript (ES6+)' },
      { name: 'SQL' },
      { name: 'Bash' },
    ],
  },
  {
    group: 'AI & Agentic',
    items: [
      { name: 'Tool-calling agents', primary: true },
      { name: 'MCP servers / FastMCP', primary: true },
      { name: 'GPT-4o' },
      { name: 'Claude API' },
      { name: 'RAG + vector DBs' },
      { name: 'Supervisor / critic patterns' },
      { name: 'Structured outputs' },
      { name: 'HITL gating' },
      { name: 'Agent evals' },
      { name: 'LangGraph' },
      { name: 'Vapi · Deepgram · ElevenLabs' },
    ],
  },
  {
    group: 'Backend',
    items: [
      { name: 'Spring Boot 3', primary: true },
      { name: 'FastAPI', primary: true },
      { name: 'Kafka' },
      { name: 'gRPC' },
      { name: 'REST' },
      { name: 'Resilience4j' },
      { name: 'Node.js' },
      { name: 'Maven · Gradle' },
    ],
  },
  {
    group: 'Testing',
    items: [
      { name: 'Cucumber / Gherkin', primary: true },
      { name: 'JUnit 5' },
      { name: 'pytest' },
      { name: 'Vitest' },
      { name: 'Jest' },
      { name: 'Testing Library' },
    ],
  },
  {
    group: 'Cloud & Infra',
    items: [
      { name: 'AWS', primary: true },
      { name: 'ECS Fargate' },
      { name: 'Lambda' },
      { name: 'S3 · CloudFront' },
      { name: 'Secrets Manager' },
      { name: 'CloudFormation' },
      { name: 'Kubernetes' },
      { name: 'Docker' },
      { name: 'GitHub Actions' },
      { name: 'Jenkins' },
      { name: 'Splunk · CloudWatch' },
    ],
  },
  {
    group: 'Data',
    items: [
      { name: 'PostgreSQL', primary: true },
      { name: 'MSSQL' },
      { name: 'Cassandra' },
      { name: 'SQLModel / JPA' },
      { name: 'SQLite' },
    ],
  },
  {
    group: 'Frontend',
    items: [
      { name: 'React 18', primary: true },
      { name: 'Vite' },
      { name: 'Vue.js' },
      { name: 'Tailwind' },
      { name: 'Framer Motion' },
      { name: 'Sass / modern CSS' },
    ],
  },
];

export const currently = ['Multi-agent orchestration with MCP', 'Agent evaluation harnesses', 'Supervisor / LLM-as-judge QA for voice agents'];

export default stack;
