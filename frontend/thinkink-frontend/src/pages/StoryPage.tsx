import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import './StoryPage.css';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
  const [likeLoading, setLikeLoading] = useState(false);
  const [liked, setLiked] = useState(false); // new like state

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/blogs/story/${id}`);
        if (!response.ok) throw new Error('Failed to fetch story');
        const data = await response.json();
        const blog = data.blog || data;
        setStory(blog);

        // If your backend returns `liked: boolean`, use it here:
        setLiked(data.liked ?? false); // or just false if not available
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

  const handleLikeToggle = async () => {
    if (!id) return;
    setLikeLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/blogs/story/${id}/like/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      const data = await response.json();
      if (story) {
        setStory({ ...story, likes: data.likes });
        setLiked(data.liked ?? !liked); // if API doesn't return liked, fallback to toggle
      }
    } catch (err) {
      console.error('Error toggling like:', err);
    } finally {
      setLikeLoading(false);
    }
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
            <span
              style={{
                color: liked ? 'crimson' : 'gray',
                fontWeight: 500,
                cursor: 'pointer'
              }}
              onClick={handleLikeToggle}
              title="Like / Unlike"
            >
              {liked ? '❤️' : '♡'} {story.likes}
            </span>
          </div>

          <div
            className="story-body"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(story.content) }}
          />

          <button
            className="like-btn"
            onClick={handleLikeToggle}
            disabled={likeLoading}
          >
            {likeLoading ? 'Processing...' : liked ? '💔 Unlike' : '❤️ Like'}
          </button>
        </div>
      )}
    </div>
  );
};

export default StoryPage;
