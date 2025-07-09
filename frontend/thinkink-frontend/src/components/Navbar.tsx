import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

interface Props {
  user: string | null;
  setUser: (user: string | null) => void;
}

const Navbar: React.FC<Props> = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar shadow-sm">
      <div className="navbar-left">
        <Link className="logo" to="/">ThinkInk</Link>
      </div>
      <div className="navbar-center">
        <Link to="/">Stories</Link>
        <Link to="/write">Write</Link>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <span className="user-greet">Hi, {user}</span>
            <button className="btn btn-dark ms-2" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link ms-2" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
