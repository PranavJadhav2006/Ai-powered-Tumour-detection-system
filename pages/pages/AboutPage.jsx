import React from 'react';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Linkedin, Github, Twitter, Award, Newspaper, GraduationCap } from 'lucide-react';
import './AboutPage.css';
import './HomePage.css';

const teamMembers = [
  {
    photo: 'https://via.placeholder.com/150/00C2A8/FFFFFF?text=TM1', // Placeholder image
    name: 'John Doe',
    role: 'CEO & Founder',
    tagline: 'Visionary Leader | AI Strategist',
    description: `Drives the company's strategic vision and product innovation, leveraging extensive experience in AI and healthcare.`,
    linkedin: '#', github: '#', twitter: '#'
  },
  {
    photo: 'https://via.placeholder.com/150/7C5CE0/FFFFFF?text=TM2', // Placeholder image
    name: 'Jane Smith',
    role: 'CTO',
    tagline: 'AI Engineer | 3D Vision Specialist',
    description: `Leads the technical development of BrainVision's core AI models and 3D visualization engine.`,
    linkedin: '#', github: '#', twitter: '#'
  },
  {
    photo: 'https://via.placeholder.com/150/B19EEF/FFFFFF?text=TM3', // Placeholder image
    name: 'Dr. Alex Lee',
    role: 'Chief Medical Officer',
    tagline: 'Neuro-Radiologist | Clinical Expert',
    description: `Provides clinical guidance and ensures the medical accuracy and utility of the AI system.`,
    linkedin: '#', github: '#', twitter: '#'
  },
  {
    photo: 'https://via.placeholder.com/150/00C2A8/FFFFFF?text=TM4', // Placeholder image
    name: 'Sarah Chen',
    role: 'Head of Product',
    tagline: 'User Experience | Healthcare Solutions',
    description: `Focuses on user-centric design and product roadmap, translating clinical needs into intuitive features.`,
    linkedin: '#', github: '#', twitter: '#'
  },
];

const advisoryBoard = [
  {
    name: 'Dr. A. Rao',
    title: 'Senior Radiologist',
    experience: '20+ yrs experience',
    quote: `“This AI assistant could reduce report times by over 60%.”`,
  },
  {
    name: 'Dr. S. Nair',
    title: 'Neurosurgeon',
    hospital: 'Apollo Hospitals',
    quote: `“The precision offered by BrainVision AI is a significant leap forward for surgical planning.”`,
  },
];

const AboutPage = () => {
  return (
    <section className="homepage-bg">
      <div className="homepage-video-wrapper">
        <video autoPlay muted loop playsInline className="homepage-bg-video">
          <source src="/video/homepage-bg2.mp4" type="video/mp4" />
          {/* Fallback if video doesn't load */}
          <img src="/conny-schneider-xuTJZ7uD7PI-unsplash.jpg" alt="Background fallback" />
        </video>
      </div>
      <div className="content">
        <div className="about-page py-5">
          <Container>
            {/* 1. Hero Header */}
            <section className="mb-5 text-center alternating-bg">
              <h4 className="display-5 text-white mb-3">AI + Medicine + Empathy = NeuroInsight</h4>
              <p className="lead text-center text-white-50 mb-5">Built by innovators, validated by experts</p>
              {/* Placeholder for team photo/collage */}
              <Image src="https://via.placeholder.com/800x300/0F172A/FFFFFF?text=Team+Photo+Collage" fluid rounded className="mt-4" />
            </section>

        <section className="mb-5">
              <h2 className="display-6 mb-4 text-white text-center">Team Bios</h2>
              <Row>
                {teamMembers.map((member, index) => (
                  <Col md={3} key={index} className="mb-4">
                    <Card className="h-100 text-white rounded-4 shadow-sm">
                      <Card.Body className="text-center d-flex flex-column">
                        <Image src={member.photo} roundedCircle fluid className="mb-3 team-photo mx-auto" />
                        <Card.Title as="h4" className="text-primary mb-1">{member.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-white-50">{member.role}</Card.Subtitle>
                        <p className="fs-6 text-white-50 mb-2">{member.tagline}</p>
                        <p className="fs-6 text-white-50">{member.description}</p>
                        <div className="social-links mt-auto">
                          {member.linkedin && <Button variant="link" href={member.linkedin} target="_blank" className="text-white-50"><Linkedin size={20} /></Button>}
                          {member.github && <Button variant="link" href={member.github} target="_blank" className="text-white-50"><Github size={20} /></Button>}
                          {member.twitter && <Button variant="link" href={member.twitter} target="_blank" className="text-white-50"><Twitter size={20} /></Button>}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </section>
          </Container>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;