import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Box, FileText, Package, CheckCircle2 } from 'lucide-react';
import './RepositoryHealth.css';

const ScoreCircle = ({ score, title, icon: Icon, delay }) => {
  // Determine color based on score
  let colorClass = 'score-excellent';
  if (score < 80) colorClass = 'score-good';
  if (score < 60) colorClass = 'score-warning';
  if (score < 40) colorClass = 'score-danger';

  const circumference = 2 * Math.PI * 38; // r=38
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div 
      className="score-card glass-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="score-header">
        <Icon size={18} className="text-muted" />
        <span className="text-secondary">{title}</span>
      </div>
      <div className="circle-container">
        <svg className="progress-ring" width="100" height="100">
          <circle
            className="progress-ring-track"
            strokeWidth="8"
            fill="transparent"
            r="38"
            cx="50"
            cy="50"
          />
          <motion.circle
            className={`progress-ring-circle ${colorClass}`}
            strokeWidth="8"
            fill="transparent"
            r="38"
            cx="50"
            cy="50"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
            style={{
              strokeDasharray: `${circumference} ${circumference}`
            }}
          />
        </svg>
        <div className="score-value">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 1 }}
          >
            {score}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

const RepositoryHealth = ({ scores }) => {
  if (!scores) return null;

  return (
    <div className="repository-health-section mt-12 mb-8">
      <div className="section-header mb-6">
        <h2 className="text-gradient">Repository Health</h2>
        <div className="overall-score flex items-center gap-3">
          <span className="text-secondary">Overall Score:</span>
          <span className={`badge ${scores.overall >= 80 ? 'badge-success' : 'badge-warning'} text-lg`}>
            {scores.overall} / 100
          </span>
        </div>
      </div>
      
      <div className="scores-grid">
        <ScoreCircle 
          score={scores.security || 0} 
          title="Security" 
          icon={Shield} 
          delay={0.1} 
        />
        <ScoreCircle 
          score={scores.architecture || 0} 
          title="Architecture" 
          icon={Box} 
          delay={0.2} 
        />
        <ScoreCircle 
          score={scores.documentation || 0} 
          title="Documentation" 
          icon={FileText} 
          delay={0.3} 
        />
        <ScoreCircle 
          score={scores.dependencies || 0} 
          title="Dependencies" 
          icon={Package} 
          delay={0.4} 
        />
        <ScoreCircle 
          score={scores.code_quality || 0} 
          title="Code Quality" 
          icon={CheckCircle2} 
          delay={0.5} 
        />
      </div>
    </div>
  );
};

export default RepositoryHealth;
