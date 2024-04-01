import React, { useState, useEffect } from "react";
import axios from "axios";
import "../container/BookingList.css";
import Navbar from "../../../shared/Navbar";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../../shared/role";
import { toast } from "react-toastify";

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
  const navigate=useNavigate();

  const admin_role = isAdmin()

  useEffect(() => {
    fetchBookings();
    fetchSlots();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get<Booking[]>("http://localhost:8080/admin/get_details",{
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("An error occurred while fetching bookings. Please try again.");
    }
  };

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
      setError("An error occurred while fetching slots. Please try again.");
    }
  };

  const handleEditBooking = async (bookingId: number) => {
    try {
      const bookingToEdit = bookings.find(booking => booking.booking_id === bookingId);
      
      if (!bookingToEdit) {
        toast.dark("Booking not found.");
        return;
      }

      await axios.put(`http://localhost:8080/admin/update_table/${bookingId}`, {
        bookingId:bookingId,
        customer_name: bookingToEdit.customer_name,
        contact_no: bookingToEdit.contact_no,
        date: bookingToEdit.date,
        slot_id: bookingToEdit.slot_id,
        table_id: bookingToEdit.table_id
        
      },{
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });
      navigate("/booktable")
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.dark("An error occurred while updating the booking. Please try again.");
    }
  };

  
  

  const handleCancelBooking = async (bookingId: number) => {
    console.log(bookingId);
    try {
      await axios.delete(`http://localhost:8080/admin/cancel_table/${bookingId}`,{
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });
      
      console.log("Booking canceled successfully:", bookingId);
      
      fetchBookings();
    } catch (error) {
      console.error("Error canceling booking:", error);
      setError("An error occurred while canceling the booking. Please try again.");
    }
  };

  return (
    <div>
      <center>
        <Navbar />
        <h1>Booking List</h1>
        {error ? (
          <p>{error}</p>
        ) : (
          <table className="booking-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                
                <th>Date</th>
                <th>Slot ID</th>
                <th>Table ID</th>
                {
                  admin_role && (
                    <>
                    <th>Edit</th>
                <th>Cancel</th>
                    </>
                  )
                }
                
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.booking_id}</td> 
                  <td>{booking.date}</td>
                  
                  <td>{booking.slot_id}</td>
                  <td>{booking.table_id}</td>
                  {
                    admin_role && (
                      <>
                      <td>
                      <button onClick={() => handleEditBooking(booking.booking_id)}>Edit</button>
                    </td>
                    <td>
                      <button onClick={() => handleCancelBooking(booking.booking_id)}>Cancel</button>
                    </td>
                      </>
                    )
                  }
                 
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
