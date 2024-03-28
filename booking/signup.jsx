import React, { useState } from "react";
import axios from "axios";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";
import "../container/SignUpForm.css";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact_no: "",
    password: ""
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
      await axios.post("http://localhost:8080/admin/create", formData);
      alert("User signed up successfully!");
      setFormData({
        name: "",
        email: "",
        contact_no: "",
        password: ""
      });
      navigate("/SignIn"); 
    } catch (error) {
      console.error("Error signing up:", error);
      alert("An error occurred. Please try again.");
    }
    console.log(formData)
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
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
          name="contact_no"
          placeholder="contact number"
          value={formData.contact_no}
          onChange={handleChange}
          minLength={10}
          required
        />
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          minLength={6}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p style={{color:"black"}}>Already have account..  <a href="/signin">SignIn</a></p>
    </div>
  );
};

export default SignUpForm;

