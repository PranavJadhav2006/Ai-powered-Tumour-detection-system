import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMic, 
  FiServer, 
  FiCloud, 
  FiDatabase, 
  FiFileText
} from 'react-icons/fi';
import './NetworkDiagram.css';

const NetworkDiagram = () => {
  const [activeNode, setActiveNode] = useState(null);
  const diagramRef = useRef(null);
  const [detailsPanelStyle, setDetailsPanelStyle] = useState({});

  const nodes = useMemo(() => [
    {
      id: 'asr',
      name: 'ASR/LLM Gate',
      description: 'Processes voice commands for hands-free control',
      tech: ['Python', 'TensorFlow/PyTorch', 'WebRTC'],
      icon: <FiMic size={24} />,
      position: { x: 50, y: 50 },
      connections: ['onprem', 'cloud', 'dicom', 'audit'],
      color: '#2d3130ff'
    },
    {
      id: 'onprem',
      name: 'On-prem Inference',
      description: 'Runs on hospital\'s local servers for privacy and speed',
      tech: ['TensorFlow Serving', 'Docker', 'Kubernetes'],
      icon: <FiServer size={24} />,
      position: { x: 20, y: 20 },
      connections: ['asr'],
      color: '#2d3130ff'
    },
    {
      id: 'cloud',
      name: 'Cloud Training',
      description: 'Models trained on anonymized data in the cloud',
      tech: ['AWS/Azure', 'PyTorch', 'MLflow'],
      icon: <FiCloud size={24} />,
      position: { x: 80, y: 20 },
      connections: ['asr'],
      color: '#2d3130ff'
    },
    {
      id: 'dicom',
      name: 'DICOM Store',
      description: 'Stores medical images securely',
      tech: ['DICOM Standard', 'Encrypted Storage', 'HIPAA Compliant'],
      icon: <FiDatabase size={24} />,
      position: { x: 20, y: 80 },
      connections: ['asr'],
      color: '#2d3130ff'
    },
    {
      id: 'audit',
      name: 'Audit Logs',
      description: 'Records all system activities for compliance',
      tech: ['Elasticsearch', 'Kibana', 'SIEM Integration'],
      icon: <FiFileText size={24} />,
      position: { x: 80, y: 80 },
      connections: ['asr'],
      color: '#2d3130ff'
    }
  ], []);

  useEffect(() => {
    if (activeNode && diagramRef.current) {
      const node = nodes.find(n => n.id === activeNode);
      if (!node) return;

      const diagramRect = diagramRef.current.getBoundingClientRect();
      const nodeX = (node.position.x / 100) * diagramRect.width;
      const nodeY = (node.position.y / 100) * diagramRect.height;

      // Position the details panel to the right of the node, or left if too close to right edge
      let leftPos = nodeX + 100; // Offset from node center
      let topPos = nodeY;

      // Adjust if panel goes off screen to the right
      if (leftPos + 300 > diagramRect.width) { // Assuming panel max-width is 300px
        leftPos = nodeX - 300 - 100; // Place to the left
      }

      setDetailsPanelStyle({
        left: `${leftPos}px`,
        top: `${topPos}px`,
        transform: 'translateY(-50%)' // Center vertically relative to node
      });
    } else {
      setDetailsPanelStyle({}); // Reset when no active node
    }
  }, [activeNode, nodes]);

  return (
    <div className="network-diagram">
      <div className={`diagram-container ${activeNode ? 'faded' : ''}`} ref={diagramRef}>
        <svg className="connections">
          {nodes.flatMap(node =>
            node.connections.map(connectionId => {
              const targetNode = nodes.find(n => n.id === connectionId);
              return (
                <motion.line
                  key={`${node.id}-${connectionId}`}
                  x1={`${node.position.x}%`}
                  y1={`${node.position.y}%`}
                  x2={`${targetNode.position.x}%`}
                  y2={`${targetNode.position.y}%`}
                  stroke={activeNode === node.id || activeNode === connectionId ? 
                    node.color : '#E2E8F0'}
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5 }}
                />
              );
            })
          )}
        </svg>

        {nodes.map(node => (
          <motion.div
            key={node.id}
            className={`node ${activeNode === node.id ? 'active' : ''}`}
            style={{
              left: `${node.position.x}%`,
              top: `${node.position.y}%`,
              borderColor: node.color
            }}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="node-icon" style={{ color: node.color }}>
              {node.icon}
            </div>
            <div className="node-name">{node.name}</div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeNode && (
          <motion.div
            className="node-details-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={detailsPanelStyle}
          >
            {(() => {
              const node = nodes.find(n => n.id === activeNode);
              return (
                <>
                  <h4 style={{ color: node.color }}>{node.name}</h4>
                  <p>{node.description}</p>
                  <div className="tech-stack">
                    {node.tech.map(tech => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NetworkDiagram;
