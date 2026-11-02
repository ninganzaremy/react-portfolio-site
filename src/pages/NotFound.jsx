import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Home, BookOpen } from 'lucide-react';
import { Button, Window } from '../components/ui';
import './NotFound.css';

export default function NotFound() {
  const { pathname } = useLocation();

  useEffect(() => {
    const prev = document.title;
    document.title = '404 — Remy Ninganza';
    return () => { document.title = prev; };
  }, []);

  return (
    <section className="nf" aria-labelledby="nf-title">
      <div className="container nf__inner">
        <p className="nf__code mono grad-text" aria-hidden="true">404</p>
        <h1 id="nf-title" className="sr-only">Page not found</h1>

        <Window title="zsh — ~" className="nf__term">
          <pre className="nf__pre mono">
            <span className="nf__prompt">❯</span> open {pathname}{'\n'}
            <span className="nf__err">zsh: no such file or directory: {pathname}</span>{'\n'}
            <span className="nf__prompt">❯</span> <span className="nf__cursor" aria-hidden="true" />
          </pre>
        </Window>

        <p className="nf__text">
          That path does not exist here. It may have moved when the site was rebuilt, or the link was mistyped.
        </p>

        <div className="nf__actions">
          <Button to="/" variant="primary" icon={Home}>cd ~</Button>
          <Button to="/blog" variant="ghost" icon={BookOpen}>Open blog</Button>
        </div>
      </div>
    </section>
  );
}
