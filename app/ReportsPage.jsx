import React, { useState } from 'react';
import './ReportsPage.css';

const ReportsPage = () => {
  const [reports, setReports] = useState([
    { id: 'R001', caseId: 'C12345', author: 'Dr. Smith', createdOn: '2023-10-26', status: 'Signed' },
    { id: 'R002', caseId: 'C12344', author: 'Dr. Jones', createdOn: '2023-10-25', status: 'Draft' },
    { id: 'R003', caseId: 'C12343', author: 'Dr. Smith', createdOn: '2023-10-24', status: 'Draft' },
  ]);
  const [showReportBuilder, setShowReportBuilder] = useState(false);

  const handleGenerateNewReport = () => {
    setShowReportBuilder(true);
  };

  return (
    <div className="reports-page">
      <h1>Reports</h1>

      <div className="reports-actions">
        <button className="action-btn" onClick={handleGenerateNewReport}>Generate New Report</button>
        <div className="filters">
          <input type="text" placeholder="Filter by Doctor" />
          <input type="date" />
          <select>
            <option value="">Status</option>
            <option value="Draft">Draft</option>
            <option value="Signed">Signed</option>
          </select>
        </div>
      </div>

      <table className="reports-table">
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Case ID</th>
            <th>Author</th>
            <th>Created On</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.caseId}</td>
              <td>{report.author}</td>
              <td>{report.createdOn}</td>
              <td>{report.status}</td>
              <td>
                <button className="table-action-btn">View</button>
                <button className="table-action-btn">Edit</button>
                <button className="table-action-btn">Export</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showReportBuilder && (
        <div className="report-builder-modal">
          <div className="modal-content">
            <h2>Report Builder</h2>
            <div className="report-builder-layout">
              <div className="template-section">
                <h3>Auto-filled Template</h3>
                <p>Segmentation results: ...</p>
                <p>Confidence: ...</p>
                <div className="ai-suggestions">
                  <button>Insert structured findings</button>
                  <button>Rephrase summary</button>
                </div>
              </div>
              <div className="notes-section">
                <h3>Clinician Notes</h3>
                <textarea placeholder="Add your impressions here..."></textarea>
              </div>
            </div>
            <div className="sign-off-workflow">
              <label>
                <input type="checkbox" /> Reviewed & Approved
              </label>
              <p>Digital signature capture or voice sign-off</p>
            </div>
            <div className="export-options">
              <button>Export PDF</button>
              <button>Export HL7</button>
              <button>Export DICOM SR</button>
            </div>
            <div className="audit-trail-sidebar">
              <h3>Audit Trail</h3>
              <p>History of edits & approvals (timestamped)</p>
            </div>
            <button onClick={() => setShowReportBuilder(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
