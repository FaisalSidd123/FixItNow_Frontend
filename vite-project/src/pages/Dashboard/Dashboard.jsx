import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { doSignOut } from '../../firebase/auth';
import {
  Sun,
  Battery,
  Zap,
  TrendingUp,
  Cpu,
  LogOut,
  CheckCircle,
  Calendar,
  Wrench,
  Clock,
  CalendarRange,
  User,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Booking form states
  const [serviceType, setServiceType] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Availed services state
  const [availedServices, setAvailedServices] = useState([
    {
      id: 'SRV-9014',
      type: 'Battery Thermal Tuning',
      date: '2026-06-12',
      status: 'Completed',
      technician: 'Faisal Kamal',
      cost: '$140'
    },
    {
      id: 'SRV-8942',
      type: 'Inverter Diagnostic Sweep',
      date: '2026-05-28',
      status: 'Completed',
      technician: 'Kamran Shah',
      cost: '$120'
    },
    {
      id: 'SRV-8821',
      type: 'Thermal Panel Washing',
      date: '2026-04-15',
      status: 'Completed',
      technician: 'Zainab Ali',
      cost: '$85'
    }
  ]);

  // Simulated live telemetry logs
  const telemetryLogs = [
    { time: '05:32 PM', msg: 'Battery bank temperature stabilized at 28.5°C' },
    { time: '04:15 PM', msg: 'System completed peak production period' },
    { time: '02:00 PM', msg: 'Smart grid feedback rate: Optimum (98.4%)' },
    { time: '11:30 AM', msg: 'Automatic inverter ventilation cooling activated' },
    { time: '08:00 AM', msg: 'Grid sync complete. Energy export initiated' }
  ];

  const handleLogout = async () => {
    try {
      await doSignOut();
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleBookService = (e) => {
    e.preventDefault();
    if (!serviceType || !preferredDate) return;

    // Create a new booking
    const newService = {
      id: `SRV-${Math.floor(1000 + Math.random() * 9000)}`,
      type: serviceType,
      date: preferredDate,
      status: 'Scheduled',
      technician: 'Assigning (Pending)',
      cost: '$110 (Est.)'
    };

    setAvailedServices([newService, ...availedServices]);
    setSuccessMessage(`Success! Booking ${newService.id} has been registered.`);

    // Clear inputs
    setServiceType('');
    setPreferredDate('');
    setNotes('');

    // Clear alert after timeout
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="dashboard-container">
      {/* Welcome Top Banner */}
      <header className="dash-header">
        <div className="dash-welcome">

          <h1>Welcome, {currentUser?.displayName || 'Solar Partner'}</h1>
          <p className="dash-date">
            <Calendar size={14} className="calendar-icon-svg" />
            {currentDate}
          </p>
        </div>
        <button className="dash-logout-btn" onClick={handleLogout}>
          <LogOut size={15} />
          <span>Sign Out</span>
        </button>
      </header>

      {/* Modern Minimal Stats Row */}
      <div className="dash-stats-row">
        <div className="dash-kpi-card">
          <div className="kpi-icon-wrapper">
            <Zap size={18} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">System Health</span>
            <span className="kpi-val">98% <span className="kpi-trend">Optimum</span></span>
          </div>
        </div>

        <div className="dash-kpi-card">
          <div className="kpi-icon-wrapper">
            <Wrench size={18} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Services Availed</span>
            <span className="kpi-val">{availedServices.length} <span className="kpi-trend">Total</span></span>
          </div>
        </div>

        <div className="dash-kpi-card">
          <div className="kpi-icon-wrapper">
            <TrendingUp size={18} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Energy Offset</span>
            <span className="kpi-val">$412.50 <span className="kpi-trend positive">Saved</span></span>
          </div>
        </div>

        <div className="dash-kpi-card">
          <div className="kpi-icon-wrapper">
            <Battery size={18} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Support SLA</span>
            <span className="kpi-val">Premium <span className="kpi-trend">Gold</span></span>
          </div>
        </div>
      </div>

      {/* Main Services & Booking Interface */}
      <div className="dash-main-split">
        {/* Left Side: Booking Desk Form */}
        <div className="dash-split-card booking-card">
          <div className="card-top-header">
            <div className="header-badge">
              <Sparkles size={12} />
              <span>REQUEST DESK</span>
            </div>
            <h2>Book a Solar Service</h2>
            <p>Schedule a certified engineer to inspect or clean your installation.</p>
          </div>

          {successMessage && (
            <div className="form-success-banner">
              <CheckCircle size={16} />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleBookService} className="booking-form">
            <div className="form-group">
              <label>Select Service Option</label>
              <div className="service-tiles-group">
                <button
                  type="button"
                  className={`service-tile ${serviceType === 'Thermal Panel Washing' ? 'active' : ''}`}
                  onClick={() => setServiceType('Thermal Panel Washing')}
                >
                  <Sun size={18} />
                  <div className="tile-text">
                    <h4>Panel Wash</h4>
                    <span>Restore solar efficiency</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`service-tile ${serviceType === 'Inverter Diagnostic Sweep' ? 'active' : ''}`}
                  onClick={() => setServiceType('Inverter Diagnostic Sweep')}
                >
                  <Cpu size={18} />
                  <div className="tile-text">
                    <h4>Inverter Check</h4>
                    <span>Calibrate power flow</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`service-tile ${serviceType === 'Battery Thermal Tuning' ? 'active' : ''}`}
                  onClick={() => setServiceType('Battery Thermal Tuning')}
                >
                  <Battery size={18} />
                  <div className="tile-text">
                    <h4>Battery Tuning</h4>
                    <span>Optimize cell longevity</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`service-tile ${serviceType === 'Wiring Quality Audit' ? 'active' : ''}`}
                  onClick={() => setServiceType('Wiring Quality Audit')}
                >
                  <Zap size={18} />
                  <div className="tile-text">
                    <h4>Wiring Audit</h4>
                    <span>Verify line resistance</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="preferred-date">Preferred Booking Date</label>
              <div className="date-input-wrapper">
                <CalendarRange size={16} className="date-field-icon" />
                <input
                  id="preferred-date"
                  type="date"
                  required
                  value={preferredDate}
                  min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} // Start tomorrow
                  onChange={(e) => setPreferredDate(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="special-notes">Special Instructions (Optional)</label>
              <textarea
                id="special-notes"
                placeholder="e.g. Panel access on flat roof, inverter is in garage..."
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={!serviceType || !preferredDate}
              className="submit-booking-btn"
            >
              <span>Schedule Service Visit</span>
              <Wrench size={16} />
            </button>
          </form>
        </div>

        {/* Right Side: Availed Services & Logs */}
        <div className="dash-split-card right-panel">
          <div className="card-top-header">
            <div className="header-badge">
              <Clock size={12} />
              <span>SYSTEM HISTORY</span>
            </div>
            <h2>Solar Services Availed</h2>
            <p>Monitor your active support events and past maintenance records.</p>
          </div>

          <div className="services-log-list">
            {availedServices.map((service) => (
              <div key={service.id} className="service-log-item">
                <div className="service-log-top">
                  <div className="service-log-meta">
                    <span className="log-id">{service.id}</span>
                    <h3 className="log-type">{service.type}</h3>
                  </div>
                  <span className={`status-badge ${service.status.toLowerCase()}`}>
                    {service.status === 'Completed' ? (
                      <CheckCircle size={12} />
                    ) : (
                      <Clock size={12} />
                    )}
                    {service.status}
                  </span>
                </div>

                <div className="service-log-details">
                  <div className="detail-field">
                    <Calendar size={12} />
                    <span>Scheduled: {service.date}</span>
                  </div>
                  <div className="detail-field">
                    <User size={12} />
                    <span>Engineer: {service.technician}</span>
                  </div>
                  <div className="detail-field price-tag">
                    <span>Fee: {service.cost}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Inline Diagnostic Feed */}
          <div className="diagnostics-feed-section">
            <h3>Live Diagnostics Feed</h3>
            <div className="feed-items">
              {telemetryLogs.map((log, index) => (
                <div key={index} className="feed-item">
                  <span className="feed-time">{log.time}</span>
                  <span className="feed-indicator-dot"></span>
                  <span className="feed-text">{log.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
