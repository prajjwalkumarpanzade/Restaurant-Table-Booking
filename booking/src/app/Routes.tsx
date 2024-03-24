
import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import SignupPage from "../pages/signup/container/SignUp";
import SigninPage from "../pages/signin/container/SignIn";
import BookTable from "../pages/booktable/container/BookTable";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/booktable" element={<BookTable />} />
      <Route path="/" element={<SigninPage />} />
      
    </RouterRoutes>
  );
};

export default Routes;
