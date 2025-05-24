import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useNavigate, Link } from "react-router-dom";


export default function DermatologyAppointmentForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nic: '',
    date: '',
    time: '',
    specialist: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  
  const specialists = [
    "Dr. Sarah Johnson - General Dermatology",
    "Dr. Michael Chen - Pediatric Dermatology",
    "Dr. Priya Patel - Cosmetic Dermatology",
    "Dr. James Wilson - Surgical Dermatology",
    "Dr. Aisha Rahman - Medical Dermatology"
  ];
  
  const timeSlots = [
    "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", 
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM"
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nic.trim()) {
      newErrors.nic = 'NIC is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    
    if (!formData.specialist) {
      newErrors.specialist = 'Specialist selection is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
  if (e) e.preventDefault();

  if (validateForm()) {
    try {
      const response = await fetch("http://localhost:8080/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // success
        console.log("Appointment booked:", data);
        setIsSubmitted(true);
      } else {
        // handle server errors returned by backend
        alert(data.message || "Failed to book appointment. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
      alert("Error connecting to server. Please try again later.");
    }
  } else {
    console.log("Form has errors");
  }
};
  
  const resetForm = () => {
    setFormData({
      nic: '',
      date: '',
      time: '',
      specialist: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  // Get tomorrow's date for min date value
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];
  
  // Get date 3 months from now for max date value
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];
  
  if (isSubmitted) {
  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6 text-green-500 flex justify-center">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Appointment Confirmed!</h2>
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-gray-700 mb-2"><span className="font-semibold">NIC:</span> {formData.nic}</p>
          <p className="text-gray-700 mb-2"><span className="font-semibold">Date:</span> {formData.date}</p>
          <p className="text-gray-700 mb-2"><span className="font-semibold">Time:</span> {formData.time}</p>
          <p className="text-gray-700"><span className="font-semibold">Specialist:</span> {formData.specialist}</p>
        </div>
        <p className="text-gray-600 mb-6">Please arrive 15 minutes before your scheduled appointment. Don't forget to bring your NIC and any relevant medical records.</p>
        
        <div className="flex flex-col gap-4">
          <button 
            onClick={resetForm}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-full transition duration-300"
          >
            Book Another Appointment
          </button>

          <button
            onClick={() => navigate("/user-home")}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-full transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
            <UserHeader />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-800">Dermatology Clinic</h1>
          <p className="text-purple-600 font-medium">Panadura Base Hospital Appointment System</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="nic" className="block text-sm font-medium text-gray-700 mb-1">National ID Card Number</label>
            <input
              type="text"
              id="nic"
              name="nic"
              value={formData.nic}
              onChange={handleChange}
              placeholder="Enter your NIC number"
              className={`w-full px-4 py-2 border ${errors.nic ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
            />
            {errors.nic && <p className="text-red-500 text-xs mt-1">{errors.nic}</p>}
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={minDate}
              max={maxDateStr}
              className={`w-full px-4 py-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>
          
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Appointment Time</label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.time ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
            >
              <option value="">Select a time slot</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>{slot}</option>
              ))}
            </select>
            {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
          </div>
          
          <div>
            <label htmlFor="specialist" className="block text-sm font-medium text-gray-700 mb-1">Choose a Specialist</label>
            <select
              id="specialist"
              name="specialist"
              value={formData.specialist}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.specialist ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
            >
              <option value="">Select a specialist</option>
              {specialists.map((doctor, index) => (
                <option key={index} value={doctor}>{doctor}</option>
              ))}
            </select>
            {errors.specialist && <p className="text-red-500 text-xs mt-1">{errors.specialist}</p>}
          </div>

          <div className="pt-4">
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
