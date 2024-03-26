// pages/AdminDashboard.tsx
import React from "react";
import { Link } from "react-router-dom";
import "../container/AdminDashboard.css";
import Navbar from "../../../shared/Navbar"; 


const AdminDashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="admin-content">
        <h1>Welcome to Admin Dashboard</h1>
        <p>You can manage tables and bookings here.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
