import { useState } from "react";

const AddExerciseForm = ({ userId }) => {
  console.log("User ID received:", userId); // just to confirm

  const [date, setdate] = useState();
  const [exerciseName, setExerciseName] = useState();
  const [reps, setReps] = useState();
  const [weight, setWeight] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data from form: ", date, exerciseName, reps, weight);

    const workoutData = {
      date,
      exercises: [
        {
          name: exerciseName,
          sets: [
            {
              reps: Number(reps),
              weight: Number(weight),
            },
          ],
        },
      ],
    };

    console.log("workoutData: ", workoutData);

    try {
      const res = await fetch("/api/workouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workoutData),
      });

      if (!res.ok) throw new Error("Failed to save workout");

      const saved = await res.json();
      console.log("Workout saved:", saved);
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Date: </label>
      <input
        type="date"
        name="date"
        onChange={(e) => setdate(e.target.value)}
        required
      />

      <label>Exercise Name: </label>
      <input
        type="text"
        name="exerciseName"
        onChange={(e) => setExerciseName(e.target.value)}
        required
      />

      <label>Reps: </label>
      <input
        type="number"
        name="sets"
        onChange={(e) => setReps(e.target.value)}
        required
      />

      <label>Weight: </label>
      <input
        type="number"
        name="reps"
        onChange={(e) => setWeight(e.target.value)}
      />

      <button type="submit">Add Exercise</button>
    </form>
  );
};

export default AddExerciseForm;
