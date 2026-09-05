import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShieldCheck, Cpu } from 'lucide-react';
import './About.css';

const stats = [
  { label: 'Solar Efficiency', value: 95, suffix: '%' },
  { label: 'Customer Satisfaction', value: 98, suffix: '%' },
  { label: 'On-time Delivery', value: 99, suffix: '%' },
];

const Counter = ({ value, suffix, inView, delay = 0 }) => {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18 });
  const display = useTransform(spring, (v) => Math.round(v));
  const [text, setText] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => motionVal.set(value), delay);
    return () => clearTimeout(timer);
  }, [inView, value, delay, motionVal]);

  useEffect(() => {
    const unsub = display.on('change', (v) => setText(String(v)));
    return () => unsub();
  }, [display]);

  return (
    <span className="about__stat-number">
      {text}
      <span className="about__stat-suffix">{suffix}</span>
    </span>
  );
};

const CircularProgress = ({ value, label, suffix, inView, delay }) => {
  const strokeOffset = 176 - (176 * value) / 100;

  return (
    <div className="about__stat-circular">
      <div className="about__stat-circle-wrapper">
        <svg width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r="28" className="about__circle-bg" />
          <motion.circle
            cx="36"
            cy="36"
            r="28"
            className="about__circle-fill"
            initial={{ strokeDashoffset: 176 }}
            animate={inView ? { strokeDashoffset: strokeOffset } : { strokeDashoffset: 176 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: delay / 1000 }}
          />
        </svg>
        <div className="about__circle-content">
          <Counter value={value} suffix={suffix} inView={inView} delay={delay} />
        </div>
      </div>
      <span className="about__stat-label">{label}</span>
    </div>
  );
};

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" className="about" ref={ref}>
      <div className="about__container">
        <motion.div
          className="about__text"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="about__subtitle">Who We Are</span>
          <h2>
            Built on Trust, <span className="text-gold">Powered by the Sun</span>
          </h2>
          <div className="about__underline" />
          <p className="about__desc">
            Since 2009, FixItNow has been Pakistan's most trusted solar energy partner.
            We design, install, and maintain world-class solar systems for homes and
            businesses — combining cutting-edge technology with unmatched customer care.
          </p>

          {/* Core Pillars */}
          <div className="about__pillars">
            <div className="about__pillar">
              <div className="about__pillar-icon"><ShieldCheck size={18} /></div>
              <div className="about__pillar-content">
                <h4>Engineering Precision</h4>
                <p>Tailored CAD system design by certified engineers.</p>
              </div>
            </div>
            <div className="about__pillar">
              <div className="about__pillar-icon"><Cpu size={18} /></div>
              <div className="about__pillar-content">
                <h4>Smart Grid Ready</h4>
                <p>Intelligent real-time generation monitoring overlays.</p>
              </div>
            </div>
          </div>

          <div className="about__stats">
            {stats.map((s, i) => (
              <CircularProgress
                key={i}
                value={s.value}
                label={s.label}
                suffix={s.suffix}
                inView={inView}
                delay={200 + i * 180}
              />
            ))}
          </div>
        </motion.div>

        {/* Sunlight wipe reveal image container */}
        <div className="about__image-container">
          <div className="about__image">
            <img
              src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=900"
              alt="Technician installing solar panels"
              loading="lazy"
            />
            <motion.div
              className="about__sun-wipe"
              initial={{ clipPath: 'inset(0 0% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 100% 0 0)' }}
              transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
              viewport={{ once: true, amount: 0.2 }}
            />
            {/* Soft glow that travels with the wipe edge */}
            <motion.div
              className="about__sun-glow"
              initial={{ left: '0%', opacity: 0.9 }}
              whileInView={{ left: '100%', opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
              viewport={{ once: true, amount: 0.2 }}
            />

            {/* Floating Live Telemetry Widget Overlay */}
            <motion.div
              className="about__image-widget"
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="about__widget-header">
                <span className="about__widget-pulse" />
                <span className="about__widget-tag">NODE SYNC // ACTIVE</span>
              </div>
              <div className="about__widget-body">
                <div className="about__widget-row">
                  <span className="about__widget-label">Grid Mode</span>
                  <span className="about__widget-val text-gold">Generating</span>
                </div>
                <div className="about__widget-row">
                  <span className="about__widget-label">Solar Output</span>
                  <span className="about__widget-val">9.4 kW</span>
                </div>
                <div className="about__widget-row">
                  <span className="about__widget-label">Efficiency</span>
                  <span className="about__widget-val text-green">Optimal</span>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="about__image-accent" />
        </div>
      </div>
    </section>
  );
};

export default About;