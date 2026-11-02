import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Window } from '../ui';
import { PROMPT, HINT_LINE, buildSession, runCommand } from '../../data/terminal';
import './Terminal.css';

const TYPE_MIN_MS = 35;
const TYPE_JITTER_MS = 25;
const WINDOW_TITLE = `${PROMPT.user}@${PROMPT.host} — zsh`;

/* ------------------------------------------------------------------ */
/* Line rendering                                                      */
/* ------------------------------------------------------------------ */
function toneClass(tone) {
  return tone ? `term__t-${tone}` : undefined;
}

/** Plain-text version of a line, for the aria-live announcer. */
function lineText(line) {
  if (typeof line === 'string') return line;
  if (line.kind === 'columns') return line.items.map((i) => i.text).join(', ');
  if (line.segments) return line.segments.map((s) => s.text).join('');
  return line.text ?? '';
}

function Line({ line }) {
  if (typeof line === 'string') return <span>{line}</span>;
  if (line.kind === 'columns') {
    return (
      <span className="term__cols">
        {line.items.map((item, i) => (
          <span key={i} className={toneClass(item.tone)}>{item.text}</span>
        ))}
      </span>
    );
  }
  if (line.segments) {
    return (
      <>
        {line.segments.map((s, i) => (
          <span key={i} className={toneClass(s.tone)}>{s.text}</span>
        ))}
      </>
    );
  }
  return <span className={toneClass(line.tone)}>{line.text}</span>;
}

