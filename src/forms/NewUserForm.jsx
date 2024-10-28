import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function NewUserForm() {
  const [userData, setUserData] = useState([]);
  const [editedUserData, setEditedUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let authToken = Cookies.get("auth_token");
    const response = await fetch("http://127.0.0.1:8086/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: authToken,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "",
      });

      await fetchUserData();
      return response;
    }
  };

  const fetchUserData = async () => {
    let authToken = Cookies.get("auth_token");
    await fetch("http://127.0.0.1:8086/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth: authToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.result);
      });
  };

  const handleFieldUpdate = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditedUserData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((previous) => ({ ...previous, [name]: value }));
    }
  };

  const addUserForm = () => {
    return (
      <div className="new-user-form-container">
        <div className="page-title">Create a User Here!</div>
        <form onSubmit={handleSubmit}>
          <div className="new-user-form">
            <label htmlFor="new-user-first-name"> First name </label>
            <input
              id="new-user-first-name"
              name="first_name"
              value={formData.first_name}
              type="text"
              className="user-first-name"
              onChange={handleFieldUpdate}
            />

            <label htmlFor="new-user-last-name"> Last name </label>
            <input
              id="new-user-last-name"
              name="last_name"
              value={formData.last_name}
              type="text"
              className="user-last-name"
              onChange={handleFieldUpdate}
            />

            <label htmlFor="new-user-email"> Email </label>
            <input
              id="new-user-email"
              name="email"
              value={formData.email}
              type="text"
              className="user-email"
              onChange={handleFieldUpdate}
            />

            <label htmlFor="new-user-password"> Password </label>
            <input
              id="new-user-password"
              name="password"
              value={formData.password}
              type="text"
              className="user-password"
              onChange={handleFieldUpdate}
            />

            <label htmlFor="new-user-role"> Role </label>
            <input
              id="new-user-role"
              name="role"
              value={formData.role}
              type="text"
              className="user-role"
              onChange={handleFieldUpdate}
            />

            <button type="submit">Add this user!</button>
          </div>
        </form>
        <div className="existing-users-wrapper">Existing users...</div>
      </div>
    );
  };

  const editUserData = async (user) => {
    if (!editedUserData) {
      return;
    }
    let authToken = Cookies.get("auth_token");

    const response = await fetch(`http://127.0.0.1:8086/user/${user.user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        auth: authToken,
      },
      body: JSON.stringify(editedUserData),
    });

    if (response) {
      await fetchUserData();
      setIsEditing(false);
      return response;
    }
  };

  const deleteUser = async (user) => {
    let authToken = Cookies.get("auth_token");

    const response = await fetch(
      `http://127.0.0.1:8086/user/delete/${user.user_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          auth: authToken,
        },
      }
    );

    if (response.ok) {
      await fetchUserData();
      return response;
    }
  };

  const editUser = (user) => {
    setIsEditing(true);
    setEditingUser(user);
  };

  const renderUserData = () => {
    if (userData.length === 0) {
      return <div>No User Data</div>;
    }

    return userData?.map((user, idx) => {
      return (
        <div className="user-wrapper " key={idx}>
          {isEditing && editingUser.user_id === user.user_id ? (
            <div>
              First Name:
              <input
                id="editing-first-name"
                name="editing-first_name"
                defaultValue={user.first_name}
                type="text"
                className="editing-user-name"
                onChange={(e) =>
                  setEditedUserData({
                    ...editedUserData,
                    first_name: e.target.value,
                  })
                }
              />
            </div>
          ) : (
            <div className="first-name">First Name: {user.first_name}</div>
          )}
          {isEditing && editingUser.user_id === user.user_id ? (
            <div>
              Last Name:
              <input
                id="editing-last-name"
                name="editing-last_name"
                defaultValue={user.last_name}
                type="text"
                className="editing-user-name"
                onChange={(e) =>
                  setEditedUserData({
                    ...editedUserData,
                    last_name: e.target.value,
                  })
                }
              />
            </div>
          ) : (
            <div className="last-name">Last name: {user.last_name}</div>
          )}
          {isEditing && editingUser.user_id === user.user_id ? (
            <div>
              Email:
              <input
                id="editing-email"
                name="editing-email"
                defaultValue={user.email}
                type="text"
                className="editing-user-name"
                onChange={(e) =>
                  setEditedUserData({
                    ...editedUserData,
                    email: e.target.value,
                  })
                }
              />
            </div>
          ) : (
            <div className="email">Email: {user.email}</div>
          )}
          {isEditing && editingUser.user_id === user.user_id ? (
            <div>
              Role
              <input
                id="editing-role"
                name="editing-role"
                defaultValue={user.role}
                type="text"
                className="editing-user-name"
                onChange={(e) =>
                  setEditedUserData({
                    ...editedUserData,
                    role: e.target.value,
                  })
                }
              />
            </div>
          ) : (
            <div className="role">Role: {user.role}</div>
          )}

          {isEditing && editingUser.user_id === user.user_id ? (
            <div>
              Active status: {user.active ? "active" : "inactive"}
              {user.active === true ? (
                <button
                  onClick={(e) => {
                    setEditedUserData({
                      ...editedUserData,
                      active: false,
                    });
                  }}
                >
                  deactivate
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    setEditedUserData({
                      ...editedUserData,
                      active: true,
                    });
                  }}
                >
                  activate
                </button>
              )}
            </div>
          ) : (
            <div className="active-status">
              Active Status: {user.active ? "active" : "inactive"}
            </div>
          )}

          {isEditing && editingUser.user_id === user.user_id ? (
            <button
              onClick={() => {
                editUserData(user);
                setIsEditing(false);
              }}
            >
              Save
            </button>
          ) : (
            <button onClick={() => editUser(user)}>Edit</button>
          )}
          {isEditing && editingUser.user_id === user.user_id && (
            <button onClick={() => deleteUser(user)}>delete</button>
          )}
        </div>
      );
    });
  };

  return (
    <div className="user-page-container">
      <div className="user-form">{addUserForm()}</div>
      <div className="existing-users">{renderUserData()}</div>
    </div>
  );
}
