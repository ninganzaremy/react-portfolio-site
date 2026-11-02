// Headline numbers. Each is sourced; keep `source` honest.

// First role in tech (Apple Maps data quality, Jan 2020). The terminal's `uptime` reads the same constant.
export const CAREER_SINCE = { year: 2020, month: 1 };

export function monthsSince({ year, month }, now = new Date()) {
  return (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
}

const yearsInTech = Math.floor(monthsSince(CAREER_SINCE) / 12);

export const metrics = [
  { value: yearsInTech, suffix: '+', label: 'years in tech', source: 'Jan 2020 → present' },
  { value: 80, suffix: '%+', label: 'faster test automation', source: 'Comparison Engine, adopted across multiple teams' },
  { value: 1642, suffix: '', label: 'automated tests in RingAnswered', source: 'backend test functions, Oct 2026' },
  { value: 90, suffix: '%', label: 'less troubleshooting time', source: 'multi-region log aggregation' },
  { value: 1, prefix: '#', suffix: '', label: 'Amex Hackathon 2025, first round', source: 'requirement → commit-ready code' },
  { value: 7, suffix: '', label: 'vertical templates in RingAnswered', source: 'tenants/_verticals, Oct 2026' },
];

export default metrics;
