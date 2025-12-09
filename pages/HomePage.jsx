import React from 'react';
import HeroSummary from '../components/HeroSummary';
import AnimatedSection from '../components/AnimatedSection';
import KeyMetrics from '../components/KeyMetrics';
import HowItWorks from '../components/HowItWorks';
import FeatureHighlights from '../components/FeatureHighlights';
import PersonaStrip from '../components/PersonaStrip';
import CustomerQuotes from '../components/CustomerQuotes';
import './HomePage.css';

const HomePage = () => {
  return (
    <section className="homepage-bg">
      <div className="homepage-video-wrapper">
        <video autoPlay muted loop playsInline className="homepage-bg-video">
          <source src="/video/homepage-bg2.mp4" type="video/mp4" />
          {/* Fallback if video doesn't load */}
          <img src="/conny-schneider-xuTJZ7uD7PI-unsplash.jpg" alt="Background fallback" />
        </video>
      </div>
      
      {/* Your homepage content here */}
      <div className="content">
        <HeroSummary 
          title="AI-Powered Brain MRI Analysis for Precision Tumor Detection and 3D Visualization" 
          tagline="A new era of surgical precision and diagnostic confidence"
          ctaText="Run Live Demo" 
          ctaLink="/live-demo" 
          ctaText2="Watch 90s Demo"
          ctaLink2="/demo-video"
          ctaVariant2="outline-secondary"
        />
        <AnimatedSection>
          <KeyMetrics />
        </AnimatedSection>
        <AnimatedSection>
          <HowItWorks />
        </AnimatedSection>
        <AnimatedSection>
          <FeatureHighlights />
        </AnimatedSection>
        <AnimatedSection>
          <PersonaStrip />
        </AnimatedSection>
        <AnimatedSection>
          <CustomerQuotes />
        </AnimatedSection>
      </div>
    </section>
  );
};

export default HomePage;