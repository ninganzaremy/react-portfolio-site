/** Window: macOS-style chrome for terminal/code panels. */
export default function Window({ title, className = '', children, right, ...rest }) {
  return (
    <div className={`window ${className}`.trim()} {...rest}>
      <div className="window__bar">
        <span className="window__dots" aria-hidden="true"><i /><i /><i /></span>
        {title && <span className="window__title">{title}</span>}
        {right}
      </div>
      {children}
    </div>
  );
}
