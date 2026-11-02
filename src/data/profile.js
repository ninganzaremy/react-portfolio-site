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
    'I started in data quality for Apple Maps, moved through QA on Uber\'s support integrations, then spent three years as a full-stack developer at Arizona State University before joining American Express in late 2024.',
    'Day to day I build the systems other engineers build on: a zero-code validation engine now adopted across multiple teams, an AI test generator, and a RAG pipeline grounded strictly in indexed internal knowledge. I placed #1 in the first round of the 2025 Amex Hackathon with an agentic tool that turns a product requirement into commit-ready code.',
    'On my own time I run RingAnswered: a multi-tenant agentic receptionist that answers phone and chat, books real appointments into live calendars, and is scored by a supervisor agent after every client conversation. It is a real production system with a paying client, 1,600+ tests, and a release pipeline that refuses to ship red.',
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
    'Rated Exceptional, 2025 — American Express',
    '#1, first round — American Express Hackathon 2025',
    'Zero-code validation engine adopted across multiple teams',
    'AWS Certified Developer',
  ],
};

export default profile;
