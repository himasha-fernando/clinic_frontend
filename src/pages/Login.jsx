import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Lock, Mail } from "lucide-react";
import "../assets/css/LoginForm.css";
import Navbar from "../components/Navbar";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    axios
      .post("http://localhost:8080/api/auth/login", formData)
      .then((res) => {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userID", user.id);
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userNic", user.nic);
        localStorage.setItem("userRole", user.role);
        

        if (user.role === "staff") navigate("/staff-home");
        else if (user.role === "doctor") navigate("/doctor-home");
        else navigate("/user-home");
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Login failed.");
        console.error("Login error:", err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="login-page-container">
      <Navbar />
      <div className="background-image" >
       <img src="/images/4.jpg"/></div>
      <div className="overlay" />
      <div className="login-container">
        <div className="login-card">
          <div className="logo-section">
           
            <h2>Welcome to the Dermatology Clinic</h2>
            <p>Log in to manage your appointments and medical records</p>
          </div>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                required
              />
            </div>

            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="password-toggle"
                aria-label="Toggle password"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <div className="form-links">
              <label>
                <input type="checkbox" name="remember" /> Remember me
              </label>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? <span className="spinner" /> : <>Sign In <ArrowRight /></>}
            </button>
          </form>

          <p className="signup-text">
            Don’t have an account?{" "}
            <Link to="/register" className="signup-link">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;