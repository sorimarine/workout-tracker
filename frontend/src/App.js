import TrackWorkout from "./pages/Track Workout/TrackWorkout";
import Header from "./pages/Header/Header";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import ProtectedRoute from "./shared/ProtectedRoute";
import { CurrentUserProvider } from "./context/CurrentUserContext";
import Dashboard from "./pages/Dashboard/Dashboard";

const App = () => {
  return (
    <Router>
      <CurrentUserProvider>
        <Header />
        <Routes>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="landing" element={<Landing />} />
          <Route
            path="trackWorkout"
            element={
              <ProtectedRoute>
                <TrackWorkout />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </CurrentUserProvider>
    </Router>
  );
};

export default App;
