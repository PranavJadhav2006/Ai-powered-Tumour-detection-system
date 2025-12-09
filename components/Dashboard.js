// components/Dashboard.js
import React from 'react';
import './Dashboard.css';

const Dashboard = ({ analysisResult }) => {
  if (!analysisResult || analysisResult.status !== 'success' || !analysisResult.report) {
    return <div>No analysis data available.</div>;
  }

  const { report, ai_features: features, gradcam } = analysisResult;

  const totalVolume = report.total_tumor_volume_cm3 || 0;
  const enhancingVolume = report.enhancing_tumor_volume_cm3 || 0;
  const edemaVolume = report.edema_volume_cm3 || 0;

  const getWidthPercent = (volume) => {
    return totalVolume ? `${(volume / totalVolume) * 100}%` : '0%';
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Brain Tumor Analysis Report</h2>
        <div className="confidence-badge">
          Confidence: {report.confidence_score ? (report.confidence_score * 100).toFixed(1) : 0}%
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card detection">
          <h3>Detection Status</h3>
          <div className="metric-value">{report.detection_status || 'N/A'}</div>
        </div>

        <div className="metric-card volume">
          <h3>Total Volume</h3>
          <div className="metric-value">{totalVolume} cm³</div>
        </div>

        <div className="metric-card location">
          <h3>Location</h3>
          <div className="metric-value">{report.tumor_location || 'N/A'}</div>
        </div>

        <div className="metric-card regions">
          <h3>Regions Detected</h3>
          <div className="metric-value">
            {Array.isArray(report.tumor_regions_detected)
              ? report.tumor_regions_detected.join(', ')
              : report.tumor_regions_detected || 'N/A'}
          </div>
        </div>
      </div>

      {/* Detailed Volume Breakdown */}
      <div className="volume-breakdown">
        <h3>Volume Breakdown</h3>
        <div className="volume-bars">
          <div className="volume-bar enhancing">
            <div className="volume-label">Enhancing Tumor</div>
            <div className="volume-value">{enhancingVolume} cm³</div>
            <div className="volume-bar-container">
              <div className="volume-fill" style={{ width: getWidthPercent(enhancingVolume) }}></div>
            </div>
          </div>

          <div className="volume-bar edema">
            <div className="volume-label">Edema Region</div>
            <div className="volume-value">{edemaVolume} cm³</div>
            <div className="volume-bar-container">
              <div className="volume-fill" style={{ width: getWidthPercent(edemaVolume) }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Features */}
      {features && (
        <div className="ai-features">
          <h3>AI-Powered Features</h3>
          <div className="features-grid">
            {features.framework && <div className="feature-item">Framework: {features.framework}</div>}
            {features.model_architecture && <div className="feature-item">Model: {features.model_architecture}</div>}
            {features.weights && <div className="feature-item">Weights: {features.weights}</div>}
          </div>
        </div>
      )}

      {/* Clinical Recommendation */}
      <div className="recommendation-card">
        <h3>Clinical Recommendation</h3>
        <p>{report.recommendation || 'No recommendation available.'}</p>
        <div className="recommendation-details">
          <p><strong>Patient ID:</strong> {report.patient_id || 'N/A'}</p>
          <p><strong>Study Date:</strong> {report.study_date ? new Date(report.study_date).toLocaleString() : 'N/A'}</p>
          <p><strong>Analysis Type:</strong> {report.analysis_type || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
