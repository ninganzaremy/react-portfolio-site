import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to #hash targets on navigation (accounting for the fixed nav) and to top on route change. */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // Wait a frame so the target section has rendered.
      const t = requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
          const top = el.getBoundingClientRect().top + window.scrollY - navH + 1;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
      return () => cancelAnimationFrame(t);
    }
    // 'instant' bypasses the CSS `scroll-behavior: smooth` on <html>; 'auto' would start a
    // smooth scroll that the shrinking document interrupts.
    window.scrollTo({ top: 0, behavior: 'instant' });
    // `key` changes on every navigation, so re-selecting the current hash scrolls again.
  }, [pathname, hash, key]);
  return null;
}
