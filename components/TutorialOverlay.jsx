import React, { useState, useEffect, useRef } from 'react';
import './TutorialOverlay.css';

const TutorialOverlay = () => {
  const [step, setStep] = useState(0);
  const [pos, setPos] = useState({});
  const stepRef = useRef(null);

  const steps = [
    {
      title: 'Welcome to the Live Demo!',
      text: 'This tutorial will guide you through the features of this page.',
      selector: '.live-demo-page'
    },
    {
      title: 'DICOM Viewer',
      text: 'This is the DICOM viewer.You can select \ndifferent sample cases from the dropdown.',
      selector: '.dicom-viewer',
    },
    {
      title: 'Results Pane',
      text: 'This is the results pane. It shows the 3D model, metrics, and export options.',
      selector: '.results-pane'
    }
  ];

  const currentStep = steps[step];

  useEffect(() => {
    if (currentStep) {
      const element = document.querySelector(currentStep.selector);
      if (element) {
        const rect = element.getBoundingClientRect();
        setPos({
          top: rect.top + rect.height / 2,
          left: rect.left + rect.width / 2 + (currentStep.offsetX || 0)
        });
      }
    }
  }, [step]);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Close the tutorial
      setStep(-1);
    }
  };

  const handleClose = () => {
    setStep(-1);
  };

  if (step === -1 || !currentStep) {
    return null;
  }

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-backdrop"></div>
      <div className="tutorial-step" ref={stepRef} style={{ top: pos.top, left: pos.left }}>
        <h3>{currentStep.title}</h3>
        <p>{currentStep.text}</p>
        <button onClick={handleNext}>{step < steps.length - 1 ? 'Next' : 'Finish'}</button>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default TutorialOverlay;