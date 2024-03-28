import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    window.location.href = "/signin";
    navigate("/");
  };

  return (
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
        <li>
          <Link to="/showusers" className="navbar-link">Show Users</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="navbar-link">Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
