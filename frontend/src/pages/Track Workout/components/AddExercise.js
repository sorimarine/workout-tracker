import { useState } from "react";
import AddSet from "./AddSet";
import ChooseExercise from "./ChooseExercise";
import SetDisplay from "./SetDisplay";
import "./AddExercise.css";
import SetsDisplay from "./SetsDisplay";

const AddExercise = ({ onExerciseComplete, onCancel, exerciseList }) => {
  const [showChooseExercise, setShowChooseExercise] = useState(true);
  const [chosenExercise, setChosenExercise] = useState("");
  const [sets, setSets] = useState([]);

  let prevWeight = 0,
    prevRep = 1;

  const onExerciseChosen = (exerciseName) => {
    setChosenExercise(exerciseName);
    setShowChooseExercise(false);
  };

  const onSetCompleteHandler = (set) => {
    prevWeight = set.weight;
    prevRep = set.rep;
    setSets([...sets, set]);
  };

  const deleteSet = (setIndex) => {
    setSets([...sets.slice(0, setIndex), ...sets.slice(setIndex + 1)]);
  };

  const chooseExerciseDiv = (
    <div>
      {showChooseExercise && (
        <ChooseExercise
          onExerciseChosen={onExerciseChosen}
          exerciseList={exerciseList}
        />
      )}
    </div>
  );

  const addSetDiv = (
    <div className="addExercise__divider">
      <SetsDisplay sets={sets} deleteSet={deleteSet} />
      <AddSet onSetComplete={onSetCompleteHandler} w={prevWeight} r={prevRep} />
    </div>
  );

  return (
    <section className="addExercise">
      {chosenExercise && <h4>{chosenExercise}</h4>}
      {chosenExercise ? addSetDiv : chooseExerciseDiv}
      <hr />
      <button onClick={onCancel}>Cancel</button>
      <button
        disabled={!sets.length > 0}
        onClick={() => onExerciseComplete({ name: chosenExercise, sets: sets })}
      >
        Exercise Complete
      </button>
    </section>
  );
};

export default AddExercise;
