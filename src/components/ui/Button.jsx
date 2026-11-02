import { Link } from 'react-router-dom';

/**
 * Button renders <a>, <Link> or <button> depending on props.
 * variant: 'primary' | 'outline' | 'ghost' (default outline). size: 'sm' | 'md' | 'lg'
 */
export default function Button({ href, to, variant = 'outline', size = 'md', icon: Icon, iconRight: IconRight, className = '', children, ...rest }) {
  const cls = `btn btn--${variant} ${size !== 'md' ? `btn--${size}` : ''} ${className}`.trim();
  const inner = (
    <>
      {Icon && <Icon aria-hidden="true" />}
      <span>{children}</span>
      {IconRight && <IconRight aria-hidden="true" />}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) {
    const external = /^https?:\/\//.test(href);
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})} {...rest}>
        {inner}
      </a>
    );
  }
  return <button type="button" className={cls} {...rest}>{inner}</button>;
}
