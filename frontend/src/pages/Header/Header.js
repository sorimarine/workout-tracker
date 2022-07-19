import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../context/CurrentUserContext";
import "./Header.css";

const Header = () => {
  const nav = useNavigate();
  const { currentUser, setCurrentUser } = useCurrentUser();

  const logout = () => {
    setCurrentUser(null);
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
    </header>
  ) : (
    ""
  );
};

export default Header;
