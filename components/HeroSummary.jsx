import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HeroSummary = ({ title, tagline, ctaText, ctaLink, ctaText2, ctaLink2, ctaVariant2 }) => {
  return (
    <Container fluid className="py-5 text-center">
      <h1 className="display-5">{title}</h1>
      {tagline && <p className="lead text-muted">{tagline}</p>}
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Button as={Link} to={ctaLink} variant="primary" className="me-sm-2">{ctaText}</Button>
        {ctaText2 && <Button as={Link} to={ctaLink2} variant={ctaVariant2 || 'outline-secondary'}>{ctaText2}</Button>}
      </div>
    </Container>
  );
};

export default HeroSummary;