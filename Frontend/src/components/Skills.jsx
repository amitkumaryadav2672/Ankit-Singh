import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Server, Terminal, Settings, Cpu, Layers, BookOpen, Layout, Brain, BarChart2 } from 'lucide-react';
import './Skills.css';

const Skills = () => {
  const skills = [
    { category: 'Web Technologies', items: ['React.js', 'Node.js', 'Express.js', 'HTML5', 'CSS3', 'Bootstrap', 'EJS', 'JSON', 'JWT', 'Middleware'], icon: <Layout size={20} />, color: 'skill-cyan-blue' },
    { category: 'Programming Languages', items: ['Java', 'JavaScript', 'C++', 'SQL', 'Object Oriented Programming (OOP)'], icon: <Code size={20} />, color: 'skill-cyan-emerald' },
    { category: 'Databases', items: ['MongoDB', 'Mongoose', 'MySQL', 'SQL'], icon: <Database size={20} />, color: 'skill-orange-rose' },
    { category: 'API & Backend Engineering', items: ['REST APIs', 'CRUD Operations', 'API Integration', 'Authentication & Authorization', 'JWT', 'Multer'], icon: <Server size={20} />, color: 'skill-blue-purple' },
    { category: 'Tools & Platforms', items: ['Git', 'GitHub', 'Postman', 'Visual Studio Code', 'npm'], icon: <Settings size={20} />, color: 'skill-indigo' },
    { category: 'Core Knowledge & CS', items: ['Data Structures & Algorithms', 'DBMS', 'OOP', 'SDLC', 'Agile Methodologies'], icon: <BookOpen size={20} />, color: 'skill-pink-rose' },
    { category: 'Soft Skills', items: ['Problem-Solving', 'Analytical Thinking', 'Communication', 'Teamwork', 'Adaptability', 'Time Management'], icon: <Brain size={20} />, color: 'skill-pink-rose' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <motion.section
      id="skills"
      className="skills-section"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="section-title">Technical <span className="gradient-text">Skills</span></h2>
        <p className="section-subtitle">A comprehensive view of my programming languages, frameworks, and developer tools.</p>
      </div>

      <motion.div
        className="skills-grid-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skills.map((skillGroup, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="skill-category glass-panel"
            whileHover={{ y: -5, scale: 1.02, boxShadow: '0 10px 30px -10px rgba(107,70,193,0.3)' }}
          >
            <div className="category-header">
              <div className="icon-wrapper glass-panel">
                {skillGroup.icon}
              </div>
              <h3>{skillGroup.category}</h3>
            </div>
            <div className="skill-tags">
              {skillGroup.items.map((item, i) => (
                <span key={i} className={`skill-tag ${skillGroup.color}`}>{item}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Skills;
