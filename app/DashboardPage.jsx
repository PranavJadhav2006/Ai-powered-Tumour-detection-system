import React from 'react';
import KPICard from '../../components/KPICard';
import ActivityTimeline from '../../components/ActivityTimeline';
import QuickActions from '../../components/QuickActions';
import './DashboardPage.css';

const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <QuickActions />
      </div>
      <div className="kpi-cards-container">
        <KPICard title="Pending Reviews" value="12" icon="📝" />
        <KPICard title="Avg. Inference Time" value="3.4s" icon="⏱️" />
        <KPICard title="Recent Cases" value="5" icon="📂" />
        <KPICard title="Team Activity" value="Active" icon="👥" />
      </div>
      <ActivityTimeline />
    </div>
  );
};

export default DashboardPage;
