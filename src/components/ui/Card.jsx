/** Card: surface with border. hover adds lift; glow adds gradient border on hover. */
export default function Card({ as: Tag = 'div', hover = false, glow = false, pad = true, className = '', children, ...rest }) {
  const cls = `card ${hover ? 'card--hover' : ''} ${glow ? 'card--glow' : ''} ${className}`.trim();
  return (
    <Tag className={cls} {...rest}>
      {pad ? <div className="card__pad">{children}</div> : children}
    </Tag>
  );
}
