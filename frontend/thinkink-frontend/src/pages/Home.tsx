import React from 'react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1 className="hero-title">Human stories & ideas</h1>
        <p className="hero-subtitle">A place to read, write, and deepen your understanding</p>
        <button className="btn-dark big-button">Start reading</button>
      </section>
    </div>
  );
};

export default Home;
