import React from 'react';
import './ResultCard.css';

const ResultCard = ({ title, value }) => {
  return (
    <div className="result-card">
      <div className="title">{title}</div>
      <div className="value">{value}</div>
    </div>
  );
};

export default ResultCard;
