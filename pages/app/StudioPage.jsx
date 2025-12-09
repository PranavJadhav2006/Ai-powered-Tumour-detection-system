import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import './StudioPage.css';

const Model = () => {
  const { scene } = useGLTF('/brain.gltf');
  return <primitive object={scene} scale={0.8} />; // Reduced scale
};

const StudioPage = () => {
  const [showTumorOnly, setShowTumorOnly] = useState(false);
  const [showBrainAndTumor, setShowBrainAndTumor] = useState(true);
  const [showGradCAM, setShowGradCAM] = useState(false);
  const [meshColorTheme, setMeshColorTheme] = useState('clinical-gray');
  const [contourOpacity, setContourOpacity] = useState(0.5);

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

        <div className="tools-sidebar">
          <h2>Tools</h2>
          <button className="tool-btn">Screenshot Capture</button>
          <div className="form-group">
            <label>Mesh Color Themes</label>
            <select value={meshColorTheme} onChange={(e) => setMeshColorTheme(e.target.value)}>
              <option value="clinical-gray">Clinical Gray</option>
              <option value="night">Night</option>
              <option value="holo">Holo</option>
            </select>
          </div>
          <button className="tool-btn">Save Viewpoint Preset</button>
          <button className="tool-btn">Export → GLTF / OBJ</button>
          
          <h2>Display Options</h2>
          <label className="checkbox-group">
            <input type="checkbox" checked={showTumorOnly} onChange={(e) => setShowTumorOnly(e.target.checked)} />
            Show tumor only
          </label>
          <label className="checkbox-group">
            <input type="checkbox" checked={showBrainAndTumor} onChange={(e) => setShowBrainAndTumor(e.target.checked)} />
            Show brain + tumor
          </label>
          <label className="checkbox-group">
            <input type="checkbox" checked={showGradCAM} onChange={(e) => setShowGradCAM(e.target.checked)} />
            Show Grad-CAM heatmap
          </label>
          <div className="form-group">
            <label>Contour Opacity: {contourOpacity.toFixed(1)}</label>
            <input type="range" min="0" max="1" step="0.1" value={contourOpacity} onChange={(e) => setContourOpacity(parseFloat(e.target.value))} />
          </div>
        </div>

        <div className="ar-export-panel">
          <h2>AR Export</h2>
          <button className="action-btn">Generate AR Package (.gltf + QR Marker)</button>
          <button className="action-btn">Preview in AR</button>
          <p className="help-text">Scan this QR on your phone to view tumor in AR.</p>
        </div>
      </div>
    </div>
  );
};

export default StudioPage;
