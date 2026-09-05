import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { getSiteReviews } from '../../../api/reviewApi';
import './Testimonials.css';

const defaultTestimonials = [
  {
    quote: "FixItNow transformed our energy bills completely. Within 3 months, we were saving over 80% on electricity. The installation was seamless.",
    name: 'Ahmed Khan',
    city: 'Lahore',
    stars: 5,
  },
  {
    quote: "Best investment we've ever made for our home. The team was punctual, clean, and explained everything perfectly from day one.",
    name: 'Sarah Malik',
    city: 'Islamabad',
    stars: 5,
  },
  {
    quote: "From consultation to installation, FixItNow exceeded every expectation. Their monitoring app keeps us informed around the clock.",
    name: 'Bilal Hussain',
    city: 'Karachi',
    stars: 5,
  }
];

const Card = ({ t }) => (
  <div className="t-card">
    <Quote className="t-card__mark" size={28} strokeWidth={1.5} />
    <p className="t-card__quote">{t.quote}</p>
    <div className="t-card__footer">
      <div className="t-card__stars">
        {Array.from({ length: t.stars || 5 }).map((_, i) => (
          <Star key={i} size={13} fill="var(--gold)" color="var(--gold)" />
        ))}
      </div>
      <div className="t-card__author">
        <span className="t-card__name">{t.name}</span>
        {t.city && <><span className="t-card__dot">·</span><span className="t-card__city">{t.city}</span></>}
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const trackRef = useRef(null);
  const [list, setList] = useState(defaultTestimonials);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const fetched = await getSiteReviews();
        if (fetched && fetched.length > 0) {
          const mapped = fetched.map(r => ({
            quote: r.comment,
            name: r.author_name,
            city: r.author_email ? r.author_email.split('@')[0] : 'Verified Client',
            stars: r.rating || 5
          }));
          setList(mapped);
        }
      } catch (err) {
        console.error("Error loading site reviews:", err);
      }
    };
    loadReviews();
  }, []);

  const loopList = [...list, ...list];

  return (
    <section id="testimonials" className="testimonials">
      <motion.div
        className="testimonials__head"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      >
        <span className="testimonials__eyebrow">Trusted nationwide</span>
        <h2>What our clients say</h2>
      </motion.div>

      <div className="testimonials__marquee">
        <div className="testimonials__fade testimonials__fade--left" />
        <div className="testimonials__fade testimonials__fade--right" />

        <div className="testimonials__track" ref={trackRef}>
          {loopList.map((t, i) => (
            <Card t={t} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;