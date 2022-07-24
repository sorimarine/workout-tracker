import AddSet from "./AddSet";
import ChooseExercise from "./ChooseExercise";
import "./AddExercise.css";
import SetsDisplay from "./SetsDisplay";
import useSessionStorage from "../../../hooks/useSessionStorage";

const AddExercise = ({ onExerciseComplete, onCancel, exerciseList }) => {
  const [showChooseExercise, setShowChooseExercise] = useSessionStorage(
    "show_choose_exercise",
    true
  );
  const [chosenExercise, setChosenExercise] = useSessionStorage(
    "chosen_exercise",
    ""
  );
  const [sets, setSets] = useSessionStorage("sets_complete", []);

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

  const exerciseCompleteHandler = () => {
    onExerciseComplete({ name: chosenExercise, sets: sets });
    setShowChooseExercise(true);
    setChosenExercise("");
    setSets([]);
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
    <section className="addExercise secondary">
      {chosenExercise && <h4>{chosenExercise}</h4>}
      {chosenExercise ? addSetDiv : chooseExerciseDiv}
      <hr />
      <button className="primary" onClick={onCancel}>
        Cancel
      </button>
      <button
        className="primary"
        disabled={!sets.length > 0}
        onClick={() =>
          exerciseCompleteHandler({ name: chosenExercise, sets: sets })
        }
      >
        Exercise Complete
      </button>
    </section>
  );
};

export default AddExercise;
