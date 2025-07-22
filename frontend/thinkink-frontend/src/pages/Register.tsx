import React, { useState } from 'react';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('${BASE_URL}/api/accounts/register/', {
        username,
        email,
        password,
      });

      setMessage('Registration successful! You can now log in.');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      if (error.response?.data) {
        const errors = error.response.data;
        const errorMessages = Object.values(errors).flat().join(' ');
        setMessage(`Error: ${errorMessages}`);
      } else {
        setMessage('An unexpected error occurred.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Register</h2>

      {message && <p className="mb-3 text-sm text-red-600">{message}</p>}

      <div className="mb-3">
        <label className="block mb-1">Username</label>
        <input
          type="text"
          className="form-control w-full px-3 py-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          className="form-control w-full px-3 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Password</label>
        <input
          type="password"
          className="form-control w-full px-3 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Register
      </button>
    </form>
  );
};

export default Register;