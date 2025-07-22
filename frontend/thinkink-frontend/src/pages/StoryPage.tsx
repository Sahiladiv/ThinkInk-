import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import './StoryPage.css';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

type Story = {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
  likes: number;
};

const StoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/blogs/story/${id}`);
        if (!response.ok) throw new Error('Failed to fetch story');
        const data = await response.json();
        setStory(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="story-page">
      <button className="back-btn" onClick={() => navigate(-1)}>&larr; Back</button>

      {loading && <p className="status-msg">Loading...</p>}
      {error && <p className="status-msg text-danger">{error}</p>}

      {!loading && !story && !error && (
        <p className="status-msg text-muted">Story not found.</p>
      )}

      {story && (
        <div className="story-content">
          <h1>{story.title}</h1>

          <div className="story-meta">
            <span className="author">{story.author}</span>
            <span className="dot">•</span>
            <span>{formatDate(story.created_at)}</span>
            <span className="dot">•</span>
            <span style={{ color: 'crimson', fontWeight: '500' }}>&hearts; {story.likes}</span>
          </div>

        <div
        className="story-body"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(story.content) }}
        />
                </div>
      )}
    </div>
  );
};

export default StoryPage;
