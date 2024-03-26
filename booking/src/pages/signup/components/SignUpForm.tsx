import React, { useState } from "react";
import axios from "axios";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";
import "../container/SignUpForm.css";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    contactno: "",
    Password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/admin_data", formData);
      alert("User signed up successfully!");
      setFormData({
        Name: "",
        email: "",
        contactno: "",
        Password: ""
      });
      navigate("/SignIn"); // Redirect to the success page
    } catch (error) {
      console.error("Error signing up:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="Name"
          placeholder="Name"
          value={formData.Name}
          onChange={handleChange}
          required
        />
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <InputField
          type="tel"
          name="contactno"
          placeholder="contact number"
          value={formData.contactno}
          onChange={handleChange}
          minLength={10}
          required
        />
        <InputField
          type="password"
          name="Password"
          placeholder="Password"
          value={formData.Password}
          onChange={handleChange}
          minLength={6}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
