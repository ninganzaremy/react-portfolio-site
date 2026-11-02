import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { metrics } from '../../data/metrics';
import './Metrics.css';

const COUNT_DURATION_MS = 1400;

const fmt = (n) => n.toLocaleString('en-US');
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/** Animates 0 → target once `active` flips true. Reduced motion renders the target at once. */
function useCountUp(target, active, reduce) {
  const [n, setN] = useState(reduce ? target : 0);
  useEffect(() => {
    if (reduce) {
      setN(target);
      return undefined;
    }
    if (!active) return undefined;
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / COUNT_DURATION_MS);
      setN(Math.round(target * easeOutCubic(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, reduce]);
  return n;
}

const cellVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};
const staticVariants = { hidden: { opacity: 1 }, show: { opacity: 1 } };

function Metric({ metric, active, reduce }) {
  const n = useCountUp(metric.value, active, reduce);
  const prefix = metric.prefix || '';
  const suffix = metric.suffix || '';
  const finalText = `${prefix}${fmt(metric.value)}${suffix}`;

  return (
    <motion.li className="metrics__cell" variants={reduce ? staticVariants : cellVariants}>
      <div className="metrics__num mono">
        <span aria-hidden="true">
          {prefix && <span className="metrics__prefix">{prefix}</span>}
          <span className="metrics__digits">{fmt(n)}</span>
          {suffix && <span className="metrics__suffix">{suffix}</span>}
        </span>
        <span className="sr-only">{finalText}</span>
      </div>
      <div className="metrics__label">{metric.label}</div>
      <div className="metrics__source mono">{metric.source}</div>
    </motion.li>
  );
}

export default function Metrics() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const active = reduce || inView;

  return (
    <section id="metrics" className="metrics" aria-label="Key metrics">
      <div className="container">
        <motion.ul
          ref={ref}
          className="metrics__grid"
          variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.07 } } }}
          initial="hidden"
          animate={active ? 'show' : 'hidden'}
        >
          {metrics.map((m) => (
            <Metric key={m.label} metric={m} active={active} reduce={reduce} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
