import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'residential',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeSelect = (type) => {
    setFormData((prev) => ({ ...prev, projectType: type }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    // Simulate API Intake Submit
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', projectType: 'residential', message: '' });
    }, 2000);
  };

  // Progress calculator
  const requiredFields = [formData.name, formData.email, formData.message];
  const filledFields = requiredFields.filter((f) => f.trim() !== '').length;
  const progressPercent = Math.round((filledFields / requiredFields.length) * 100);

  return (
    <section id="contact" className="contact">
      <div className="contact__container">
        {/* Left Column: Operational Telemetry Desk */}
        <motion.div
          className="contact__info"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="contact__subtitle">Get In Touch</span>
          <h2 className="contact__title">Start Your Solar Transition</h2>
          <div className="contact__underline" />
          <p className="contact__description">
            Tell us about your energy needs, and our design team will build a comprehensive CAD solar report and custom financial proposal for your property.
          </p>

          <div className="contact__details">
            <a href="tel:+923001234567" className="contact__item-link">
              <div className="contact__item-icon"><Phone size={18} /></div>
              <div className="contact__item-text">
                <span className="contact__item-label">Direct Hotline</span>
                <span className="contact__item-val">+92 (300) 123-4567</span>
              </div>
            </a>

            <a href="mailto:info@fititnow.pk" className="contact__item-link">
              <div className="contact__item-icon"><Mail size={18} /></div>
              <div className="contact__item-text">
                <span className="contact__item-label">Technical Inquiries</span>
                <span className="contact__item-val">support@fixitnow.pk</span>
              </div>
            </a>

            <div className="contact__item-static">
              <div className="contact__item-icon"><MapPin size={18} /></div>
              <div className="contact__item-text">
                <span className="contact__item-label">Regional HQ</span>
                <span className="contact__item-val">Phase 6, DHA, Lahore, Pakistan</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Glassmorphic Project Intake Form */}
        <motion.div
          className="contact__form-wrapper"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="contact__form-card">
            {/* Top Form Progress Bar */}
            <div className="contact__form-progress">


            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  onSubmit={handleSubmit}
                  className="contact__form"
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Project Type Select */}
                  <div className="contact__form-group">
                    <label className="contact__label">Select System Type</label>
                    <div className="contact__type-tabs">
                      {['residential', 'commercial', 'off-grid'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          className={`contact__type-btn ${formData.projectType === type ? 'is-active' : ''}`}
                          onClick={() => handleTypeSelect(type)}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="contact__form-group">
                    <label htmlFor="name" className="contact__label">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Faisal Siddiqui"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="contact__input"
                    />
                  </div>

                  <div className="contact__form-group">
                    <label htmlFor="email" className="contact__label">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. faisal@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="contact__input"
                    />
                  </div>

                  <div className="contact__form-group">
                    <label htmlFor="message" className="contact__label">Project Context / Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows="4"
                      placeholder="Tell us about your property, average monthly energy usage, or current grid issues..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="contact__textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="contact__submit-btn"
                  >
                    {submitting ? (
                      <span className="contact__loading-spinner" />
                    ) : (
                      <>
                        Submit Proposal Request <Send size={15} />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  className="contact__success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="contact__success-icon"><CheckCircle size={48} /></div>
                  <h3>Intake Synced!</h3>
                  <p>
                    Thank you. Your project metadata has been locked in. A design engineer will reach out within 24 hours with your preliminary site proposal.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="contact__reset-btn"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="contact__form-grid-pattern" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
