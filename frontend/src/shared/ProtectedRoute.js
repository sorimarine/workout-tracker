import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../auth/auth";
import { useCurrentUser } from "../context/CurrentUserContext";

const ProtectedRoute = ({ children }) => {
  const { setCurrentUser } = useCurrentUser();
  const [isAuth, setIsAuth] = useState(null);
  useEffect(() => {
    const setAuth = async () => {
      setIsAuth(await isAuthenticated(setCurrentUser));
    };
    setAuth();
  }, []);

  // waiting for auth to be set before possibly redirecting
  if (isAuth === null) return "";

  return isAuth ? children : <Navigate to="/landing" />;
};

export default ProtectedRoute;
