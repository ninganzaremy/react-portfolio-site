import './Projects.css';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button, Card, Chip, Reveal, Section } from '../ui';
import { fadeUp, stagger, useMotionSafe } from '../../lib/motion';
import { featured, projects, statusMeta } from '../../data/projects';
import ArchitectureDiagram from './ArchitectureDiagram';
import ProjectCard from './ProjectCard';

const liveHost = featured.links?.live ? new URL(featured.links.live).host : null;

function Featured() {
  const status = statusMeta[featured.status] || statusMeta.live;
  return (
    <Reveal>
      <Card glow pad={false} className="pj-featured" as="article" aria-labelledby="pj-featured-name">
        <div className="pj-featured__pad">
          <div className="pj-featured__top">
            <Chip tone={status.tone}>{status.label}</Chip>
            <span className="pj-featured__period mono faint">{featured.period}</span>
            {liveHost && (
              <Button href={featured.links.live} variant="outline" size="sm" iconRight={ExternalLink} className="pj-featured__link">
                {liveHost}
              </Button>
            )}
          </div>

          <p className="pj-featured__kicker eyebrow">{featured.kicker}</p>
          <h3 id="pj-featured-name" className="pj-featured__name">
            {featured.name}
            <span className="pj-featured__tagline grad-text">{featured.tagline}</span>
          </h3>
          <p className="pj-featured__desc">{featured.description}</p>

          <div className="pj-featured__body">
            <div className="pj-featured__diagram">
              <ArchitectureDiagram nodes={featured.architecture.nodes} edges={featured.architecture.edges} core="agent" />
            </div>
            <ul className="pj-highlights" aria-label="Engineering highlights">
              {featured.highlights.map((h, i) => (
                <li key={h.title} className="pj-highlights__item">
                  <span className="pj-highlights__idx mono" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <span className="pj-highlights__text">
                    <strong className="pj-highlights__title">{h.title}</strong>
                    {h.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <dl className="pj-metrics" aria-label="Codebase metrics">
            {featured.metrics.map((m) => (
              <div key={m.label} className="pj-metric">
                <dt className="pj-metric__label">{m.label}</dt>
                <dd className="pj-metric__value mono">{m.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="pj-featured__stack" aria-label="Stack">
            {featured.stack.map((s) => (
              <li key={s}><Chip>{s}</Chip></li>
            ))}
          </ul>
        </div>
      </Card>
    </Reveal>
  );
}

function Grid() {
  const container = useMotionSafe(stagger(0.05, 0.07));
  const item = useMotionSafe(fadeUp);
  return (
    <motion.ul
      className="pj-grid"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
    >
      {projects.map((p) => (
        <motion.li key={p.slug} className="pj-grid__item" variants={item}>
          <ProjectCard project={p} />
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      index="03"
      eyebrow="projects"
      title="Selected work."
      lead="A production agentic platform, internal engines adopted across teams, and research builds."
    >
      <Featured />
      <Grid />
    </Section>
  );
}
