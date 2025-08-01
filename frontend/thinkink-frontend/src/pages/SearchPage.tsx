import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const { query, results } = location.state || { query: '', results: [] };

  return (
    <div className="container py-4">
      <h3>Search Results for “{query}”</h3>
      {results.length > 0 ? (
        results.map((item: any) => (
          <div key={item.id} className="mb-3 border-bottom pb-2">
            <h5>{item.title}</h5>
            <p className="text-muted">By {item.author} | Similarity: {item.similarity}</p>
            <p>Genres: {item.genres}</p>
            <a href={`/story/${item.id}`} className="btn btn-sm btn-outline-primary">Read More</a>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;
