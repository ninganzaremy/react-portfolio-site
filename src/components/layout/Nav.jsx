import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui';
import './Nav.css';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
];

function detectMac() {
  if (typeof navigator === 'undefined') return true;
  const p = navigator.userAgentData?.platform || navigator.platform || '';
  return /mac|iphone|ipad|ipod/i.test(p);
}

/** Tracks which home section is nearest the top of the viewport. */
function useActiveSection(enabled) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') {
      setActive(null);
      return undefined;
    }
    const ratios = new Map();
    const pick = () => {
      let best = null;
      let bestRatio = 0;
      for (const [id, r] of ratios) {
        if (r > bestRatio) { best = id; bestRatio = r; }
      }
      setActive(best);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        pick();
      },
      // Band near the top of the viewport wins; the lower 55% is ignored.
      { rootMargin: '-15% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );
    // Sections may mount after the nav; retry on the next frame.
    const raf = requestAnimationFrame(() => {
      for (const { id } of LINKS) {
        const el = document.getElementById(id);
        if (el) io.observe(el);
      }
    });
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [enabled]);
  return active;
}

export default function Nav() {
  const { pathname, hash } = useLocation();
  const reduce = useReducedMotion();
  const isHome = pathname === '/';
  const isMac = useMemo(detectMac, []);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef(null);
  const active = useActiveSection(isHome);

  // Border only after the page has moved.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the overlay on route change.
  useEffect(() => { setOpen(false); }, [pathname, hash]);

  // Scroll lock + Esc + return focus while the overlay is open.
  useEffect(() => {
    if (!open) return undefined;
    const burger = burgerRef.current;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      burger?.focus();
    };
  }, [open]);

  // Close the overlay if the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    const onChange = (e) => { if (e.matches) setOpen(false); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const openPalette = useCallback(() => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  }, []);

  const overlayVariants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 }, exit: { opacity: 1 } }
    : { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.22 } }, exit: { opacity: 0, transition: { duration: 0.18 } } };
  const listVariants = reduce
    ? { hidden: {}, show: {}, exit: {} }
    : {
        hidden: { y: 12, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.05, delayChildren: 0.05 } },
        exit: { y: 8, opacity: 0, transition: { duration: 0.16 } },
      };
  const itemVariants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } } };

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`.trim()}>
      <nav className="container nav__inner" aria-label="Primary">
        <Link to="/" className="nav__logo mono" aria-label="Remy Ninganza — home">
          <span className="nav__logo-prefix" aria-hidden="true">~/</span>
          <span>remy</span>
          <span className={`nav__cursor ${reduce ? 'nav__cursor--static' : ''}`.trim()} aria-hidden="true">_</span>
        </Link>

        <ul className="nav__links" role="list">
          {LINKS.map(({ id, label }) => {
            const isActive = isHome && active === id;
            return (
              <li key={id}>
                <Link
                  to={`/#${id}`}
                  className={`nav__link ${isActive ? 'nav__link--active' : ''}`.trim()}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId={reduce ? undefined : 'nav-underline'}
                      className="nav__underline"
                      aria-hidden="true"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="nav__actions">
          <button type="button" className="nav__cmd" onClick={openPalette} aria-label="Open command palette">
            <span className="nav__cmd-label">Search</span>
            <span className="kbd">{isMac ? '⌘' : 'Ctrl'}</span>
            <span className="kbd">K</span>
          </button>
          <button
            ref={burgerRef}
            type="button"
            className="nav__burger"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-overlay"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="nav-overlay"
            className="nav__overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <motion.div className="container nav__overlay-inner" variants={listVariants}>
              <p className="nav__overlay-eyebrow mono faint">{'// navigate'}</p>
              <ul className="nav__overlay-links" role="list">
                {LINKS.map(({ id, label }, i) => (
                  <motion.li key={id} variants={itemVariants}>
                    <Link to={`/#${id}`} className="nav__overlay-link" onClick={() => setOpen(false)}>
                      <span className="nav__overlay-index mono faint">0{i + 1}</span>
                      <span>{label}</span>
                    </Link>
                  </motion.li>
                ))}
                <motion.li variants={itemVariants}>
                  <Link to="/blog" className="nav__overlay-link" onClick={() => setOpen(false)}>
                    <span className="nav__overlay-index mono faint">07</span>
                    <span>Blog</span>
                  </Link>
                </motion.li>
              </ul>
              <motion.div className="nav__overlay-foot" variants={itemVariants}>
                <Button variant="outline" onClick={() => { setOpen(false); openPalette(); }}>
                  Command palette
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
