/** Chip: monospace tag. tone: 'default' | 'accent' | 'violet' | 'live' | 'warn' */
export default function Chip({ tone = 'default', className = '', children, ...rest }) {
  const cls = `chip ${tone !== 'default' ? `chip--${tone}` : ''} ${className}`.trim();
  return <span className={cls} {...rest}>{children}</span>;
}
