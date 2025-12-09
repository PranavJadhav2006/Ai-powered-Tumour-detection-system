import React from 'react';
import './AppHeader.css';

const AppHeader = ({ onToggleSidebar }) => {
  return (
    <header className="app-header">
      <div className="header-left">
        <button className="sidebar-toggle-btn" onClick={onToggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <span className="project-selector">Project: Neuro-AI</span>
        <input type="search" placeholder="Search cases, reports..." className="search-input" />
      </div>
      <div className="header-right">
        <button className="upload-case-btn">Upload Case</button>
        <span className="notification-bell">🔔</span>
        <div className="user-avatar">
          <span>Dr. Smith</span>
          <img src="https://i.pravatar.cc/40" alt="User Avatar" />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;