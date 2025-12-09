import React from 'react';
import { useCase } from '../../context/CaseContext';
import './NewCasePage.css';
import NearbyDoctorsMap from '../../components/NearbyDoctorsMap';

const RadiologistPage = () => {
  const { caseData } = useCase();

  if (!caseData) {
    return (
      <div>
        <h1>Radiologist Dashboard</h1>
        <p>No case data available. Please go to 'New Case / Upload' to submit a case.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Radiologist Dashboard</h2>
      <p style={{ color: '#333', marginBottom: '20px' }}>This is where the radiologist will review cases and generate reports.</p>

      <div className="metadata-form">
        <h2>Patient Information</h2>
        <div className="form-group">
          <label>Name:</label>
          <p>{caseData.patient.name}</p>
        </div>
        <div className="form-group">
          <label>Age:</label>
          <p>{caseData.patient.age}</p>
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <p>{caseData.patient.gender}</p>
        </div>
        <div className="form-group">
          <label>Contact No.:</label>
          <p>{caseData.patient.contact}</p>
        </div>
      </div>

      <div className="metadata-form">
        <h2>Case Metadata</h2>
        <div className="form-group">
          <label>Hospital / Department:</label>
          <p>{caseData.metadata.hospital}</p>
        </div>
        <div className="form-group">
          <label>Case description / notes:</label>
          <p>{caseData.metadata.description}</p>
        </div>
      </div>

      <div className="post-upload-actions">
        <button className="action-btn" onClick={() => window.open('/brain_report.pdf', '_blank')}>Generate MRI Report</button>
      </div>

      <NearbyDoctorsMap />
    </div>
  );
};

export default RadiologistPage;
