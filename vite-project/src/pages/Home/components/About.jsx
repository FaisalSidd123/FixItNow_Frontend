import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './About.css';

const stats = [
  { label: 'Solar Efficiency', value: 95, suffix: '%' },
  { label: 'Customer Satisfaction', value: 98, suffix: '%' },
  { label: 'On-time Delivery', value: 99, suffix: '%' },
];

// Animated count-up number — climbs from 0 to target once in view
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
          <h2>
            Built on Trust, <span className="text-gold">Powered by the Sun</span>
          </h2>
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

          <div className="about__stats">
            {stats.map((s, i) => (
              <div className="about__stat" key={i}>
                <Counter value={s.value} suffix={s.suffix} inView={inView} delay={200 + i * 180} />
                <span className="about__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/*
          Sunlight wipe reveal:
          A warm gradient mask sits on top of the image at full opacity/width.
          On scroll-into-view, the mask's clip-path sweeps left-to-right and fades,
          uncovering the photo like dawn breaking across it rather than a generic slide-in.
        */}
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
            viewport={{ once: true, amount: 0.3 }}
          />
          {/* Soft glow that travels with the wipe edge, like the sun itself moving across */}
          <motion.div
            className="about__sun-glow"
            initial={{ left: '0%', opacity: 0.9 }}
            whileInView={{ left: '100%', opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          />
          <div className="about__image-accent" />
        </div>
      </div>
    </section>
  );
};

export default About;