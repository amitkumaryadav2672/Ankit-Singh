import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Sun, Moon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Check local storage for theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '#home' },
    { name: 'Experience', path: '#education' },
    { name: 'Projects', path: '#projects' },
    { name: 'Skills', path: '#skills' },
    { name: 'Achievements', path: '#achievements' },
    { name: 'Contact', path: '#contact' },
  ];

  const scrollToSection = (e, path) => {
    e.preventDefault();
    const id = path.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`navbar flex-between ${scrolled ? 'nav-scrolled glass-panel' : ''}`}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="logo gradient-text"
      >
        <a href="#home" onClick={(e) => scrollToSection(e, '#home')} style={{ color: 'inherit', textDecoration: 'none' }}>ANKIT SINGH</a>
      </motion.div>

      <nav className="nav-desktop">
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.1 }}
          className="nav-links"
        >
          {navLinks.map((link, i) => (
            <motion.li key={i} whileHover={{ y: -2 }}>
              <a href={link.path} onClick={(e) => scrollToSection(e, link.path)}>
                {link.name}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </nav>

      <div className="nav-right-section" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span className="menu-text">{mobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-menu glass-panel"
          >
            <ul className="mobile-nav-links">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.path}
                    onClick={(e) => scrollToSection(e, link.path)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}

            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
