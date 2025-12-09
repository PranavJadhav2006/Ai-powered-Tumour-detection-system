import React, { useState } from 'react';
import { useCase } from '../../context/CaseContext';
import './NewCasePage.css';
import NearbyDoctorsMap from '../../components/NearbyDoctorsMap';

const RadiologistPage = () => {
  const { caseData } = useCase();
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPredictionResult(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an MRI scan to upload.");
      return;
    }

    setLoading(true);
    setPredictionResult(null);
    setError(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:5001/predict_mri', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get prediction from model.');
      }

      const data = await response.json();
      setPredictionResult(data);
    } catch (err) {
      console.error("Error uploading MRI for prediction:", err);
      setError(err.message || "An unexpected error occurred during prediction.");
    } finally {
      setLoading(false);
    }
  };

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

      <div className="mri-uploader" style={{ marginBottom: '20px' }}>
        <label htmlFor="mri-upload" style={{ display: 'block', marginBottom: '10px', fontSize: '1.1em', color: '#333' }}>Upload MRI Scan:</label>
        <input
          type="file"
          id="mri-upload"
          accept=".dcm, .nii, .gz, .jpg, .png"
          onChange={handleFileChange}
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}
        />
        <button
          onClick={handleUpload}
          disabled={!selectedFile || loading}
          className="action-btn"
          style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          {loading ? 'Uploading...' : 'Get Prediction'}
        </button>
      </div>

      {loading && <p>Loading prediction...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {predictionResult && (
        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #28a745', borderRadius: '8px', backgroundColor: '#e9f7ef', color: '#333' }}>
          <h3>Prediction Result:</h3>
          <p><strong>Tumor Type:</strong> {predictionResult.prediction}</p>
          <p><strong>Confidence:</strong> {(predictionResult.confidence * 100).toFixed(2)}%</p>
          {/* You can display raw_predictions if needed for debugging */}
          {/* <p>Raw Predictions: {JSON.stringify(predictionResult.raw_predictions)}</p> */}
        </div>
      )}

      <div className="post-upload-actions">
        <button className="action-btn" onClick={() => window.open('/Brain_Report.pdf', '_blank')}>Generate MRI Report</button>
      </div>

      <NearbyDoctorsMap />

      <div className="post-upload-actions" style={{ marginTop: '20px' }}>
        <button className="action-btn" onClick={() => window.open('/YOUR NEARBY NEUROLOGIST DIRECTORY.pdf', '_blank')}>Your Nearby Neurologists</button>
      </div>
    </div>
  );
};

export default RadiologistPage;