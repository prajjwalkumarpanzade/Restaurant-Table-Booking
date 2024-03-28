
import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import SignupPage from "../pages/signup/container/SignUp";
import SigninPage from "../pages/signin/container/SignIn";
import BookTable from "../pages/booktable/container/BookTable";
import AdminDashboard from "../pages/admin_dashboard/container/admindashboard";
import BookingList from "../pages/showbookings/components/BookingList";
import Navbar from "../shared/Navbar";
import UserList from "../pages/showusers/components/UserList";
import BookAdminTable from "../pages/booktable/container/BookAdminTable";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<BookTable/>} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/booktable" element={<BookAdminTable/>}/>
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/showbookings" element={<BookingList />} />
      <Route path="/showusers" element={<UserList/>} />
    </RouterRoutes>
  );
};

export default Routes;
