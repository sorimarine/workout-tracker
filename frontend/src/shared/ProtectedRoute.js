import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../context/CurrentUserContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useCurrentUser();

  if (!currentUser) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default ProtectedRoute;
