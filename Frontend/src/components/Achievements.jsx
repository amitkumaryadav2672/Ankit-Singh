import React from 'react';
import { motion } from 'framer-motion';
import './Education.css'; // Reuse timeline styling

const Achievements = () => {
  const achievements = [
    {
      title: 'Professional Certifications',
      subtitle: 'Technical Validation & Training',
      desc: [
        'Java Programming — GeeksforGeeks (Feb. 2025)',
        'SQL for Beginners — Scaler Academy (May. 2025)',
        'MERN Stack Development Certification — ThinkNEXT Technologies (2026)',
        'Full Stack Web Development & Database Architecture'
      ]
    },
    {
      title: 'Academic & Technical Highlights',
      subtitle: 'Chandigarh Group of Colleges Mohali & Projects',
      desc: [
        'Maintained a strong academic record with 7.7 CGPA in B.Tech CSE',
        'Built full-stack production-ready applications including Airbnb-style Home Rental & Incident Management platforms',
        'Deep understanding of RESTful API design, database schemas, and JWT-secured workflows',
        'Proven problem-solving skills in Object-Oriented Programming, DSA, and agile team collaboration'
      ]
    }
  ];

  return (
    <motion.section
      id="achievements"
      className="education-section"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
      style={{ paddingBottom: '6rem' }}
    >
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="section-title">Academic & Extra-Curricular <span className="gradient-text">Achievements</span></h2>
        <p className="section-subtitle">Recognitions, hackathons, and certifications I've earned.</p>
      </div>

      <div className="education-container" style={{ justifyContent: 'center' }}>
        <div className="timeline-side" style={{ maxWidth: '800px', width: '100%' }}>
          <div className="timeline-wrapper">
            {achievements.map((ach, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="timeline-row"
              >
                <div className="timeline-dot" style={{ left: '15px' }}></div>
                <motion.div
                  className="timeline-item glass-panel"
                  whileHover={{ scale: 1.01, x: 10 }}
                  style={{ marginLeft: '40px' }}
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
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Achievements;
