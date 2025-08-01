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
              Find the stories you always wanted to read. <br />
              Write the stories you always wanted to write.
            </motion.p>

          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
