import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { label: 'Home', route: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Contact', href: '/#contact' },
];

  const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="navbar__inner">
        <a href="#home" className="navbar__logo">
          <Zap size={24} />
          <span>FixItNow</span>
        </a>

        <ul className="navbar__links">
 {navLinks.map((link) => (
  <li key={link.label}>

    {link.route ? (
      <Link to={link.route}>{link.label}</Link>
    ) : (
      <a href={link.href}>{link.label}</a>
    )}

  </li>
))}
        </ul>

      
        <div className="navbar__actions">

  <Link to="/signin" className="navbar__signin">
  Sign In
</Link>
  <Link to="/signup" className="navbar__signup">
  Sign Up
</Link>

  <a href="#contact" className="navbar__cta">
    Get Free Quote
  </a>

</div>

        <button
          className="navbar__hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
  to="/signin"
  className="mobile-signin"
  onClick={() => setMobileOpen(false)}
>
  Sign In
</Link>

<Link
  to="/signup"
  className="mobile-signup"
  onClick={() => setMobileOpen(false)}
>
  Sign Up
</Link>
            <a href="#contact" className="navbar__cta navbar__cta--mobile" onClick={() => setMobileOpen(false)}>
              Get Free Quote
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
export default Navbar;
