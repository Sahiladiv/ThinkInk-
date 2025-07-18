import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  setUser: (user: string) => void;
}

const Login: React.FC<Props> = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const loginRes = await fetch('http://127.0.0.1:8000/api/accounts/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const loginText = await loginRes.text();
      let loginData;

      try {
        loginData = JSON.parse(loginText);
      } catch {
        throw new Error('Unexpected server response from login.');
      }

      if (!loginRes.ok) {
        throw new Error(loginData.detail || 'Login failed');
      }

      const accessToken = loginData.access;
      const refreshToken = loginData.refresh;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('username', username);
      setUser(username);

      const onboardRes = await fetch('http://127.0.0.1:8000/api/accounts/onboarding-status/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!onboardRes.ok) {
        const onboardText = await onboardRes.text();
        console.error('Onboarding response:', onboardText);
        throw new Error('Failed to check onboarding status.');
      }

      const onboardData = await onboardRes.json();
      const hasOnboarded = onboardData?.onboarded ?? false;

      navigate(hasOnboarded ? '/' : '/onboarding');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 w-50 mx-auto">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label>Username</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default Login;
