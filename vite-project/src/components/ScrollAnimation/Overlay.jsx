import React from 'react';
import './Overlay.css';

const Overlay = React.forwardRef(({ onBookNowClick }, ref) => {
  return (
    <div className="canvas-overlay" ref={ref}>
      {/* Top Header Layer */}
      <header className="overlay-header">
        <div className="overlay-logo">FixItNow</div>
        <nav className="overlay-nav">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <button onClick={onBookNowClick} className="overlay-book-btn">
            Book Now
          </button>
        </nav>
      </header>

      {/* Center Hero Heading (fades out on scroll) */}
      <div className="overlay-center hero-heading">
        <h1 className="hero-title">Power Your Future</h1>
      </div>

      {/* Bottom Layout Fading cues */}
      <div className="overlay-bottom scroll-indicator">
        {/* Pulsing scroll hint text */}
        <p className="scroll-hint-text">Scroll to explore</p>
        
        {/* Pulsing thin orange scroll indicator arrow */}
        <div className="pulse-arrow-wrapper">
          <svg
            className="pulse-arrow"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#EF9F27"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
});

Overlay.displayName = 'Overlay';

export default Overlay;
