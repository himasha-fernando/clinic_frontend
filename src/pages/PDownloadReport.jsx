// src/pages/AddPatient.js
import React, { useState } from "react";
import UserHeader from "../components/UserHeader";

function AddPatient() {
  const [formData, setFormData] = useState({
    pid: "",
    age: "",
    gender: "",
    contact: "",
    diagnosis: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownload = (e) => {
    e.preventDefault();
    const content = `
      Patient Report - Panadura Hospital Dermatology Clinic

     PatientID      : ${formData.pid}
      Age       : ${formData.age}
      Gender    : ${formData.gender}
      Contact   : ${formData.contact}
      Diagnosis : ${formData.diagnosis}
      Date      : ${formData.date}
    `;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${formData.name}_report.txt`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
            <UserHeader />
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Get your reports</h2>
      <form onSubmit={handleDownload} className="space-y-4">
        <input
          type="text"
          name="pid"
          placeholder="Patient ID"
          value={formData.pid}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          
        </select>
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
  type="date"
  name="date"
  value={formData.date}
  onChange={handleChange}
  required
  className="w-full border px-3 py-2 rounded"
/>
        <textarea
          name="diagnosis"
          placeholder="Diagnosis / Notes"
          value={formData.diagnosis}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Download Report
        </button>
      </form>
    </div>
    </div>
  );
}

export default AddPatient;