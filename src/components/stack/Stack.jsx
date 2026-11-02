import './Stack.css';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Section, Card, Chip, Reveal } from '../ui';
import { fadeUp, stagger, useMotionSafe } from '../../lib/motion';
import { slugify } from '../../lib/format';
import { stack, currently } from '../../data/stack';

const pad2 = (n) => String(n).padStart(2, '0');

export default function Stack() {
  const grid = useMotionSafe(stagger(0.05, 0.07));
  const panel = useMotionSafe(fadeUp);

  return (
    <Section
      id="stack"
      index="04"
      eyebrow="stack"
      title="Tools I reach for."
      lead="Primary tools are highlighted; the rest is what I reach for day to day."
    >
      <motion.ul
        className="stack__grid"
        variants={grid}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        aria-label="Technology stack by group"
      >
        {stack.map((group, i) => {
          const id = slugify(group.group);
          const primaries = group.items.filter((it) => it.primary).length;
          return (
            <Card
              key={group.group}
              as={motion.li}
              variants={panel}
              hover
              className={`stack__panel stack__panel--${id}`}
              aria-labelledby={`stack-${id}`}
            >
              <header className="stack__panel-head">
                <span className="stack__num" aria-hidden="true">{pad2(i + 1)}</span>
                <h3 id={`stack-${id}`} className="stack__label">{group.group}</h3>
                <span className="stack__count mono">
                  <span aria-hidden="true">{primaries}/{group.items.length}</span>
                  <span className="sr-only">{`${primaries} of ${group.items.length} primary`}</span>
                </span>
              </header>
              <ul className="stack__chips" aria-label={`${group.group} tools`}>
                {group.items.map((item) => (
                  <li key={item.name}>
                    <Chip tone={item.primary ? 'accent' : 'default'} className="stack__chip">
                      {item.name}
                    </Chip>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </motion.ul>

      <Reveal className="stack__now" delay={0.1}>
        <span className="stack__now-label mono">
          currently exploring <ArrowRight aria-hidden="true" />
        </span>
        <ul className="stack__now-list" aria-label="Currently exploring">
          {currently.map((item) => (
            <li key={item}>
              <Chip tone="violet" className="stack__chip">{item}</Chip>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
