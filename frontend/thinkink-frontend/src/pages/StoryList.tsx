import React, { useEffect, useState } from 'react';

type Story = {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
  likes: number; 
};

const StoryList: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/blogs/storylist');
        if (!response.ok) throw new Error('Failed to fetch stories');
        const data = await response.json();
        setStories(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const estimateReadTime = (text: string): string => {
    const words = text.split(' ').length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="container py-5">
      <h1 className="mb-5 fw-bold display-5 text-center">📚 Recent Stories</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {!loading && !error && stories.length === 0 && (
        <div className="text-center text-muted">No stories found.</div>
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {stories.map((story) => (
          <div key={story.id} className="col">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{story.title}</h5>

                <div className="d-flex align-items-center mb-3">
                  <div className="avatar bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '35px', height: '35px' }}>
                    {story.author[0].toUpperCase()}
                  </div>
                  <small className="text-muted">
                    <strong>{story.author}</strong> • {formatDate(story.created_at)} • {estimateReadTime(story.content)}
                  </small>
                </div>

                <p className="card-text text-muted" style={{ flexGrow: 1 }}>
                  {story.content.length > 120 ? story.content.slice(0, 120) + '…' : story.content}
                </p>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <a href={`/stories/${story.id}`} className="btn btn-outline-dark">Read more</a>
                  <div className="d-flex align-items-center">
                    <span style={{ color: 'crimson', fontSize: '1.2rem' }}>&hearts;</span>
                    <span className="ms-1 text-muted">{story.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
};

export default StoryList;
