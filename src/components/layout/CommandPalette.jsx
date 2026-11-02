import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Search, User, Briefcase, FolderGit2, Layers, PenLine, Mail,
  BookOpen, FileText, Copy, Github, Linkedin, Phone, CornerDownLeft, Check,
} from 'lucide-react';
import { profile } from '../../data/profile';
import './CommandPalette.css';

/** True when every char of `q` appears in `s` in order (fuzzy subsequence). */
function subsequence(q, s) {
  let i = 0;
  for (const ch of s) {
    if (ch === q[i]) i += 1;
    if (i === q.length) return true;
  }
  return i === q.length;
}

/** Lower is better; null means no match. Label substring < keyword substring < fuzzy. */
function score(item, q) {
  const needle = q.toLowerCase().trim();
  if (!needle) return 0;
  const label = item.label.toLowerCase();
  if (label.includes(needle)) return label.indexOf(needle);
  const keys = item.keywords.join(' ').toLowerCase();
  if (keys.includes(needle)) return 100;
  const hay = `${label} ${keys}`.replace(/\s+/g, '');
  if (subsequence(needle.replace(/\s+/g, ''), hay)) return 200;
  return null;
}

function isMac() {
  if (typeof navigator === 'undefined') return true;
  const p = navigator.userAgentData?.platform || navigator.platform || '';
  return /mac|iphone|ipad|ipod/i.test(p);
}

