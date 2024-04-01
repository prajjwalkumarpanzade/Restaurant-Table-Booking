import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props: any) => {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signup");
    }
  });

  return <Component />;
};

export default ProtectedRoute;
