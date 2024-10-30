import { useState } from "react";
import { useAuthInfo } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

export default function LoginForm() {
  const { login } = useAuthInfo();

  const [loginCreds, setLoginCreds] = useState({
    email: "",
    password: "",
  });

  const handleFieldUpdate = (e) => {
    const { name, value } = e.target;

    setLoginCreds((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8086/user/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginCreds),
    })
      .then((res) => res.json())
      .then((data) => data);

    if (response) {
      login();
      // Cookies.set("auth_token", response.auth_info.auth_token);
      localStorage.setItem("auth_token", response.auth_info.auth_token);

      // Cookies.set("user_id", response.auth_info.user.user_id);
      localStorage.setItem("user_id", response.auth_info.user.user_id);

      return response;
    }
  };

  return (
    <div className="login-form-wrapper">
      Enter Your Credentials
      <form onSubmit={handleSubmit}>
        <div className="email-wrapper">
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            name="email"
            value={loginCreds.email}
            type="text"
            className="email-field"
            onChange={handleFieldUpdate}
          />
        </div>
        <div className="password-wrapper">
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            name="password"
            value={loginCreds.password}
            type="password"
            className="password-field"
            onChange={handleFieldUpdate}
          />
        </div>
        {/* <NavLink to="my-workouts"> */}
        <button type="submit">Login</button>
        {/* </NavLink> */}
      </form>
    </div>
  );
}
