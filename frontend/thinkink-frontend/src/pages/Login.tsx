import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  setUser: (user: string) => void;
}

const Login: React.FC<Props> = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const username = email.split('@')[0];
    localStorage.setItem('username', username);
    setUser(username);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <h2>Login</h2>
      <div className="mb-3">
        <label>Email</label>
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
};

export default Login;