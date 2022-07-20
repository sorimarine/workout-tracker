import axios from "axios";
export const isAuthenticated = async (setCurrentUser) => {
  // check if the user is in session
  // if so, update user info and return true
  // else return false
  const { user } = await axios
    .get("/api/authUser")
    .then((results) => results.data);
  if (user) {
    setCurrentUser(user);
    return true;
  }
  return false;
};
