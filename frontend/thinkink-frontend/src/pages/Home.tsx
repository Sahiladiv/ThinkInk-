import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home: React.FC = () => {
  return (
    <div className="container my-5">
      {/* Search Bar */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <input type="text" className="form-control" placeholder="Search..." />
        </div>
      </div>

      {/* Blog Sections */}
      <div className="row">
        {/* Blogs */}
        <div className="col-md-6 mb-4">
          <h3>Blogs</h3>
          <div className="card mb-3 shadow-sm">
            <div className="card-body">Introducing Our New Feature: Onboarding Flow</div>
          </div>
          <div className="card mb-3 shadow-sm">
            <div className="card-body">2025 Tech Trends Summary</div>
          </div>
        </div>

        {/* Recommended Blogs */}
        <div className="col-md-6 mb-4">
          <h3>Recommended Blogs</h3>
          <div className="card mb-3 shadow-sm">
            <div className="card-body">Tips for Better React Code</div>
          </div>
          <div className="card mb-3 shadow-sm">
            <div className="card-body">Understanding JWT Authentication</div>
          </div>
          <div className="card mb-3 shadow-sm">
            <div className="card-body">How to Build a Blog App with Django</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
