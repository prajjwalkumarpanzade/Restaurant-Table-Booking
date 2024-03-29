import React, { useState, useEffect } from "react";
import axios from "axios";
import "./admindashboard.css";
import Navbar from "../../../shared/Navbar";

interface Slot {
  slot_id: number;
  start_time: string;
  end_time: string;
}

const AdminDashboard = () => {
  const [slots, setSlots] = useState<Slot[]>([]);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await axios.get<Slot[]>("http://localhost:8080/getslots",{
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });
      setSlots(response.data);
    } catch (error) {
      console.error("Error fetching slots:", error);
      alert("An error occurred while fetching slots. Please try again.");
    }
  };

  return (
    <div>
      <center>
      <Navbar />
      <div className="admin-content">
        <h1>Welcome to Admin Dashboard</h1>
        <p>You can manage tables and bookings here.</p>
        <h2 style={{color:"aqua"}}>Time Slots Details</h2>
        <table className="slot-table">
          <thead>
            <tr>
              <th>Slot ID</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot.slot_id}>
                <td>{slot.slot_id}</td>
                <td>{slot.start_time}</td>
                <td>{slot.end_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </center>
    </div>
  );
};

export default AdminDashboard;
