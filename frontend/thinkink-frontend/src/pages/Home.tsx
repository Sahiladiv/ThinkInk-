import React from 'react';
import './Home.css';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <div className="container-fluid px-0"> {/* Remove padding + full width */}
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

          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
