import React, { useState, useEffect } from "react";
import axios from "axios";

const BookTableForm = () => {
  const [formData, setFormData] = useState({
    Name: "",
    contactno: "",
    number: 1,
    date: new Date().toISOString().split('T')[0],
    slot: ""
  });

  const [slots, setSlots] = useState<any[]>([]);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await axios.get("http://localhost:8000/timeslots");
      setSlots(response.data);
    } catch (error) {
      console.error("Error fetching slots:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const selectedSlot = slots.find((slot) => slot.slot_id.toString() === formData.slot);
  
      if (!selectedSlot) {
        alert("Please select a valid slot.");
        return;
      }
  
      await axios.post("http://localhost:8000/tablebookings", {
        name: formData.Name,
        contactNumber: formData.contactno,
        numberOfPersons: formData.number,
        date: formData.date,
        slotId: formData.slot,
        tableNo: selectedSlot.table_id
      });
  
      alert("Table booked successfully!");
      setFormData({
        Name: "",
        contactno: "",
        number: 1,
        date: new Date().toISOString().split('T')[0],
        slot: ""
      });
    } catch (error) {
      console.error("Error booking table:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  return (
    <div>
      <h1>Book Table</h1>
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
          <label>Choose Date:</label><br></br><br></br>
          <input
            type="date"
            name="date"
            value={formData.date}
            min={new Date().toISOString().split('T')[0]}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Choose Time Slot:</label>
          <select
            name="slot"
            value={formData.slot}
            onChange={handleSelectChange}
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
