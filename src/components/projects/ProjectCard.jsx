import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Button, Card, Chip } from '../ui';
import { statusMeta } from '../../data/projects';

const MAX_CHIPS = 6;

/** Thumbnail: 16:9 image; when a preview video exists it plays (muted, looped) on hover/focus. */
function Media({ project, hovering }) {
  const [videoOk, setVideoOk] = useState(Boolean(project.video));
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const reduce = useReducedMotion();

  const shouldPlay = hovering && videoOk && !reduce;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (shouldPlay) {
      const p = v.play();
      if (p && typeof p.catch === 'function') p.catch(() => setVideoOk(false));
    } else if (!v.paused) {
      v.pause();
      v.currentTime = 0;
    }
  }, [shouldPlay]);

  return (
    <div className={`pj-card__media ${playing && shouldPlay ? 'is-playing' : ''}`.trim()}>
      <img src={project.image} alt={`${project.name} screenshot`} loading="lazy" decoding="async" width="1280" height="720" />
      {videoOk && (
        <video
          ref={videoRef}
          className="pj-card__video"
          src={project.video}
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setVideoOk(false)}
        />
      )}
      {videoOk && !reduce && (
        <span className="pj-card__media-hint mono" aria-hidden="true">
          {playing && shouldPlay ? 'preview' : 'hover · preview'}
        </span>
      )}
    </div>
  );
}

export default function ProjectCard({ project }) {
  const [hovering, setHovering] = useState(false);
  const meta = statusMeta[project.status] || statusMeta.lab;
  const chips = project.stack.slice(0, MAX_CHIPS);
  const extra = project.stack.length - chips.length;
  const links = project.links || {};
  const hasLinks = Boolean(links.repo || links.live);
  const interactive = Boolean(project.video);

  const hoverProps = interactive
    ? {
        onMouseEnter: () => setHovering(true),
        onMouseLeave: () => setHovering(false),
        onFocus: () => setHovering(true),
        onBlur: (e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setHovering(false);
        },
      }
    : {};

  return (
    <Card as="article" hover glow pad={false} className="pj-card" aria-labelledby={`pj-${project.slug}-name`} {...hoverProps}>
      <div className="pj-card__body">
        <div className="pj-card__top">
          <Chip tone={meta.tone}>{meta.label}</Chip>
          <span className="pj-card__period mono faint">{project.period}</span>
        </div>

        <p className="pj-card__kicker eyebrow">{project.kicker}</p>
        <h3 id={`pj-${project.slug}-name`} className="pj-card__name">{project.name}</h3>

        {project.image && <Media project={project} hovering={hovering} />}

        <p className="pj-card__desc">{project.description}</p>

        {project.takeaway && (
          <p className="pj-card__takeaway mono">
            <span aria-hidden="true">→ </span>
            {project.takeaway}
          </p>
        )}

        <ul className="pj-card__stack" aria-label="Stack">
          {chips.map((s) => (
            <li key={s}><Chip>{s}</Chip></li>
          ))}
          {extra > 0 && (
            <li>
              <Chip className="pj-card__more" title={project.stack.slice(MAX_CHIPS).join(' · ')}>
                <span aria-hidden="true">+{extra}</span>
                <span className="sr-only">{`${extra} more: ${project.stack.slice(MAX_CHIPS).join(', ')}`}</span>
              </Chip>
            </li>
          )}
        </ul>

        {hasLinks && (
          <div className="pj-card__footer">
            {links.repo && (
              <Button href={links.repo} variant="ghost" size="sm" icon={Github} aria-label={`${project.name} source on GitHub`}>
                Source
              </Button>
            )}
            {links.live && (
              <Button href={links.live} variant="ghost" size="sm" icon={ExternalLink} aria-label={`${project.name} live site`}>
                Live
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
