import { motion } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import './Hero.css';

const stats = [
  { value: '10K+', label: 'Homes' },
  { value: '98%', label: 'Satisfaction' },
  { value: '25yr', label: 'Warranty' },
  { value: '₨0', label: 'Down Payment' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero__bg">
        <img
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1800"
          alt="Solar panels under bright sky"
          loading="eager"
        />
        <div className="hero__overlay" />
      </div>

      <motion.div
        className="hero__content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="hero__title" variants={itemVariants}>
          Power Your Future With <span className="text-gold">Clean Solar Energy</span>
        </motion.h1>

        <motion.p className="hero__sub" variants={itemVariants}>
          FixItNow delivers premium solar installation, maintenance &amp; monitoring
          — trusted by 10,000+ homes across Pakistan.
        </motion.p>

        <motion.div className="hero__buttons" variants={itemVariants}>
          <a href="#services" className="btn btn--primary">Explore Services</a>
          <a href="#about" className="btn btn--outline">
            <Play size={18} /> Watch How It Works
          </a>
        </motion.div>
      </motion.div>

      {/* Floating Stats Bar */}
      <motion.div
        className="hero__stats"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.2, ease: 'easeOut' }}
      >
        {stats.map((s, i) => (
          <div className="hero__stat" key={i}>
            <span className="hero__stat-value">{s.value}</span>
            <span className="hero__stat-label">{s.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Scroll Arrow */}
      <motion.a
        href="#services"
        className="hero__scroll-arrow"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={32} />
      </motion.a>
    </section>
  );
};

export default Hero;
