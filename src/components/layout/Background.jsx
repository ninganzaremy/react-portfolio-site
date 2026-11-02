import { useEffect, useRef } from 'react';
import './Background.css';

/**
 * Fixed ambient layer behind everything: dot grid, two drifting blobs,
 * and a cursor-follow glow (pointer: fine, motion-safe only).
 */
export default function Background() {
  const glowRef = useRef(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return undefined;
    const fine = window.matchMedia('(pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduce.matches) {
      el.style.display = 'none';
      return undefined;
    }

    let raf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight * 0.35;
    let x = targetX;
    let y = targetY;
    let visible = false;
    let settled = true;

    const apply = () => {
      el.style.transform = `translate3d(${x - 250}px, ${y - 250}px, 0)`;
    };
    apply();

    const tick = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      apply();
      if (Math.abs(targetX - x) < 0.3 && Math.abs(targetY - y) < 0.3) {
        settled = true;
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) { visible = true; el.style.opacity = '1'; }
      if (settled) { settled = false; raf = requestAnimationFrame(tick); }
    };
    const onLeave = () => { visible = false; el.style.opacity = '0'; };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="bg" aria-hidden="true">
      <div className="bg__grid" />
      <div className="bg__blob bg__blob--cyan" />
      <div className="bg__blob bg__blob--violet" />
      <div ref={glowRef} className="bg__glow" />
      <div className="bg__vignette" />
    </div>
  );
}
