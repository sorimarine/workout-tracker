const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true },
  sets: {
    type: [{ weight: Number, rep: Number }],
    default: [],
  },
});

const WorkoutSchema = new mongoose.Schema({
  date: { type: String, required: true },
  exercises: { type: [ExerciseSchema], default: [] },
});

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    exerciseList: { type: [String], default: [] },
    workouts: { type: [WorkoutSchema], default: [] },
  },
  { timestamps: true }
);

// hash user password before saving to database
UserSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }
          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

// compare a password to the user's password hafter hashing
UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
