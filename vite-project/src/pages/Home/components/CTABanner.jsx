import { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Calculator, TrendingDown } from 'lucide-react';
import './CTABanner.css';

const CTABanner = () => {
  const [bill, setBill] = useState(240);

  // realistic solar output formulas
  const annualSavings = Math.round(bill * 12 * 0.88);
  const systemSize = (bill / 32).toFixed(1);
  const co2Saved = Math.round(bill * 0.45 * 12); // kg of CO2 saved per year

  // Circle gauge math (radius 24, circumference = 150.8, round to 151)
  const maxBill = 1000;
  const fillPercentage = (bill / maxBill) * 100;
  const strokeOffset = 151 - (151 * fillPercentage) / 100;

  return (
    <section className="cta-banner">
      <div className="cta-banner__container">
        <motion.div
          className="cta-banner__content"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="cta-banner__subtitle">Energy Revolution</span>
          <h2>Ready to Erase Your <span className="text-gold">Electricity Bills?</span></h2>
          <p>
            Join thousands of smart homeowners and businesses saving up to 90% on utility bills while securing energy independence. Get your customized proposal today.
          </p>
          <div className="cta-banner__buttons">
            <a href="#contact" className="btn btn--primary">Get Free Quote</a>
            <a href="tel:+923001234567" className="btn btn--outline">
              <PhoneCall size={18} /> Call Us Now
            </a>
          </div>
        </motion.div>

        {/* Dynamic Calculator Widget */}
        <motion.div
          className="cta-banner__calculator"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="cta-banner__calc-header">
            <div className="cta-banner__calc-title">
              <Calculator size={15} className="text-gold" />
              <span>Solar Savings Estimator</span>
            </div>
            <span className="cta-banner__calc-badge">LIVE CALCULATION</span>
          </div>

          <div className="cta-banner__calc-body">
            <div className="cta-banner__slider-group">
              <div className="cta-banner__slider-header">
                <span className="cta-banner__slider-label">Current Monthly Bill</span>
                <span className="cta-banner__slider-val">${bill}</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
                className="cta-banner__slider"
              />
              <div className="cta-banner__slider-limits">
                <span>$50</span>
                <span>$1000</span>
              </div>
            </div>

            <div className="cta-banner__results-grid">
              <div className="cta-banner__result-card">
                <span className="cta-banner__result-label">Est. Annual Savings</span>
                <div className="cta-banner__result-value text-gold">
                  ${annualSavings.toLocaleString()}
                  <span className="cta-banner__result-unit">/yr</span>
                </div>
              </div>

              <div className="cta-banner__result-card">
                <span className="cta-banner__result-label">System Size Needed</span>
                <div className="cta-banner__result-value">
                  {systemSize}
                  <span className="cta-banner__result-unit"> kW</span>
                </div>
              </div>
            </div>

            {/* Environmental Impact Gauge */}
            <div className="cta-banner__impact">
              <div className="cta-banner__gauge-wrapper">
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="24" className="cta-banner__gauge-bg" />
                  <motion.circle
                    cx="30"
                    cy="30"
                    r="24"
                    className="cta-banner__gauge-fill"
                    style={{ strokeDasharray: 151, strokeDashoffset: strokeOffset }}
                  />
                </svg>
                <div className="cta-banner__gauge-icon">
                  <TrendingDown size={14} className="text-green" />
                </div>
              </div>
              <div className="cta-banner__impact-text">
                <h5>Carbon Reduction</h5>
                <p>Equivalent to planting {Math.round(co2Saved / 22)} trees annually ({co2Saved.toLocaleString()} kg CO2 saved).</p>
              </div>
            </div>
          </div>

          <div className="cta-banner__calc-grid-pattern" />
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
