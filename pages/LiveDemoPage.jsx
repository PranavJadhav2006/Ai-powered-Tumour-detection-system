import React, { useState } from 'react';
import './LiveDemoPage.css';
import DICOMViewer from '../components/DICOMViewer';
import Dashboard from '../components/Dashboard';
import TutorialOverlay from '../components/TutorialOverlay';
import VoiceCommands from '../components/VoiceCommands';
import ExportOptions from '../components/ExportOptions';

import './HomePage.css';

const LiveDemoPage = () => {
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
  };

  return (
    <section className="homepage-bg">
      <div className="homepage-video-wrapper">
        <video autoPlay muted loop playsInline className="homepage-bg-video">
          <source src="/video/homepage-bg2.mp4" type="video/mp4" />
          <img src="/conny-schneider-xuTJZ7uD7PI-unsplash.jpg" alt="Background fallback" />
        </video>
      </div>
      <div className="content">
        <div className="live-demo-page">
          <TutorialOverlay />
          <div className="disclaimer">
            For evaluation only. Clinical use requires clinician sign-off.
          </div>
          <div className="demo-content">
            <h2>DICOM Viewer</h2>
            <DICOMViewer onAnalysisComplete={handleAnalysisComplete} />
            <h2>Analysis Results</h2>
            <Dashboard analysisResult={analysisResult} />
            <VoiceCommands />
            <ExportOptions />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemoPage;