import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';
import { Button, Chip } from '../ui';
import { fadeUp, stagger, useMotionSafe } from '../../lib/motion';
import { profile } from '../../data/profile';
import Terminal from './Terminal';
import './Hero.css';

const ROLE_INTERVAL_MS = 2600;
const COORDINATES = '33.4484° N, 112.0740° W';

/** 'UTC−07:00' for the given IANA zone, derived at render time rather than hardcoded. */
/** Scrolls from the hero to the metrics band, clearing the fixed nav. */
function scrollPastHero() {
  const target = document.getElementById('metrics');
  if (!target) return;
  const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
  const top = target.getBoundingClientRect().top + window.scrollY - navH + 1;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
}

function tzOffset(timeZone) {
  try {
    const part = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'longOffset' })
      .formatToParts(new Date())
      .find((p) => p.type === 'timeZoneName');
    return (part?.value || 'GMT').replace('GMT', 'UTC').replace('-', '\u2212') || 'UTC';
  } catch {
    return 'UTC';
  }
}

const clockFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: profile.timezone,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
  timeZoneName: 'short',
});

/** Live wall clock in Remy's timezone, formatted "HH:MM:SS MST". */
function useLocalClock() {
  const [now, setNow] = useState(() => clockFormat.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setNow(clockFormat.format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/** Leaf node for the ticking clock, so the per-second re-render stays out of the hero tree. */
function LocalClock() {
  const clock = useLocalClock();
  return <time aria-label={`Local time ${clock}`}>{clock}</time>;
}

/** Cycles through items; frozen on the first item when disabled. */
function useRotating(items, intervalMs, enabled) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!enabled || items.length < 2) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), intervalMs);
    return () => clearInterval(id);
  }, [items, intervalMs, enabled]);
  return enabled ? items[index] : items[0];
}

function Portrait() {
  return (
    <span className="hero__avatar">
      <img src={profile.photo} alt={`Portrait of ${profile.name}`} width="56" height="56" loading="eager" decoding="async" />
    </span>
  );
}

function RoleLine({ reduce }) {
  const role = useRotating(profile.roles, ROLE_INTERVAL_MS, !reduce);
  return (
    <p className="hero__role mono">
      <span className="sr-only">{profile.roles.join(', ')}</span>
      <span className="hero__role-glyph" aria-hidden="true">$</span>
      <span className="hero__role-text" aria-hidden="true">
        {reduce ? (
          <span>{role}</span>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={role}
              initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              {role}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
    </p>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const item = useMotionSafe(fadeUp);
  const list = useMemo(() => stagger(0.08, 0.09), []);

  const nameParts = profile.name.split(' ');
  const surname = nameParts.pop();
  const givenNames = nameParts.join(' ');

  const emailHref = `mailto:${profile.email}`;
  const ringHost = profile.links.ringanswered.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <section id="hero" className="hero">
      <div className="container hero__inner">
        <motion.div className="hero__copy" variants={list} initial="hidden" animate="show">
          <motion.div className="hero__id" variants={item}>
            <Portrait />
            <div className="hero__id-text">
              <Chip tone="live">{profile.status}</Chip>
              <p className="hero__locale mono faint">
                <span>{profile.location}</span>
                <span className="hero__locale-sep" aria-hidden="true">·</span>
                <LocalClock />
              </p>
            </div>
          </motion.div>

          <motion.h1 className="hero__title" variants={item}>
            {givenNames}{' '}
            <span className="grad-text">{surname}</span>
          </motion.h1>

          <motion.div variants={item}>
            <RoleLine reduce={reduce} />
          </motion.div>

          <motion.p className="hero__lead lead" variants={item}>
            {profile.tagline}
          </motion.p>

          <motion.div className="hero__cta" variants={item}>
            <Button to="/#projects" variant="primary" iconRight={ArrowRight}>View work</Button>
            <Button href={profile.links.github} variant="outline" icon={Github}>GitHub</Button>
          </motion.div>

          <motion.p className="hero__links mono faint" variants={item}>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer noopener">linkedin</a>
            <span aria-hidden="true">·</span>
            <a href={emailHref}>email</a>
            <span aria-hidden="true">·</span>
            <a href={profile.links.ringanswered} target="_blank" rel="noreferrer noopener">{ringHost}</a>
          </motion.p>
        </motion.div>

        <motion.div
          className="hero__term"
          initial={reduce ? false : { opacity: 0, y: 24, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <Terminal />
        </motion.div>
      </div>

      <div className="container hero__meta mono faint">
        <span className="hero__meta-label" aria-hidden="true">{COORDINATES}</span>
        <span className="hero__meta-rule" aria-hidden="true" />
        <span className="hero__meta-label hero__meta-tz" aria-hidden="true">{profile.timezone} · {tzOffset(profile.timezone)}</span>
        <span className="hero__meta-rule" aria-hidden="true" />
        <button type="button" className="hero__meta-label hero__meta-scroll" onClick={scrollPastHero}>
          scroll <span aria-hidden="true">↓</span>
          <span className="sr-only">to key metrics</span>
        </button>
      </div>
    </section>
  );
}
