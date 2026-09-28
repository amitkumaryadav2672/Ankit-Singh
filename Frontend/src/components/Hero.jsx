import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Mail, Github, Linkedin, Briefcase, Award, Code2 } from 'lucide-react';
import profileImg from '../assets/ankit.jpg';
import './Hero.css';

const Hero = () => {
  const titles = [
    "MERN Stack Developer",
    "Full Stack Developer",
    "Software Developer",
    "Node.js & Express.js Engineer",
    "React.js Specialist"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Internship', value: 'ThinkNEXT', icon: <Briefcase size={20} /> },
    { label: 'B.Tech CGPA', value: '7.7', icon: <Award size={20} /> },
    { label: 'Projects Built', value: '10+', icon: <Code2 size={20} /> }
  ];

  return (
    <motion.section
      id="home"
      className="hero-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* LEFT SIDE: Large Profile Image */}
      <motion.div
        className="hero-image-wrapper"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
      >
        <div className="image-frame glass-panel">
          <img
            src={profileImg}
            alt="Ankit Singh"
            className="large-profile-img"
          />
        </div>
      </motion.div>

      {/* RIGHT SIDE: Text Content */}
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hero-badge glass-panel"
        >
          <span className="pulse-dot"></span> Seeking Entry-Level MERN / Full Stack Developer Roles
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hero-title"
        >
          Hi, I'm <span className="gradient-text">Ankit Singh</span><br />
          <div className="rotating-title-container">
            <AnimatePresence mode="wait">
              <motion.span
                key={titles[index]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="rotating-title"
              >
                {titles[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hero-subtitle"
        >
          B.Tech CSE graduate (2026) seeking an entry-level MERN Stack / Full Stack Developer position with strong skills in React.js, JavaScript, Node.js, Express.js, MongoDB, REST APIs, HTML, and CSS. Eager to apply software development skills, build scalable web applications, and contribute to organizational growth.
        </motion.p>

        {/* Stats Section */}
        <motion.div 
          className="hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {stats.map((stat, i) => (
            <div key={i} className="stat-item glass-panel">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="hero-cta"
        >
          <a href="#contact" className="btn btn-primary">
            Hire Me <ArrowRight size={18} />
          </a>
          <a href="#projects" className="btn btn-secondary">
            View Projects
          </a>
          <a href="/Ankit Singh Resume.pdf" download="Ankit_Singh_Resume.pdf" className="btn btn-outline">
            Resume <Download size={18} />
          </a>
        </motion.div>

        {/* Social Icons */}
        <motion.div 
          className="hero-socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a href="https://www.linkedin.com/in/ankit-s-a812aa372" target="_blank" rel="noreferrer" className="social-icon-link" aria-label="LinkedIn"><Linkedin size={22} /></a>
          <a href="https://github.com/AnkitSingh727" target="_blank" rel="noreferrer" className="social-icon-link" aria-label="GitHub"><Github size={22} /></a>
          <a href="mailto:ankitsingh1234mgs@gmail.com?subject=Let's discuss an opportunity&body=Let's discuss an opportunity" className="social-icon-link" aria-label="Send Email"><Mail size={22} /></a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
