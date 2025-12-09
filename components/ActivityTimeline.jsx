import React from 'react';
import './ActivityTimeline.css';

const activities = [
  {
    user: 'Dr. Smith',
    action: 'uploaded a new case',
    target: 'Case #12345',
    time: '2 hours ago',
  },
  {
    user: 'Dr. Jones',
    action: 'ran analysis on',
    target: 'Case #12344',
    time: '5 hours ago',
  },
  {
    user: 'Dr. Smith',
    action: 'approved report for',
    target: 'Case #12343',
    time: '1 day ago',
  },
];

const ActivityTimeline = () => {
  return (
    <div className="activity-timeline">
      <h2>Recent Activity</h2>
      <div className="timeline-items">
        {activities.map((activity, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="user">{activity.user}</span>
              <span className="action">{activity.action}</span>
              <span className="target">{activity.target}</span>
              <span className="time">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;
