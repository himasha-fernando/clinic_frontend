import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "../assets/css/RegistrationForm.css";
import Navbar from "../components/Navbar";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nic: "",
    password: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/auth/register", formData)
      .then((response) => {
        console.log("Registration successful:", response.data);

        setFormData({
          name: "",
          email: "",
          nic: "",
          password: "",
          role: "user",
        });

        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false);
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        console.error("Registration error:", error);
        alert("Registration failed. Please check your input.");
      });
  };

  return (
    <>
     <div className="login-page-container">
        <Navbar/>
      {showSuccessPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2 className="popup-title">Success!</h2>
            <p className="popup-message">Registration completed successfully.</p>
          </div>
        </div>
      )}

      <section
        className="register-section"
        style={{ backgroundImage: "url('/images/4.jpg')" }}
      >
        <div className="overlay" />
       
        <div className="register-box">
          <div className="close-button">
            <Link to="/">
              <button aria-label="Close">X</button>
            </Link>
          </div>

          <h2 className="register-heading">Create an account</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="nic">NIC Number</label>
              <input
                type="text"
                name="nic"
                id="nic"
                value={formData.nic}
                onChange={handleChange}
                placeholder="Enter your NIC number"
                required
              />
            </div>

            <div className="form-group password-group">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <div
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="user">User</option>
                <option value="doctor">Doctor</option>
                <option value="staff">Staff</option>
              </select>
            </div> 

            <div className="form-actions">
              <Link to="/login" className="back-btn">
                <button type="button">Back</button>
              </Link>
              <button type="submit" className="register-btn">
                Register
              </button>
            </div>
          </form>
        </div>
        
      </section>
      </div>
    </>
  );
};

export default RegistrationForm;