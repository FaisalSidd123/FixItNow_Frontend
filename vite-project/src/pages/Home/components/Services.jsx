import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, Sun, Battery, ArrowRight } from 'lucide-react';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: <Home size={26} />,
    number: '01',
    title: 'Residential Installation',
    desc: 'Custom-designed rooftop solar systems that slash your electricity bills and boost your property value.',
    img: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800',
  },
  {
    icon: <Sun size={26} />,
    number: '02',
    title: 'Commercial Solar Farms',
    desc: 'Large-scale solar solutions for businesses and industrial operations — maximise ROI with clean energy.',
    img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800',
  },
  {
    icon: <Battery size={26} />,
    number: '03',
    title: 'Battery & Storage Solutions',
    desc: 'Advanced energy storage systems to keep your home powered 24/7, even during outages.',
    img: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?w=800',
  },
];

const Services = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const thumbRailRef = useRef(null);
  const timelineRef = useRef(null);

  useLayoutEffect(() => {
    const cards = cardRefs.current;
    const total = services.length;

    const ctx = gsap.context(() => {
      // Initial state: only card 0 is visible/centered, rest sit offstage scaled down
      cards.forEach((card, i) => {
        if (i === 0) {
          gsap.set(card, { opacity: 1, scale: 1, x: 0, y: 0, zIndex: total - i });
        } else {
          gsap.set(card, { opacity: 0, scale: 0.82, x: 0, y: 60, zIndex: total - i });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'services-pin',
          trigger: sectionRef.current,
          start: 'top top',
          // Scroll distance scales with number of cards — more cards, more scroll runway
          end: () => `+=${(total - 1) * window.innerHeight * 1.1}`,
          scrub: 0.4,
          pin: true,
          anticipatePin: 1,
        },
      });

      timelineRef.current = tl;

      // One handoff transition per card pair: current shrinks + moves aside, next scales up to center
      for (let i = 0; i < total - 1; i++) {
        const current = cards[i];
        const next = cards[i + 1];

        tl.to(current, {
          scale: 0.78,
          y: -40,
          x: -120,
          opacity: 0.35,
          duration: 1,
          ease: 'power2.inOut',
        }, i)
          .to(next, {
            opacity: 1,
            scale: 1,
            y: 0,
            x: 0,
            duration: 1,
            ease: 'power2.inOut',
          }, i)
          // Fully hide the spent card once the next one has settled into place
          .to(current, {
            opacity: 0,
            duration: 0.3,
          }, i + 0.85);
      }

      // Progress steps reflect which card is currently centered
      if (thumbRailRef.current) {
        const steps = thumbRailRef.current.querySelectorAll('.services__indicator-step');
        tl.eventCallback('onUpdate', () => {
          const progress = tl.progress() * (total - 1);
          const activeIndex = Math.min(total - 1, Math.round(progress));
          steps.forEach((step, i) => {
            step.classList.toggle('is-active', i === activeIndex);
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleStepClick = (index) => {
    const tl = timelineRef.current;
    if (tl && tl.scrollTrigger) {
      const start = tl.scrollTrigger.start;
      const end = tl.scrollTrigger.end;
      const progress = index / (services.length - 1);
      const targetScroll = start + progress * (end - start);
      window.scrollTo({
        top: targetScroll + 2, // Slight offset to ensure GSAP updates activeIndex cleanly
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="services" className="services" ref={sectionRef}>
      <div className="services__stage">
        <div className="services__container">
          <div className="services__info">
            <span className="services__subtitle">Our Expertise</span>
            <h2 className="services__title">What We Do</h2>
            <div className="services__underline" />
            <p className="services__tagline">
              Empowering your home and business with sustainable, high-efficiency energy solutions designed for the future.
            </p>

            {/* Interactive Timeline Indicators */}
            <div className="services__indicators" ref={thumbRailRef}>
              {services.map((s, i) => (
                <div
                  key={i}
                  className={`services__indicator-step ${i === 0 ? 'is-active' : ''}`}
                  onClick={() => handleStepClick(i)}
                >
                  <span className="services__indicator-num">{s.number}</span>
                  <div className="services__indicator-content">
                    <span className="services__indicator-label">Service {s.number}</span>
                    <h4>{s.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="services__card-wrapper">
            <div className="services__cards">
              {services.map((s, i) => (
                <div
                  className="service-card"
                  key={i}
                  ref={(el) => (cardRefs.current[i] = el)}
                >
                  <span className="service-card__number">{s.number}</span>

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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;