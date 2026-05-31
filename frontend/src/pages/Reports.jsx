import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileText, Box, ShieldCheck, Package, AlertTriangle, Loader2, Download, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useAppContext } from '../context/AppContext';
import api from '../api';
import './Reports.css';

const TABS = [
  { id: 'readme', label: 'README.md', icon: FileText, endpoint: '/readme', dataKey: 'readme' },
  { id: 'architecture', label: 'ARCHITECTURE.md', icon: Box, endpoint: '/architecture', dataKey: 'architecture' },
  { id: 'security', label: 'SECURITY.md', icon: ShieldCheck, endpoint: '/security', dataKey: 'security' },
  { id: 'dependencies', label: 'DEPENDENCIES.md', icon: Package, endpoint: '/dependencies', dataKey: 'dependencies' },
  { id: 'deadcode', label: 'DEADCODE.md', icon: AlertTriangle, endpoint: '/deadcode', dataKey: 'dead_code' },
];

const Reports = () => {
  const { repoUrl } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') || 'readme';
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [reportsData, setReportsData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialTab !== activeTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (!repoUrl) return;
    
    const fetchReport = async () => {
      // If we already have the data, don't fetch again
      if (reportsData[activeTab]) return;

      const tabConfig = TABS.find(t => t.id === activeTab);
      if (!tabConfig) return;

      setIsLoading(true);
      try {
        const response = await api.post(tabConfig.endpoint, { repo_url: repoUrl });
        setReportsData(prev => ({
          ...prev,
          [activeTab]: response.data[tabConfig.dataKey] || "No data returned."
        }));
      } catch (error) {
        console.error(`Error fetching ${activeTab}:`, error);
        setReportsData(prev => ({
          ...prev,
          [activeTab]: `# Error\n\nFailed to fetch ${tabConfig.label}. Please make sure the backend is running.`
        }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [activeTab, repoUrl, reportsData]);

  const handleTabChange = (tabId) => {
    navigate(`/reports?tab=${tabId}`);
  };

  const handleCopy = () => {
    const content = reportsData[activeTab];
    if (content) {
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const content = reportsData[activeTab];
    if (!content) return;
    
    const tabConfig = TABS.find(t => t.id === activeTab);
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = tabConfig.label;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!repoUrl) {
    return (
      <div className="reports-container flex-center">
        <div className="empty-state text-center">
          <FileText size={48} className="text-muted mb-4 opacity-50 mx-auto" />
          <h3 className="text-secondary">No Repository Selected</h3>
          <p className="text-muted mt-2">Go back to the Dashboard to select a repository.</p>
          <button className="btn btn-accent mt-6" onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="reports-container">
      <header className="reports-header p-6">
        <div className="flex-between">
          <div>
            <h2>Analysis Reports</h2>
            <p className="text-muted">Repository: <span className="text-secondary">{repoUrl}</span></p>
          </div>
          <div className="actions flex gap-4">
            <button className="btn btn-secondary" onClick={handleCopy} disabled={isLoading || !reportsData[activeTab]}>
              {copied ? <Check size={16} className="text-accent-success" /> : <Copy size={16} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button className="btn btn-primary" onClick={handleDownload} disabled={isLoading || !reportsData[activeTab]}>
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>
        
        <div className="tabs-navigation mt-6">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      <div className="report-content p-6">
        {isLoading ? (
          <div className="loading-state flex-center flex-col py-20">
            <Loader2 size={40} className="spinner text-accent-primary mb-4" />
            <p className="text-secondary">Generating {TABS.find(t => t.id === activeTab)?.label}...</p>
            <p className="text-muted text-sm mt-2">This may take a moment for large repositories.</p>
          </div>
        ) : (
          <div className="markdown-container glass-card">
            {reportsData[activeTab] ? (
              <ReactMarkdown
                className="markdown-body custom-markdown"
                components={{
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        {...props}
                        children={String(children).replace(/\n$/, '')}
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                      />
                    ) : (
                      <code {...props} className={className}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {reportsData[activeTab]}
              </ReactMarkdown>
            ) : (
              <div className="text-center py-10 text-muted">No content available.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
