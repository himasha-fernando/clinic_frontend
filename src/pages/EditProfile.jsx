import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nic: "",
  });

  useEffect(() => {
    // Pre-fill form from localStorage
    setFormData({
      name: localStorage.getItem("userName") || "",
      email: localStorage.getItem("userEmail") || "",
      nic: localStorage.getItem("userNic") || "",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userID");

    axios
      .put(`http://localhost:8080/api/auth/update/${userId}`, formData)
      .then((res) => {
        // Update localStorage
        localStorage.setItem("userName", formData.name);
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("userNic", formData.nic);

        navigate("/user-home"); // Navigate back to user profile
      })
      .catch((err) => {
        console.error("Update failed:", err);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Edit Profile
        </h2>

        <label className="block mb-2 font-medium">Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <label className="block mb-2 font-medium">NIC</label>
        <input
          name="nic"
          value={formData.nic}
          onChange={handleChange}
          className="w-full p-2 mb-6 border rounded"
          required
        />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/user-home")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
