import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-wrapper">
        <NavLink to="/add-workout" className="footer-link">
          + New Client
        </NavLink>
      </div>
    </div>
  );
}
