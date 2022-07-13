import { useState } from "react";
import "./ExerciseDisplay.css";
import SetsDisplay from "./SetsDisplay";

const ExerciseDisplay = ({ exercise, updExercise }) => {
  const [showSets, setShowSets] = useState(false);

  const displaySets = (e) => {
    e.stopPropagation();
    setShowSets(!showSets);
  };

  const onDelete = (index) => {
    exercise.sets.splice(index, 1);
    updExercise(exercise);
  };
  return exercise.sets.length > 0 ? (
    <div className="exerciseDisplay">
      <span className="exerciseDisplay__infoSpan" onClick={displaySets}>
        {exercise.name} ({exercise.sets.length} sets)
      </span>
      {showSets && <SetsDisplay sets={exercise.sets} deleteSet={onDelete} />}
    </div>
  ) : (
    ""
  );
};

export default ExerciseDisplay;
