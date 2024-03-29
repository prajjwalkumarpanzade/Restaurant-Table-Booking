import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import "../container/SignIn.css";

const SignInForm = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values: { email: string, password: string }, { setSubmitting, resetForm }: any) => {
    try {
      const response = await axios.post("http://localhost:8080/login", values);
      const { token } = response.data; 
      localStorage.setItem('token', token); 
      alert("User signed in successfully!");
      setSubmitting(false);
      resetForm();
      navigate("/admindashboard");
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Invalid Credentials");
      setSubmitting(false);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="error" />

            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" className="error" />

            <button type="submit" disabled={isSubmitting}>Sign In</button>
          </Form>
        )}
      </Formik>
      <p style={{ color: "black" }}>Don't have an account? <a href="/signup">Sign Up</a></p>
    </div>
  );
};

export default SignInForm;
