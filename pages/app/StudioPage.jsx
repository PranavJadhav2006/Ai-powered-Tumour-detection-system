import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import './StudioPage.css';

const Model = () => {
  const { scene } = useGLTF('/brain.gltf');
  return <primitive object={scene} scale={0.8} />; // Reduced scale
};

const StudioPage = () => {

  return (
    <div className="studio-page">
      <h1>3D Studio (AR Export)</h1>

      <div className="studio-content">
        <div className="viewer-canvas-container">
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


      </div>
    </div>
  );
};

export default StudioPage;
