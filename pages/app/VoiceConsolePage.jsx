import React, { useState } from 'react';
import './VoiceConsolePage.css';

const VoiceConsolePage = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [commandHistory, setCommandHistory] = useState([
    { id: 1, timestamp: '10:30 AM', command: 'Analyze tumor', classification: 'ANALYZE' },
    { id: 2, timestamp: '10:25 AM', command: 'Show confidence', classification: 'SHOW_METRIC' },
    { id: 3, timestamp: '10:20 AM', command: 'Generate report', classification: 'REPORT' },
  ]);
  const [asrAccuracy, setAsrAccuracy] = useState(95);
  const [nluConfidence, setNluConfidence] = useState(92);
  const [micSource, setMicSource] = useState('default');
  const [wakeWordEnabled, setWakeWordEnabled] = useState(true);
  const [language, setLanguage] = useState('EN');

  const handleRecordToggle = () => {
    setIsMicOn(!isMicOn);
    // Simulate real-time transcript
    if (!isMicOn) {
      setTranscript('Analyzing tumor...');
      setTimeout(() => setTranscript('Analyzing tumor... [ANALYZE]'), 2000);
    } else {
      setTranscript('');
    }
  };

  return (
    <div className="voice-console-page">
      <div className="console-header">
        <h1>Voice Assistant Console (Beta)</h1>
        <button className={`mic-toggle-btn ${isMicOn ? 'mic-on' : ''}`} onClick={handleRecordToggle}>
          {isMicOn ? '🔴 Mic ON' : '⚪ Mic OFF'}
        </button>
      </div>

      <div className="main-panel">
        <button className={`record-btn ${isMicOn ? 'recording' : ''}`} onClick={handleRecordToggle}>
          {isMicOn ? 'STOP' : 'RECORD'}
          {isMicOn && <div className="waveform-animation"></div>}
        </button>
        <div className="transcript-display">
          <p>{transcript || 'Start speaking...'}</p>
          {transcript && (
            <div className="command-chips">
              {transcript.includes('[ANALYZE]') && <span className="chip analyze">ANALYZE</span>}
              {transcript.includes('[REPORT]') && <span className="chip report">REPORT</span>}
              {transcript.includes('[VIEW_3D]') && <span className="chip view-3d">VIEW_3D</span>}
            </div>
          )}
        </div>
      </div>

      <div className="history-section">
        <h2>Command History</h2>
        <div className="command-log">
          {commandHistory.map(cmd => (
            <div className="log-item" key={cmd.id}>
              <span className="timestamp">{cmd.timestamp}</span>
              <span className="command-text">{cmd.command}</span>
              <span className="classification-chip">{cmd.classification}</span>
              <div className="log-actions">
                <button>🗘</button>
                <button>✏️</button>
                <button>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="quick-phrases">
        <h2>Quick Phrase Shortcuts</h2>
        <div className="phrase-buttons">
          <button>Analyze tumor</button>
          <button>Show confidence</button>
          <button>Generate report</button>
        </div>
      </div>

      <div className="confidence-gauges">
        <h2>Confidence Gauges</h2>
        <div className="gauge-item">
          <span>ASR accuracy: {asrAccuracy}%</span>
          <progress value={asrAccuracy} max="100"></progress>
        </div>
        <div className="gauge-item">
          <span>NLU intent confidence: {nluConfidence}%</span>
          <progress value={nluConfidence} max="100"></progress>
        </div>
      </div>

      <div className="settings-section">
        <h2>Settings</h2>
        <div className="form-group">
          <label>Mic source</label>
          <select value={micSource} onChange={(e) => setMicSource(e.target.value)}>
            <option value="default">Default Mic</option>
            <option value="headset">Headset Mic</option>
          </select>
        </div>
        <label className="checkbox-group">
          <input type="checkbox" checked={wakeWordEnabled} onChange={(e) => setWakeWordEnabled(e.target.checked)} />
          Wake word ("Hey MedAI")
        </label>
        <div className="form-group">
          <label>Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="EN">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default VoiceConsolePage;
