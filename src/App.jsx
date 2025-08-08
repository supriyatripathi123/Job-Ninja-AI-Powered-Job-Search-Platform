import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contact from './pages/contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './Header';
import Footer from './Footer';
import HeroSection from './HeroSection';
import Tools from './pages/Tools';
import ResumeAI from './pages/ResumeAI';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/resume-ai" element={<ResumeAI />} />
            <Route
              path="*"
              element={
                <div style={{ padding: "2rem", textAlign: "center" }}>
                  <h2>404 - Page Not Found</h2>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
