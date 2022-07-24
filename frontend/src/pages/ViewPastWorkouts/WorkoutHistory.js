import { useState } from "react";
import axios from "axios";
import PastWorkoutsDisplay from "./components/PastWorkoutsDisplay";
import useSessionStorage from "../../hooks/useSessionStorage";

const WorkoutHistory = () => {
  const [from, setFrom] = useSessionStorage(
    "workoutHistory_fromDate",
    new Date().toLocaleDateString("en-CA")
  );
  const [to, setTo] = useSessionStorage(
    "workoutHistory_toDate",
    new Date().toLocaleDateString("en-CA")
  );
  const [errorMsg, setErrorMsg] = useState(null);
  const [workoutsList, setWorkoutsList] = useSessionStorage(
    "workoutHistory_workoutsList",
    []
  );

  const getWorkouts = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      const { workouts, error } = await axios
        .get("/api/workouts", { params: { dateRange: { from, to } } })
        .then((results) => results.data);
      if (error) setErrorMsg(error);
      setWorkoutsList(workouts);
    } catch (err) {
      console.log(err);
      alert("an error occurred");
    }
  };

  return (
    <main>
      <h2>Workout History</h2>
      <form onSubmit={getWorkouts}>
        <div>
          <label htmlFor="fromDate">From: </label>
          <input
            type="date"
            id="fromDate"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="toDate">To: </label>
          <input
            type="date"
            id="toDate"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <button>Submit</button>
      </form>
      <p className="errorMsg">{errorMsg}</p>
      <PastWorkoutsDisplay workoutsList={workoutsList} />
    </main>
  );
};

export default WorkoutHistory;
