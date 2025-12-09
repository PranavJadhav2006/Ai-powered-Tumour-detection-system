import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const KeyMetrics = () => {
  return (
    <Container className="py-5" style={{ marginTop: '50px', padding: '0 50px' }}>
      <Row className="text-center">
        <Col md={4}>
          <Card className="mb-4 rounded-4 shadow-sm">
            <Card.Body>
              <p className="fs-4 text-primary">0.86</p>
              <p className="text-muted">Avg segmentation Dice</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4 rounded-4 shadow-sm">
            <Card.Body>
              <p className="fs-4 text-primary">72%</p>
              <p className="text-muted">Avg report draft time saved</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4 rounded-4 shadow-sm">
            <Card.Body>
              <p className="fs-4 text-primary">Validated</p>
              <p className="text-muted">on BraTS & institutional sets</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default KeyMetrics;