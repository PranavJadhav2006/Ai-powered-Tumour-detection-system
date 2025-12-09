import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const personas = [
  { title: 'Radiologists', benefit: 'Accelerate your workflow with AI-powered segmentation and reporting.', cta: 'See demo' },
  { title: 'Neurosurgeons', benefit: 'Enhance surgical planning with interactive 3D and AR models.', cta: 'See demo' },
  { title: 'Medical Students', benefit: 'Learn anatomy and pathology with our extensive case library.', cta: 'See demo' },
  { title: 'Research Labs', benefit: 'Leverage our platform for large-scale data analysis and validation.', cta: 'See demo' },
];

const PersonaStrip = () => {
  return (
    <div className="bg-white text-white py-1">
      <Container>
        <Row>
          {personas.map((persona, index) => (
            <Col md={3} key={index} className="my-4">
              <Card className="h-100 text-center rounded-4 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <Card.Title as="h3">{persona.title}</Card.Title>
                  <Card.Text className="text-white-50 flex-grow-1 fs-6">{persona.benefit}</Card.Text>
                  <Button variant="link">{persona.cta}</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default PersonaStrip;