import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '../../data/profile';
import './Footer.css';

const NAV = [
  { label: 'About', to: '/#about' },
  { label: 'Experience', to: '/#experience' },
  { label: 'Projects', to: '/#projects' },
  { label: 'Stack', to: '/#stack' },
  { label: 'Writing', to: '/#writing' },
  { label: 'Contact', to: '/#contact' },
  { label: 'Blog', to: '/blog' },
];

const ELSEWHERE = [
  { label: 'GitHub', href: profile.links.github },
  { label: 'LinkedIn', href: profile.links.linkedin },
  { label: 'X', href: profile.links.x },
  { label: 'RingAnswered', href: profile.links.ringanswered },
  { label: 'Email', href: `mailto:${profile.email}` },
];

function phoenixTime() {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: profile.timezone,
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
      timeZoneName: 'short',
    }).format(new Date());
  } catch {
    return '';
  }
}

export default function Footer() {
  const [time, setTime] = useState(phoenixTime);
  const year = new Date().getFullYear();

  useEffect(() => {
    // Align the tick to the next minute boundary, then every 60s.
    let interval;
    const msToNextMinute = 60000 - (Date.now() % 60000);
    const timeout = setTimeout(() => {
      setTime(phoenixTime());
      interval = setInterval(() => setTime(phoenixTime()), 60000);
    }, msToNextMinute);
    return () => { clearTimeout(timeout); clearInterval(interval); };
  }, []);

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <p className="footer__host mono">
            <span className="footer__prompt" aria-hidden="true">$</span> remy@phx
          </p>
          <p className="footer__tagline">{profile.tagline}</p>
          <p className="footer__status mono">
            <span className="footer__dot" aria-hidden="true" />
            {profile.status}
          </p>
        </div>

        <div className="footer__lists">
          <nav aria-labelledby="footer-nav">
            <h2 id="footer-nav" className="footer__heading mono">Navigate</h2>
            <ul role="list">
              {NAV.map((l) => (
                <li key={l.to}><Link to={l.to} className="footer__link">{l.label}</Link></li>
              ))}
            </ul>
          </nav>
          <nav aria-labelledby="footer-elsewhere">
            <h2 id="footer-elsewhere" className="footer__heading mono">Elsewhere</h2>
            <ul role="list">
              {ELSEWHERE.map((l) => {
                const external = /^https?:/.test(l.href);
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="footer__link"
                      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                    >
                      {l.label}
                      {external && <ArrowUpRight size={12} aria-hidden="true" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <section className="footer__build mono" aria-label="Build info">
          <p className="footer__build-head faint">{'// build'}</p>
          <p>
            <span className="faint">stack</span> React 18 · Vite 6 · deployed via GitHub Actions → Netlify
          </p>
          <p>
            <span className="faint">src</span>{' '}
            <a href={profile.links.source} target="_blank" rel="noreferrer noopener" className="footer__src">
              {profile.links.source.replace(/^https?:\/\//, '')}
            </a>
          </p>
          <p>
            <span className="faint">tz</span> {profile.timezone}
            {time && <> · <time className="footer__time">{time}</time></>}
          </p>
          <p>© {year} {profile.name}</p>
        </section>
      </div>

      <div className="container footer__bottom">
      </div>
    </footer>
  );
}
