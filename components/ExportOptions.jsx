import React from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import PDFReport from './PDFReport';
import './ExportOptions.css';

const ExportOptions = () => {
  const openPdf = () => {
    const newWindow = window.open();
    newWindow.document.write('<div id="pdf-container"></div>');
    newWindow.document.getElementById('pdf-container');
    
    const viewer = (
      <PDFViewer style={{ width: '100%', height: '100vh' }}>
        <PDFReport />
      </PDFViewer>
    );

    const root = newWindow.document.createElement('div');
    root.style.width = '100%';
    root.style.height = '100vh';
    newWindow.document.body.appendChild(root);
    const reactRoot = require('react-dom').createRoot(root);
    reactRoot.render(viewer);
  };

  return (
    <div className="action-container export-options">
      <h4>Export</h4>
      <button onClick={openPdf}>Generate PDF Report</button>
      <PDFDownloadLink document={<PDFReport />} fileName="report.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download PDF'
        }
      </PDFDownloadLink>
      <button>Copy Share Link</button>
    </div>
  );
};

export default ExportOptions;
