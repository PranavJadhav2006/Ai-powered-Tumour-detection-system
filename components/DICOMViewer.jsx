import React, { useEffect, useRef, useState } from 'react';
import * as dwv from 'dwv';

const DICOMViewer = ({ onAnalysisComplete }) => {
  const viewerRef = useRef(null);
  const [app, setApp] = useState(null);
  const [dicomFiles] = useState([
    {
      name: 'Sample Case 1',
      url: 'https://raw.githubusercontent.com/ivmartel/dwv/master/tests/data/bbmri-53323851.dcm'
    },
    {
      name: 'Sample Case 2',
      url: 'https://raw.githubusercontent.com/ivmartel/dwv/master/tests/data/dwv-test-anonymize.dcm'
    },
    {
      name: 'Sample Case 3',
      url: 'https://www.rubomedical.com/dicom_files/series-000001.dcm'
    }
  ]);
  const [selectedFile, setSelectedFile] = useState(dicomFiles[0]);
  const [confidence, setConfidence] = useState(0.8);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (viewerRef.current && !app) {
      // Initialize DWV app
      const dwvApp = new dwv.App();
      dwvApp.init({
        containerDiv: viewerRef.current,
        tools: ['Scroll', 'ZoomAndPan', 'WindowLevel'],
      });
      
      setApp(dwvApp);

      // Add load event listener
      dwvApp.addEventListener('load-start', () => console.log('Loading DICOM...'));
      dwvApp.addEventListener('load-end', () => console.log('DICOM loaded'));
      dwvApp.addEventListener('load', () => console.log('DICOM rendered'));
    }

    return () => {
      // Cleanup
      if (app) {
        app.reset();
      }
    };
  }, [app]);

  // CORRECTED: Load DICOM from URL using fetch and loadFiles
  const loadDicomFromUrl = async (url) => {
    if (!app) return;

    try {
      console.log('Fetching DICOM from:', url);
      
      // Fetch the DICOM file
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: 'application/dicom' });
      const file = new File([blob], 'dicom_file.dcm', { type: 'application/dicom' });
      
      // Load the file using DWV
      app.loadFiles([file]);
      setSelectedFileName(''); // Reset file name when loading from URL
      
    } catch (error) {
      console.error('Error loading DICOM from URL:', error);
    }
  };

  useEffect(() => {
    if (app && selectedFile) {
      // Load the selected file using the corrected method
      loadDicomFromUrl(selectedFile.url);
    }
  }, [app, selectedFile]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !app) return;

    // 1. Load file for viewing
    app.loadFiles([file]);
    setSelectedFileName(file.name);

    // 2. Send file for analysis
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/api/segment', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      onAnalysisComplete(data);
    } catch (error) {
      console.error('Upload failed:', error);
      onAnalysisComplete({ status: 'error', message: 'Upload failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dicom-viewer">
      <div className="viewer-container">
        <div 
          ref={viewerRef} 
          style={{ 
            width: '80%', 
            margin: 'auto', 
            height: '500px',
            border: '1px solid #ccc',
            backgroundColor: '#000'
          }} 
        />
      </div>
      <div className="controls" style={{ padding: '20px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px', 
          padding: '12px 16px',
          backgroundColor: 'white',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          margin: '10px'
        }}>
          <span style={{ fontWeight: '500', color: '#333' }}>Select DICOM File:</span>
          <select 
            className="dicom-select"
            onChange={(e) => setSelectedFile(dicomFiles.find(f => f.name === e.target.value))} 
            value={selectedFile.name}
          >
            {dicomFiles.map(file => (
              <option key={file.name} value={file.name}>{file.name}</option>
            ))}
          </select>
        </div>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px', 
          padding: '12px 16px',
          backgroundColor: 'white',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          margin: '10px'
        }}>
          <span style={{ fontWeight: '500', color: '#333' }}>Upload and Analyze:</span>
          <label style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 20px',
            backgroundColor: loading ? '#6c757d' : '#4361ee',
            color: 'white',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {loading ? 'Analyzing...' : 'Choose File'}
            <input type="file" accept=".dcm,.dicom,.nii,.nii.gz" onChange={handleFileUpload} style={{ display: 'none' }} disabled={loading} />
          </label>
          <span style={{ color: '#666', fontSize: '14px', minWidth: '120px' }}>{selectedFileName || 'No file chosen'}</span>
        </div>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px', 
          padding: '12px 16px',
          backgroundColor: 'white',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          margin: '10px'
        }}>
          <span style={{ fontWeight: '500', color: '#333' }}>Confidence: {confidence.toFixed(2)}</span>
          <input 
            className="confidence-slider-input"
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={confidence} 
            onChange={(e) => setConfidence(parseFloat(e.target.value))} 
          />
        </div>
      </div>
    </div>
  );
};

export default DICOMViewer;