import React from 'react';
import { Container } from 'react-bootstrap';

const Compliance = () => {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-5">Compliance & Security</h2>
      <ul>
        <li>HIPAA-ready</li>
        <li>AES256 encryption</li>
        <li>BAA for cloud vendors</li>
        <li>On-prem options</li>
      </ul>
    </Container>
  );
};

export default Compliance;
