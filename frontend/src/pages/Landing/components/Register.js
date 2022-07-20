import { useState } from "react";
import axios from "axios";
import { useCurrentUser } from "../../../context/CurrentUserContext";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const { setCurrentUser } = useCurrentUser();
  const nav = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { error, user } = await axios
        .post("/api/register", { username, password })
        .then((results) => results.data);
      if (error) {
        setErrorMsg(error);
        return;
      }
      setCurrentUser(user);
      nav("/trackWorkout");
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <form onSubmit={handleRegister} autoComplete="off">
      <p className="errorMsg">{errorMsg}</p>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button>Register</button>
    </form>
  );
};

export default Register;
