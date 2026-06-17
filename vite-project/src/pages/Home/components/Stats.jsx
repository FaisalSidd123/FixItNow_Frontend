import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Zap, Award, Globe, Phone } from 'lucide-react';
import './Stats.css';

const statsData = [
  {
    icon: <Zap size={20} />,
    end: 15,
    suffix: '+',
    label: 'Years Experience',
    detail: 'Active Grid Operations',
    tag: 'NODE: EXP-01',
    colorClass: 'color-gold',
    svg: (
      <svg className="stats__svg stats__svg--orbit" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="32" className="orbit-line-1" fill="none" stroke="rgba(245, 166, 35, 0.12)" strokeWidth="1" />
        <circle cx="50" cy="50" r="22" className="orbit-line-2" fill="none" stroke="rgba(245, 166, 35, 0.08)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="6" className="orbit-center" fill="var(--gold)" />
        <circle cx="50" cy="50" r="6" className="orbit-glow" fill="var(--gold)" filter="blur(4px)" opacity="0.6" />
        <circle cx="82" cy="50" r="4" className="orbit-dot" fill="var(--gold-light)" />
      </svg>
    )
  },
  {
    icon: <Award size={20} />,
    end: 50,
    suffix: '+',
    label: 'Awards Won',
    detail: 'Industry Leadership',
    tag: 'NODE: AWD-02',
    colorClass: 'color-gold-light',
    svg: (
      <svg className="stats__svg stats__svg--wave" viewBox="0 0 120 60">
        <line x1="0" y1="30" x2="120" y2="30" stroke="rgba(255, 209, 102, 0.08)" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M 0 30 Q 15 10, 30 30 T 60 30 T 90 30 T 120 30" className="wave-path-back" fill="none" stroke="rgba(255, 209, 102, 0.15)" strokeWidth="1.5" />
        <path d="M 0 30 Q 15 10, 30 30 T 60 30 T 90 30 T 120 30" className="wave-path-front" fill="none" stroke="var(--gold-light)" strokeWidth="2" />
      </svg>
    )
  },
  {
    icon: <Globe size={20} />,
    end: 100,
    suffix: '%',
    label: 'Eco-Certified',
    detail: 'Zero Carbon Footprint',
    tag: 'NODE: ECO-03',
    colorClass: 'color-green',
    svg: (
      <svg className="stats__svg stats__svg--radial" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="32" className="radial-bg" fill="none" stroke="rgba(6, 214, 160, 0.1)" strokeWidth="4" />
        <circle cx="50" cy="50" r="32" className="radial-fill" fill="none" stroke="var(--accent-green)" strokeWidth="4" strokeDasharray="201" strokeDashoffset="201" />
        <circle cx="50" cy="50" r="32" className="radial-glow" fill="none" stroke="var(--accent-green)" strokeWidth="4" strokeDasharray="201" strokeDashoffset="201" filter="blur(3px)" opacity="0.4" />
      </svg>
    )
  },
  {
    icon: <Phone size={20} />,
    end: 24,
    suffix: '/7',
    label: 'Support Available',
    detail: 'Global Service Dispatch',
    tag: 'NODE: SUP-04',
    colorClass: 'color-white',
    svg: (
      <svg className="stats__svg stats__svg--radar" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="4" className="radar-center" fill="var(--white)" />
        <circle cx="50" cy="50" r="18" className="radar-ring-1" fill="none" stroke="rgba(248, 249, 255, 0.1)" strokeWidth="1" />
        <circle cx="50" cy="50" r="32" className="radar-ring-2" fill="none" stroke="rgba(248, 249, 255, 0.08)" strokeWidth="1" />
        <circle cx="50" cy="50" r="32" className="radar-ring-pulse" fill="none" stroke="rgba(248, 249, 255, 0.2)" strokeWidth="1" />
        <line x1="50" y1="50" x2="50" y2="18" className="radar-line" stroke="var(--white)" strokeWidth="1.5" opacity="0.4" />
      </svg>
    )
  },
];

const StatsCounter = ({ value, suffix, inView, delay = 0 }) => {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 45, damping: 15 });
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
    <span className="stats__number-value">
      {text}
      <span className="stats__number-suffix">{suffix}</span>
    </span>
  );
};

const Stats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="stats mesh-bg" ref={ref}>
      <div className="stats__container">
        <div className="stats__header">
          <span className="stats__subtitle">Telemetry Deck</span>
          <h2 className="stats__title">Grid Infrastructure</h2>
          <div className="stats__underline" />
          <p className="stats__description">
            Live operations and performance data from our active solar networks, backing our commitment to clean energy excellence.
          </p>
        </div>

        <div className="stats__grid">
          {statsData.map((s, i) => (
            <motion.div
              className={`stats__block ${s.colorClass} ${inView ? 'is-in-view' : ''}`}
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.1 }}
            >
              {/* Tech Corner Details */}
              <div className="stats__card-corner stats__card-corner--tl" />
              <div className="stats__card-corner stats__card-corner--tr" />
              <div className="stats__card-corner stats__card-corner--bl" />
              <div className="stats__card-corner stats__card-corner--br" />

              <div className="stats__card-header">
                <span className="stats__card-tag">{s.tag}</span>
                <div className="stats__card-icon">{s.icon}</div>
              </div>

              <div className="stats__card-body">
                <div className="stats__svg-container">
                  {s.svg}
                </div>
                <div className="stats__number">
                  <StatsCounter value={s.end} suffix={s.suffix} inView={inView} delay={150 * i} />
                </div>
                <h3 className="stats__label">{s.label}</h3>
                <p className="stats__detail">{s.detail}</p>
              </div>

              {/* Ambient Grid overlay inside card */}
              <div className="stats__card-grid-pattern" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
