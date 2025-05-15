import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import "../assets/css/Home.css";

const images = [
  require("../assets/4.jpg"),
  require("../assets/5.jpg"),
  require("../assets/6.jpg"),
  require("../assets/7.jpg"),
  require("../assets/8.jpg"),
];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      {/* Topbar */}
      <div className="topbar">
        <button className="download-button">24/7 | DOWNLOAD LAB REPORTS</button>
        <div className="topbar-right">
          <input type="text" placeholder="Search..." className="search-input" />
          <Link to="/login" className="topbar-button">DOCTOR APPOINTMENTS</Link>
          <Link to="/login" className="topbar-button">LOGIN</Link>
        </div>
      </div>

      {/* Header Section */}
      <div
        className="header-banner"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      >
        <div className="header-overlay">
          <div className="header-text">
            <h1>Panadura General Hospital - Dermatology Clinic</h1>
            <p>
              Committed to excellence in skin health, backed by years of trusted care.
            </p>
          </div>
        </div>
      </div>

      {/* Health Network Section */}
      <div className="main-section">
        <div className="health-network">
          <h2>HEALTH NETWORK</h2>
          <p>
            The Dermatology Clinic System at Panadura Base Hospital serves with excellence,
            streamlining skincare services through modern digital solutions.
          </p>
          <ul>
            <li>MEDICAL ➔</li>
            <li>SURGICAL ➔</li>
            <li>LABORATORIES ➔</li>
            <li>REPORTS ➔</li>
          </ul>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {[
            { title: "PANADURA ACNE & SCAR TREATMENT UNIT", icon: "❤️" },
            { title: "PANADURA DERMATOLOGIC SURGERY UNIT", icon: "🧬" },
            { title: "PANADURA SKIN CANCER SCREENING UNIT", icon: "🎗️" },
            { title: "PANADURA PEDIATRIC DERMATOLOGY SERVICE", icon: "👨‍👩‍👧" },
            { title: "PANADURA TELEDERMATOLOGY SERVICE", icon: "🛄" },
            { title: "PANADURA HAIR & SCALP DISORDER CLINIC", icon: "💇‍♀️" },
          ].map((item, index) => (
            <div key={index} className="service-box">
              <div className="icon">{item.icon}</div>
              <h4>{item.title}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div>
            <h3>Dermatology Clinic - Panadura General Hospital</h3>
            <p>
              We are committed to compassionate care, innovation, and outstanding patient outcomes.
            </p>
          </div>

          <div>
            <h4>Network Contacts</h4>
            <ul>
              <li>Dermatology Clinic: +94 38 223 4567</li>
              <li>Clinic Reception: +94 38 224 5678</li>
              <li>Appointment Hotline: +94 71 452 8800</li>
              <li>Panadura General Hospital: +94 38 222 3333</li>
            </ul>
          </div>

          <div>
            <h4>Quick Contacts</h4>
            <p>24/7 Emergency Hotline: <strong>1313</strong></p>
            <p>Email: dermatology@panadurahospital.lk</p>
            <p>Fax: +94 38 223 3344</p>
            <p>
              Address:
              <br />
              Dermatology Clinic,
              <br />
              Panadura Base Hospital,
              <br />
              Galle Road, Panadura, Sri Lanka
            </p>
          </div>
        </div>
      </footer>

      {/* Social Sidebar */}
      <div className="social-sidebar">
        {["facebook", "instagram", "twitter", "linkedin", "tiktok"].map((platform) => (
          <a
            key={platform}
            href={`https://${platform}.com`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={`https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/${platform}.svg`}
              alt={platform}
              className="social-icon"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Home;