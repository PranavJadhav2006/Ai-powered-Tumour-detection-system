import React from 'react';
import { Container, Button, Form, InputGroup } from 'react-bootstrap';

const FooterCTA = () => {
  return (
    <div className="bg-white py-5">
      <Container className="text-center">
        <h2 className="display-5 mb-3 text-dark">Ready to Get Started?</h2>
        <p className="lead mb-4 text-dark">Try the live demo or request a pilot for your institution.</p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Button variant="primary" size="lg" className="me-sm-2">Try Live Demo</Button>
          <InputGroup className="mw-sm-50">
            <Form.Control placeholder="Enter your email" />
            <Button variant="outline-secondary">Request Pilot</Button>
          </InputGroup>
        </div>
      </Container>
    </div>
  );
};

export default FooterCTA;