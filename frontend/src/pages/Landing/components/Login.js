import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../../context/CurrentUserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const nav = useNavigate();
  const { setCurrentUser } = useCurrentUser();

  const login = async (e) => {
    e.preventDefault();
    try {
      const { error, user } = await axios
        .post("api/login", { username, password })
        .then((results) => results.data);
      if (error) {
        setErrorMsg(error);
        return;
      }
      setCurrentUser(user);
      nav("/");
    } catch (e) {
      alert("Error! can't find user");
    }
  };

  return (
    <form className="login" onSubmit={login} autoComplete="off">
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
      <button>Login</button>
    </form>
  );
};

export default Login;