function Prompt() {
  return (
    <span className="term__prompt" aria-hidden="true">
      <span className="term__t-accent">{PROMPT.user}@{PROMPT.host}</span>
      <span className="term__t-dim"> {PROMPT.cwd} </span>
      <span className="term__t-bright">{PROMPT.sigil}</span>{' '}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function Terminal() {
  const reduce = useReducedMotion();
  const script = useMemo(() => buildSession(), []);

  const [entries, setEntries] = useState([]);
  const [typed, setTyped] = useState('');
  const [playing, setPlaying] = useState(true);
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [live, setLive] = useState('');

  const idRef = useRef(0);
  const skipRef = useRef(false);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const historyRef = useRef([]);
  const histIdxRef = useRef(-1);
  const draftRef = useRef('');

  const nextId = useCallback(() => {
    idRef.current += 1;
    return idRef.current;
  }, []);
  const cmdEntry = useCallback((text) => ({ id: nextId(), type: 'cmd', text }), [nextId]);
  const outEntry = useCallback((line) => ({ id: nextId(), type: 'out', line }), [nextId]);
  const push = useCallback((items) => setEntries((prev) => [...prev, ...items]), []);

  /** Full transcript of the scripted session, used when skipping. */
  const transcript = useCallback(() => {
    const out = [];
    for (const step of script) {
      out.push(cmdEntry(step.cmd));
      for (const line of step.output) out.push(outEntry(line));
    }
    out.push(outEntry(HINT_LINE));
    return out;
  }, [script, cmdEntry, outEntry]);

  const finish = useCallback(() => {
    if (skipRef.current) return;
    skipRef.current = true;
    setEntries(transcript());
    setTyped('');
    setPlaying(false);
    setLive('Session ready. Type help for commands.');
  }, [transcript]);

  /* Autoplay --------------------------------------------------------- */
  useEffect(() => {
    if (reduce) {
      finish();
      return undefined;
    }
    let cancelled = false;
    const timers = new Set();
    const sleep = (ms) =>
      new Promise((resolve) => {
        const t = setTimeout(() => { timers.delete(t); resolve(); }, ms);
        timers.add(t);
      });
    const stop = () => cancelled || skipRef.current;

    (async () => {
      setEntries([]);
      await sleep(600);
      for (const step of script) {
        let acc = '';
        for (const ch of step.cmd) {
          if (stop()) return;
          acc += ch;
          setTyped(acc);
          await sleep(TYPE_MIN_MS + Math.random() * TYPE_JITTER_MS);
        }
        if (stop()) return;
        await sleep(280);
        if (stop()) return;
        setTyped('');
        push([cmdEntry(step.cmd)]);
        for (const line of step.output) {
          await sleep(40 + Math.random() * 50);
          if (stop()) return;
          push([outEntry(line)]);
        }
        setLive(step.output.map(lineText).join('. '));
        await sleep(700);
      }
      if (stop()) return;
      push([outEntry(HINT_LINE)]);
      skipRef.current = true;
      setPlaying(false);
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reduce, script, finish, push, cmdEntry, outEntry]);

  /* Any key while autoplaying finishes the script. ------------------- */
  useEffect(() => {
    if (!playing) return undefined;
    const onKey = () => finish();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [playing, finish]);

  /* Keep the newest line visible without touching page scroll. ------- */
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries, typed, value]);

  /* Interaction ------------------------------------------------------ */
  const handleClick = () => {
    // One click both skips the autoplay and hands the keyboard to the prompt,
    // so a visitor's first keystrokes never vanish.
    if (playing) finish();
    inputRef.current?.focus({ preventScroll: true });
  };

  const clear = () => {
    setEntries([]);
    setLive('Screen cleared.');
  };

  const submit = () => {
    const raw = value;
    setValue('');
    histIdxRef.current = -1;
    draftRef.current = '';
    if (raw.trim()) {
      const h = historyRef.current;
      if (h[h.length - 1] !== raw) h.push(raw);
    }
    const { lines, action } = runCommand(raw);
    if (action?.type === 'clear') {
      clear();
      return;
    }
    push([cmdEntry(raw), ...lines.map(outEntry)]);
    setLive(lines.map(lineText).join('. ') || `${raw.trim() || 'empty line'}: ok`);
    if (action?.type === 'open' && typeof window !== 'undefined') {
      window.open(action.url, '_blank', 'noopener,noreferrer');
    }
  };

  const onKeyDown = (e) => {
    if (playing) {
      e.preventDefault();
      finish();
      return;
    }
    const h = historyRef.current;
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        submit();
        break;
      case 'ArrowUp': {
        if (!h.length) return;
        e.preventDefault();
        if (histIdxRef.current === -1) {
          draftRef.current = value;
          histIdxRef.current = h.length - 1;
        } else if (histIdxRef.current > 0) {
          histIdxRef.current -= 1;
        }
        setValue(h[histIdxRef.current]);
        break;
      }
      case 'ArrowDown': {
        if (histIdxRef.current === -1) return;
        e.preventDefault();
        if (histIdxRef.current < h.length - 1) {
          histIdxRef.current += 1;
          setValue(h[histIdxRef.current]);
        } else {
          histIdxRef.current = -1;
          setValue(draftRef.current);
        }
        break;
      }
      case 'Escape':
        e.currentTarget.blur();
        break;
      case 'l':
      case 'L':
        if (e.ctrlKey) {
          e.preventDefault();
          clear();
        }
        break;
      case 'c':
      case 'C':
        // Ctrl+C is "copy" on Windows/Linux: only treat it as an interrupt when nothing is selected.
        if (e.ctrlKey && e.currentTarget.selectionStart === e.currentTarget.selectionEnd) {
          e.preventDefault();
          push([cmdEntry(`${value}^C`)]);
          setValue('');
          histIdxRef.current = -1;
        }
        break;
      default:
        break;
    }
  };

  const status = playing ? 'autoplay · any key to skip' : focused ? 'interactive · ready' : 'click to type';

  return (
    <Window
      title={WINDOW_TITLE}
      className={`term ${playing ? 'is-playing' : ''} ${focused ? 'is-focused' : ''}`.trim()}
      role="region"
      aria-label="interactive terminal"
      onClick={handleClick}
      right={<span className="term__status" aria-hidden="true">{status}</span>}
    >
      <div className="term__body" ref={bodyRef}>
        <ol className="term__lines" aria-label="terminal output">
          {entries.map((e) =>
            e.type === 'cmd' ? (
              <li key={e.id} className="term__line term__line--cmd">
                <Prompt />
                <span className="term__t-bright">{e.text}</span>
              </li>
            ) : (
              <li key={e.id} className="term__line">
                <Line line={e.line} />
              </li>
            ),
          )}
        </ol>

        <div className="term__input-row">
          <Prompt />
          <span className="term__typed">{playing ? typed : value}</span>
          <span className="term__cursor" aria-hidden="true" />
          <input
            ref={inputRef}
            className="term__input"
            type="text"
            aria-label="terminal input"
            aria-describedby="term-hint"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="send"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>
      </div>

      <span id="term-hint" className="sr-only">
        Type a command and press Enter. Try help. Up and Down arrows cycle history.
      </span>
      <div className="sr-only" aria-live="polite" aria-atomic="true">{live}</div>
    </Window>
  );
}
