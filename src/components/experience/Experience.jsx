import './Experience.css';
import { Card, Chip, Reveal, Section } from '../ui';
import { experience } from '../../data/experience';
import { duration, fmtMonth } from '../../lib/format';

function RoleMeta({ role }) {
  const parts = [];
  if (role.team) parts.push(role.team);
  parts.push(role.location);
  return (
    <p className="xp-card__meta mono">
      {parts.join(' · ')}
      <span className="xp-card__meta-sep"> · </span>
      <span className="xp-card__range">
        <time dateTime={role.start}>{fmtMonth(role.start)}</time>
        <span className="xp-card__arrow" aria-hidden="true"> → </span>
        <span className="sr-only"> to </span>
        {role.end ? <time dateTime={role.end}>{fmtMonth(role.end)}</time> : <span>Present</span>}
      </span>
      <span className="xp-card__meta-sep"> · </span>
      <span className="xp-card__dur">{duration(role.start, role.end)}</span>
    </p>
  );
}

function Entry({ role, index }) {
  const current = role.end === null;
  return (
    <Reveal
      as="li"
      delay={Math.min(index, 3) * 0.08}
      className={`xp-entry ${current ? 'xp-entry--current' : 'xp-entry--past'}`}
      aria-current={current ? 'true' : undefined}
    >
      <div className="xp-gutter">
        {current && (
          <span className="xp-head mono">
            <span className="sr-only">Current role</span>
            <span aria-hidden="true">HEAD → main</span>
          </span>
        )}
        <span className="xp-gutter__dates mono" aria-hidden="true">
          <span>{fmtMonth(role.start)}</span>
          <span className="xp-gutter__arrow">↓</span>
          <span>{fmtMonth(role.end)}</span>
        </span>
      </div>

      <span className="xp-node" aria-hidden="true" />

      <Card hover glow={current} className="xp-card" as="article">
        <h3 className="xp-card__head mono">
          <span className="xp-card__hash">{role.hash}</span>
          <span className="xp-card__company">{role.company}</span>
          <span className="xp-card__dot" aria-hidden="true">·</span>
          <span className="xp-card__title">{role.title}</span>
        </h3>
        <RoleMeta role={role} />

        <p className="xp-card__summary">{role.summary}</p>

        <ul className="xp-card__bullets">
          {role.bullets.map((b) => (
            <li key={b.lead} className="xp-bullet">
              <span className="xp-bullet__marker mono" aria-hidden="true">›</span>
              <p>
                <strong>{b.lead}</strong> {b.text}
              </p>
            </li>
          ))}
        </ul>

        <ul className="xp-card__stack" aria-label="Stack">
          {role.stack.map((tech) => (
            <li key={tech}>
              <Chip>{tech}</Chip>
            </li>
          ))}
        </ul>
      </Card>
    </Reveal>
  );
}

export default function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      eyebrow="experience"
      title="Work history, as a commit log."
      lead="From data quality to owning production systems. Newest first."
      className="xp"
    >
      <ol className="xp-log" aria-label="Work history, newest first">
        {experience.map((role, i) => (
          <Entry key={role.hash} role={role} index={i} />
        ))}
      </ol>
      <p className="xp-eol mono" aria-hidden="true">
        <span className="xp-eol__prompt">$</span> git log --oneline · {experience.length} entries · end of log
      </p>
    </Section>
  );
}