export default function CommandPalette() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState('');
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const returnFocusRef = useRef(null);
  const toastTimer = useRef(0);
  const mac = useMemo(isMac, []);

  const close = useCallback(() => setOpen(false), []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 1600);
  }, []);

  const items = useMemo(() => {
    const go = (id) => () => navigate(`/#${id}`);
    const ext = (url) => () => window.open(url, '_blank', 'noopener,noreferrer');
    const shortEmail = profile.email.replace(/@.*/, '@…');
    return [
      { id: 'about', label: 'Go to About', hint: '/#about', icon: User, keywords: ['bio', 'who', 'principles', 'me'], run: go('about') },
      { id: 'experience', label: 'Go to Experience', hint: '/#experience', icon: Briefcase, keywords: ['work', 'jobs', 'amex', 'american express', 'career', 'resume'], run: go('experience') },
      { id: 'projects', label: 'Go to Projects', hint: '/#projects', icon: FolderGit2, keywords: ['portfolio', 'ringanswered', 'work', 'repos'], run: go('projects') },
      { id: 'stack', label: 'Go to Stack', hint: '/#stack', icon: Layers, keywords: ['skills', 'tools', 'tech', 'languages'], run: go('stack') },
      { id: 'writing', label: 'Go to Writing', hint: '/#writing', icon: PenLine, keywords: ['blog', 'posts', 'articles'], run: go('writing') },
      { id: 'contact', label: 'Go to Contact', hint: '/#contact', icon: Mail, keywords: ['email', 'hire', 'reach', 'message', 'form'], run: go('contact') },
      { id: 'blog', label: 'Open Blog', hint: '/blog', icon: BookOpen, keywords: ['posts', 'articles', 'writing'], run: () => navigate('/blog') },
      { id: 'resume', label: 'Open resume', hint: 'pdf ↗', icon: FileText, keywords: ['cv', 'pdf', 'download'], run: ext(profile.resumeUrl) },
      {
        id: 'copy-email', label: 'Copy email', hint: profile.email, icon: Copy, keywords: ['mail', 'clipboard', 'address'],
        keepOpen: true,
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            showToast(`Copied ${shortEmail}`);
          } catch {
            showToast(profile.email);
          }
        },
      },
      { id: 'github', label: 'GitHub', hint: 'ninganzaremy ↗', icon: Github, keywords: ['code', 'repos', 'source'], run: ext(profile.links.github) },
      { id: 'linkedin', label: 'LinkedIn', hint: 'remyninganza ↗', icon: Linkedin, keywords: ['profile', 'network', 'social'], run: ext(profile.links.linkedin) },
      { id: 'ringanswered', label: 'RingAnswered', hint: 'ringanswered.com ↗', icon: Phone, keywords: ['receptionist', 'ai', 'voice', 'product', 'saas'], run: ext(profile.links.ringanswered) },
    ];
  }, [navigate, showToast]);

  const filtered = useMemo(() => {
    const scored = [];
    items.forEach((it, order) => {
      const s = score(it, query);
      if (s !== null) scored.push({ it, s, order });
    });
    scored.sort((a, b) => a.s - b.s || a.order - b.order);
    return scored.map((x) => x.it);
  }, [items, query]);

  // Global shortcuts + custom open event.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-command-palette', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-command-palette', onOpen);
    };
  }, []);

  // Open/close side effects: focus, scroll lock, Esc, reset.
  useEffect(() => {
    if (!open) return undefined;
    returnFocusRef.current = document.activeElement;
    setQuery('');
    setIndex(0);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusRaf = requestAnimationFrame(() => inputRef.current?.focus());
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); setOpen(false); }
      // Trap: the input is the only tabbable control, keep focus on it.
      if (e.key === 'Tab') { e.preventDefault(); inputRef.current?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(focusRaf);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      const el = returnFocusRef.current;
      if (el && typeof el.focus === 'function') el.focus();
    };
  }, [open]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  // Clamp highlight when the list shrinks.
  useEffect(() => { setIndex(0); }, [query]);

  // Keep the highlighted row in view.
  useEffect(() => {
    const row = listRef.current?.querySelector('[data-active="true"]');
    row?.scrollIntoView({ block: 'nearest' });
  }, [index, filtered.length]);

  const runItem = useCallback((item) => {
    if (!item) return;
    item.run();
    if (!item.keepOpen) setOpen(false);
  }, []);

  const onInputKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runItem(filtered[index]);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setIndex(Math.max(0, filtered.length - 1));
    }
  };

  const backdrop = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 }, exit: { opacity: 1 } }
    : { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.16 } }, exit: { opacity: 0, transition: { duration: 0.12 } } };
  const panel = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        hidden: { opacity: 0, scale: 0.96, y: -8 },
        show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
        exit: { opacity: 0, scale: 0.98, y: -4, transition: { duration: 0.12 } },
      };

  const activeId = filtered[index] ? `cmdk-item-${filtered[index].id}` : undefined;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cmdk"
          variants={backdrop}
          initial="hidden"
          animate="show"
          exit="exit"
          onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          <motion.div
            className="cmdk__panel"
            variants={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="cmdk__input-row">
              <Search size={18} aria-hidden="true" className="cmdk__search-icon" />
              <input
                ref={inputRef}
                className="cmdk__input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Type a command or search…"
                aria-label="Search commands"
                role="combobox"
                aria-expanded="true"
                aria-controls="cmdk-list"
                aria-activedescendant={activeId}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
              <span className="cmdk__esc kbd" aria-hidden="true">esc</span>
            </div>

            <ul id="cmdk-list" ref={listRef} className="cmdk__list" role="listbox" aria-label="Commands">
              {filtered.length === 0 && (
                <li className="cmdk__empty mono" role="option" aria-selected="false">
                  No matches — try <span className="cmdk__empty-hint">'projects'</span>
                </li>
              )}
              {filtered.map((item, i) => {
                const Icon = item.icon;
                const active = i === index;
                return (
                  <li
                    key={item.id}
                    id={`cmdk-item-${item.id}`}
                    role="option"
                    aria-selected={active}
                    data-active={active ? 'true' : 'false'}
                    className={`cmdk__item ${active ? 'cmdk__item--active' : ''}`.trim()}
                    onMouseEnter={() => setIndex(i)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => runItem(item)}
                  >
                    <Icon size={16} aria-hidden="true" className="cmdk__item-icon" />
                    <span className="cmdk__item-label">{item.label}</span>
                    <span className="cmdk__item-hint mono">{item.hint}</span>
                    {active && <CornerDownLeft size={14} aria-hidden="true" className="cmdk__item-enter" />}
                  </li>
                );
              })}
            </ul>

            <div className="cmdk__foot mono">
              <span><span className="kbd">↑</span><span className="kbd">↓</span> navigate</span>
              <span><span className="kbd">↵</span> select</span>
              <span><span className="kbd">esc</span> close</span>
              <span className="cmdk__foot-right"><span className="kbd">{mac ? '⌘' : 'Ctrl'}</span><span className="kbd">K</span> toggle</span>
            </div>

            <div className="cmdk__toast-slot" aria-live="polite">
              <AnimatePresence>
                {toast && (
                  <motion.div
                    className="cmdk__toast mono"
                    initial={reduce ? { opacity: 1 } : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
                    transition={{ duration: 0.16 }}
                  >
                    <Check size={14} aria-hidden="true" /> {toast}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
