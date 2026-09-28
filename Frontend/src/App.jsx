import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <div className="app-container">
          <Navbar />
          <main>
            <Hero />
            <Education />
            <Projects />
            <Skills />
            <Achievements />
            <Contact />
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
