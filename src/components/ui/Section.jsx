/**
 * Section: full-width band with an optional heading block.
 * <Section id="about" index="01" eyebrow="about" title="..." lead="...">children</Section>
 */
export default function Section({ id, index, eyebrow, title, lead, center = false, className = '', children, ...rest }) {
  return (
    <section id={id} className={`section ${className}`.trim()} aria-labelledby={title ? `${id}-title` : undefined} {...rest}>
      <div className="container">
        {(eyebrow || title) && (
          <header className={`section-head ${center ? 'section-head--center' : ''}`.trim()}>
            {eyebrow && (
              <div className="section-head__eyebrow eyebrow">
                <span className="faint">{'//'}</span>
                {index && <span className="faint">{index} —</span>} {eyebrow}
              </div>
            )}
            {title && <h2 id={`${id}-title`} className="section-head__title">{title}</h2>}
            {lead && <p className="section-head__lead">{lead}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
