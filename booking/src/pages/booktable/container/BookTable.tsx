import "./BookTable.css";
import BookTableForm from "../components/BookTableForm";
import { Link } from "react-router-dom";

const BookTable = () => {
  return (
    <div>
      <nav className="navbar">
        <ul className="navbar-links">
          <li>
            <Link to="/signin" className="navbar-link">
              Admin login
            </Link>
          </li>
        </ul>
      </nav>
      <div className="signup-container">
        <BookTableForm />
      </div>
    </div>
  );
};

export default BookTable;
