import { NavLink } from "react-router-dom";
import { useAuthInfo } from "../context/AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function AuthHeader() {
  const history = useHistory();
  const { logout } = useAuthInfo();

  const handleLogout = () => {
    logout();
    history.push("/");
  };

  return (
    <div className="header-container">
      <div className="header-wrapper">
        <NavLink to="/landing-page" className="header-link">
          Workout Tracker
        </NavLink>

        <NavLink to="/my-workouts" className="header-link">
          My Workouts
        </NavLink>

        <NavLink to="/add-workout" className="header-link">
          + Workout
        </NavLink>

        <NavLink to="/add-gym" className="header-link">
          Gyms
        </NavLink>

        <NavLink to="/add-exercise" className="header-link">
          Exercises
        </NavLink>

        {/* <NavLink to="/add-user" className="header-link">
          Users
        </NavLink> */}

        <NavLink to="login" onClick={handleLogout} className="header-link">
          Log Out
        </NavLink>
      </div>
    </div>
  );
}
