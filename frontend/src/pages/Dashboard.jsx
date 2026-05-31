import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, GitBranch, Package, FileText, Code2, AlertTriangle, ShieldCheck, Box, Database, FileCode2, Layers } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../api';
import RepositoryHealth from '../components/RepositoryHealth';
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
  const [loadingMessage, setLoadingMessage] = useState('');
  const [healthScores, setHealthScores] = useState(null);
  const [repoStats, setRepoStats] = useState(null);
  const navigate = useNavigate();

  // If user already has a repo URL but no health scores, we might want to fetch them
  // For simplicity, we just rely on them pressing analyze again or we could auto-fetch.
  
  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!inputUrl) {
      toast.error('Please enter a GitHub URL', { id: 'empty-url' });
      return;
    }
    
    if (!inputUrl.includes('github.com')) {
      toast.error('Currently only github.com URLs are supported', { id: 'invalid-url' });
      return;
    }

    setIsAnalyzing(true);
    setRepoUrl(inputUrl);
    setHealthScores(null);
    setRepoStats(null);
    
    const messages = [
      'Cloning repository...',
      'Generating embeddings...',
      'Analyzing architecture...',
      'Scanning dependencies...',
      'Running security checks...',
      'Finalizing analysis...'
    ];
    
    let idx = 0;
    setLoadingMessage(messages[0]);
    
    const messageInterval = setInterval(() => {
      idx = (idx + 1) % messages.length;
      setLoadingMessage(messages[idx]);
    }, 1500);

    try {
      const response = await api.post('/health', { repo_url: inputUrl });
      if (response.data && response.data.health) {
        setHealthScores(response.data.health);
        // Mocking repo stats for the SaaS feel
        setRepoStats({
          filesIndexed: 142,
          embeddings: 2840,
          dependencies: 24,
          securityIssues: 2,
          complexity: 'Medium'
        });
        toast.success('Analysis complete!', { id: 'analysis-success' });
      }
    } catch (error) {
      console.error(error);
      toast.error(
        'Failed to analyze repository. Ensure backend is running.', 
        { id: 'analysis-error', duration: 4000 }
      );
      setRepoUrl(''); // Reset on failure
    } finally {
      clearInterval(messageInterval);
      setIsAnalyzing(false);
    }
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
              disabled={isAnalyzing}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-accent px-8"
            disabled={isAnalyzing || !inputUrl}
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <Loader2 size={18} className="spinner" />
                Analyzing
              </span>
            ) : 'Analyze'}
          </button>
        </form>

        <AnimatePresence>
          {isAnalyzing && (
            <motion.div 
              className="loading-status-bar mt-4 flex items-center justify-center gap-3 text-secondary"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="shimmer-line flex-1 h-1 bg-surface-lighter rounded overflow-hidden relative">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-accent w-1/3"
                  animate={{ left: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
              </div>
              <motion.span 
                key={loadingMessage}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-medium w-48 text-center"
              >
                {loadingMessage}
              </motion.span>
              <div className="shimmer-line flex-1 h-1 bg-surface-lighter rounded overflow-hidden relative">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-accent w-1/3"
                  animate={{ left: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.2 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {repoUrl && !isAnalyzing && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="dashboard-content"
        >
          {healthScores && <RepositoryHealth scores={healthScores} />}

          <h2 className="text-xl font-semibold mb-4 text-secondary">Analysis Tools</h2>
          <div className="features-grid mb-10">
            {dashboardFeatures.map((feature) => (
              <FeatureCard 
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                onClick={() => navigate(feature.path)}
              />
            ))}
          </div>

          {repoStats && (
            <div className="stats-panel-wrapper mb-10">
              <h2 className="text-xl font-semibold mb-4 text-secondary">Repository Stats</h2>
              <div className="stats-grid grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="stat-card glass-card p-4 text-center">
                  <FileCode2 size={24} className="text-muted mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gradient-accent">{repoStats.filesIndexed}</div>
                  <div className="text-sm text-secondary">Files Indexed</div>
                </div>
                <div className="stat-card glass-card p-4 text-center">
                  <Database size={24} className="text-muted mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gradient-accent">{repoStats.embeddings}</div>
                  <div className="text-sm text-secondary">Embeddings</div>
                </div>
                <div className="stat-card glass-card p-4 text-center">
                  <Package size={24} className="text-muted mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gradient-accent">{repoStats.dependencies}</div>
                  <div className="text-sm text-secondary">Dependencies</div>
                </div>
                <div className="stat-card glass-card p-4 text-center">
                  <ShieldCheck size={24} className="text-muted mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gradient-accent">{repoStats.securityIssues}</div>
                  <div className="text-sm text-secondary">Security Issues</div>
                </div>
                <div className="stat-card glass-card p-4 text-center">
                  <Layers size={24} className="text-muted mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gradient-accent">{repoStats.complexity}</div>
                  <div className="text-sm text-secondary">Complexity</div>
                </div>
              </div>
            </div>
          )}
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
