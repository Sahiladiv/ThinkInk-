import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const genres = ['Adventure', 'Romance', 'Sci-fi', 'Horror', 'Mystery', 'Fantasy'];

const Onboarding: React.FC = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleGenre = (value: string) => {
    setSelectedGenres((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError('Missing token. Please login again.');
      return;
    }

    try {
      const preferences = selectedGenres.map((g) => g.toLowerCase());
      const res = await axios.post(
        'http://127.0.0.1:8000/api/onboarding/',
        { preferences }, // ✅ MATCHES Django model
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        navigate('/');
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (err: any) {
      console.error('Onboarding submission failed:', err.response?.data || err.message);
      setError('Failed to submit preferences. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="col-lg-8 mx-auto">
        <h1 className="display-5 fw-bold mb-3">Onboarding</h1>
        <p className="lead text-muted mb-4">Let’s personalize your ThinkInk experience.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <h4 className="fw-semibold mb-3">What genres do you enjoy?</h4>
            <div className="row">
              {genres.map((genre) => (
                <div className="col-6 col-md-4 mb-2" key={genre}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`genre-${genre}`}
                      checked={selectedGenres.includes(genre)}
                      onChange={() => toggleGenre(genre)}
                    />
                    <label className="form-check-label" htmlFor={`genre-${genre}`}>
                      {genre}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button
            type="submit"
            className="btn btn-primary px-4 py-2"
            disabled={loading || selectedGenres.length === 0}
          >
            {loading ? 'Submitting...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
