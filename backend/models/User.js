const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true },
  sets: {
    type: [{ weight: Number, rep: Number }],
    default: []
  }
})

const WorkoutSchema = new mongoose.Schema({
  date: { type: String, required: true },
  exercises: { type: [ExerciseSchema], default: [] }
})

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, lowercase: true },
  exerciseList: { type: [String], default: [] },
  workouts: { type: [WorkoutSchema], default: [] }
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema);