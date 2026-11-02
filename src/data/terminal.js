// Scripted session + command handlers for the hero terminal.
// Everything here is derived from the other data files; nothing is fabricated
// and nothing pretends to be a live network response.
import { profile } from './profile';
import { experience } from './experience';
import { featured, projects } from './projects';
import { stack } from './stack';
import { CAREER_SINCE, monthsSince } from './metrics';

export const PROMPT = { user: 'remy', host: 'phx', cwd: '~', sigil: '%' };

/* ------------------------------------------------------------------ */
/* Line helpers. A line is either a string, { text, tone }, { segments } */
/* or { kind: 'columns', items }. Tones map to CSS classes in Terminal.css. */
/* ------------------------------------------------------------------ */
const L = (text, tone) => (tone ? { text, tone } : text);
const seg = (...segments) => ({ segments });
const columns = (items) => ({ kind: 'columns', items });

const STACK_KEYS = {
  Languages: 'languages',
  'AI & Agentic': 'ai',
  Backend: 'backend',
  Testing: 'testing',
  'Cloud & Infra': 'cloud',
  Data: 'data',
  Frontend: 'frontend',
};

export const PROJECT_SLUGS = [featured.slug, ...projects.map((p) => p.slug)];

const allProjects = [featured, ...projects];

/* ------------------------------------------------------------------ */
/* Output builders                                                     */
/* ------------------------------------------------------------------ */
export function whoamiLines() {
  return [
    seg(
      { text: profile.name, tone: 'bright' },
      { text: ' · ' , tone: 'faint' },
      { text: `${profile.title} @ ${profile.company}` },
      { text: ' · ', tone: 'faint' },
      { text: profile.location, tone: 'dim' },
    ),
  ];
}

export function stackYamlLines() {
  const lines = [L('# stack.yaml — primaries only', 'faint')];
  const keys = stack
    .map((g) => ({ key: STACK_KEYS[g.group] || g.group.toLowerCase(), items: g.items.filter((i) => i.primary).map((i) => i.name) }))
    .filter((g) => g.items.length);
  const width = Math.max(...keys.map((g) => g.key.length)) + 1;
  for (const g of keys) {
    lines.push(
      seg(
        { text: `${g.key}:`.padEnd(width + 1), tone: 'accent' },
        { text: '[', tone: 'faint' },
        { text: g.items.join(', '), tone: 'yaml' },
        { text: ']', tone: 'faint' },
      ),
    );
  }
  return lines;
}

export function lsLines() {
  return [
    columns(
      allProjects.map((p) => ({
        text: `${p.slug}/`,
        tone: p.status === 'live' ? 'accent' : 'dir',
      })),
    ),
  ];
}

export function gitLogLines(count = 4) {
  return experience.slice(0, count).map((job, i) =>
    seg(
      { text: job.hash, tone: 'hash' },
      { text: ' ' },
      ...(i === 0 ? [{ text: '(HEAD -> main) ', tone: 'ok' }] : []),
      { text: `${job.company}: ${job.title}` },
    ),
  );
}

export function experienceLines() {
  return experience.map((job) =>
    seg(
      { text: job.hash, tone: 'hash' },
      { text: '  ' },
      { text: `${job.start} → ${job.end || 'present'}`.padEnd(20), tone: 'dim' },
      { text: `${job.company}: ${job.title}` },
    ),
  );
}

export function projectsLines() {
  const width = Math.max(...allProjects.map((p) => p.slug.length)) + 2;
  return allProjects.map((p) =>
    seg(
      { text: p.slug.padEnd(width), tone: p.status === 'live' ? 'accent' : 'dir' },
      { text: p.kicker, tone: 'dim' },
      { text: `  [${p.status}]`, tone: p.status === 'live' ? 'ok' : 'faint' },
    ),
  );
}

export function contactLines() {
  const rows = [
    ['email', profile.email],
    ['linkedin', profile.links.linkedin],
    ['github', profile.links.github],
    ['site', profile.site],
    ['ringanswered', profile.links.ringanswered],
  ];
  return rows.map(([k, v]) => seg({ text: `${k}:`.padEnd(14), tone: 'accent' }, { text: v }));
}

export function readmeLines() {
  return [L('# README.md', 'faint'), profile.positioning];
}

export function helpLines() {
  const cmds = [
    ['help', 'this list'],
    ['whoami', 'who you are talking to'],
    ['stack', 'primary technologies (alias: cat stack.yaml)'],
    ['projects', 'what I have built, with status'],
    ['experience', 'where I have worked (alias: git log)'],
    ['contact', 'how to reach me'],
    ['resume', 'open the PDF in a new tab'],
    ['open <target>', 'github | linkedin | ringanswered'],
    ['ls', 'list ~/projects'],
    ['cat <file>', 'stack.yaml | README.md'],
    ['echo <text>', 'say it back'],
    ['date', 'local time in Phoenix'],
    ['uptime', 'time in tech'],
    ['clear', 'wipe the screen (also Ctrl+L)'],
  ];
  const width = Math.max(...cmds.map(([c]) => c.length)) + 2;
  return [
    L('Available commands:', 'dim'),
    ...cmds.map(([c, d]) => seg({ text: `  ${c.padEnd(width)}`, tone: 'accent' }, { text: d, tone: 'dim' })),
    L('Up / Down cycle history. Autoplay skips on any key.', 'faint'),
  ];
}

