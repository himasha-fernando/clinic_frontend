import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserManage from "./pages/UserManage";
import PAppointment from "./pages/PAppointment";
import PDownloadReport from "./pages/PDownloadReport";
import ForgotPassword from "./pages/ForgotPassword";
import EditProfile from './pages/EditProfile';
import Schedule from "./pages/Schedule";
import About from "./pages/About";
import AdminUploadReport from "./pages/AdminUploadReport";
import AdminScheduleForm from "./pages/AdminScheduleForm";
  

import UserHome from "./pages/UserHome";
import StaffHome from "./pages/StaffHome";
import DoctorHome from "./pages/DoctorHome";
import ProtectedRoute from "./ProtectedRoute";  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-manage" element={<UserManage />} />
        <Route path="/p-appointment" element={<PAppointment />} />
        <Route path="/p-download-report" element={<PDownloadReport />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin-upload-report" element={<AdminUploadReport />} />
        <Route path="/admin-schedule-form" element={<AdminScheduleForm />} />
        
        
        <Route path="/edit-profile" element={<EditProfile />} />

        <Route path="/staff-home" element={<ProtectedRoute allowedRoles={["staff"]}><StaffHome /></ProtectedRoute>} />
        <Route path="/doctor-home" element={<ProtectedRoute allowedRoles={["doctor"]}><DoctorHome /></ProtectedRoute>} />
        <Route path="/user-home" element={<ProtectedRoute allowedRoles={["user"]} ><UserHome /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}
export default App;
