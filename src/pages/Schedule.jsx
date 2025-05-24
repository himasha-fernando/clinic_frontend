import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Phone, MapPin, X } from "lucide-react";
import "../assets/css/Schedule.css";
import Navbar from "../components/Navbar";

const DermatologySchedule = () => {

  
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const doctorsData = [
    {
      id: 1,
      name: "Dr. Anjali Silva",
      specialty: "Acne & Scar Treatment Specialist",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      reviews: 142,
      schedule: [
        { day: "Monday", time: "8:30 AM - 12:00 PM", availability: "available" },
        { day: "Wednesday", time: "9:00 AM - 2:00 PM", availability: "available" },
        { day: "Saturday", time: "8:30 AM - 1:00 PM", availability: "limited" }
      ],
      degrees: "MBBS, MD (Dermatology), FRCP (London)",
      experience: "12 years of experience",
      notes: "Specializes in advanced acne treatments and scar revision techniques. Pioneer in laser-assisted dermatology procedures in Sri Lanka.",
      phone: "+9438224567"
    },
    {
      id: 2,
      name: "Dr. Rajiv Fernando",
      specialty: "Skin Cancer Screening Specialist",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      reviews: 94,
      schedule: [
        { day: "Monday", time: "8:30 AM - 12:00 PM", availability: "available" },
        { day: "Wednesday", time: "8:30 AM - 3:00 PM", availability: "available" },
        { day: "Saturday", time: "9:00 AM - 1:00 PM", availability: "limited" }
      ],
      degrees: "MBBS, MD (Dermatology), Diploma in Dermoscopy",
      experience: "9 years of experience",
      notes: "Expert in early detection of skin cancers with over 5,000 successful screenings. Trained in Australia in advanced dermoscopy techniques.",
      phone: "+9438224567"
    },
    {
      id: 3,
      name: "Dr. Samantha Perera",
      specialty: "Cosmetic Dermatology Specialist",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      reviews: 128,
      schedule: [
        { day: "Monday", time: "8:30 AM - 3:00 PM", availability: "available" },
        { day: "Wednesday", time: "8:30 AM - 3:00 PM", availability: "available" },
        { day: "Saturday", time: "8:30 AM - 3:00 PM", availability: "limited" }
      ],
      degrees: "MBBS, MD (Dermatology), Fellowship in Cosmetic Dermatology (USA)",
      experience: "10 years of experience",
      notes: "Leading cosmetic dermatologist with expertise in non-surgical facial rejuvenation. Certified trainer for Botox and fillers in South Asia.",
      phone: "+9438224567"
    },
    {
      id: 4,
      name: "Dr. Priya Wijesinghe",
      specialty: "Pediatric Dermatology Specialist",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      reviews: 86,
      schedule: [
        { day: "Monday", time: "9:00 AM - 1:00 PM", availability: "available" },
        { day: "Wednesday", time: "8:30 AM - 12:30 PM", availability: "available" },
        { day: "Saturday", time: "8:30 AM - 2:00 PM", availability: "limited" }
      ],
      degrees: "MBBS, MD (Pediatrics), Diploma in Pediatric Dermatology",
      experience: "8 years of experience",
      notes: "Special focus on childhood eczema and genetic skin disorders. Gentle approach tailored specifically for children's needs.",
      phone: "+9438224567"
    },
    {
      id: 5,
      name: "Dr. Asela Rathnayake",
      specialty: "Laser Treatment Specialist",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      reviews: 112,
      schedule: [
        { day: "Monday", time: "10:00 AM - 3:00 PM", availability: "available" },
        { day: "Wednesday", time: "8:30 AM - 2:00 PM", availability: "available" },
        { day: "Saturday", time: "9:30 AM - 1:30 PM", availability: "limited" }
      ],
      degrees: "MBBS, MD (Dermatology), Certified Laser Specialist (Germany)",
      experience: "11 years of experience",
      notes: "Pioneer in laser treatments for pigmentation and vascular lesions. Introduced fractional CO2 laser technology to Sri Lanka.",
      phone: "+9438224567"
    },
    {
      id: 6,
      name: "Dr. Nimal Jayawardena",
      specialty: "Hair Restoration Specialist",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      rating: 4.6,
      reviews: 79,
      schedule: [
        { day: "Monday", time: "8:30 AM - 12:30 PM", availability: "available" },
        { day: "Wednesday", time: "9:00 AM - 2:00 PM", availability: "available" },
        { day: "Saturday", time: "8:30 AM - 3:00 PM", availability: "limited" }
      ],
      degrees: "MBBS, MD (Dermatology), Fellowship in Hair Transplantation (India)",
      experience: "7 years of experience",
      notes: "Expert in both surgical and non-surgical hair restoration techniques. Performed over 500 successful hair transplant procedures.",
      phone: "+9438224567"
    }
  ];

  const handleViewDetails = (doctorId) => {
    const doctor = doctorsData.find(doc => doc.id === doctorId);
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="clinic-schedule-page">
      <Navbar />
      {/* Hero Section */}
      <section className="schedule-hero">
        
        <div className="hero-content">
          <h1>Dermatology Clinic Schedule</h1>
          <p>
            Book your appointment with our board-certified dermatology specialists at Panadura Base Hospital
          </p>
        </div>
      </section>

      {/* All Doctors Schedule */}
      <section className="schedule-section">
        <div className="schedule-background"></div>
        <div className="schedule-container">
          <div className="section-header">
            <h2>Our Specialist Team</h2>
            <p className="section-subtitle">Schedule your consultation with our expert dermatologists</p>
            <div className="divider"></div>
          </div>

          <div className="schedule-cards">
            {doctorsData.map((doctor) => (
              <div className="doctor-card" key={doctor.id}>
                <div className="doctor-profile">
                  <div className="avatar">
                    <img src={doctor.image} alt={doctor.name} />
                  </div>
                  <div className="doctor-info">
                    <h3>{doctor.name}</h3>
                    <p className="specialty">{doctor.specialty}</p>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                      ))}
                      <span>{doctor.rating} ({doctor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="schedule-info">
                  {doctor.schedule.map((item, index) => (
                    <div className="schedule-item" key={index}>
                      <div className="day">{item.day}</div>
                      <div className="time">{item.time}</div>
                      <div className={`availability ${item.availability}`}>
                        {item.availability === 'available' ? 'Available' : '3 slots left'}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="action-buttons">
                  <button 
                    onClick={() => handleViewDetails(doctor.id)} 
                    className="book-button"
                  >
                    <Calendar size={16} className="mr-2" />
                    View Details
                  </button>
                  <a href={`tel:${doctor.phone}`} className="call-button">
                    <Phone size={16} className="mr-2" />
                    Call Clinic
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="location-info">
            <div className="location-card">
              <MapPin size={24} className="text-primary" />
              <div>
                <h4>Clinic Location</h4>
                <p>Panadura Base Hospital<br/>Galle Road, Panadura</p>
              </div>
            </div>
            <div className="operating-hours">
              <h4>Operating Hours</h4>
              <ul>
                <li><span>Monday:</span> 8:30 AM - 3:00 PM</li>
                <li><span>Wednesday:</span> 8:30 AM - 3:00 PM</li>
                <li><span>Saturday:</span> 8:30 AM - 3:00 PM</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Details Modal */}
      {showModal && selectedDoctor && (
  <div className="doctor-modal-overlay">
    <div className="doctor-modal compact-modal">
      <button className="close-modal" onClick={closeModal}>
        <X size={20} />
      </button>
      
      <div className="modal-header">
        <div className="modal-avatar">
          <img src={selectedDoctor.image} alt={selectedDoctor.name} />
        </div>
        <div className="modal-title">
          <h3>{selectedDoctor.name}</h3>
          <p className="specialty">{selectedDoctor.specialty}</p>
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            ))}
            <span>{selectedDoctor.rating} ({selectedDoctor.reviews} reviews)</span>
          </div>
        </div>
      </div>

      <div className="modal-body">
        <div className="detail-grid">
          <div className="detail-card">
            <h4>Qualifications</h4>
            <p>{selectedDoctor.degrees}</p>
          </div>
          
          <div className="detail-card">
            <h4>Experience</h4>
            <p>{selectedDoctor.experience}</p>
          </div>
          
          <div className="detail-card full-width">
            <h4>Special Notes</h4>
            <p>{selectedDoctor.notes}</p>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <Link to="/appointments" className="modal-book-button">
          <Calendar size={16} className="mr-2" />
          Book Appointment
        </Link>
      </div>
    </div>
  </div>
)}
      
    </div>
  );
};

export default DermatologySchedule;