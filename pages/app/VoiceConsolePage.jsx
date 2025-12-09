import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './VoiceConsolePage.css';

const VoiceConsolePage = () => {
  const navigate = useNavigate();
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
  const [mode, setMode] = useState('normal'); // normal, eli5, or student

  // Voice Assistant State and Refs
  const [isRecording, setIsRecording] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingTimeoutRef = useRef(null); // Ref for the recording timeout

  useEffect(() => {
    const setModeOnBackend = async () => {
      try {
        await fetch('http://localhost:5000/set_mode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mode }),
        });
      } catch (error) {
        console.error('Error setting mode on backend:', error);
      }
    };
    setModeOnBackend();
  }, [mode]);

  const sendAudioToBackend = async (audioBlob) => {
    console.log('sendAudioToBackend called with audioBlob:', audioBlob, 'size:', audioBlob.size);
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'audio.wav');

      const askResponse = await fetch('http://localhost:5000/ask', {
        method: 'POST',
        body: formData,
      });

      const data = await askResponse.json();
      if (askResponse.ok) {
        // Set the text response to be displayed
        setAssistantResponse(data.speak);
        setTranscript(data.speak);

        // Perform navigation if the action is 'navigate'
        if (data.action === 'navigate' && data.path) {
          navigate(data.path);
        }

        // Fetch and play the audio for the spoken response
        const ttsResponse = await fetch('http://localhost:5000/tts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: data.speak }),
        });

        if (ttsResponse.ok) {
            const audioBlob = await ttsResponse.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
        } else {
            console.error('TTS request failed');
        }

      } else {
        const errorMsg = `Error: ${data.error || 'Unknown error'}`;
        setAssistantResponse(errorMsg);
        setTranscript(errorMsg);
      }
    } catch (error) {
      console.error('Error sending audio to backend:', error);
      const errorMsg = 'Error communicating with the assistant.';
      setAssistantResponse(errorMsg);
      setTranscript(errorMsg);
    }
  };

  const handleRecordToggle = async () => {
    console.log('handleRecordToggle called. isRecording:', isRecording);
    if (isRecording) {
      console.log('Stopping recording...');
      if (recordingTimeoutRef.current) {
        clearTimeout(recordingTimeoutRef.current);
      }
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsMicOn(false); // Update mic icon state
    } else {
      console.log('Starting recording...');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('Microphone access granted.');
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          console.log('ondataavailable event fired.', event.data.size);
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = async () => {
          console.log('onstop event fired. Audio chunks size:', audioChunksRef.current.length);
          if (audioChunksRef.current.length > 0) {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            sendAudioToBackend(audioBlob);
          } else {
            console.warn('No audio data captured.');
            setAssistantResponse('No audio detected. Please try again.');
            setTranscript('No audio detected.');
          }
        };

        mediaRecorderRef.current.start();
        console.log('MediaRecorder started.');
        setIsRecording(true);
        setIsMicOn(true); // Update mic icon state
        setAssistantResponse('Recording...');
        setTranscript('Listening...');

        // Set a timeout to automatically stop recording after 5 seconds
        recordingTimeoutRef.current = setTimeout(() => {
          if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            console.log('Recording timeout reached. Stopping automatically.');
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setIsMicOn(false);
          }
        }, 5000); // 5 seconds

      } catch (error) {
        console.error('Error accessing microphone:', error);
        setAssistantResponse('Error accessing microphone. Please check console for details.');
        setTranscript('Error accessing microphone.');
      }
    }
  };

  return (
    <div className="voice-console-page">
      <div className="console-header">
        <h1>Voice Assistant Console (Beta)</h1>
        <button className={`mic-toggle-btn ${isMicOn ? 'mic-on' : ''}`} onClick={handleRecordToggle}>
          {isMicOn ? 'Mic ON' : 'Mic OFF'}
        </button>
      </div>

      <div className="main-panel">
        <button className={`record-btn ${isMicOn ? 'recording' : ''}`} onClick={handleRecordToggle}>
          {isRecording ? (
            <video src="/recording_animation.mp4" autoPlay loop muted className="waveform-animation"></video>
          ) : (
            'RECORD'
          )}
        </button>
        <div className="transcript-display">
          <p>{transcript || 'Start speaking...'}</p>
          {assistantResponse && <p>Assistant: {assistantResponse}</p>}
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
        <div className="form-group">
          <label>Mode</label>
          <div className="toggle-switch">
            <button
              className={`toggle-btn ${mode === 'normal' ? 'active' : ''}`}
              onClick={() => setMode('normal')}
            >
              Normal
            </button>
            <button
              className={`toggle-btn ${mode === 'eli5' ? 'active' : ''}`}
              onClick={() => setMode('eli5')}
            >
              Simple
            </button>
            <button
              className={`toggle-btn ${mode === 'student' ? 'active' : ''}`}
              onClick={() => setMode('student')}
            >
              Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceConsolePage;
