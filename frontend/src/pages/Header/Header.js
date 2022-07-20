import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../context/CurrentUserContext";
import "./Header.css";
import Navbar from "./components/Navbar";

const Header = () => {
  const nav = useNavigate();
  const { currentUser, setCurrentUser } = useCurrentUser();

  const logout = () => {
    setCurrentUser(null);
    nav("/landing");
    axios.post("/api/logout");
  };

  return currentUser ? (
    <header className="header">
      {currentUser && (
        <div className="header__loggedIn">
          <span className="header__infoSpan">
            logged in as{" "}
            <span className="header__username">{currentUser.username}</span>
          </span>
          <span className="header__logoutSpan" onClick={logout}>
            logout
          </span>
        </div>
      )}
      <Navbar />
    </header>
  ) : (
    ""
  );
};

export default Header;
