import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Phone, X, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../assets/css/Schedule.css";

const DermatologySchedule = () => {
  const [doctorsData, setDoctorsData] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/doctors");
        setDoctorsData(res.data.doctors || res.data); // Adjust for backend format
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    fetchDoctors();
  }, []);

  const handleViewDetails = (doctorId) => {
    const doctor = doctorsData.find((doc) => doc._id === doctorId);
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
            Book your appointment with our board-certified dermatology
            specialists at Panadura Base Hospital
          </p>
        </div>
      </section>

      {/* Schedule Cards Section */}
      <section className="schedule-section">
        <div className="schedule-container">
          <div className="section-header">
            <h2>Our Specialist Team</h2>
            <p className="section-subtitle">
              Schedule your consultation with our expert dermatologists
            </p>
            <div className="divider"></div>
          </div>

          <div className="schedule-cards">
            {doctorsData.map((doctor) => (
              <div className="doctor-card" key={doctor._id}>
                <div className="doctor-profile">
                  <div className="avatar">
                    <img src={doctor.image} alt={doctor.firstName} />
                  </div>
                  <div className="doctor-info">
                    <h3>
                      {doctor.firstName} {doctor.lastName}
                    </h3>
                    <p className="specialty">{doctor.specialty}</p>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                      <span>
                        {doctor.rating || 0} ({doctor.reviews || 0} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="schedule-info">
                  {doctor.schedule &&
                    doctor.schedule.map((item, index) => (
                      <div className="schedule-item" key={index}>
                        <div className="day">{item.day}</div>
                        <div className="time">{item.time}</div>
                        <div className={`availability ${item.availability}`}>
                          {item.availability === "available"
                            ? "Available"
                            : "3 slots left"}
                        </div>
                      </div>
                    ))}
                </div>

                <div className="action-buttons">
                  <button
                    onClick={() => handleViewDetails(doctor._id)}
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

          {/* Location Info */}
          <div className="location-info">
            <div className="location-card">
              <MapPin size={24} className="text-primary" />
              <div>
                <h4>Clinic Location</h4>
                <p>
                  Panadura Base Hospital
                  <br />
                  Galle Road, Panadura
                </p>
              </div>
            </div>
            <div className="operating-hours">
              <h4>Operating Hours</h4>
              <ul>
                <li>
                  <span>Monday:</span> 8:30 AM - 3:00 PM
                </li>
                <li>
                  <span>Wednesday:</span> 8:30 AM - 3:00 PM
                </li>
                <li>
                  <span>Saturday:</span> 8:30 AM - 3:00 PM
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Doctor Details */}
      {showModal && selectedDoctor && (
        <div className="doctor-modal-overlay">
          <div className="doctor-modal compact-modal">
            <button className="close-modal" onClick={closeModal}>
              <X size={20} />
            </button>

            <div className="modal-header">
              <div className="modal-avatar">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.firstName}
                />
              </div>
              <div className="modal-title">
                <h3>
                  {selectedDoctor.firstName} {selectedDoctor.lastName}
                </h3>
                <p className="specialty">{selectedDoctor.specialty}</p>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                  <span>
                    {selectedDoctor.rating || 0} ({selectedDoctor.reviews || 0}{" "}
                    reviews)
                  </span>
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
