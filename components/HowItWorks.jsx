import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { UploadCloud, ScanSearch, FileDown } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="bg-light text-dark py-1">
      <Container className="text-center">
        <h2 className="h3 mt-3 text-dark">How It Works</h2>
        <Row>
          <Col md={4}>
            <div className="mb-4">
              <div className="d-inline-flex align-items-center justify-content-center text-white bg-primary rounded-circle p-2 mb-2 shadow">
                <UploadCloud size={32} />
              </div>
              <h3 className="fs-5 text-dark">Step 1: Upload MRI / <br />Connect PACS</h3>
              <p>Securely upload DICOM files or connect directly to your PACS server.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="mb-4">
              <div className="d-inline-flex align-items-center justify-content-center text-white bg-primary rounded-circle p-2 mb-2 shadow">
                <ScanSearch size={32} />
              </div>
              <h3 className="fs-5 text-dark">Step 2: Real-time segmentation + voice commands</h3>
              <p>Our AI performs real-time segmentation, and you can interact with it using voice commands.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="mb-4">
              <div className="d-inline-flex align-items-center justify-content-center text-white bg-primary rounded-circle p-2 mb-2 shadow">
                <FileDown size={32} />
              </div>
              <h3 className="fs-5 text-dark">Step 3: 3D/AR planning + auto-report</h3>
              <p>Visualize the segmentation in 3D/AR and generate an automatic report.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HowItWorks;