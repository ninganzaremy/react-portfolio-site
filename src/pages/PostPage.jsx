import './blog.css';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Link2 } from 'lucide-react';
import { Card, Button } from '../components/ui';
import { posts, getPost, fmtDate } from '../data/posts';
import NotFound from './NotFound';

function CopyLink() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    const url = window.location.href;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for insecure contexts / older browsers
        const ta = document.createElement('textarea');
        ta.value = url;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      icon={copied ? Check : Link2}
      onClick={copy}
      className={`post__copy ${copied ? 'post__copy--done' : ''}`.trim()}
      aria-live="polite"
    >
      {copied ? 'Copied' : 'Copy link'}
    </Button>
  );
}

export default function PostPage() {
  const { slug } = useParams();
  const post = getPost(slug);

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} — Remy Ninganza`;
  }, [slug, post]);

  if (!post) return <NotFound />;

  const index = posts.findIndex((p) => p.slug === post.slug);
  const newer = index > 0 ? posts[index - 1] : null;
  const older = index < posts.length - 1 ? posts[index + 1] : null;

  return (
    <article className="post" aria-labelledby="post-title">
      <div className="container post__inner">
        <nav className="post__back" aria-label="Breadcrumb">
          <Link to="/blog" className="post__back-link mono">
            <ArrowLeft aria-hidden="true" />
            <span>cd ../blog</span>
          </Link>
        </nav>

        <header className="post__head">
          {post.tags?.length > 0 && (
            <p className="post__eyebrow eyebrow">
              <span className="faint">{'//'}</span> {post.tags.join(' · ')}
            </p>
          )}
          <h1 id="post-title" className="post__title">{post.title}</h1>
          <div className="post__metarow">
            <p className="post__meta mono">
              <time dateTime={post.date}>{fmtDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>Remy Ninganza</span>
            </p>
            <CopyLink />
          </div>
        </header>

        <figure className="post__cover">
          <img src={post.image} alt="" width="1280" height="720" decoding="async" />
        </figure>

        <div className="post-body">{post.body}</div>

        <footer className="post__foot">
          <div className="post__share">
            <span className="mono faint">share</span>
            <CopyLink />
          </div>

          <nav className="post__nav" aria-label="More posts">
            {newer ? (
              <Card as={Link} to={`/blog/${newer.slug}`} hover className="post__nav-card post__nav-card--newer">
                <span className="post__nav-label mono">
                  <ArrowLeft aria-hidden="true" /> newer
                </span>
                <span className="post__nav-title">{newer.title}</span>
              </Card>
            ) : (
              <Card className="post__nav-card post__nav-card--empty" aria-hidden="true">
                <span className="post__nav-label mono">newest post</span>
              </Card>
            )}
            {older ? (
              <Card as={Link} to={`/blog/${older.slug}`} hover className="post__nav-card post__nav-card--older">
                <span className="post__nav-label mono">
                  older <ArrowRight aria-hidden="true" />
                </span>
                <span className="post__nav-title">{older.title}</span>
              </Card>
            ) : (
              <Card className="post__nav-card post__nav-card--empty" aria-hidden="true">
                <span className="post__nav-label mono">oldest post</span>
              </Card>
            )}
          </nav>
        </footer>
      </div>
    </article>
  );
}
