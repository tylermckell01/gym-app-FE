import { Route } from "react-router-dom";
import MyWorkouts from "../pages/MyWorkouts";
import LoginPage from "../pages/LoginPage";
import NewWorkoutForm from "../forms/NewWorkoutForm";
import NewGymForm from "../forms/NewGymForm";
import NewExerciseForm from "../forms/NewExerciseForm";
import NewUserForm from "../forms/NewUserForm";
import CreateAccount from "../custom-components/CreateAccount";

import LandingPage from "../pages/LandingPage";

export default function DefaultContainer() {
  return (
    <div className="app">
      <Route exact path="/login" component={LoginPage} />

      <Route exact path="/create-account" component={CreateAccount} />

      <Route path="/landing-page" component={LandingPage} />

      <Route path="/my-workouts" component={MyWorkouts} />

      <Route path="/add-workout" component={NewWorkoutForm} />

      <Route path="/add-gym" component={NewGymForm} />

      <Route path="/add-exercise" component={NewExerciseForm} />

      <Route path="/add-user" component={NewUserForm} />
    </div>
  );
}
