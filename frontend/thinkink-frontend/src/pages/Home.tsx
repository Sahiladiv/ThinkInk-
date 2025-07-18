import React from 'react';
import './Home.css';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <div className="home-wrapper">
      <div className="home-container">
        <section className="hero-section text-center">
          <motion.h1
            className="hero-title gradient-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Home of Ideas
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Discover insightful stories, share your unique voice, and explore ideas that matter. <br />
            Whether you're here to read or write, ThinkInk is your creative home.
          </motion.p>

          <motion.button
            className="btn-dark big-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Exploring
          </motion.button>
        </section>

        <section className="features-section">
          <h2>Why ThinkInk?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h4>✍️ Write Freely</h4>
              <p>Publish your stories without judgment or restrictions. Your ideas deserve a voice.</p>
            </div>
            <div className="feature-card">
              <h4>🔍 Discover Creators</h4>
              <p>Explore a curated feed of thinkers, storytellers, and innovators from all walks of life.</p>
            </div>
            <div className="feature-card">
              <h4>💡 Save & Reflect</h4>
              <p>Bookmark the ideas that move you. Build a library of your inspirations.</p>
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <h2>What Our Users Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>
                "ThinkInk unlocked my voice. I never knew I could write something people would actually read."
              </p>
              <span>— Aditi Sharma, Student & Aspiring Writer</span>
            </div>
            <div className="testimonial-card">
              <p>"It's like Medium, but friendlier and more intimate."</p>
              <span>— Rohit Mehta, Indie Developer</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
