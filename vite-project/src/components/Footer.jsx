import { Zap, Mail, Phone, MapPin } from 'lucide-react';

// Simple SVG social icons (lucide-react dropped brand icons)
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
);
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/></svg>
);
const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
);
import './Footer.css';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="footer__grid">
        {/* Column 1: Brand */}
        <div className="footer__col">
          <a href="#home" className="footer__logo">
            <Zap size={22} />
            <span>FixItNow</span>
          </a>
          <p className="footer__tagline">
            Pakistan's #1 premium solar energy partner. Powering homes and
            businesses with clean, reliable solar solutions since 2009.
          </p>
          <div className="footer__socials">
            <a href="#" aria-label="Facebook"><FacebookIcon /></a>
            <a href="#" aria-label="Instagram"><InstagramIcon /></a>
            <a href="#" aria-label="LinkedIn"><LinkedinIcon /></a>
            <a href="#" aria-label="YouTube"><YoutubeIcon /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div className="footer__col">
          <h4>Our Services</h4>
          <ul>
            <li><a href="#services">Residential Solar</a></li>
            <li><a href="#services">Commercial Farms</a></li>
            <li><a href="#services">Battery Storage</a></li>
            <li><a href="#services">Maintenance Plans</a></li>
            <li><a href="#services">Energy Monitoring</a></li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="footer__col">
          <h4>Contact Us</h4>
          <div className="footer__contact-item">
            <MapPin size={16} />
            <span>45-B, Solar Avenue, Gulberg III, Lahore</span>
          </div>
          <div className="footer__contact-item">
            <Phone size={16} />
            <span>+92 300 123 4567</span>
          </div>
          <div className="footer__contact-item">
            <Mail size={16} />
            <span>hello@fixitnow.pk</span>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} FixItNow. All rights reserved.</p>
        <p>Made with ☀️ by FixItNow</p>
      </div>
    </footer>
  );
};

export default Footer;
