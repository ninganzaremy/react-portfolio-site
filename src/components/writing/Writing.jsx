import './Writing.css';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Section, Card, Chip, Button, Reveal } from '../ui';
import { posts, fmtDate } from '../../data/posts';

/**
 * PostCard — a single post teaser. Whole card is the link.
 * Reused by BlogPage; `eager` disables lazy loading for above-the-fold cards.
 */
export function PostCard({ post, eager = false, className = '' }) {
  return (
    <Card
      as={Link}
      to={`/blog/${post.slug}`}
      hover
      glow
      pad={false}
      className={`postcard ${className}`.trim()}
      aria-label={`${post.title} — ${post.readTime}`}
    >
      <div className="postcard__media">
        <img
          src={post.image}
          alt=""
          width="640"
          height="360"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
        <span className="postcard__corner" aria-hidden="true">
          <ArrowUpRight />
        </span>
      </div>
      <div className="postcard__body">
        <p className="postcard__meta mono">
          <time dateTime={post.date}>{fmtDate(post.date)}</time>
          <span className="postcard__dot" aria-hidden="true">·</span>
          <span>{post.readTime}</span>
        </p>
        <h3 className="postcard__title">{post.title}</h3>
        <p className="postcard__excerpt">{post.excerpt}</p>
        {post.tags?.length > 0 && (
          <ul className="postcard__tags" aria-label="Tags">
            {post.tags.slice(0, 3).map((t) => (
              <li key={t}>
                <Chip>{t}</Chip>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}

// Junior-era posts kept for the archive (and the sitemap) but not surfaced on the home page.
const HIDDEN_ON_HOME = new Set(['passive-income-software-engineer', 'no-code-low-code-future']);

export default function Writing() {
  const latest = posts.filter((p) => !HIDDEN_ON_HOME.has(p.slug)).slice(0, 3);

  return (
    <Section
      id="writing"
      index="05"
      eyebrow="writing"
      title="Notes from the field."
      lead="Older long-form posts on Java, AWS and testing, kept for the archive."
    >
      <ul className="writing__grid" aria-label="Latest posts">
        {latest.map((post, i) => (
          <Reveal as="li" key={post.slug} delay={i * 0.08} className="writing__item">
            <PostCard post={post} />
          </Reveal>
        ))}
      </ul>

      <Reveal className="writing__more" delay={0.2}>
        <span className="writing__count mono">{posts.length} posts</span>
        <Button to="/blog" variant="ghost" iconRight={ArrowRight}>
          All posts
        </Button>
      </Reveal>
    </Section>
  );
}
