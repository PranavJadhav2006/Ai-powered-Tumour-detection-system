import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { ShieldCheck } from 'lucide-react';

const quotes = [
  {
    quote: '“This tool has revolutionized our surgical planning process. The 3D and AR features are game-changers.”',
    author: 'Dr. Jane Doe',
    title: 'Chief of Neurosurgery, General Hospital',
  },
  {
    quote: '“The accuracy of the segmentation is remarkable. It has significantly reduced the time we spend on manual contouring.”',
    author: 'Dr. John Smith',
    title: 'Lead Radiologist, City Clinic',
  },
  {
    quote: '“As a researcher, having access to such a powerful platform for analysis is invaluable. The results are consistent and reliable.”',
    author: 'Dr. Emily White',
    title: 'Principal Investigator, Research Institute',
  },
];

const CustomerQuotes = () => {
  return (
    <Container className="py-5">
      <h2 className="display-6 text-center mb-4 text-white">What Our Users Say</h2>
      <Row>
        {quotes.map((item, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="h-100 rounded-4 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Text className="text-white-50 flex-grow-1">{item.quote}</Card.Text>
                <div className="mt-4 text-center">
                  <p className="fw-bold mb-0 text-white">{item.author}</p>
                  <div className="d-flex align-items-center justify-content-center text-sm text-white-50">
                    <ShieldCheck size={16} className="me-1 text-success" />
                    <span>Verified Clinician</span>
                  </div>
                  <p className="text-sm text-white-50">{item.title}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CustomerQuotes;