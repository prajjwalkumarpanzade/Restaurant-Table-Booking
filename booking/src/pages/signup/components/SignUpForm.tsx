import React, { useState } from "react";
import axios from "axios";
import { FormikValues, FormikHelpers } from "formik";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";
import "../container/SignUpForm.css";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact_no: "",
    password: "",
    role: "customer",

  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    try {
      await axios.post("http://localhost:8080/signup", formData);
      toast.dark("User signed up successfully!");
      setFormData({
        name: "",
        email: "",
        contact_no: "",
        password: "",
        role: "customer",

      });
      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error);
      toast.dark("Enter valid Data");
    }
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
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        <button type="submit">Sign Up</button>
      </form>
      <p style={{color:"black"}}>Already have an account? <a href="/">Sign In</a></p>
    </div>
  );
};

export default SignUpForm;