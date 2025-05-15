import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "../assets/css/LoginForm.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/auth/login", formData)
      .then((response) => {
        const { token, user } = response.data;

        console.log("Login successful:", response.data);

        localStorage.setItem("token", token);
        localStorage.setItem("userID", user.id);
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userNic", user.nic);
        localStorage.setItem("userRole", user.role);
        

        if (user.role === "admin") {
          navigate("/admin");
        } else if (user.role === "manager") {
          navigate("/manager");
        } else {
          navigate("/user-home");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url('/images/4.jpg')` }}
    >
      <div className="login-box">
        <div className="absolute top-2 right-2">
          <Link to="/">
            <button
              className="login-close-btn"
              aria-label="Close"
            >
              X
            </button>
          </Link>
        </div>

        <h2 className="login-heading">Sign in to your account</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="login-label" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="login-input"
            />
          </div>

          <div className="mb-4 relative">
            <label className="login-label" htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="login-input pr-12"
            />
            <div
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </div>
          </div>

          <div className="text-right mb-4">
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="login-submit">
            Sign In
          </button>

          <div className="login-footer">
            Don’t have an account yet?{" "}
            <Link to="/register">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;