export function dateLines(now = new Date()) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: profile.timezone,
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
    timeZoneName: 'short',
  });
  return [fmt.format(now)];
}

export function uptimeLines(now = new Date()) {
  const months = monthsSince(CAREER_SINCE, now);
  const years = Math.floor(months / 12);
  const rem = months % 12;
  const parts = [];
  if (years) parts.push(`${years} year${years === 1 ? '' : 's'}`);
  if (rem) parts.push(`${rem} month${rem === 1 ? '' : 's'}`);
  return [
    seg(
      { text: 'up ', tone: 'dim' },
      { text: parts.join(', ') || 'less than a month', tone: 'bright' },
      { text: ' in tech', tone: 'dim' },
      { text: `  (since ${CAREER_SINCE.year}-${String(CAREER_SINCE.month).padStart(2, '0')})`, tone: 'faint' },
    ),
    seg({ text: 'load: ', tone: 'dim' }, { text: `${profile.company} by day, RingAnswered by night` }),
  ];
}

/* ------------------------------------------------------------------ */
/* Autoplay script                                                     */
/* ------------------------------------------------------------------ */
export function buildSession() {
  return [
    { cmd: 'whoami', output: whoamiLines() },
    { cmd: 'cat stack.yaml', output: stackYamlLines() },
    { cmd: 'ls ~/projects', output: lsLines() },
    { cmd: 'git log --oneline -4', output: gitLogLines(4) },
  ];
}

export const HINT_LINE = L("type 'help' for commands", 'faint');

/* ------------------------------------------------------------------ */
/* Interactive command dispatcher                                      */
/* Returns { lines, action? } where action is                          */
/* { type: 'clear' } | { type: 'open', url }                           */
/* ------------------------------------------------------------------ */
const OPEN_TARGETS = {
  github: profile.links.github,
  linkedin: profile.links.linkedin,
  ringanswered: profile.links.ringanswered,
  resume: profile.resumeUrl,
  site: profile.site,
};

export function runCommand(raw) {
  const input = raw.trim();
  if (!input) return { lines: [] };
  const [cmdRaw, ...rest] = input.split(/\s+/);
  const cmd = cmdRaw.toLowerCase();
  const arg = rest.join(' ');

  switch (cmd) {
    case 'help':
    case '?':
      return { lines: helpLines() };
    case 'whoami':
      return { lines: whoamiLines() };
    case 'stack':
      return { lines: stackYamlLines() };
    case 'projects':
      return { lines: projectsLines() };
    case 'experience':
      return { lines: experienceLines() };
    case 'git':
      if (/^log\b/.test(arg)) return { lines: gitLogLines(experience.length) };
      return { lines: [L(`git: '${arg || ''}' is not a git command here. Try: git log`, 'err')] };
    case 'contact':
      return { lines: contactLines() };
    case 'resume':
      return { lines: [L('opening resume in a new tab…', 'dim')], action: { type: 'open', url: profile.resumeUrl } };
    case 'open': {
      const target = arg.toLowerCase();
      const url = OPEN_TARGETS[target];
      if (!url) {
        return {
          lines: [
            L(`open: unknown target '${arg}'`, 'err'),
            L(`targets: ${Object.keys(OPEN_TARGETS).join(' | ')}`, 'faint'),
          ],
        };
      }
      return { lines: [L(`opening ${url} …`, 'dim')], action: { type: 'open', url } };
    }
    case 'ls':
    case 'll':
      return { lines: lsLines() };
    case 'cat': {
      const file = arg.replace(/^~\/?/, '').toLowerCase();
      if (file === 'stack.yaml' || file === 'stack.yml') return { lines: stackYamlLines() };
      if (file === 'readme.md' || file === 'readme') return { lines: readmeLines() };
      if (!file) return { lines: [L('cat: missing file. Try: cat stack.yaml | cat README.md', 'err')] };
      return { lines: [L(`cat: ${arg}: No such file or directory`, 'err')] };
    }
    case 'clear':
    case 'cls':
      return { lines: [], action: { type: 'clear' } };
    case 'echo':
      return { lines: [arg] };
    case 'date':
      return { lines: dateLines() };
    case 'uptime':
      return { lines: uptimeLines() };
    case 'pwd':
      return { lines: ['/Users/remy'] };
    case 'sudo':
      return { lines: [L('Permission denied: nice try.', 'err')] };
    case 'exit':
    case 'quit':
    case 'logout':
      return { lines: [L("There is no escape. Try 'help'.", 'dim')] };
    default:
      return {
        lines: [L(`zsh: command not found: ${cmdRaw}`, 'err'), L("type 'help' for the list of commands", 'faint')],
      };
  }
}

export default buildSession;
