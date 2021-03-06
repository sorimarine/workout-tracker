import "./PastWorkoutDisplay.css";
import {
  faCaretRight,
  faCaretDown,
  faMagnifyingGlass,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
const PastWorkoutDisplay = ({ workout }) => {
  const [showDetails, setShowDetails] = useState(false);

  const DetailedView = () => {
    const [exerciseInfo, setExerciseInfo] = useState(null);

    return exerciseInfo ? (
      <div className="pastWorkout__exerciseExpanded secondary">
        <h5 className="pastWorkout__exerciseHeader">
          <FontAwesomeIcon
            icon={faRotateLeft}
            className="pastWorkout__backIcon clickable"
            onClick={() => setExerciseInfo(null)}
          />
          {exerciseInfo.name}
        </h5>
        {exerciseInfo.sets &&
          exerciseInfo.sets.map((set, index) => (
            <span className="pastWorkout__setInfo quarternary" key={index}>
              Set {index + 1}: {set.rep} @ {set.weight} lbs
            </span>
          ))}
        <div></div>
      </div>
    ) : (
      <div className="pastWorkout__detailed secondary">
        {workout.exercises &&
          workout.exercises.map((exercise, index) => (
            <p key={index} className="pastWorkout__exerciseBrief tertiary">
              {exercise.name}: {exercise.sets.length} set
              {exercise.sets.length > 1 && "s"}{" "}
              <span>
                <FontAwesomeIcon
                  className="pastWorkout__viewExerciseIcon clickable"
                  icon={faMagnifyingGlass}
                  onClick={() => setExerciseInfo(exercise)}
                />
              </span>
            </p>
          ))}
      </div>
    );
  };

  const numExercises = workout.exercises ? workout.exercises.length : 0;
  return (
    <div className="pastWorkout primary">
      <div
        className="pastWorkout__brief clickable"
        onClick={() => setShowDetails(!showDetails)}
      >
        <FontAwesomeIcon
          icon={showDetails ? faCaretDown : faCaretRight}
          className="pastWorkout__caret"
        />
        <span className="pastWorkout__infoSpan">
          {workout.date}: {numExercises} Exercise{numExercises > 1 ? "s" : ""}{" "}
          Completed
        </span>
      </div>
      {showDetails && <DetailedView />}
    </div>
  );
};

export default PastWorkoutDisplay;
