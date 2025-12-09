import React, { useState } from 'react';
import AppHeader from './AppHeader';
import Sidebar from './Sidebar';
import './AppLayout.css';

const AppLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`app-layout ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <AppHeader onToggleSidebar={toggleSidebar} />
      <div className="app-body">
        <Sidebar isOpen={isSidebarOpen} />
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;