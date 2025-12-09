import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './VoiceCommands.css';

const VoiceCommands = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const playVoiceDemo = () => {
    alert('Playing pre-recorded voice demo...');
  };

  const recordVoice = async () => {
    console.log('recordVoice called. isRecording:', isRecording);
    if (isRecording) {
      console.log('Stopping recording...');
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      console.log('Starting recording...');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('Microphone access granted.');
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          console.log('ondataavailable event fired.', event.data.size);
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async () => {
          console.log('onstop event fired. Audio chunks size:', audioChunksRef.current.length);
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          sendAudioToBackend(audioBlob);
        };

        mediaRecorderRef.current.start();
        console.log('MediaRecorder started.');
        setIsRecording(true);
        setAssistantResponse('Recording...');
      } catch (error) {
        console.error('Error accessing microphone:', error);
        setAssistantResponse('Error accessing microphone. Please check console for details.');
      }
    }
  };

  const sendAudioToBackend = async (audioBlob) => {
    console.log('sendAudioToBackend called with audioBlob:', audioBlob);
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
        setAssistantResponse(`Error: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error sending audio to backend:', error);
      setAssistantResponse('Error communicating with the assistant.');
    }
  };

  return (
    <div className="action-container voice-commands">
      <h4>Voice Commands</h4>
      <button onClick={recordVoice}>
        {isRecording ? 'Stop Recording' : 'Record Voice (10s)'}
      </button>
      <button onClick={playVoiceDemo}>Play Voice Demo</button>
      {assistantResponse && <p>Assistant: {assistantResponse}</p>}
    </div>
  );
};

export default VoiceCommands;
