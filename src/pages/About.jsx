import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Shield, Users, Activity, Clock, ArrowRight } from 'lucide-react';
import "../assets/css/About.css";
import Navbar from '../components/Navbar';

// Import images
import clinicFacade from '../assets/4.jpg';
import doctorTeam from '../assets/7.jpg';
import treatmentRoom from '../assets/21.jpg';
import equipment from '../assets/22.jpg';
import pattern from '../assets/23.jpg'; // Add a subtle pattern image

const AboutUs = () => {
  return (
    <div className="about-page">
      <Navbar />
      
      {/* Hero Section with Parallax Effect */}
      <section className="about-hero" style={{ backgroundImage: `url(${clinicFacade})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">EST. 2005</div>
          <h1>Panadura Dermatology Clinic</h1>
          <p className="hero-subtitle">Where skin health meets compassionate care</p>
          <div className="scroll-indicator">
            <div className="mouse"></div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-container">
          <div className="mission-content">
            <div className="section-tag">OUR MISSION</div>
            <h2>Redefining Dermatological Care</h2>
            <p className="mission-statement">
              At Panadura Base Hospital Dermatology Clinic, we combine <span className="highlight">medical excellence</span> with 
              <span className="highlight"> personalized attention</span> to deliver exceptional skin care solutions. Our 
              patient-centered approach ensures every individual receives tailored treatments 
              using the most advanced technologies available.
            </p>
            <div className="mission-values">
              <div className="value-card">
                <div className="value-icon-container">
                  <Award className="value-icon" size={32} />
                </div>
                <h3>Clinical Excellence</h3>
                <p>Board-certified specialists using evidence-based practices</p>
              </div>
              <div className="value-card">
                <div className="value-icon-container">
                  <Shield className="value-icon" size={32} />
                </div>
                <h3>Safety First</h3>
                <p>Rigorous protocols ensuring patient well-being</p>
              </div>
              <div className="value-card">
                <div className="value-icon-container">
                  <Users className="value-icon" size={32} />
                </div>
                <h3>Compassionate Care</h3>
                <p>Personalized treatment plans for every patient</p>
              </div>
            </div>
          </div>
          <div className="mission-image">
            <div className="image-frame">
              <img src={doctorTeam} alt="Our dermatology team" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">18+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50,000+</div>
            <div className="stat-label">Patients Treated</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">12</div>
            <div className="stat-label">Specialized Treatments</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Patient Satisfaction</div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="history-section">
        <div className="section-header">
          <div className="section-tag">OUR JOURNEY</div>
          <h2>Pioneering Skin Care in Panadura</h2>
          <p className="section-subtitle">Milestones in our dermatological excellence</p>
        </div>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-year">2005</div>
            <div className="timeline-content">
              <h3>Clinic Foundation</h3>
              <p>Established as the region's first specialized dermatology center with 2 treatment rooms</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2012</div>
            <div className="timeline-content">
              <h3>Technological Leap</h3>
              <p>Introduced laser therapy and photodynamic treatment capabilities</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2018</div>
            <div className="timeline-content">
              <h3>Service Expansion</h3>
              <p>Launched pediatric dermatology and cosmetic dermatology specialty units</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2023</div>
            <div className="timeline-content">
              <h3>Modernization Complete</h3>
              <p>Full facility renovation with digital dermatoscopy and AI-assisted diagnostics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="facilities-section">
        <div className="section-header">
          <div className="section-tag">OUR FACILITIES</div>
          <h2>World-Class Treatment Environments</h2>
          <p className="section-subtitle">Designed for comfort and clinical excellence</p>
        </div>
        <div className="facility-grid">
          <div className="facility-card">
            <div className="card-image">
              <img src={treatmentRoom} alt="Treatment room" />
              <div className="image-overlay"></div>
            </div>
            <div className="facility-info">
              <Activity className="facility-icon" size={24} />
              <h3>Advanced Treatment Suites</h3>
              <p>State-of-the-art procedure rooms with integrated technology for precise dermatological interventions</p>
              <div className="facility-features">
                <span>• Sterile environment</span>
                <span>• Comfort-focused design</span>
                <span>• Advanced lighting</span>
              </div>
            </div>
          </div>
          <div className="facility-card">
            <div className="card-image">
              <img src={equipment} alt="Medical equipment" />
              <div className="image-overlay"></div>
            </div>
            <div className="facility-info">
              <Award className="facility-icon" size={24} />
              <h3>Cutting-Edge Technology</h3>
              <p>The latest diagnostic and therapeutic equipment for comprehensive skin care solutions</p>
              <div className="facility-features">
                <span>• Digital dermatoscopy</span>
                <span>• Laser treatment systems</span>
                <span>• AI-assisted analysis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team CTA Section */}
      <section className="team-cta">
        <div className="cta-pattern" style={{ backgroundImage: `url(${pattern})` }}></div>
        <div className="cta-content">
          <div className="cta-text">
            <div className="section-tag">MEET OUR TEAM</div>
            <h2>Expert Dermatologists You Can Trust</h2>
            <p>Our board-certified specialists combine extensive training with compassionate care to address all your skin health needs.</p>
          </div>
          <Link to="/doctors" className="cta-button">
            View Our Specialists <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Panadura Base Hospital</h3>
            <h4>Dermatology Clinic</h4>
            <p className="footer-address">
              <span>Galle Road, Panadura</span>
              <span>Monday, Wednesday, Saturday: 8:30 AM - 3:00 PM</span>
            </p>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <Link to="/services">Our Services</Link>
            <Link to="/doctors">Our Specialists</Link>
            <Link to="/appointments">Book Appointment</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
          <div className="footer-contact">
            <h3>Get In Touch</h3>
            <p className="contact-phone">+94 38 224 5678</p>
            <p className="contact-email">dermatology@panadurahospital.lk</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">ig</a>
              <a href="#" aria-label="Twitter">tw</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Panadura Base Hospital Dermatology Clinic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;