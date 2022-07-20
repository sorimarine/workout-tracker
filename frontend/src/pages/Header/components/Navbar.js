import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navBar">
      <ul className="navBar__list">
        <li className="navBar__listItem">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="navBar__listItem">
          <Link to="/trackworkout">Track Workout</Link>
        </li>
        <li className="navBar__listItem">
          <Link to="/history">Workout History</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
