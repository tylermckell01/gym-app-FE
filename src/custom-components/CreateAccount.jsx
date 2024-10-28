import { useState } from "react";

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "",
  });

  const [userCreated, setUserCreated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8086/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setUserCreated(true);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "",
      });
      setTimeout(() => {
        setUserCreated(false);
      }, 2500);
      return response;
    }
  };

  const handleFieldUpdate = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const addUserForm = () => {
    return (
      <div className="new-user-form-container">
        <div className="page-title">new user form</div>
        <form onSubmit={handleSubmit}>
          <div className="new-user-form">
            <label htmlFor="new-user-first-name"> first name </label>
            <input
              id="new-user-first-name"
              name="first_name"
              value={formData.first_name}
              type="text"
              className="user-first-name"
              onChange={handleFieldUpdate}
            />

            <label htmlFor="new-user-last-name"> last name </label>
            <input
              id="new-user-last-name"
              name="last_name"
              value={formData.last_name}
              type="text"
              className="user-last-name"
              onChange={handleFieldUpdate}
            />

            <label htmlFor="new-user-email"> email </label>
            <input
              id="new-user-email"
              name="email"
              value={formData.email}
              type="text"
              className="user-email"
              onChange={handleFieldUpdate}
            />

            <label htmlFor="new-user-password"> password </label>
            <input
              id="new-user-password"
              name="password"
              value={formData.password}
              type="text"
              className="user-password"
              onChange={handleFieldUpdate}
            />

            <label htmlFor="new-user-role"> role </label>
            <input
              id="new-user-role"
              name="role"
              value={formData.role}
              type="text"
              className="user-role"
              onChange={handleFieldUpdate}
            />

            {userCreated && (
              <div className="toast-notification">user created succesfully</div>
            )}
            <button type="submit">Add this user!</button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="create-account-container">
      <div className="user-form">{addUserForm()}</div>
    </div>
  );
}
