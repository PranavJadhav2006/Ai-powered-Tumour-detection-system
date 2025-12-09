import React, { useState } from 'react';
import './NewCasePage.css';
import { useCase } from '../../context/CaseContext';

const NewCasePage = () => {
  const { updateCaseData } = useCase();

  const [isDragOver, setIsDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [anonymize, setAnonymize] = useState(false);
  const [hospital, setHospital] = useState('');
  const [modality, setModality] = useState('');
  const [description, setDescription] = useState('');
  const [modelVersion, setModelVersion] = useState('latest');
  const [inferenceMode, setInferenceMode] = useState('fast');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [patientContact, setPatientContact] = useState('');

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const uploadedFile = event.dataTransfer.files[0];
    setFile(uploadedFile);
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 100);
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 100);
  };

  const handleSendToLab = async () => {
    const caseData = {
      patient: {
        name: patientName,
        age: patientAge,
        gender: patientGender,
        contact: patientContact,
      },
      metadata: {
        hospital: hospital,
        description: description,
        // modelVersion: modelVersion, // Removed as advanced options are removed
        // inferenceMode: inferenceMode, // Removed as advanced options are removed
      },
      // file: file, // File object cannot be directly sent in JSON, handle separately if needed
    };

    try {
      const response = await fetch('http://localhost:8000/api/cases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(caseData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const savedCase = await response.json();
      console.log('Case saved:', savedCase);
      updateCaseData(savedCase); // Update context with the saved case (including ID and timestamp)
      // navigate('/app/radiologist'); // Removed navigation
    } catch (error) {
      console.error('Failed to save case:', error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="new-case-page">
      <h1>New Case / Upload</h1>

      <div className="metadata-form">
        <h2>Patient Information</h2>
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="number" value={patientAge} onChange={(e) => setPatientAge(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select value={patientGender} onChange={(e) => setPatientGender(e.target.value)}>
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Contact No.</label>
          <input type="tel" value={patientContact} onChange={(e) => setPatientContact(e.target.value)} />
        </div>
      </div>

      <div className="metadata-form">
        <h2>Case Metadata</h2>
        <div className="form-group">
          <label>Hospital / Department</label>
          <select value={hospital} onChange={(e) => setHospital(e.target.value)}>
            <option value="">Select...</option>
            <option value="hospital-a">Hospital A</option>
            <option value="department-x">Department X</option>
          </select>
        </div>

        <div className="form-group">
          <label>Case description / notes</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
      </div>

      <div className="post-upload-actions">
        <button className="action-btn" onClick={handleSendToLab}>Send To Lab</button>
      </div>
    </div>
  );
};

export default NewCasePage;