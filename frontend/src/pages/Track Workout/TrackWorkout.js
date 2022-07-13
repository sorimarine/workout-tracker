import axios from "axios";
import React, { useState } from "react";
import DatePicker from "../../shared/DatePicker";
import { includesIgnoreCase } from "../../shared/helper";
import AddExercise from "./components/AddExercise";
import ExerciseDisplay from "./components/ExerciseDisplay";
import ExercisesDisplay from "./components/ExercisesDisplay";

function TrackWorkout({ user, setUser }) {
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [exercisesComplete, setExercisesComplete] = useState([]);
  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));
  const [exerciseList, setExerciseList] = useState(user.exerciseList);

  const setInitialStates = () => {
    setShowAddExercise(false);
    setExercisesComplete([]);
    setExerciseList(user.exerciseList);
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
        username: user.username,
        exerciseList: exerciseList,
        workout: workout,
      })
      .then((results) => results.data);
    setUser(updatedUser);
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
