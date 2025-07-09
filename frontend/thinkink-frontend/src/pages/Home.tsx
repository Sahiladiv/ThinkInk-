import React from 'react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-wrapper">
      <div className="home-container">
        <section className="hero-section text-center">
          <h1 className="hero-title">Home of Ideas</h1>
          <p className="hero-subtitle">
            Discover insightful stories, share your unique voice, and explore ideas that matter. <br />
            Whether you're here to read or write, ThinkInk is your creative home.
          </p>
          <button className="btn-dark big-button">Start Exploring</button>
        </section>
      </div>
    </div>
  );
};

export default Home;
