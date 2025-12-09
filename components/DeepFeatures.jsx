import React from 'react';
import { Container, Tabs, Tab, Row, Col, Button } from 'react-bootstrap';

const DeepFeatures = () => {
  return (
    <Container className="py-5">
      <Tabs defaultActiveKey="detection" id="deep-features-tabs" className="mb-3">
        <Tab eventKey="detection" title="Detection & Segmentation">
          <Row>
            <Col md={6}>
              <div className="bg-light h-100 d-flex align-items-center justify-content-center">
                <p>Big visual (video/gif)</p>
              </div>
            </Col>
            <Col md={6}>
              <h3>Automated Tumor Detection & Segmentation</h3>
              <ul>
                <li>Accurately identifies and outlines tumor boundaries from MRI scans.</li>
                <li>Supports multiple tumor types (e.g., glioma, meningioma).</li>
                <li>Reduces manual segmentation time by up to 90%.</li>
              </ul>
              <p>Metrics: 95% Dice score on internal benchmarks.</p>
              <Button variant="outline-primary">See in Demo</Button>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="ar" title="3D & AR">
          <Row>
            <Col md={6}>
              <div className="bg-light h-100 d-flex align-items-center justify-content-center">
                <p>Big visual (video/gif)</p>
              </div>
            </Col>
            <Col md={6}>
              <h3>Immersive 3D & Augmented Reality Visualization</h3>
              <ul>
                <li>Visualize tumor models in a 3D interactive view.</li>
                <li>Overlay 3D models onto the patient for surgical planning with AR.</li>
                <li>Compatible with major AR headsets.</li>
              </ul>
              <p>Metrics: Sub-millimeter accuracy in model-to-patient alignment.</p>
              <Button variant="outline-primary">See in Demo</Button>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="voice" title="Voice Assistant">
          <Row>
            <Col md={6}>
              <div className="bg-light h-100 d-flex align-items-center justify-content-center">
                <p>Big visual (video/gif)</p>
              </div>
            </Col>
            <Col md={6}>
              <h3>Hands-Free Control with Voice Assistant</h3>
              <ul>
                <li>Control the application using voice commands during procedures.</li>
                <li>Navigate patient scans, manipulate 3D models, and generate reports.</li>
                <li>Customizable commands to fit your workflow.</li>
              </ul>
              <p>Metrics: 98% command recognition accuracy in noisy environments.</p>
              <Button variant="outline-primary">See in Demo</Button>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="reporting" title="Reporting & Audit">
          <Row>
            <Col md={6}>
              <div className="bg-light h-100 d-flex align-items-center justify-content-center">
                <p>Big visual (video/gif)</p>
              </div>
            </Col>
            <Col md={6}>
              <h3>Automated Reporting & Audit Trails</h3>
              <ul>
                <li>Automatically generate detailed reports with key findings.</li>
                <li>Immutable audit logs for all actions taken within the platform.</li>
                <li>Export reports in DICOM and PDF formats.</li>
              </ul>
              <p>Metrics: Reduce reporting time by 50%.</p>
              <Button variant="outline-primary">See in Demo</Button>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="privacy" title="Privacy & Deployment">
          <Row>
            <Col md={6}>
              <div className="bg-light h-100 d-flex align-items-center justify-content-center">
                <p>Big visual (video/gif)</p>
              </div>
            </Col>
            <Col md={6}>
              <h3>Secure & Flexible Deployment</h3>
              <ul>
                <li>On-premise deployment for maximum data control.</li>
                <li>Cloud deployment with BAA for HIPAA compliance.</li>
                <li>End-to-end encryption with AES-256.</li>
              </ul>
              <p>Metrics: Fully compliant with HIPAA and GDPR.</p>
              <Button variant="outline-primary">See in Demo</Button>
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default DeepFeatures;
