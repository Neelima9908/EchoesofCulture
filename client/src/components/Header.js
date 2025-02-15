import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Specific styles for Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Echoes of Culture</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tribes">Tribes</Link></li>
        <li><Link to="/languages">Languages</Link></li>
        <li><Link to="/learn">Learn</Link></li>
        <li><Link to="/add-comment">Add Comment</Link></li>
        <li><Link to="/comments">Comments</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
