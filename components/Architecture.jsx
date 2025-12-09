import React from 'react';
import { Container } from 'react-bootstrap';
import NetworkDiagram from './NetworkDiagram';

const Architecture = () => {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-5">Architecture & Tech Stack</h2>
      <NetworkDiagram />
    </Container>
  );
};

export default Architecture;
