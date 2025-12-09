import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <nav className="sidebar-nav">
        <NavLink to="/app/dashboard" className="nav-link">Dashboard</NavLink>
        <NavLink to="/app/cases" className="nav-link">Cases</NavLink>
        <NavLink to="/app/new-case" className="nav-link">New Case / Upload</NavLink>
        <NavLink to="/app/radiologist" className="nav-link">Radiologist</NavLink>
        <NavLink to="/app/studio" className="nav-link">3D Studio</NavLink>
        <NavLink to="/app/voice-console" className="nav-link">Voice Console</NavLink>
        <NavLink to="/app/reports" className="nav-link">Reports</NavLink>
        <NavLink to="/app/team" className="nav-link">Team / Notes</NavLink>
        <NavLink to="/app/settings" className="nav-link">Settings</NavLink>
        <NavLink to="/" className="nav-link back-to-home">Back to Home</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;