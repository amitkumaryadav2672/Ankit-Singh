import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer glass-panel">
      <div className="footer-content">
        <div className="footer-left">
          &copy; 2026 Ankit Singh. All rights reserved.
        </div>
        <div className="footer-middle">
          <a href="https://github.com/AnkitSingh727" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/ankit-s-a812aa372" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href="mailto:ankitsingh1234mgs@gmail.com?subject=Let's discuss an opportunity&body=Let's discuss an opportunity" aria-label="Email">
            <Mail size={20} />
          </a>
        </div>
        <div className="footer-right">
          Created with ♥ and a mind for logic & a heart for design.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
