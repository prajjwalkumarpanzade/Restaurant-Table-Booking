import React, { useState, useEffect } from "react";
import axios from "axios";
import "../container/UserList.css";
import Navbar from "../../../shared/Navbar";


interface User {
  admin_id: number;
  name: string;
  contact_no: string;
  email: string;
  password: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>("http://localhost:8080/admin/getusers", {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("An error occurred while fetching users. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <center>
        <Navbar />
    <div className="user-list-container">
    <h1 className="user-list-header">User List</h1>
      <table className="user-list-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Contact Number</th>
            <th>Email</th>
            
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.admin_id}>
              <td>{user.admin_id}</td>
              <td>{user.name}</td>
              <td>{user.contact_no}</td>
              <td>{user.email}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </center>
    </div>
  );
};

export default UserList;
