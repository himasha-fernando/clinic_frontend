import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, MapPin, Search, Download, Calendar, ChevronRight, ArrowRight } from "lucide-react";
import "../assets/css/Home.css";
import Navbar from "../components/Navbar";

const images = [
  require("../assets/4.jpg"),
  require("../assets/5.jpg"),
  require("../assets/6.jpg"),
  require("../assets/7.jpg"),
  require("../assets/8.jpg"),
];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="home-container">
      {/* Premium Navigation Bar */}
     <Navbar />

      {/* Luxury Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url(${images[currentImage]})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">Panadura Base Hospital - Dermatology Clinic</div>
          <div>Advanced Dermatology Care</div>
          <h1 className="hero-title">
            <span>Skin Health</span>
            <span>Excellence</span>
          </h1>
          <p className="hero-subtitle">
            Personalized treatments with cutting-edge technology in Panadura's premier dermatology center
          </p>
          <div className="hero-cta">
            <Link to="/appointments" className="cta-button primary">
              <span>Book Consultation</span>
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link to="/services" className="cta-button secondary">
              Explore Treatments
            </Link>
          </div>
        </div>
        
        <div className="hero-features">
          <div className="feature-card">
            <div className="feature-icon">🏥</div>
            <div className="feature-content">
              <h4>Hospital Integration</h4>
              <p>Seamless care with Panadura Base Hospital</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🕒</div>
            <div className="feature-content">
              <h4>Flexible Hours</h4>
              <p>Open 7 days including evenings</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <div className="feature-content">
              <h4>Insurance Accepted</h4>
              <p>All major providers covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Services Section */}
      <section className="services-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-decorator"></span>
            Our Specialized Services
            <span className="title-decorator"></span>
          </h2>
          <p className="section-subtitle">
            Comprehensive dermatological care for all ages and conditions
          </p>
        </div>
        
        <div className="services-grid">
          {[
            { 
              title: "Acne & Scar Treatment", 
              icon: "🧴", 
              desc: "Advanced solutions for clear skin",
              color: "#6366f1"
            },
            { 
              title: "Skin Cancer Screening", 
              icon: "🔍", 
              desc: "Early detection saves lives",
              color: "#10b981"
            },
            { 
              title: "Cosmetic Dermatology", 
              icon: "💄", 
              desc: "Enhance your natural beauty",
              color: "#f59e0b"
            },
            { 
              title: "Pediatric Dermatology", 
              icon: "👶", 
              desc: "Specialized care for children",
              color: "#3b82f6"
            },
            { 
              title: "Laser Treatments", 
              icon: "⚡", 
              desc: "State-of-the-art technology",
              color: "#ec4899"
            },
            { 
              title: "Hair Restoration", 
              icon: "💇", 
              desc: "Regain your confidence",
              color: "#8b5cf6"
            },
          ].map((service, index) => (
            <div 
              key={index} 
              className="service-card"
              style={{ '--card-color': service.color }}
            >
              <div className="card-icon" style={{ backgroundColor: service.color }}>
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <Link to={`/services/${service.title.toLowerCase().replace(/ /g, '-')}`} className="card-link">
                Learn more <ChevronRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Luxury CTA Section */}
      <section className="cta-section">
        <div className="cta-background"></div>
        <div className="cta-content">
          <h2>Ready for Healthier Skin?</h2>
          <p>
            Schedule your consultation with our board-certified dermatologists today and 
            begin your journey to better skin health.
          </p>
          <div className="cta-buttons">
            <Link to="/appointments" className="cta-button primary large">
              <span>Book Appointment</span>
              <ArrowRight size={20} className="ml-2" />
            </Link>
            <a href="tel:+9438224567" className="cta-button secondary large">
              <Phone size={18} className="mr-2" />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="luxury-footer">
        <div className="footer-container">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo">
                <span>Panadura</span>
                <span>Dermatology</span>
              </div>
              <p className="footer-mission">
                Delivering exceptional dermatological care through innovation, 
                expertise, and personalized treatment approaches.
              </p>
              <div className="footer-social">
                {['facebook', 'instagram', 'twitter', 'linkedin'].map((platform) => (
                  <a key={platform} href={`https://${platform}.com`} className="social-icon">
                    <img 
                      src={`https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/${platform}.svg`} 
                      alt={platform} 
                    />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="footer-links">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/about">About Our Clinic</Link></li>
                <li><Link to="/services">All Services</Link></li>
                <li><Link to="/doctors">Meet Our Team</Link></li>
                <li><Link to="/patient-info">Patient Resources</Link></li>
                <li><Link to="/contact">Contact & Directions</Link></li>
              </ul>
            </div>
            
            <div className="footer-services">
              <h3>Our Services</h3>
              <ul>
                <li><Link to="/services/acne">Acne Treatment</Link></li>
                <li><Link to="/services/eczema">Eczema Care</Link></li>
                <li><Link to="/services/skin-cancer">Skin Cancer Screening</Link></li>
                <li><Link to="/services/cosmetic">Cosmetic Procedures</Link></li>
                <li><Link to="/services/pediatric">Pediatric Dermatology</Link></li>
              </ul>
            </div>
            
            <div className="footer-contact">
              <h3>Contact Us</h3>
              <div className="contact-item">
                <Phone size={18} />
                <div>
                  <p>Clinic Reception</p>
                  <a href="tel:+9438224567">+94 38 224 5678</a>
                </div>
              </div>
              <div className="contact-item">
                <Calendar size={18} />
                <div>
                  <p>Appointments</p>
                  <a href="tel:+94714528800">+94 71 452 8800</a>
                </div>
              </div>
              <div className="contact-item">
                <MapPin size={18} />
                <div>
                  <p>Location</p>
                  <address>
                    Galle Road, Panadura<br />
                    Sri Lanka
                  </address>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Panadura General Hospital Dermatology Clinic. All Rights Reserved.</p>
            <div className="legal-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/accessibility">Accessibility</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;