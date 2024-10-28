import { useState } from "react";
import Cookies from "js-cookie";

export default function NewWorkoutForm() {
  const [formData, setFormData] = useState({
    workout_name: "",
    description: "",
    length: 0,
    notes: "",
    user_id: Cookies.get("user_id"),
  });

  const handleFieldUpdate = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let authToken = Cookies.get("auth_token");
    const response = await fetch("http://127.0.0.1:8086/workout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: authToken,
      },
      body: JSON.stringify(formData),
    });

    if (response) {
      setFormData({ workout_name: "", description: "", length: 0, notes: "" });
      return response;
    }
  };

  return (
    <div className="new-workout-form-container">
      <div className="page-title">Add all your favorite clients in Here!</div>
      <form onSubmit={handleSubmit}>
        <div className="new-workout-form">
          <div className="name-wrapper">
            <label htmlFor="workout-name">Name: </label>
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
            <label htmlFor="workout-description">Address: </label>
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
            <label htmlFor="workout-length">Rate (weekly):</label>
            <input
              id="workout-length"
              name="length"
              value={formData.length}
              type="text"
              className="workout-length"
              onChange={handleFieldUpdate}
            />
          </div>

          <div className="notes-wrapper">
            <label htmlFor="notes">Additional Notes:</label>
            <input
              id="notes"
              name="notes"
              value={formData.notes}
              type="text"
              className="notes"
              onChange={handleFieldUpdate}
            />
          </div>

          <button type="submit">Add this Client!</button>
        </div>
      </form>
    </div>
  );
}
