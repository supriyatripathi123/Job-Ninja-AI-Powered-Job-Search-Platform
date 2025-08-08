import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>JobNinja</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/tools">Tools</Link>
        <Link to="/resume-ai">Resume AI</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
};

export default Header;
