import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import {isAdmin} from "./role" 



const Navbar = () => {
  const navigate = useNavigate();
  const is_admin = isAdmin();
  const handleLogout = () => {
    
    localStorage.removeItem("token")
    window.location.href = "/";
    navigate("/");
  };

  return (
  <div>
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/admindashboard" className="navbar-link">Home</Link>
        </li>
        <li>
          <Link to="/booktable" className="navbar-link">Book Table</Link>
        </li>
        <li>
          <Link to="/showbookings" className="navbar-link">Show Bookings</Link>
        </li>
        {
          is_admin && (
            <li>
          <Link to="/showusers" className="navbar-link">Show Users</Link>
        </li>
          )
        }
        
        </ul>
        <ul> 
        <li>
          <button onClick={handleLogout} className="navbar-link">Logout</button>
        </li>
      </ul>
    </nav>
  
  </div>
  );
};

export default Navbar;
