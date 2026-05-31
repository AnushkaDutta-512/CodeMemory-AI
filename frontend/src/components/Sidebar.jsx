import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, FileText, Code2 } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar glass">
      <div className="sidebar-header">
        <Code2 className="logo-icon text-gradient-accent" size={32} />
        <h2 className="logo-text text-gradient">CodeMemoryAI</h2>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/chat" 
          className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
        >
          <MessageSquare size={20} />
          <span>AI Chat</span>
        </NavLink>
        
        <NavLink 
          to="/reports" 
          className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
        >
          <FileText size={20} />
          <span>Reports</span>
        </NavLink>
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">A</div>
          <div className="user-info">
            <span className="user-name">Developer</span>
            <span className="user-role">Pro Plan</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
