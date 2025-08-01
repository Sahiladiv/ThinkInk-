import React, { useEffect, useState } from 'react';

const Recommend: React.FC = () => {
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recommendations/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => setStories(data.recommendations))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="recommendations">
      <h2>Recommended Stories</h2>
      {stories.length === 0 ? <p>No recommendations yet.</p> : (
        <ul>
          {stories.map(story => (
            <li key={story.id}>
              <strong>{story.title}</strong> by {story.author} (score: {story.score})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Recommend;
