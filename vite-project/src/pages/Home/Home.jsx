import React, { Suspense } from 'react';
import ScrollCanvas from '../../components/ScrollAnimation/ScrollCanvas';

// Lazy load below-the-fold components for optimized page speed and performance
const Services = React.lazy(() => import('./components/Services'));
const Stats = React.lazy(() => import('./components/Stats'));
const About = React.lazy(() => import('./components/About'));
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const CTABanner = React.lazy(() => import('./components/CTABanner'));
const Footer = React.lazy(() => import('../../components/layout/Footer/Footer'));

// Premium, visually clean fallback placeholder shown while components load
const LazySectionPlaceholder = () => (
  <div style={{
    height: '40vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0c0c0c',
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: '14px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontFamily: "'Outfit', 'Inter', sans-serif"
  }}>
    <div style={{
      width: '30px',
      height: '30px',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      borderTopColor: '#EF9F27',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '1rem'
    }}></div>
    <span>Loading Solar Experience...</span>
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

function Home() {
  return (
    <>
      {/* Premium Full-screen Scroll-driven Canvas Animation */}
      <ScrollCanvas />

      {/* Lazy Loaded Page Content */}
      <Suspense fallback={<LazySectionPlaceholder />}>
        <Services />
        <Stats />
        <About />
        <Testimonials />
        <CTABanner />
        <Footer />
      </Suspense>
    </>
  );
}

export default Home;
