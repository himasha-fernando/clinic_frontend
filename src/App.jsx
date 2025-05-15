import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserManage from "./pages/UserManage";
import PAppointment from "./pages/PAppointment";
import PDownloadReport from "./pages/PDownloadReport";
import ForgotPassword from "./pages/ForgotPassword";
import UserHome from "./pages/UserHome";
import EditProfile from './pages/EditProfile';

import Admin from "./pages/Admin";
import Manager from "./pages/Manager";
import User from "./pages/User";
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
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/edit-profile" element={<EditProfile />} />

        <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><Admin /></ProtectedRoute>} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/user" element={<User />} />


      </Routes>
    </Router>
  );
}
export default App;
