import ExerciseDisplay from "./ExerciseDisplay";
import "./ExercisesDisplay.css";

const ExercisesDisplay = ({ exercises, updExercises }) => {
  const updExercise = (exercise, index) => {
    console.log(exercises);
    const updatedExercises = [
      ...exercises.slice(0, index),
      exercise,
      ...exercises.slice(index + 1),
    ];
    console.log(updatedExercises);
    updExercises(updatedExercises);
  };
  return (
    <section className="exercisesDisplay">
      <h4 className="exercisesDisplay__header">Exercises Completed</h4>
      {exercises.map((exercise, index) => (
        <ExerciseDisplay
          key={index}
          exercise={exercise}
          updExercise={(newEx) => updExercise(newEx, index)}
        />
      ))}
    </section>
  );
};

export default ExercisesDisplay;
