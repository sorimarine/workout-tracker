import axios from "axios";
import React, { useState } from "react";
import { useCurrentUser } from "../../context/CurrentUserContext";
import DatePicker from "../../shared/DatePicker";
import { includesIgnoreCase } from "../../shared/helper";
import AddExercise from "./components/AddExercise";
import ExercisesDisplay from "./components/ExercisesDisplay";

function TrackWorkout() {
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [exercisesComplete, setExercisesComplete] = useState([]);
  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [exerciseList, setExerciseList] = useState(currentUser.exerciseList);

  const setInitialStates = () => {
    setShowAddExercise(false);
    setExercisesComplete([]);
    setExerciseList(currentUser.exerciseList);
  };

  const onAddExercise = () => {
    setShowAddExercise(true);
  };

  const onExerciseComplete = (exercise) => {
    if (!includesIgnoreCase(exerciseList, exercise.name)) {
      setExerciseList([...exerciseList, exercise.name]);
    }
    console.log(exerciseList);
    setShowAddExercise(false);
    setExercisesComplete([...exercisesComplete, exercise]);
  };

  const cancelWorkout = () => {
    setInitialStates();
  };

  const saveWorkout = async () => {
    const workout = {
      date: date,
      exercises: exercisesComplete,
    };
    const updatedUser = await axios
      .post("/api/saveWorkout", {
        username: currentUser.username,
        exerciseList: exerciseList,
        workout: workout,
      })
      .then((results) => results.data);
    setCurrentUser(updatedUser);
    setInitialStates();
  };

  const addExerciseSection = showAddExercise ? (
    <AddExercise
      onExerciseComplete={onExerciseComplete}
      onCancel={() => setShowAddExercise(false)}
      exerciseList={exerciseList}
    />
  ) : (
    <button onClick={onAddExercise}>Add Exercise</button>
  );

  return (
    <main>
      <h2>Track Workout</h2>
      <DatePicker onDateChange={setDate} defaultDate={date} />
      {addExerciseSection}
      <hr />
      {exercisesComplete.length > 0 && (
        <ExercisesDisplay
          exercises={exercisesComplete}
          updExercises={setExercisesComplete}
        />
      )}
      <button onClick={cancelWorkout}>Cancel</button>
      <button onClick={saveWorkout} disabled={exercisesComplete.length < 1}>
        Complete Workout
      </button>
    </main>
  );
}

export default TrackWorkout;
