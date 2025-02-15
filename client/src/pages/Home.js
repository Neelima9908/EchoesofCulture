import React from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="home-container">
      <div className="text-container">
        <h1>Welcome to Echoes of Culture</h1>
        <p>Explore and learn about tribes, endangered languages, and how to preserve them.</p>
        <Link to="/about">About Us</Link>
      </div>
      <div className="image-container">
        <img src='/assets/tribePaint.jpg' alt="Tribe" className="rounded-image tribe-image" />
      </div>
    </div>
  );
};

export default Home;
