import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, Copy, Check, ArrowUpRight, Loader2, AlertCircle } from 'lucide-react';
import { Section, Card, Button, Reveal } from '../ui';
import { profile } from '../../data/profile';
import './Contact.css';

const ENV = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};
const EMAILJS_READY = Boolean(ENV.serviceId && ENV.templateId && ENV.publicKey);

const CHANNELS = [
  { id: 'email', label: 'email', value: profile.email, href: `mailto:${profile.email}`, icon: Mail, copy: true },
  { id: 'linkedin', label: 'linkedin', value: 'in/remyninganza', href: profile.links.linkedin, icon: Linkedin, external: true },
  { id: 'github', label: 'github', value: profile.handle, href: profile.links.github, icon: Github, external: true },
];

function Toast({ message, reduce }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="contact__toast mono"
          role="status"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.18 }}
        >
          <Check size={14} aria-hidden="true" /> {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Contact() {
  const reduce = useReducedMotion();
  const formRef = useRef(null);
  const [state, setState] = useState('idle'); // idle | sending | sent | error | mailto
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(0);
  const copiedTimer = useRef(0);

  useEffect(() => () => { clearTimeout(toastTimer.current); clearTimeout(copiedTimer.current); }, []);

  const flash = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 1600);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      flash(`Copied ${profile.email}`);
      clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      flash(profile.email);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);

    // Honeypot: bots fill it, humans never see it.
    if (data.get('company')) {
      form.reset();
      setState('sent');
      return;
    }

    if (!EMAILJS_READY) {
      const subject = encodeURIComponent(data.get('subject') || `Hello from ${data.get('name') || 'your site'}`);
      const body = encodeURIComponent(
        `${data.get('message') || ''}\n\n— ${data.get('name') || ''} <${data.get('user_email') || ''}>`,
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setState('mailto');
      return;
    }

    setState('sending');
    try {
      await emailjs.sendForm(ENV.serviceId, ENV.templateId, form, { publicKey: ENV.publicKey });
      form.reset();
      setState('sent');
    } catch {
      setState('error');
    }
  };

  const pending = state === 'sending';

  return (
    <Section
      id="contact"
      index="06"
      eyebrow="contact"
      title="Get in touch."
      lead="Open to senior and staff engineering conversations, agentic-AI collaborations, and RingAnswered partnerships."
    >
      <div className="contact">
        <Reveal className="contact__left">
          <p className="contact__intro">{profile.contactNote}</p>

          <ul className="contact__channels" role="list">
            {CHANNELS.map((c) => {
              const Icon = c.icon;
              return (
                <li key={c.id}>
                  <Card hover className="contact__channel" pad={false}>
                    <a
                      href={c.href}
                      className="contact__channel-link"
                      {...(c.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                    >
                      <span className="contact__channel-icon" aria-hidden="true"><Icon size={18} /></span>
                      <span className="contact__channel-text">
                        <span className="contact__channel-label mono faint">{c.label}</span>
                        <span className="contact__channel-value">{c.value}</span>
                      </span>
                      {c.external && <ArrowUpRight size={16} aria-hidden="true" className="contact__channel-arrow" />}
                    </a>
                    {c.copy && (
                      <button
                        type="button"
                        className="contact__copy"
                        onClick={copyEmail}
                        aria-label={copied ? 'Email copied' : 'Copy email address'}
                      >
                        {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                    )}
                  </Card>
                </li>
              );
            })}
          </ul>

          <p className="contact__meta mono faint">
            <span className="contact__meta-dot" aria-hidden="true" />
            {profile.location} · {profile.timezone}
          </p>
        </Reveal>

        <Reveal className="contact__right" delay={0.08}>
          <Card glow className="contact__form-card">
            <form ref={formRef} className="contact__form" onSubmit={onSubmit}>
              <div className="contact__form-head mono faint" aria-hidden="true">
                {`// new message → ${profile.email}`}
              </div>

              <div className="contact__row">
                <div className="contact__field">
                  <label htmlFor="contact-name">Name</label>
                  <input id="contact-name" name="name" type="text" autoComplete="name" required disabled={pending} />
                </div>
                <div className="contact__field">
                  <label htmlFor="contact-email">Email</label>
                  <input id="contact-email" name="user_email" type="email" autoComplete="email" required disabled={pending} />
                </div>
              </div>

              <div className="contact__field">
                <label htmlFor="contact-subject">Subject</label>
                <input id="contact-subject" name="subject" type="text" required disabled={pending} />
              </div>

              <div className="contact__field">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" name="message" rows={6} required disabled={pending} />
              </div>

              {/* Honeypot: hidden from people and assistive tech. */}
              <div className="contact__hp" aria-hidden="true">
                <label htmlFor="contact-company">Company</label>
                <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="contact__actions">
                <Button
                  type="submit"
                  variant="primary"
                  icon={pending ? Loader2 : Send}
                  disabled={pending}
                  className={pending ? 'contact__submit--pending' : ''}
                >
                  {pending ? 'Sending…' : 'Send message'}
                </Button>
                {!EMAILJS_READY && (
                  <span className="contact__fallback mono dim">opens your mail client</span>
                )}
              </div>

              <div className="contact__status" aria-live="polite" role="status">
                {state === 'sent' && (
                  <p className="contact__status-msg contact__status-msg--ok">
                    <Check size={16} aria-hidden="true" /> Sent. I'll reply soon.
                  </p>
                )}
                {state === 'mailto' && (
                  <p className="contact__status-msg">
                    <Mail size={16} aria-hidden="true" /> Opened your mail client with the message prefilled.
                    If nothing happened, email me at <a href={`mailto:${profile.email}`}>{profile.email}</a>.
                  </p>
                )}
                {state === 'error' && (
                  <p className="contact__status-msg contact__status-msg--err">
                    <AlertCircle size={16} aria-hidden="true" /> Could not send — email me directly at{' '}
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>.
                  </p>
                )}
              </div>
            </form>
          </Card>
        </Reveal>
      </div>

      <Toast message={toast} reduce={reduce} />
    </Section>
  );
}
