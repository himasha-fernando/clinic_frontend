
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, MapPin, Search, Calendar, User } from "lucide-react";
import "../assets/css/Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <Link to="/" className="navbar-brand">
          <span className="hospital-name">Panadura</span>
          <span className="clinic-specialty">Dermatology Clinic</span>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Navigation Links */}
        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/schedule" 
            className={`nav-link ${location.pathname === '/schedule' ? 'active' : ''}`}
          >
            Clinic Schedule
          </Link>
         
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
          >
            About Us
          </Link>
          
        </div>

        {/* Navigation Actions */}
        <div className={`nav-actions ${isMenuOpen ? 'open' : ''}`}>
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search..." className="nav-search" />
          </div>
          <Link to="/appointments" className="nav-button primary">
            <Calendar size={16} className="mr-2" />
            Book Appointment
          </Link>
          <Link to="/login" className="nav-button secondary">
            <User size={16} className="mr-2" />
            Patient Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;