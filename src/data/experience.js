// Career timeline, newest first. `hash` is a stable fake commit id for the git-log styling.
export const experience = [
  {
    hash: 'a1f9c2e',
    company: 'American Express',
    title: 'Software Engineer',
    team: null,
    location: 'Phoenix, AZ',
    start: '2024-12',
    end: null,
    summary:
      'Own the full lifecycle of high-reliability distributed services, and build the internal tooling other engineers build on.',
    bullets: [
      {
        lead: 'Comparison Engine — zero-code journey validation.',
        text: 'Spring Boot engine (Java 21, Cucumber 7, Resilience4j) that eliminated per-journey Java test code. Engineers write Gherkin + CSV; the engine handles DB seeding, HTTP triggers, Kafka polling, multi-table comparison, DLQ correlation and reporting. New modes are one @Component, zero runner changes. Adopted across multiple teams; accelerated test automation 80%+.',
      },
      {
        lead: 'Requirement vs. code validation engine.',
        text: 'Pulls the full requirement, compares it against the live implementation and flags every gap. Bug turnaround down 50%+.',
      },
      {
        lead: 'AI BDD test generator.',
        text: 'Generates Gherkin scenarios from a user story. Zero manual writing, coverage up 60%+.',
      },
      {
        lead: 'RAG pipeline + multi-region log aggregation.',
        text: 'Containerized vector DB over an indexed internal knowledge base, LLM grounded to indexed data only. A single log endpoint across distributed microservices cut troubleshooting time 90%.',
      },
      {
        lead: 'Hackathon 2025, #1 first round.',
        text: 'Agentic tool that reads a product requirement from source and generates clean, commit-ready code in one click, cutting implementation time 70%+.',
      },
    ],
    stack: ['Java 21', 'Spring Boot 3', 'Kafka', 'Resilience4j', 'Cucumber', 'Kubernetes', 'Splunk', 'Vector DBs', 'LLM tooling'],
  },
  {
    hash: '7d3b41a',
    company: 'Arizona State University',
    title: 'Full Stack Engineer',
    team: null,
    location: 'Phoenix, AZ',
    start: '2022-01',
    end: '2024-12',
    summary: 'React/Vue frontends and Java/Spring Boot backends serving thousands of daily users.',
    bullets: [
      {
        lead: 'Cut bounce rate 15% and code volume 40%.',
        text: 'Restructured legacy codebases into reusable components, improving key UI flows and onboarding for new engineers.',
      },
      {
        lead: 'Handled peak academic load.',
        text: 'Optimized server-side Java APIs and AWS infrastructure (S3, Lambda), reducing backend processing time, infrastructure cost and improving user-flow efficiency 20%.',
      },
      {
        lead: 'Data-driven product decisions.',
        text: 'Integrated Google Analytics across applications to capture real-time usage.',
      },
    ],
    stack: ['Java', 'Spring Boot', 'React', 'Vue.js', 'AWS Lambda', 'S3', 'Sass'],
  },
  {
    hash: 'c84e07f',
    company: 'Uber Technologies',
    title: 'Quality Assurance Engineer',
    team: null,
    location: 'Phoenix, AZ',
    start: '2021-01',
    end: '2022-01',
    summary: 'Validated integrations between ServiceNow, Salesforce and Zendesk.',
    bullets: [
      {
        lead: 'Integration testing across three vendor platforms.',
        text: 'Identified and documented integration defects for engineering with reproducible detail, and audited support tickets for guideline compliance.',
      },
    ],
    stack: ['ServiceNow', 'Salesforce', 'Zendesk', 'Test design'],
  },
  {
    hash: '2b6d9e3',
    company: 'Apple Maps',
    title: 'Data Analyst',
    team: 'via Apex Systems',
    location: 'Remote',
    start: '2020-01',
    end: '2021-04',
    summary: 'Cross-functional data-quality work with Engineering and Product.',
    bullets: [
      {
        lead: 'Pushed service accuracy up 20%.',
        text: 'Maintained 98% annotation consistency across thousands of data points and ran the feedback loop between Engineering and Product.',
      },
    ],
    stack: ['Data quality', 'Annotation review', 'Cross-functional feedback'],
  },
];

export default experience;
