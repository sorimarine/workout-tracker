import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../auth/auth";
import { useCurrentUser } from "../../context/CurrentUserContext";
import Login from "./components/Login";
import Register from "./components/Register";
import "./Landing.css";

const Landing = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [isAuth, setIsAuth] = useState(null);
  const { setCurrentUser } = useCurrentUser();
  useEffect(() => {
    const setAuth = async () => {
      setIsAuth(await isAuthenticated(setCurrentUser));
    };
    setAuth();
  }, []);

  return isAuth === null ? (
    ""
  ) : isAuth ? (
    <Navigate to="/" />
  ) : (
    <main className="landing">
      <h1>Welcome to Workout Tracker</h1>
      <p>Please log in to continue</p>
      {!showRegisterForm ? (
        <section>
          <Login />
          <p>Don't have an account?</p>
          <span
            className="landing__linkSpan"
            onClick={() => setShowRegisterForm(true)}
          >
            Register
          </span>
        </section>
      ) : (
        <section>
          <Register />
          <p>Already have an account?</p>
          <span
            className="landing__linkSpan"
            onClick={() => setShowRegisterForm(false)}
          >
            Login
          </span>
        </section>
      )}
    </main>
  );
};

export default Landing;
