import { motion } from 'framer-motion';
import { fadeUp, useMotionSafe } from '../../lib/motion';

/** Reveal: fades children up when scrolled into view (once). Respects reduced motion. */
export default function Reveal({ as = 'div', delay = 0, className = '', children, ...rest }) {
  const variants = useMotionSafe(fadeUp);
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
