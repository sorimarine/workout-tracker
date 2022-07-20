import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../context/CurrentUserContext";
import "./Header.css";
import Navbar from "./components/Navbar";

const Header = () => {
  const nav = useNavigate();
  const { currentUser, setCurrentUser } = useCurrentUser();

  const logout = async () => {
    setCurrentUser(null);
    await axios.post("/api/logout");
    nav("/landing");
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
