import React, { useState, useEffect } from 'react';
import './CasesPage.css';
import { useNavigate } from 'react-router-dom';
import { useCase } from '../../context/CaseContext';

const CasesPage = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { updateCaseData } = useCase();

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/cases');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCases(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  const handleUploadNewCase = () => {
    navigate('/app/new-case');
  };

  const handleViewCase = (caseItem) => {
    updateCaseData(caseItem);
    navigate('/app/radiologist');
  };

  const handleDeleteCase = async (caseId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/cases/${caseId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove the deleted case from the local state
      setCases(cases.filter(caseItem => caseItem.id !== caseId));
      console.log(`Case ${caseId} deleted successfully.`);
    } catch (err) {
      console.error('Failed to delete case:', err);
      setError(err.message); // Display error to user
    }
  };

  if (loading) {
    return <div className="cases-page">Loading cases...</div>;
  }

  if (error) {
    return <div className="cases-page">Error: {error}</div>;
  }

  return (
    <div className="cases-page">
      <div className="cases-header">
        <h1>Cases</h1>
        <button className="upload-case-btn" onClick={handleUploadNewCase}>➕ Upload New Case</button>
      </div>

      {cases.length === 0 ? (
        <div className="empty-state">
          <p>No cases yet. Upload your first MRI to begin analysis.</p>
          <button className="upload-now-btn" onClick={handleUploadNewCase}>Upload Now</button>
        </div>
      ) : (
        <>
          <table className="cases-table">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Hospital</th>
                <th>Description</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((caseItem) => (
                <tr key={caseItem.id}>
                  <td>{caseItem.id.substring(0, 8)}...</td>
                  <td>{caseItem.patient.name}</td>
                  <td>{caseItem.patient.age}</td>
                  <td>{caseItem.patient.gender}</td>
                  <td>{caseItem.metadata.hospital}</td>
                  <td>{caseItem.metadata.description}</td>
                  <td>{new Date(caseItem.timestamp).toLocaleDateString()}</td>
                  <td>
                    <button className="action-btn" onClick={() => handleViewCase(caseItem)}>View</button>
                    <button className="action-btn delete-btn" onClick={() => handleDeleteCase(caseItem.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CasesPage;