import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Cookies from "js-cookie";

export default function MyWorkoutCards() {
  const [yourWorkoutData, setYourWorkoutData] = useState([]);
  const [allExercises, setAllExercises] = useState([]);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);
  const [exerciseEditState, setExerciseEditState] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchWorkoutData();
    fetchAllExercises();
  }, []);

  const fetchWorkoutData = async () => {
    let authToken = Cookies.get("auth_token");
    let userId = Cookies.get("user_id");

    await fetch(`http://127.0.0.1:8086/workouts/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth: authToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setYourWorkoutData(data.result));
  };

  const fetchAllExercises = async () => {
    let authToken = Cookies.get("auth_token");

    const response = await fetch("http://127.0.0.1:8086/exercises", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth: authToken,
      },
    });
    const data = await response.json();
    setAllExercises(data.result);
  };

  const saveEditedWorkout = async () => {
    if (!editingWorkout) return;

    let authToken = Cookies.get("auth_token");
    const { workout_name, description, length } = editingWorkout;
    const updatedWorkoutInfo = {
      workout_name,
      description,
      length,
    };

    const response = await fetch(
      `http://127.0.0.1:8086/workout/${editingWorkout.workout_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          auth: authToken,
        },
        body: JSON.stringify(updatedWorkoutInfo),
      }
    );

    if (response.ok) {
      await fetchWorkoutData();
      setIsEditing(false);
    }
  };

  const editWorkout = (workout) => {
    setEditingWorkout(workout);
    setIsEditing(true);
  };

  const deleteWorkout = async (workout) => {
    let authToken = Cookies.get("auth_token");

    const response = await fetch(
      `http://127.0.0.1:8086/workout/delete/${workout.workout_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          auth: authToken,
        },
        // body: JSON.stringify({ workout_id: workout.workout_id }),
      }
    );

    if (response.ok) {
      await fetchWorkoutData();
      cancelEditExercise();
    } else {
      console.error("Failed to delete workout");
    }
  };

  const editExercise = (workoutId, exerciseId) => {
    setExerciseEditState({ workoutId, exerciseId });
    setSelectedExerciseId(exerciseId);
  };

  const cancelEditExercise = () => {
    setExerciseEditState({});
  };

  const saveExerciseEdit = async (workoutId, exerciseId) => {
    let authToken = Cookies.get("auth_token");

    await fetch("http://127.0.0.1:8086/workout/exercise", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        auth: authToken,
      },
      body: JSON.stringify({ workout_id: workoutId, exercise_id: exerciseId }),
    });

    const response = await fetch("http://127.0.0.1:8086/workout/exercise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: authToken,
      },
      body: JSON.stringify({
        workout_id: workoutId,
        exercise_id: selectedExerciseId,
      }),
    });

    if (response.ok) {
      await fetchWorkoutData();
      cancelEditExercise();
    } else {
      console.error("Failed to update exercise for workout");
    }
  };

  const renderWorkoutData = () => {
    if (yourWorkoutData.length === 0)
      return <div>No Client data available.</div>;

    return yourWorkoutData.map((workout) => (
      <div className="workout-info" key={workout.workout_id}>
        <div className="workout-name">
          {isEditing && editingWorkout.workout_id === workout.workout_id ? (
            <input
              type="text"
              defaultValue={workout.workout_name}
              onChange={(e) =>
                setEditingWorkout({
                  ...editingWorkout,
                  workout_name: e.target.value,
                })
              }
            />
          ) : (
            <span>Workout Name: {workout.workout_name}</span>
          )}
        </div>

        <div className="workout-description">
          {isEditing && editingWorkout.workout_id === workout.workout_id ? (
            <input
              type="text"
              defaultValue={workout.description}
              onChange={(e) =>
                setEditingWorkout({
                  ...editingWorkout,
                  description: e.target.value,
                })
              }
            />
          ) : (
            <span>Description: {workout.description}</span>
          )}
        </div>

        <div className="workout-length">
          {isEditing && editingWorkout.workout_id === workout.workout_id ? (
            <input
              type="text"
              defaultValue={workout.length}
              onChange={(e) =>
                setEditingWorkout({ ...editingWorkout, length: e.target.value })
              }
            />
          ) : (
            <span>Length (hrs): {workout.length}</span>
          )}
        </div>

        <div className="workout-exercises">
          <h4>Exercises:</h4>
          <ul>
            {workout.exercises.map((exercise) => (
              <li key={exercise.exercise_id}>
                {exerciseEditState.workoutId === workout.workout_id &&
                exerciseEditState.exerciseId === exercise.exercise_id ? (
                  <>
                    <select
                      onChange={(e) => setSelectedExerciseId(e.target.value)}
                      value={selectedExerciseId || ""}
                    >
                      <option value="" disabled>
                        Select an exercise
                      </option>
                      {allExercises.map((ex) => (
                        <option key={ex.exercise_id} value={ex.exercise_id}>
                          {ex.exercise_name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() =>
                        saveExerciseEdit(
                          workout.workout_id,
                          exercise.exercise_id
                        )
                      }
                    >
                      Save
                    </button>
                    <button onClick={cancelEditExercise}>Cancel</button>
                  </>
                ) : (
                  <>
                    {exercise.exercise_name}{" "}
                    {isEditing &&
                      editingWorkout.workout_id === workout.workout_id && (
                        <button
                          onClick={() =>
                            editExercise(
                              workout.workout_id,
                              exercise.exercise_id
                            )
                          }
                        >
                          Edit
                        </button>
                      )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="button-container">
          {!isEditing && (
            <button onClick={() => editWorkout(workout)}>
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
          )}
        </div>

        {isEditing && editingWorkout.workout_id === workout.workout_id && (
          <div>
            <button onClick={saveEditedWorkout}>Save Workout</button>
            <button
              onClick={() => {
                deleteWorkout(workout);
              }}
            >
              Delete Workout
            </button>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="my-workout-cards-container">
      <div className="workout-page-title">
        # of workouts: {yourWorkoutData.length}
      </div>
      <div className="cards-wrapper">{renderWorkoutData()}</div>
    </div>
  );
}
