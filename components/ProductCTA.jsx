import React from 'react';
import { Container, Button } from 'react-bootstrap';

const ProductCTA = () => {
  return (
    <Container className="py-5 text-center">
      <h2 className="display-5 mb-3">Ready to get started?</h2>
      <Button variant="primary" size="lg" className="me-2">Get Pilot</Button>
      <Button variant="outline-secondary" size="lg">Contact Sales</Button>
    </Container>
  );
};

export default ProductCTA;
