import { motion } from 'framer-motion';
import { PhoneCall } from 'lucide-react';
import './CTABanner.css';

const CTABanner = () => {
  return (
    <section className="cta-banner">
      <div className="cta-banner__glow" />
      <motion.div
        className="cta-banner__content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <h2>Ready to Switch to <span className="text-gold">Solar?</span></h2>
        <p>
          Join thousands of smart homeowners saving money and the planet.
          Get a free custom quote today — no obligations, no hidden costs.
        </p>
        <div className="cta-banner__buttons">
          <a href="#contact" className="btn btn--primary">Get Free Quote</a>
          <a href="tel:+923001234567" className="btn btn--outline">
            <PhoneCall size={18} /> Call Us Now
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default CTABanner;
