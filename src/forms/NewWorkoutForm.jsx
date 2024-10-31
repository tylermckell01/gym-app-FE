import { useState, useEffect } from "react";

export default function NewWorkoutForm() {
  const [formData, setFormData] = useState({
    workout_name: "",
    description: "",
    length: 0,
    // notes: "",
    user_id: localStorage.getItem("user_id"),
  });
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    const authToken = localStorage.getItem("auth_token");

    const response = await fetch("http://127.0.0.1:8086/exercises", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth: authToken,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setExercises(data.result);
      // console.log(exercises);
    }
  };

  const handleFieldUpdate = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleExerciseSelect = (e) => {
    const exerciseId = e.target.value;
    setSelectedExercises((prev) => [...prev, exerciseId]);
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();

    let authToken = localStorage.getItem("auth_token");

    const response = await fetch("http://127.0.0.1:8086/workout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: authToken,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const workoutData = await response.json();
      const workoutId = workoutData.result.workout_id;
      console.log(response);

      selectedExercises.forEach(async (exerciseId) => {
        await fetch("http://127.0.0.1:8086/workout/exercise", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            auth: authToken,
          },
          body: JSON.stringify({
            workout_id: workoutId,
            exercise_id: exerciseId,
          }),
        });
      });

      setFormData({
        workout_name: "",
        description: "",
        length: 0,
        user_id: localStorage.getItem("user_id"),
      });
      setSelectedExercises([]);
    }
  };

  return (
    <div className="new-workout-form-container">
      <div className="page-title">Add all your favorite workouts here!</div>
      <form onSubmit={handleSubmit}>
        <div className="new-workout-form">
          <div className="name-wrapper">
            <label htmlFor="workout-name">Workout Name: </label>
            <input
              id="workout-name"
              name="workout_name"
              value={formData.workout_name}
              type="text"
              className="workout-name"
              onChange={handleFieldUpdate}
            />
          </div>
          <div className="address-wrapper">
            <label htmlFor="workout-description">Description: </label>
            <input
              id="workout-description"
              name="description"
              value={formData.description}
              type="text"
              className="workout-description"
              onChange={handleFieldUpdate}
            />
          </div>

          <div className="rate-wrapper">
            <label htmlFor="workout-length">Length (hrs):</label>
            <input
              id="workout-length"
              name="length"
              value={formData.length}
              type="text"
              className="workout-length"
              onChange={handleFieldUpdate}
            />
          </div>

          <div className="exercise-wrapper">
            <label htmlFor="exercise-select">Add Exercises:</label>
            <select id="exercise-select" onChange={handleExerciseSelect}>
              <option value="">Select an exercise</option>
              {exercises.map((exercise) => (
                <option key={exercise.exercise_id} value={exercise.exercise_id}>
                  {exercise.exercise_name}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="notes-wrapper">
            <label htmlFor="notes">Additional Notes:</label>
            <input
              id="notes"
              name="notes"
              value={formData.notes}
              type="text"
              className="notes"
              onChange={handleFieldUpdate}
            />
          </div> */}

          <button type="submit">Add this Workout!</button>
        </div>
      </form>
    </div>
  );
}
