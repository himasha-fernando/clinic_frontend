// DoctorAppointmentPage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function DoctorAppointmentPage() {
  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="text-xl font-bold text-blue-600">ASIRI HEALTH</div>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search Here..."
            className="border rounded px-3 py-1"
          />
          <button className="bg-indigo-400 text-white px-4 py-2 rounded">
            Doctor Appointments
          </button>
        </div>
      </nav>

      {/* Banner */}

      {/* Right Image with Rounded Cutout */}
  <div className="w-1/2 h-full relative">
    <img
      src="/images/4.jpg" // Make sure this is placed in `public/images/4.jpg`
      alt="Doctor and Patient"
      className="absolute right-0 h-full object-cover rounded-l-full"
    />
  </div>





























      <div className="flex bg-teal-200 p-8 items-center relative">
        <div>
          <h1 className="text-3xl font-bold">Doctor Appointment</h1>
          <p className="mt-2 text-gray-600">Home / Doctor Appointment</p>
        </div>
        <img
  src="/images/4.jpg"
  alt="Doctor and Patient"
  className="absolute right-8 top-4 rounded-lg shadow-lg w-72"
/>
      </div>

      {/* Appointment Form */}
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-6">
          Find a Doctor. Book an Appointment. Pay easy.
        </h2>
        <div className="flex flex-col items-center gap-4 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Doctor - Max 20 Characters"
            className="w-full border px-3 py-2 rounded"
          />
          <select className="w-full border px-3 py-2 rounded">
            <option>Asiri Central Hospital - Norris Canal Road</option>
            <option>Other Locations...</option>
          </select>
          <select className="w-full border px-3 py-2 rounded">
            <option>Any Specialization</option>
            <option>Dermatology</option>
            <option>Cardiology</option>
            {/* Add more */}
          </select>
        </div>
      </div>

      {/* Social Icons */}
      <div className="fixed left-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
        {["facebook", "instagram", "x", "linkedin", "tiktok"].map((platform) => (
          <button
            key={platform}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <i className={`fab fa-${platform}`}></i>
          </button>
        ))}
      </div>
    </div>
  );
}
