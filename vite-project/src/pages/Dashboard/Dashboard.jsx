import React from 'react';
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
  CheckCircle2,
  Calendar,
  CloudSun,
  Award
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await doSignOut();
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Mock data for 12 solar panels
  const panels = Array.from({ length: 12 }, (_, i) => ({
    id: `PNL-${String(i + 1).padStart(3, '0')}`,
    efficiency: Math.round(92 + Math.random() * 7), // 92% - 99%
    status: 'Online',
    output: (280 + Math.random() * 40).toFixed(0) // 280W - 320W
  }));

  return (
    <div className="dashboard-container">
      {/* Top Welcome Header bar */}
      <header className="dash-header">
        <div className="dash-welcome">
          <h1>Welcome Back, {currentUser?.displayName || 'Solar Owner'}</h1>
          <p className="dash-date">
            <Calendar size={15} style={{ marginRight: '6px' }} />
            {currentDate}
          </p>
        </div>
        <button className="dash-logout-btn" onClick={handleLogout}>
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </header>

      {/* Main Grid Section */}
      <div className="dash-grid">
        
        {/* Row 1: KPI Stats Cards */}
        <div className="dash-card stat-card current-output">
          <div className="card-header">
            <span className="card-lbl">Current Output</span>
            <span className="card-icon"><Zap size={20} /></span>
          </div>
          <div className="card-val">5.42 <span className="val-unit">kW</span></div>
          <div className="card-change positive">
            <span className="pulse-green"></span> System Peak Performance
          </div>
        </div>

        <div className="dash-card stat-card daily-yield">
          <div className="card-header">
            <span className="card-lbl">Today's Yield</span>
            <span className="card-icon"><Sun size={20} /></span>
          </div>
          <div className="card-val">34.80 <span className="val-unit">kWh</span></div>
          <div className="card-change text-gold">
            104% of daily target reached
          </div>
        </div>

        <div className="dash-card stat-card cost-savings">
          <div className="card-header">
            <span className="card-lbl">Financial Savings</span>
            <span className="card-icon"><TrendingUp size={20} /></span>
          </div>
          <div className="card-val">$412.50 <span className="val-unit">USD</span></div>
          <div className="card-change positive">
            +$42.10 saved this week
          </div>
        </div>

        <div className="dash-card stat-card battery-storage">
          <div className="card-header">
            <span className="card-lbl">Battery Storage</span>
            <span className="card-icon"><Battery size={20} /></span>
          </div>
          <div className="card-val">94 <span className="val-unit">%</span></div>
          <div className="card-change positive">
            Status: Fully Charged (Standby)
          </div>
        </div>

        {/* Row 2: Graph & Solar Optimization Tips */}
        <div className="dash-card chart-card">
          <div className="chart-header">
            <h3>Solar Generation Curve</h3>
            <span className="chart-sub">Today vs. Average Peak</span>
          </div>
          <div className="chart-body">
            {/* Styled inline SVG Chart for clean presentation without dependencies */}
            <svg viewBox="0 0 500 200" className="dash-chart-svg">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF9F27" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#EF9F27" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              
              {/* Curve Fill */}
              <path
                d="M 0 180 Q 80 170 120 120 T 250 40 T 380 120 T 500 180 L 500 200 L 0 200 Z"
                fill="url(#chartGrad)"
              />
              
              {/* Curve Line */}
              <path
                d="M 0 180 Q 80 170 120 120 T 250 40 T 380 120 T 500 180"
                fill="none"
                stroke="#EF9F27"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Data points */}
              <circle cx="250" cy="40" r="5" fill="#EF9F27" stroke="#FFFFFF" strokeWidth="2" />
            </svg>
            <div className="chart-labels">
              <span>06:00 AM</span>
              <span>12:00 PM (Peak)</span>
              <span>06:00 PM</span>
            </div>
          </div>
        </div>

        <div className="dash-card forecast-card">
          <h3>Optimization Insights</h3>
          <div className="forecast-item">
            <div className="forecast-icon"><CloudSun size={24} /></div>
            <div className="forecast-info">
              <h4>Sunny Weather Expected</h4>
              <p>Peak generation predicted between 11:30 AM and 2:00 PM. System efficiency optimal.</p>
            </div>
          </div>
          <div className="forecast-item">
            <div className="forecast-icon"><Cpu size={24} fill="rgba(239, 159, 39, 0.15)" stroke="#EF9F27" /></div>
            <div className="forecast-info">
              <h4>Inverter Temperature Normal</h4>
              <p>Thermal ventilation is operating efficiently. Output limit capped at 100%.</p>
            </div>
          </div>
          <div className="forecast-item">
            <div className="forecast-icon"><Award size={24} /></div>
            <div className="forecast-info">
              <h4>Eco Savings Milestone</h4>
              <p>Your solar production has saved equivalent of 12 mature trees this month!</p>
            </div>
          </div>
        </div>

        {/* Row 3: Panel Array Status Monitor */}
        <div className="dash-card panels-card">
          <div className="panels-header">
            <h3>Panel Array Status</h3>
            <span className="panels-desc">
              <CheckCircle2 size={14} className="icon-green" /> 12/12 Panels Active and Reporting
            </span>
          </div>
          
          <div className="panels-grid">
            {panels.map((p) => (
              <div key={p.id} className="panel-item">
                <div className="panel-id">{p.id}</div>
                <div className="panel-efficiency">{p.efficiency}% eff</div>
                <div className="panel-output">{p.output} W</div>
                <div className="panel-indicator">
                  <span className="pulse-green"></span>
                  <span className="lbl-status">{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
