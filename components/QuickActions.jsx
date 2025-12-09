import React from 'react';
import './QuickActions.css';

const QuickActions = () => {
  return (
    <div className="quick-actions">
      <h2>Quick Actions</h2>
      <div className="actions-buttons">
        <button className="action-btn">Upload New MRI</button>
        <button className="action-btn">Start New Analysis</button>
        <button className="action-btn">Request Review from Radiologist</button>
      </div>
    </div>
  );
};

export default QuickActions;