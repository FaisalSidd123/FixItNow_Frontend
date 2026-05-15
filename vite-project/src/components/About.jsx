import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './About.css';

const progressData = [
  { label: 'Solar Efficiency', value: 95 },
  { label: 'Customer Satisfaction', value: 98 },
  { label: 'On-time Delivery', value: 99 },
];

const ProgressBar = ({ label, value, inView, delay }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setWidth(value), delay);
      return () => clearTimeout(timer);
    }
  }, [inView, value, delay]);

  return (
    <div className="about__progress">
      <div className="about__progress-header">
        <span>{label}</span>
        <span className="text-gold">{value}%</span>
      </div>
      <div className="about__progress-track">
        <div
          className="about__progress-fill"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" className="about" ref={ref}>
      <div className="about__container">
        <motion.div
          className="about__text"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2>Built on Trust, <span className="text-gold">Powered by the Sun</span></h2>
          <p>
            Since 2009, FixItNow has been Pakistan's most trusted solar energy partner.
            We design, install, and maintain world-class solar systems for homes and
            businesses — combining cutting-edge technology with unmatched customer care.
          </p>
          <p>
            Our mission is simple: make clean, renewable energy accessible to every
            household. With certified engineers and premium-grade panels, we guarantee
            performance that lasts decades.
          </p>

          <div className="about__bars">
            {progressData.map((p, i) => (
              <ProgressBar
                key={i}
                label={p.label}
                value={p.value}
                inView={inView}
                delay={300 + i * 200}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="about__image"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=900"
            alt="Technician installing solar panels"
            loading="lazy"
          />
          <div className="about__image-accent" />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
