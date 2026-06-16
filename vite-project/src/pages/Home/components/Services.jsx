import { motion } from 'framer-motion';
import { Home, Sun, Battery, ArrowRight } from 'lucide-react';
import './Services.css';

const services = [
  {
    icon: <Home size={28} />,
    title: 'Residential Installation',
    desc: 'Custom-designed rooftop solar systems that slash your electricity bills and boost your property value.',
    img: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600',
  },
  {
    icon: <Sun size={28} />,
    title: 'Commercial Solar Farms',
    desc: 'Large-scale solar solutions for businesses and industrial operations — maximise ROI with clean energy.',
    img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600',
  },
  {
    icon: <Battery size={28} />,
    title: 'Battery & Storage Solutions',
    desc: 'Advanced energy storage systems to keep your home powered 24/7, even during outages.',
    img: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?w=600',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const Services = () => {
  return (
    <section id="services" className="services">
      <motion.div
        className="services__header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2>What We Do</h2>
        <div className="services__underline" />
      </motion.div>

      <div className="services__grid">
        {services.map((s, i) => (
          <motion.div
            className="service-card"
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="service-card__img">
              <img src={s.img} alt={s.title} loading="lazy" />
              <div className="service-card__img-overlay" />
            </div>
            <div className="service-card__body">
              <div className="service-card__icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <a href="#contact" className="service-card__link">
                Learn More <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
