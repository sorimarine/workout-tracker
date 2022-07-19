import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import "./Landing.css";

const Landing = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  return (
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
