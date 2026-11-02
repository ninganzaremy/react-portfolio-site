// Single source of truth for who Remy is. Every section reads from here.
export const profile = {
  name: 'Remy Ninganza',
  firstName: 'Remy',
  handle: 'ninganzaremy',
  title: 'Software Engineer',
  company: 'American Express',
  // Rotating hero descriptors, in order.
  roles: ['Software Engineer', 'Agentic AI Builder', 'Distributed Systems', 'AWS Certified Developer'],
  tagline: 'I build agentic AI and high-reliability distributed systems — and ship them through test-gated pipelines.',
  positioning:
    'Software Engineer owning the full lifecycle of high-reliability distributed systems in financial services: design, build, automated testing, deployment, production support. Outside work I run RingAnswered, a production multi-tenant voice + chat AI receptionist platform I designed and built end to end.',
  status: 'Building agentic AI systems in production',
  location: 'Phoenix, AZ',
  timezone: 'America/Phoenix',
  languages: ['English', 'French'],
  email: 'remy@ninganzaremy.com',
  site: 'https://ninganzaremy.com',
  resumeUrl: '/resume/remy-resume.pdf',
  photo: '/img/hero/me.png',
  links: {
    github: 'https://github.com/ninganzaremy',
    linkedin: 'https://www.linkedin.com/in/remyninganza/',
    x: 'https://twitter.com/RemyNinganza',
    ringanswered: 'https://ringanswered.com',
    source: 'https://github.com/ninganzaremy/react-portfolio-site',
  },
  bio: [
    'I came to backend engineering through the parts of software most people only notice when they break. I started in data quality, where correctness gets checked one record at a time. As a QA engineer I learned how integrations fail at the seams between systems. Then I spent three years as a full-stack engineer owning production applications end to end. Today I work as a software engineer focused on backend services and APIs. That path is why I treat testing and observability as part of the design, not something added after it.',
    'Most of what I build is the layer other engineers build on. I designed and delivered a zero-code validation engine. Engineers describe a journey in Gherkin and CSV, and the engine seeds the data, fires the HTTP triggers, polls Kafka and compares the results across tables. Multiple teams have adopted it, and it made test automation more than 80% faster. Alongside it I built an AI BDD test generator that drafts Gherkin scenarios from a user story, and a RAG pipeline that answers only from indexed internal knowledge. My agentic tool that turns a product requirement into commit-ready code took #1 in the first round of the 2025 Amex Hackathon.',
    'On my own time I build RingAnswered, a multi-tenant agentic receptionist for small businesses. A single GPT-4o tool-calling agent handles phone, web chat and SMS. It books, reschedules and cancels real appointments on live calendars. After every conversation, a supervisor agent scores it against the platform\'s own rules. It runs in production behind 1,600+ tests and a release pipeline that refuses to ship red.',
  ],
  // Shown above the contact channels. Remy owns this sentence; components only render it.
  contactNote: 'Email is the fastest way to reach me. I read everything and reply from Phoenix.',
  principles: [
    { title: 'Tests are the product', text: 'The validation engine raised the regression bar for a whole repository. My own systems ship behind a test-gated release with smoke checks.' },
    { title: 'Agents need guardrails', text: 'Step budgets, structured outputs, critic review before any write, human-in-the-loop for the irreversible. Autonomy is a dial, not a switch.' },
    { title: 'Observability first', text: 'One log endpoint across regions cut troubleshooting 90%. If you cannot see it, you cannot own it.' },
    { title: 'Config over code', text: 'Onboarding a new RingAnswered tenant is a content operation, not an engineering one. New validation modes are one component, zero runner changes.' },
  ],
  certifications: [
    { name: 'AWS Certified Developer – Associate', issuer: 'Amazon Web Services' },
    { name: 'Java Memory Management', issuer: 'LinkedIn Learning' },
    { name: 'React: Testing & Debugging', issuer: 'LinkedIn Learning' },
    { name: 'End-to-End Testing with Jest', issuer: 'LinkedIn Learning' },
  ],
  education: [
    { school: 'Light University of Bujumbura', credential: 'B.S., Computer Science' },
    { school: 'City University of New York', credential: 'Certificate, Software Engineering (CUNY TechWorks)' },
  ],
  highlights: [
    '#1, first round — American Express Hackathon 2025',
    'Zero-code validation engine adopted across multiple teams',
    'AWS Certified Developer',
  ],
};

export default profile;
