import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";

interface Slot {
  slot_id: number;
  start_time: string;
  end_time: string;
  table_id: number[];
}

const BookTableForm = () => {
  const [formData, setFormData] = useState({
    Name: "",
    contactno: "",
    number: 1,
    date: new Date().toISOString().split("T")[0],
    slot: ""
  });

  const [slots, setSlots] = useState<Slot[]>([]);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await axios.get<Slot[]>("http://localhost:8080/getslots");
      setSlots(response.data);
    } catch (error) {
      console.error("Error fetching slots:", error);
      alert("An error occurred while fetching slots. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSlotChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.Name) {
      alert("Name field cannot be empty.");
      return;
    }
    try {
      const selectedSlot = slots.find((slot) => slot.slot_id.toString() === formData.slot);

      if (!selectedSlot) {
        alert("Please select a valid slot.");
        return;
      }

      // Choose a random table from the available tables for the selected slot
      const randomTableIndex = Math.floor(Math.random() * selectedSlot.table_id.length);
      const selectedTableId = selectedSlot.table_id[randomTableIndex];

      await axios.post("http://localhost:8080/bookings", {
        customer_name: formData.Name,
        contact_no: formData.contactno,
        date: formData.date,
        slot_id: formData.slot,
        table_id: selectedTableId 
      });

      alert("Table booked successfully!");
      setFormData({
        Name: "",
        contactno: "",
        number: 1,
        date: new Date().toISOString().split("T")[0],
        slot: ""
      });
    } catch (error) {
      console.error("Error booking table:", error);
      alert("An error occurred while booking the table. Please try again.");
    }
  };

  return (
    <div className="book-table-form">
      <h1 style={{color:"black"}}>Book Table</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="Name"
            placeholder="Name"
            value={formData.Name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            name="contactno"
            placeholder="Contact Number"
            value={formData.contactno}
            onChange={handleInputChange}
            minLength={6}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="number"
            placeholder="Number of Persons"
            value={formData.number}
            min={1}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Choose Date:</label>
          <br />
          <br />
          <input
            type="date"
            name="date"
            value={formData.date}
            min={new Date().toISOString().split("T")[0]}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <select
            className="form-select"
            name="slot"
            value={formData.slot}
            onChange={handleSlotChange}
            required
          >
            <option value="">Select a slot</option>
            {slots.map((slot) => (
              <option key={slot.slot_id} value={slot.slot_id}>
                {slot.start_time} - {slot.end_time}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Book</button>
      </form>
    </div>
  );
};

export default BookTableForm;
