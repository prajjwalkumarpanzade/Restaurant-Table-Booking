// BookingList.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../container/BookingList.css";
import Navbar from "../../../shared/Navbar"; 

interface Booking {
  name: string;
  contactNumber: string;
  date: string;
  numberOfPersons: number;
  slotId: string;
  tableNo: string;
}

const BookingList = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get<Booking[]>("http://localhost:8000/tablebookings");
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      alert("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <center>
      <Navbar /> 
      <h2>Booking List</h2>
      <table className="booking-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact Number</th>
            <th>Date</th>
            <th>Slot ID</th>
            <th>Table Number</th>
            <th>Number of Persons</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.name}</td>
              <td>{booking.contactNumber}</td>
              <td>{booking.date}</td>
              <td>{booking.slotId}</td>
              <td>{booking.tableNo}</td>
              <td>{booking.numberOfPersons}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </center>
    </div>
  );
};

export default BookingList;
