import { useEffect, useState } from "react";

export default function NewExerciseForm() {
  const [formData, setFormData] = useState({
    exercise_name: "",
    muscles_worked: "",
  });

  const [editedExerciseData, setEditedExerciseData] = useState({
    exercise_name: "",
    muscles_worked: "",
  });

  const [exerciseData, setExerciseData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);

  useEffect(() => {
    fetchExerciseData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let authToken = localStorage.getItem("auth_token");

    const response = await fetch("http://127.0.0.1:8086/exercise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: authToken,
      },
      body: JSON.stringify(formData),
    });

    if (response) {
      setFormData({ exercise_name: "", muscles_worked: "" });
      await fetchExerciseData();
      return response;
    }
  };

  const deleteExercise = async (exerciseId) => {
    let authToken = localStorage.getItem("auth_token");

    const response = await fetch(
      `http://127.0.0.1:8086/exercise/delete/${exerciseId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          auth: authToken,
        },
      }
    );

    if (response) {
      await fetchExerciseData();
      return response;
    }
  };

  const editExercise = (exercise) => {
    setIsEditing(true);
    setEditingExercise(exercise);
  };

  const editExerciseName = async (exercise) => {
    if (!editedExerciseData) {
      return;
    }

    let authToken = localStorage.getItem("auth_token");

    const response = await fetch(
      `http://127.0.0.1:8086/exercise/${exercise.exercise_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          auth: authToken,
        },
        body: JSON.stringify(editedExerciseData),
      }
    );

    if (response) {
      await fetchExerciseData();
      return response;
    }
  };

  const fetchExerciseData = async () => {
    let authToken = localStorage.getItem("auth_token");

    await fetch("http://127.0.0.1:8086/exercises", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth: authToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setExerciseData(data.result);
      });
  };

  const handleFieldUpdate = (e) => {
    const { name, value } = e.target;

    if (isEditing) {
      setEditedExerciseData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((previous) => ({ ...previous, [name]: value }));
    }
  };

  const addExerciseForm = () => {
    return (
      <div className="new-exercise-form-container">
        <div className="page-title">Create an Exercise Here!</div>
        <form onSubmit={handleSubmit}>
          <div className="new-exercise-form">
            <label htmlFor="exercise-name">exercise name </label>
            <input
              id="exercise-name"
              name="exercise_name"
              value={formData.exercise_name}
              type="text"
              className="exercise-name"
              onChange={handleFieldUpdate}
            />

            <label htmlFor="muscles-worked">muscles worked</label>
            <input
              id="muscles-worked"
              name="muscles_worked"
              value={formData.muscles_worked}
              type="text"
              className="muscles-worked"
              onChange={handleFieldUpdate}
            />

            <button type="submit">Add this exercise!</button>
          </div>
        </form>
      </div>
    );
  };

  const renderExerciseData = () => {
    if (exerciseData.length === 0) {
      return <div>No Exercise Data</div>;
    }

    return exerciseData?.map((exercise, idx) => {
      return (
        <div className="exercise-wrapper" key={idx}>
          {isEditing && editingExercise.exercise_id === exercise.exercise_id ? (
            <div className="exercise-name">
              Exercise Name:
              <input
                id="editing-exercise-name"
                name="editing-exercise_name"
                defaultValue={exercise.exercise_name}
                type="text"
                className="editing-exercise-name"
                onChange={(e) =>
                  setEditedExerciseData((prev) => ({
                    ...prev,
                    exercise_name: e.target.value,
                  }))
                }
              />
            </div>
          ) : (
            <div className="exercise-name">
              Exercise Name: {exercise.exercise_name}
            </div>
          )}

          {isEditing && editingExercise.exercise_id === exercise.exercise_id ? (
            <div className="muscles-worked">
              Muscles Worked:
              <input
                id="editing-muscles-worked"
                name="editing-muscles_worked"
                defaultValue={exercise.muscles_worked}
                type="text"
                className="editing-muscles-worked"
                onChange={(e) =>
                  setEditedExerciseData((prev) => ({
                    ...prev,
                    muscles_worked: e.target.value,
                  }))
                }
              />
            </div>
          ) : (
            <div className="muscles-worked">
              Muscles Worked: {exercise.muscles_worked}
            </div>
          )}

          {isEditing && editingExercise.exercise_id === exercise.exercise_id ? (
            <button
              onClick={() => {
                editExerciseName(exercise);
                setIsEditing(false);
              }}
            >
              Save
            </button>
          ) : (
            <button onClick={() => editExercise(exercise)}>Edit</button>
          )}
          {isEditing &&
            editingExercise.exercise_id === exercise.exercise_id && (
              <button onClick={() => deleteExercise(exercise.exercise_id)}>
                delete
              </button>
            )}
        </div>
      );
    });
  };

  return (
    <div className="exercise-page-container">
      <div className="exercise-form">{addExerciseForm()}</div>
      <div className="existing-exercises">{renderExerciseData()}</div>
    </div>
  );
}
