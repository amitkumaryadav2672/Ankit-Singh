import React from 'react';
import { motion } from 'framer-motion';
import './Education.css';

const Education = () => {
  const achievements = [
    {
      title: 'MERN Stack Development Internship',
      subtitle: 'ThinkNEXT Technologies — Chandigarh, IN',
      date: '02/2026 – 07/2026',
      desc: [
        'Developed and supported full-stack web applications using React.js, JavaScript, Node.js, Express.js, MongoDB, and REST APIs.',
        'Implemented CRUD operations, JWT authentication, middleware, API integration, data validation, and error handling to build reliable application workflows.',
        'Used Git/GitHub, Postman, and debugging practices while following software development and testing principles.'
      ]
    }
  ];

  const education = [
    { degree: 'Bachelor of Technology (BTECH) — CSE', school: 'Chandigarh Group of Colleges, Mohali', date: '06/2022 – 07/2026', score: 'CGPA: 7.7 / 10' }
  ];

  return (
    <motion.section
      id="education"
      className="education-section"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="education-container">
        {/* Left Side: Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="timeline-side"
        >
          <div className="section-header align-left">
            <h2 className="section-title">Professional <span className="gradient-text">Experience</span></h2>
          </div>

          <div className="timeline-wrapper">
            {achievements.map((ach, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="timeline-row"
              >
                <div className="timeline-dot"></div>
                <motion.div
                  className="timeline-item glass-panel"
                  whileHover={{ scale: 1.0, x: 10 }}
                >
                  <h3>{ach.title}</h3>
                  <p className="school">{ach.subtitle}</p>
                  {Array.isArray(ach.desc) ? (
                    <ul className="exp-desc-list">
                      {ach.desc.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="exp-desc">{ach.desc}</p>
                  )}
                  {ach.date && (
                    <div className="edu-meta" style={{ marginTop: '0.5rem' }}>
                      <span className="date gradient-text">{ach.date}</span>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="timeline-side"
        >
          <div className="section-header align-left">
            <h2 className="section-title">Formal <span className="gradient-text">Education</span></h2>
          </div>

          <div className="timeline-wrapper">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="timeline-row"
              >
                <div className="timeline-dot right-dot"></div>
                <motion.div
                  className="timeline-item glass-panel"
                  whileHover={{ scale: 1.0, x: -10 }}
                >
                  <h3>{edu.degree}</h3>
                  <p className="school">{edu.school}</p>
                  <div className="edu-meta">
                    <span className="date">{edu.date}</span>
                    <span className="score gradient-text">{edu.score}</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Education;
