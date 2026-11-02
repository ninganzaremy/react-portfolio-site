import './About.css';
import { Activity, CheckCircle2, Settings2, ShieldCheck, Workflow } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, Reveal, Section, Window } from '../ui';
import { profile } from '../../data/profile';
import { fadeUp, stagger, useMotionSafe } from '../../lib/motion';

/* One icon per principle, in data order. Falls back to the last icon if data grows. */
const PRINCIPLE_ICONS = [ShieldCheck, Workflow, Activity, Settings2];

/* ---- profile.toml ------------------------------------------------------- */
/* Tiny token model so the window gets real 3-tone highlighting without a
   syntax-highlighter dependency. t: key | str | punc | cmt | tbl           */
const k = (v) => ({ t: 'key', v });
const s = (v) => ({ t: 'str', v: `"${v}"` });
const p = (v) => ({ t: 'punc', v });
const c = (v) => ({ t: 'cmt', v });
const tbl = (v) => [p('['), { t: 'tbl', v }, p(']')];
const kv = (key, value) => [k(key), p(' = '), s(value)];
const BLANK = [];

function buildToml() {
  const lines = [
    [c('# who, where, and what is on paper')],
    tbl('profile'),
    kv('name', profile.name),
    kv('location', profile.location),
    kv('timezone', profile.timezone),
    [k('languages'), p(' = ['), ...profile.languages.flatMap((l, i) => (i ? [p(', '), s(l)] : [s(l)])), p(']')],
    BLANK,
    [k('certifications'), p(' = [')],
    ...profile.certifications.map((cert, i) => [
      p('  '),
      s(cert.name),
      p(i < profile.certifications.length - 1 ? ',' : ''),
    ]),
    [p(']')],
    BLANK,
    tbl('education'),
    ...profile.education.map((e) => [p('"'), k(e.school), p('" = '), s(e.credential)]),
  ];
  return lines;
}

function TomlWindow() {
  const lines = buildToml();
  return (
    <Window
      className="about__toml"
      title="profile.toml"
      right={<span className="about__toml-badge" aria-hidden="true">toml · utf-8</span>}
    >
      <pre className="about__toml-body">
        <code>
          {lines.map((tokens, i) => (
            <span className="about__toml-line" key={i}>
              <span className="about__toml-ln" aria-hidden="true">{i + 1}</span>
              <span className="about__toml-code">
                {tokens.length === 0
                  ? ' '
                  : tokens.map((tok, j) => (
                      <span className={`about__tok about__tok--${tok.t}`} key={j}>{tok.v}</span>
                    ))}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </Window>
  );
}

/* ---- principles ---------------------------------------------------------- */
function Principles() {
  const container = useMotionSafe(stagger(0.05, 0.09));
  const item = useMotionSafe(fadeUp);
  return (
    <motion.ul
      className="about__principles"
      aria-label="Engineering principles"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
    >
      {profile.principles.map((pr, i) => {
        const Icon = PRINCIPLE_ICONS[Math.min(i, PRINCIPLE_ICONS.length - 1)];
        return (
          <motion.li key={pr.title} variants={item} className="about__principle-item">
            <Card hover glow className="about__principle">
              <span className="about__principle-icon" aria-hidden="true">
                <Icon size={18} strokeWidth={1.75} />
              </span>
              <h3 className="about__principle-title">{pr.title}</h3>
              <p className="about__principle-text">{pr.text}</p>
            </Card>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

/* ---- section ------------------------------------------------------------- */
export default function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="about"
      title="From design to on-call."
      lead={profile.tagline}
      className="about"
    >
      <div className="about__grid">
        <div className="about__col about__col--bio">
          <Reveal className="about__bio">
            {profile.bio.map((para, i) => (
              <p key={i} className={i === 0 ? 'about__para about__para--lead' : 'about__para'}>
                {para}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            <TomlWindow />
          </Reveal>
        </div>

        <div className="about__col about__col--side">
          <Principles />
          <Reveal as="ul" delay={0.1} className="about__highlights" aria-label="Highlights">
            {profile.highlights.map((h) => (
              <li key={h} className="about__highlight">
                <CheckCircle2 size={16} strokeWidth={2} aria-hidden="true" className="about__highlight-icon" />
                <span>{h}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
