import React, { useState, useCallback, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      const response = await axios.post("http://localhost:8080/admin/login", formData);
      if (response.status === 200) {
        alert("Sign in successful!");
        navigate("/admindashboard");
      } else {
        setError("Invalid Credentials.");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setError("Invalid Credentials.");
    }
  }, [formData, navigate]);

  return (
    <div className="signin-container">
      <h2>Sign in</h2>
      {error && <div className="error">{error}</div>}
      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="button" onClick={handleSubmit}>Sign In</button>
      <p style={{color:"black"}}>Don't have Account?  <a href="/signup">SignUp</a></p>
    </div>
  );
};

export default SignInForm;

