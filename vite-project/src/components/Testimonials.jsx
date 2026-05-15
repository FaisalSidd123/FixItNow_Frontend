import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    quote: "FixItNow transformed our energy bills completely. Within 3 months, we were saving over 80% on electricity. The installation was seamless and the team was incredibly professional.",
    name: 'Ahmed Khan',
    city: 'Lahore',
    stars: 5,
  },
  {
    quote: "Best investment we've ever made for our home. The team was punctual, clean, and explained everything perfectly. Our system has been running flawlessly for over two years now.",
    name: 'Sarah Malik',
    city: 'Islamabad',
    stars: 5,
  },
  {
    quote: "From consultation to installation, FixItNow exceeded every expectation. Their monitoring app keeps us informed 24/7 and their support team is always just a call away.",
    name: 'Bilal Hussain',
    city: 'Karachi',
    stars: 5,
  },
];

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = useCallback((dir) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => paginate(1), 4000);
    return () => clearInterval(interval);
  }, [paginate]);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="testimonials">
      <div className="testimonials__bg">
        <img
          src="https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=1400"
          alt="Sunset sky"
          loading="lazy"
        />
        <div className="testimonials__overlay" />
      </div>

      <div className="testimonials__content">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          What Our Clients Say
        </motion.h2>

        <div className="testimonials__carousel">
          <button className="testimonials__arrow" onClick={() => paginate(-1)} aria-label="Previous">
            <ChevronLeft size={24} />
          </button>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              className="testimonials__slide"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="testimonials__stars">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} size={20} fill="var(--gold)" color="var(--gold)" />
                ))}
              </div>
              <p className="testimonials__quote">"{t.quote}"</p>
              <div className="testimonials__author">
                <span className="testimonials__name">{t.name}</span>
                <span className="testimonials__city">{t.city}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <button className="testimonials__arrow" onClick={() => paginate(1)} aria-label="Next">
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="testimonials__dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot ${i === current ? 'active' : ''}`}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
