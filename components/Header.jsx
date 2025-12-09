import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BrainCircuit, ArrowLeft } from 'lucide-react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="navbar-glass sticky-top">

      <Container>
        <Navbar.Brand>
          <BrainCircuit className="d-inline-block align-top me-2" />
          NeuroInsight
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/product-overview">Product</Nav.Link>
            <Nav.Link as={Link} to="/live-demo">Demo</Nav.Link>
            <Nav.Link as={Link} to="/research">Research</Nav.Link>
            
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
          <Nav>
            <Button as={Link} to="/live-demo" variant="primary">Try Live Demo</Button>
            <Button as={Link} to="/app/dashboard" variant="outline-primary" className="ms-2">Go to App</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;