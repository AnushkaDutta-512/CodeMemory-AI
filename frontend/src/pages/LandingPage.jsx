import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, GitBranch, Terminal, Zap, Shield, Search } from 'lucide-react';
import './LandingPage.css';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div 
    className="feature-card glass-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="icon-wrapper">
      <Icon size={24} className="text-gradient-accent" />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </motion.div>
);

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Search,
      title: "Repository Intelligence",
      description: "Instantly analyze and understand complex codebases using advanced AI models."
    },
    {
      icon: Terminal,
      title: "Interactive Chat",
      description: "Talk to your code. Ask questions, get explanations, and find bugs faster."
    },
    {
      icon: Zap,
      title: "Auto-generate READMEs",
      description: "Create comprehensive, professional README files with a single click."
    },
    {
      icon: Shield,
      title: "Security & Dependencies",
      description: "Scan for vulnerabilities and analyze your dependency tree effortlessly."
    }
  ];

  return (
    <div className="landing-page">
      <div className="landing-nav">
        <div className="logo flex-center" style={{ gap: '0.75rem' }}>
          <Code2 size={28} className="text-gradient-accent" />
          <span className="logo-text text-gradient">CodeMemoryAI</span>
        </div>
        <div className="nav-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="github-link flex-center">
            <GitBranch size={20} />
            <span>Star on GitHub</span>
          </a>
        </div>
      </div>

      <main className="landing-main">
        <motion.div 
          className="hero-section text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="badge glass">✨ The new standard for code analysis</div>
          <h1 className="hero-title">
            Unlock the power of <br />
            <span className="text-gradient-accent">Repository Intelligence</span>
          </h1>
          <p className="hero-subtitle">
            An AI-powered platform that analyzes GitHub repositories. 
            Generate documentation, detect dead code, and chat with your codebase.
          </p>
          
          <div className="cta-group flex-center">
            <button className="btn btn-accent btn-lg" onClick={() => navigate('/dashboard')}>
              Analyze Repository
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/dashboard')}>
              Generate README
            </button>
          </div>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.2 + (index * 0.1)}
            />
          ))}
        </div>
      </main>
      
      <div className="glow-effect"></div>
    </div>
  );
};

export default LandingPage;
