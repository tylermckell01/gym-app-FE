import MyWorkoutCards from "../custom-components/MyWorkoutCards";

import { NavLink } from "react-router-dom";

export default function MyWorkouts() {
  return (
    <div className="my-workouts">
      <MyWorkoutCards />
      {/* <NavLink to="/add-workout" className="header-link">
        + New Workout
      </NavLink> */}
    </div>
  );
}
