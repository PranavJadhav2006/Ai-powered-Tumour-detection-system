import React from 'react';
import './ProductOverviewPage.css';
import '../pages/HomePage.css';
import HeroSummary from '../components/HeroSummary';
import DeepFeatures from '../components/DeepFeatures';
import Architecture from '../components/Architecture';
import ComparisonTable from '../components/ComparisonTable';

import ProductCTA from '../components/ProductCTA';

const ProductOverviewPage = () => {
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
                title="AI-powered brain tumor detection and surgical planning"
                ctaText="Request Pilot"
                ctaLink="/request-pilot"
            />
            <DeepFeatures />
            <Architecture />
            <ComparisonTable />
            <ProductCTA />
        </div>
    </section>
    );
};

export default ProductOverviewPage;