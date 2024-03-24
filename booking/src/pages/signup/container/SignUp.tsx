import { useEffect, useState } from "react";
import './SignUp.css'

const SignUp = () => {
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form>
        <div className="form-group">
          <input
            type="text"
            name="Name"
            placeholder="Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            name="contactno"
            placeholder="contact number"
            minLength={10}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="Password"
            placeholder="Password"
            minLength={6}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
