import { useState } from "react";
import axios from "axios";

const LoginLogout = ({ user, setUser }) => {
  const [username, setUsername] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const data = await axios
        .post("/api/loginUser", { username: username })
        .then((results) => results.data);
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <>
      {user ? (
        <div>
          <p>
            <em>logged in as {user.username}</em>
          </p>
          <button onClick={logoutUser}>log out</button>
        </div>
      ) : (
        <form onSubmit={loginUser}>
          <label htmlFor="username">username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button>login</button>
        </form>
      )}
    </>
  );
};

export default LoginLogout;
