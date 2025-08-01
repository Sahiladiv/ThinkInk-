import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

interface Props {
  user: string | null;
  setUser: (user: string | null) => void;
}

const Navbar: React.FC<Props> = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    navigate('/');
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    setSearchLoading(true);
    try {
      const response = await fetch(`${BASE_URL}api/search/search_content?q=${encodeURIComponent(trimmed)}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();

      navigate('/search', {
        state: {
          query: trimmed,
          results: data,
        }
      });
    } catch (error) {
      console.error(error);
      alert('Failed to fetch search results');
    } finally {
      setSearchLoading(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className="navbar shadow-sm d-flex justify-content-between align-items-center px-4 py-2">
      <div className="navbar-left">
        <Link className="navbar-logo text-primary fw-bold fs-4" to="/">ThinkInkStories</Link>
      </div>

      <div className="navbar-center d-flex gap-4">
        <Link className="nav-link text-primary fw-semibold" to="/storylist">Stories</Link>
        <Link className="nav-link text-primary fw-semibold" to="/write">Write</Link>
        {/* <div className="navbar-genre-dropdown">
          <span className="nav-link text-primary fw-semibold genre-toggle">Genres</span>
          <div className="genre-menu">
            <Link to="/genre/fantasy">Fantasy</Link>
            <Link to="/genre/scifi">Sci-Fi</Link>
            <Link to="/genre/romance">Romance</Link>
            <Link to="/genre/horror">Horror</Link>
            <Link to="/genre/thriller">Thriller</Link>
            <Link to="/genre/nonfiction">Non-Fiction</Link>
            <Link to="/genre/mystery">Mystery</Link>
            <Link to="/genre/youngadult">Young Adult</Link>
          </div>
        </div> */}
      </div>

      <form className="navbar-search" onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control"
          placeholder="Search stories/authors"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={searchLoading}
        />
      </form>

      <div className="navbar-right d-flex align-items-center">
        {user ? (
          <>
            <span className="me-3 text-muted">Hi, {user}</span>
            <button className="btn btn-dark" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
            <Link className="btn btn-primary" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
