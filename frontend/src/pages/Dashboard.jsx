import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2, GitBranch, Package, FileText, Code2, AlertTriangle, ShieldCheck, Box } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const FeatureCard = ({ icon: Icon, title, description, onClick, isLoading }) => (
  <motion.div 
    className="dashboard-card glass-card"
    whileHover={{ y: -5 }}
    onClick={onClick}
  >
    <div className="card-header">
      <div className="card-icon">
        <Icon size={24} className="text-gradient-accent" />
      </div>
      {isLoading && <Loader2 size={18} className="spinner text-gradient-accent" />}
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </motion.div>
);

const Dashboard = () => {
  const { repoUrl, setRepoUrl } = useAppContext();
  const [inputUrl, setInputUrl] = useState(repoUrl);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!inputUrl) return;
    setIsAnalyzing(true);
    setRepoUrl(inputUrl);
    
    // Simulate initial analysis time
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1500);
  };

  const dashboardFeatures = [
    {
      id: 'readme',
      icon: FileText,
      title: 'README Generator',
      description: 'Auto-generate a comprehensive README.md for the repository.',
      path: '/reports?tab=readme'
    },
    {
      id: 'chat',
      icon: Code2,
      title: 'Repository Q&A',
      description: 'Ask questions about the codebase and get AI-powered answers.',
      path: '/chat'
    },
    {
      id: 'architecture',
      icon: Box,
      title: 'Architecture Analysis',
      description: 'Analyze system architecture and component relationships.',
      path: '/reports?tab=architecture'
    },
    {
      id: 'deadcode',
      icon: AlertTriangle,
      title: 'Dead Code Detection',
      description: 'Identify unused functions, variables, and files.',
      path: '/reports?tab=deadcode'
    },
    {
      id: 'security',
      icon: ShieldCheck,
      title: 'Security Scanner',
      description: 'Scan for potential security vulnerabilities and secrets.',
      path: '/reports?tab=security'
    },
    {
      id: 'dependencies',
      icon: Package,
      title: 'Dependency Analyzer',
      description: 'Review package dependencies and outdated versions.',
      path: '/reports?tab=dependencies'
    }
  ];

  return (
    <div className="dashboard-container p-8">
      <header className="dashboard-header mb-8">
        <h1 className="text-gradient">Repository Intelligence</h1>
        <p className="text-secondary mt-2">Analyze your GitHub repository with advanced AI tools.</p>
      </header>

      <div className="repo-input-section glass-card p-6 mb-10">
        <form onSubmit={handleAnalyze} className="repo-form flex gap-4">
          <div className="input-wrapper flex-1 relative">
            <Search className="input-icon absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
            <input 
              type="text" 
              className="input-field w-full pl-12 py-3"
              placeholder="https://github.com/username/repository"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-accent px-8"
            disabled={isAnalyzing || !inputUrl}
          >
            {isAnalyzing ? (
              <>
                <Loader2 size={18} className="spinner" />
                Analyzing...
              </>
            ) : 'Analyze'}
          </button>
        </form>
      </div>

      {repoUrl && !isAnalyzing && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="features-grid"
        >
          {dashboardFeatures.map((feature) => (
            <FeatureCard 
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              onClick={() => navigate(feature.path)}
            />
          ))}
        </motion.div>
      )}
      
      {!repoUrl && !isAnalyzing && (
        <div className="empty-state flex-center flex-col text-center mt-20">
          <GitBranch size={48} className="text-muted mb-4 opacity-50" />
          <h3 className="text-secondary">No Repository Selected</h3>
          <p className="text-muted mt-2">Enter a GitHub URL above to start analyzing.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
