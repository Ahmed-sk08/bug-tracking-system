import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <h1 className="navbar-title">Bug Tracker</h1>
        <ul className="navbar-links">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/bugs">Bug List</Link></li>
          <li><Link to="/add-bug">Add Bug</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
