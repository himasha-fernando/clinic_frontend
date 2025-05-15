import React, { useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";

const ForgotPassword = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    nic: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/auth/forgot-password", formData);
      setMessage(res.data.message);
      navigate("/login");

    } catch (error) {
      setMessage("Failed to reset password. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="text"
          name="nic"
          placeholder="Enter your NIC"
          value={formData.nic}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800"
        >
          Reset Password
        </button>

        {message && <p className="mt-3 text-sm text-center">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;