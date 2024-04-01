
import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import SignupPage from "../pages/signup/container/SignUp";
import SigninPage from "../pages/signin/container/SignIn";
import BookTable from "../pages/booktable/container/BookTable";
import AdminDashboard from "../pages/admin_dashboard/container/admindashboard";
import BookingList from "../pages/showbookings/components/BookingList";
import UserList from "../pages/showusers/components/UserList";
import BookAdminTable from "../pages/booktable/container/BookAdminTable";
import ProtectedRoute from "./ProtectedRoute";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<SigninPage/>} />
      {/* <Route path="/signin" element={<SigninPage />} /> */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/booktable" element={<ProtectedRoute Component={BookAdminTable}/>}/>
      <Route path="/admindashboard" element={<ProtectedRoute Component={AdminDashboard} />} />
      <Route path="/showbookings" element={<ProtectedRoute Component= {BookingList} />} />
      <Route path="/showusers"  element={<ProtectedRoute Component={UserList} />} />
    </RouterRoutes>
  );
};

export default Routes;
