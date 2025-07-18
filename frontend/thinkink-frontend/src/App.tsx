import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import WriteBlog from './pages/WriteBlog';
import StoryList from './pages/StoryList';

function App() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/write" element={<WriteBlog />} />
          <Route path="/storylist" element={<StoryList />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
