import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  // ... (form state and validation remain the same)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    // ... (logic remains same)
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (formState.name.includes('  ')) {
      newErrors.name = 'Only single spaces are allowed.';
      isValid = false;
    } else {
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (formState.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters long.';
        isValid = false;
      } else if (!nameRegex.test(formState.name)) {
        newErrors.name = 'Name can only contain letters and spaces.';
        isValid = false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formState.email.includes('  ')) {
      newErrors.email = 'Only single spaces are allowed.';
      isValid = false;
    } else if (!emailRegex.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (formState.message.includes('  ')) {
      newErrors.message = 'Only single spaces are allowed.';
      isValid = false;
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors(prev => ({ ...prev, submit: '' }));

    // Show "Waking up" message only if it takes more than 4 seconds
    const wakingUpTimeout = setTimeout(() => {
      setErrors(prev => ({ ...prev, submit: "Server is waking up. Please wait a moment..." }));
    }, 4000);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000/send-email' : 'https://amit-kumar-yadav-jlff.onrender.com/send-email');
      await axios.post(backendUrl, {
        name: formState.name,
        email: formState.email,
        message: formState.message
      });

      clearTimeout(wakingUpTimeout);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      clearTimeout(wakingUpTimeout);
      console.error("Failed to send email.", error);
      setIsSubmitting(false);
      
      // Show the SPECIFIC error from the backend to debug
      const serverError = error.response?.data?.message || "Failed to send message. Please try again.";
      setErrors(prev => ({ ...prev, submit: serverError }));
      
      setTimeout(() => setErrors(prev => ({ ...prev, submit: "" })), 10000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value
    });

    // Clear submission error when user starts typing again
    if (errors.submit) {
      setErrors(prev => ({ ...prev, submit: '' }));
    }

    if (value.includes('  ')) {
      setErrors(prev => ({ ...prev, [name]: 'Only single spaces are allowed.' }));
      return;
    }

    if (name === 'name') {
      const regex = /^[a-zA-Z\s]*$/;
      if (!regex.test(value) && value.length > 0) {
        setErrors(prev => ({ ...prev, [name]: 'Name can only contain letters and spaces.' }));
      } else {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    } else if (errors[name]) {
      // Clear the error message once user begins typing again for other fields
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = '';

    if (value.includes('  ')) {
      error = 'Only single spaces are allowed.';
    } else {
      if (name === 'name') {
        const nameRegex = /^[a-zA-Z\s]*$/;
        if (value.trim().length === 0) {
          error = 'Name is required.';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters long.';
        } else if (!nameRegex.test(value)) {
          error = 'Name can only contain letters and spaces.';
        }
      } else if (name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value.trim().length === 0) {
          error = 'Email is required.';
        } else if (!emailRegex.test(value)) {
          error = 'Please enter a valid email address.';
        }
      } else if (name === 'message' && value.trim().length < 10) {
        error = value.trim().length === 0 ? 'Message is required.' : 'Message must be at least 10 characters long.';
      }
    }

    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const contactVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.section
      id="contact"
      className="contact-section"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-header"
      >
        <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
        <p className="section-subtitle">Looking for a passionate backend or full-stack developer? I'm open to opportunities!</p>
      </motion.div>

      <div className="contact-container">
        <motion.div
          variants={contactVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="contact-info glass-panel"
        >
          <h3>Let's build something scalable.</h3>
          <p className="contact-desc">
            B.Tech CSE graduate and MERN Stack Developer skilled in React.js, Node.js, Express.js, MongoDB, REST APIs, and database engineering. Ready to build scalable and reliable web applications.
          </p>

          <div className="info-items">
            <a 
              href="mailto:ankitsingh1234mgs@gmail.com?subject=Let's discuss an opportunity&body=Let's discuss an opportunity" 
              title="Click to send an email" 
              className="info-item"
            >
              <div className="info-icon"><Mail size={20} /></div>
              <div className="info-content">
                <h4>Email</h4>
                <p>ankitsingh1234mgs@gmail.com</p>
              </div>
            </a>

            <a 
              href="tel:+917275003033" 
              title="Click to call" 
              className="info-item"
            >
              <div className="info-icon"><Phone size={20} /></div>
              <div className="info-content">
                <h4>Phone</h4>
                <p>+91-7275003033</p>
              </div>
            </a>

            <motion.div variants={itemVariants} className="info-item">
              <div className="info-icon"><MapPin size={20} /></div>
              <div className="info-content">
                <h4>Location</h4>
                <p>Gurugram, Haryana, India</p>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="social-links-contact">
            <a href="https://www.linkedin.com/in/ankit-s-a812aa372" target="_blank" rel="noreferrer" className="social-btn glass-panel" aria-label="LinkedIn"><Linkedin size={22} /></a>
            <a href="https://github.com/AnkitSingh727" target="_blank" rel="noreferrer" className="social-btn glass-panel" aria-label="GitHub"><Github size={22} /></a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50, rotateY: -10 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="contact-form-wrapper glass-panel"
        >
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="John Doe"
                className={errors.name ? 'input-error' : ''}
                required
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="john@example.com"
                className={errors.email ? 'input-error' : ''}
                required
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formState.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Hi Ankit, I have an opportunity..."
                className={errors.message ? 'input-error' : ''}
                required
              ></textarea>
              {errors.message && <span className="error-text">{errors.message}</span>}
            </div>

            {errors.submit && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="error-text" 
                style={{ textAlign: 'center', marginBottom: '1rem', padding: '0.8rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}
              >
                {errors.submit}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={`submit-btn ${isSubmitted ? 'success' : ''}`}
              disabled={isSubmitting}
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Sending...</motion.span>
                ) : isSubmitted ? (
                  <motion.span key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Message Sent!</motion.span>
                ) : (
                  <motion.span key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>Send Message <Send size={18} /></motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
