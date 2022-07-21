import PastWorkoutDisplay from "./PastWorkoutDisplay";
import "./PastworkoutsDisplay.css";

const PastWorkoutsDisplay = ({ workoutsList }) => {
  return (
    <section className="pastWorkouts">
      <h3 className="pastWorkouts__header">Past Workouts:</h3>
      {workoutsList &&
        workoutsList.map((workout) => (
          <PastWorkoutDisplay workout={workout} key={workout._id} />
        ))}
    </section>
  );
};

export default PastWorkoutsDisplay;
