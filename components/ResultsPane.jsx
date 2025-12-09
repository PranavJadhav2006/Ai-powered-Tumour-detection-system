import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import ResultCard from './ResultCard';
import './ResultsPane.css';

const Model = () => {
  const { scene } = useGLTF('/brain.gltf');
  return <primitive object={scene} scale={0.8} />; // Reduced scale
};

const ResultsPane = () => {
  return (
    <div className="results-pane">
      <div className="viewer-3d-container">
        <Canvas camera={{ position: [0, 0, 150], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
      <div className="result-cards">
        <ResultCard title="Volume" value="12.3 cm³" />
        <ResultCard title="Confidence" value="95%" />
        <ResultCard title="Dice" value="0.87" />
        <ResultCard title="ASR WER" value="12.3%" />
      </div>
    </div>
  );
};

export default ResultsPane;