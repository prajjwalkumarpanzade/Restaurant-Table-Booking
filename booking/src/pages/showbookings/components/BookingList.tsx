// BookingList.tsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../container/BookingList.css";
import Navbar from "../../../shared/Navbar";

interface Booking {
  booking_id: number;
  customer_name: string;
  contact_no: string;
  date: string;
  slot_id: number;
  table_id: number;
}

interface Slot {
  slot_id: number;
  start_time: string;
  end_time: string;
}

const BookingList = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
    fetchSlots();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get<Booking[]>("http://localhost:8080/admin/get_details");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("An error occurred while fetching bookings. Please try again.");
    }
  };

  const fetchSlots = async () => {
    try {
      const response = await axios.get<Slot[]>("http://localhost:8080/getslots");
      setSlots(response.data);
    } catch (error) {
      console.error("Error fetching slots:", error);
      setError("An error occurred while fetching slots. Please try again.");
    }
  };

  return (
    <div>
      <center>
        <Navbar />
        <h2>Booking List</h2>
        {error ? (
          <p>{error}</p>
        ) : (
          <table className="booking-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Name</th>
                <th>Contact Number</th>
                <th>Date</th>
                <th>Slot ID</th>
                <th>Table ID</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.booking_id}</td>
                  <td>{booking.customer_name}</td>
                  <td>{booking.contact_no}</td>
                  <td>{booking.date}</td>
                  <td>{booking.slot_id}</td>
                  <td>{booking.table_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </center>
    </div>
  );
};

export default BookingList;
