import React from 'react';
  import { Container } from 'react-bootstrap';
  import { motion } from 'framer-motion';
  import './FeatureHighlights.css';

  const features = [
    { title: 'Segmentation Accuracy', description: 'State-of-the-art deep learning models for precise tumor segmentation.' },
    { title: 'AR Planning', description: 'Visualize 3D models in augmented reality for surgical planning.' },
    { title: 'Advanced Voice Assistant', description: 'Control the viewer and dictation with your voice.' },
    { title: 'Explainability (Grad-CAM)', description: 'Understand the model\'s decision with Grad-CAM visualizations.' },
    { title: 'Compliance & Security', description: 'HIPAA and GDPR compliant, with end-to-end encryption.' },
    { title: 'Collaboration Tools', description: 'Securely share, annotate, and discuss cases with colleagues in a unified workspace.' },
  ];

  const FeatureHighlights = () => {
    return (
      <Container className="py-5 feature-highlights-container">
        <div className="feature-highlights-content">
          <h2 className="display-6 text-center mb-4 text-white">Feature Highlights</h2>
          <div className="timeline">
            {features.map((feature, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-icon"></div>
                <motion.div
                  className="timeline-content"
                  style={{ backgroundColor: 'transparent' }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <h3 className="fs-5 text-white">{feature.title}</h3>
                  <p className="fs-6 text-white-50">{feature.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    );
  };

export default FeatureHighlights;