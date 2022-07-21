import { useState } from "react";
import AutoComplete from "../../../shared/AutoComplete";
import { includesIgnoreCase } from "../../../shared/helper";
import "./ChooseExercise.css";

function ChooseExercise({ exerciseList = [], onExerciseChosen }) {
  const [chosenExercise, setChosenExercise] = useState("");

  const getChosenExercise = (exerciseName) => {
    setChosenExercise(exerciseName);
  };

  return (
    <section className="chooseExercise">
      <h3>Choose Exercise</h3>
      <AutoComplete
        suggestions={exerciseList}
        changeHandler={getChosenExercise}
      />
      {!includesIgnoreCase(exerciseList, chosenExercise) &&
        chosenExercise !== "" && (
          <p>
            <em>Exercise not found and will be added.</em>
          </p>
        )}
      <button
        className="primary"
        disabled={!chosenExercise}
        onClick={() => onExerciseChosen(chosenExercise)}
      >
        Track this Exercise
      </button>
    </section>
  );
}

export default ChooseExercise;
