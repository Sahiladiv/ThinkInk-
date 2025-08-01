import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

type Story = {
  id: number;
  title: string;
  content: string;
  author?: string;
  created_at?: string;
  likes_count ?: number;
};

const toPlainText = (html: string): string => {
  const clean = DOMPurify.sanitize(html);
  return new DOMParser().parseFromString(clean, 'text/html').body.textContent || '';
};

const truncate = (text: string, n: number) =>
  text.length > n ? text.slice(0, n).trimEnd() + '…' : text;

const estimateReadTime = (html: string): string => {
  const words = toPlainText(html).trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};

const formatDate = (iso: string | undefined) =>
  iso ? new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }) : '';

const StoryList: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}api/blogs/storylist`);
        if (!res.ok) throw new Error('Failed to fetch stories');

        const data = await res.json();
        console.log('Fetched data:', data);

        if (Array.isArray(data.blogs)) {
          setStories(data.blogs);
        } else {
          throw new Error('Unexpected response format: blogs not found');
        }

      } catch (e: any) {
        setError(e.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="container py-5">
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-danger text-center">{error}</p>}
      {!loading && !error && stories.length === 0 && (
        <div className="text-center text-muted">No stories found.</div>
      )}

      <div className="row row-cols-1 row-cols-md-2 g-4">
        {stories.map((story) => {
          const plain = toPlainText(story.content);
          return (
            <div key={story.id} className="col">
              <div className="bg-white shadow-sm rounded p-4 h-100">
                <h5 className="fw-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  {story.title}
                </h5>
                <p className="text-muted mb-3" style={{ fontSize: '0.95rem' }}>
                  {truncate(plain, 140)}
                </p>
                <div className="d-flex justify-content-between align-items-center" style={{ fontSize: '0.85rem' }}>
                  <div className="text-muted">
                    <strong>{story.author || 'Unknown'}</strong> • {formatDate(story.created_at)} • {estimateReadTime(story.content)}
                  </div>
                  <div className="d-flex align-items-center">
                    <span style={{ color: 'crimson' }}>&hearts;</span>
                    <span className="ms-1 text-muted">{story.likes_count  ?? 0}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <Link to={`/story/${story.id}`} className="btn btn-sm btn-outline-dark">
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StoryList;
