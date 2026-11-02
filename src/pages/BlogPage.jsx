import './blog.css';
import { useEffect } from 'react';
import { Reveal } from '../components/ui';
import { PostCard } from '../components/writing/Writing';
import { posts } from '../data/posts';

export default function BlogPage() {
  useEffect(() => {
    document.title = 'Writing — Remy Ninganza';
  }, []);

  const count = posts.length;

  return (
    <section className="blog" aria-labelledby="blog-title">
      <div className="container">
        <Reveal as="header" className="section-head blog__head">
          <div className="section-head__eyebrow eyebrow">
            <span className="faint">{'//'}</span> writing
          </div>
          <h1 id="blog-title" className="section-head__title">Writing</h1>
          <p className="section-head__lead">
            <span className="mono blog__count">{count}</span> {count === 1 ? 'post' : 'posts'} on Java, AWS and software engineering. Newest first.
            Newest first.
          </p>
        </Reveal>

        <ul className="blog__grid" aria-label="All posts">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.slug} delay={Math.min(i, 5) * 0.06} className="blog__item">
              <PostCard post={post} eager={i < 3} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
