import React from 'react';
import './KPICard.css';

const KPICard = ({ title, value, icon }) => {
  return (
    <div className="kpi-card">
      <div className="kpi-card-icon">{icon}</div>
      <div className="kpi-card-info">
        <div className="kpi-card-title">{title}</div>
        <div className="kpi-card-value">{value}</div>
      </div>
    </div>
  );
};

export default KPICard;
