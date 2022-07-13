import TrackWorkout from "./pages/Track Workout/TrackWorkout";
import { useState } from "react";
import LoginLogout from "./pages/LoginLogout";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <>
      <LoginLogout user={user} setUser={setUser} />
      {user && <TrackWorkout user={user} setUser={setUser} />}
    </>
  );
};

export default App;
