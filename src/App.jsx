import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Contact from './pages/contact';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function Home() {
  return (
    <section className="hero">
      <h2>Your Dream Job Awaits!</h2>
      <p>Explore jobs, apply with confidence, and ace your career journey with Job Ninja.</p>
      <button>Get Started</button>
    </section>
  );
}

function App() {
  return (
    <Router>
      <div>
        <header>
          <h1>Job Ninja</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={
              <div style={{ padding: "2rem", textAlign: "center" }}>
                <h2>404 - Page Not Found</h2>
              </div>
            }
          />
        </Routes>

        <footer>
          <p>&copy; 2025 Job Ninja. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
