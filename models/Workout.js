import mongoose, { Schema, model, models } from "mongoose";

const SetSchema = new Schema({
  reps: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
});

const ExerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sets: [SetSchema],
});

const WorkoutSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    exercises: [ExerciseSchema],
  },
  { timestamps: true }
);

// Use existing model if already created (hot reload safe)
const Workout = models.Workout || model("Workout", WorkoutSchema);

export default Workout;
