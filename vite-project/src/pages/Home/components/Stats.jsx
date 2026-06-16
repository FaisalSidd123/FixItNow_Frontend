import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Award, Globe, Phone } from 'lucide-react';
import './Stats.css';

const statsData = [
  { icon: <Zap size={32} />, end: 15, suffix: '+', label: 'Years Experience' },
  { icon: <Award size={32} />, end: 50, suffix: '+', label: 'Awards Won' },
  { icon: <Globe size={32} />, end: 100, suffix: '%', label: 'Eco-Certified' },
  { icon: <Phone size={32} />, end: 24, suffix: '/7', label: 'Support Available' },
];

const CountUp = ({ end, suffix, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return <span>{count}{suffix}</span>;
};

const Stats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section className="stats mesh-bg" ref={ref}>
      <div className="stats__grid">
        {statsData.map((s, i) => (
          <motion.div
            className="stats__block"
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="stats__icon">{s.icon}</div>
            <div className="stats__number">
              <CountUp end={s.end} suffix={s.suffix} inView={inView} />
            </div>
            <div className="stats__label">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
