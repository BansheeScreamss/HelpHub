import React, { useState } from "react";
import "./Profile.css";

function Profile() {
  // Toggle password card visibility
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  // Stored user info (later loaded from backend)
  const [user, setUser] = useState({
    name: "Mehnaj",
    email: "mehnaj@example.com",
    role: "Requester",
    department: "N/A",
    image: "https://via.placeholder.com/120",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Editing temp state
  const [updatedUser, setUpdatedUser] = useState(user);

  // For password section
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle editing text fields
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // Save profile changes
  const handleSave = async () => {
    // 🔹 Backend API call goes here later
    // await axios.put("/api/update-profile", updatedUser);

    setUser(updatedUser);
    setIsEditing(false);
  };

  // Upload new profile picture
  const handleChangePicture = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 🔹 Backend API call goes here later
    // const formData = new FormData();
    // formData.append("image", file);
    // const response = await axios.post("/api/upload-image", formData);

    const fakeURL = URL.createObjectURL(file);
    setUser({ ...user, image: fakeURL });
  };

  // Update password logic
  const handlePasswordUpdate = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill out all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    try {
      // 🔹 Backend API call goes here later:
      // await axios.post("/api/change-password", {
      //   current: currentPassword,
      //   new: newPassword,
      // });

      alert("Password updated successfully!");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordSection(false);
    } catch (error) {
      alert("Failed to update password");
      console.error(error);
    }
  };

  return (
    <div className="profile-page">
      <h2 className="title">My Profile</h2>

      <div className="profile-card">
        <div className="profile-left">
          <img src={user.image} alt="Profile" className="profile-pic" />

          {/* Hidden file input */}
          <input
            type="file"
            id="uploadInput"
            style={{ display: "none" }}
            onChange={handleChangePicture}
          />

          <button
            className="upload-btn"
            onClick={() => document.getElementById("uploadInput").click()}
          >
            Change Picture
          </button>
        </div>

        <div className="profile-right">
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={isEditing ? updatedUser.name : user.name}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={isEditing ? updatedUser.email : user.email}
              disabled={!isEditing}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Role</label>
            <input type="text" value={user.role} disabled />
          </div>

          {user.role === "Support Staff" && (
            <div className="field">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={isEditing ? updatedUser.department : user.department}
                disabled={!isEditing}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="profile-buttons">
            {!isEditing ? (
              <>
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>

                <button
                  className="change-password-btn"
                  onClick={() => setShowPasswordSection(!showPasswordSection)}
                >
                  Change Password
                </button>
              </>
            ) : (
              <>
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => {
                    setIsEditing(false);
                    setUpdatedUser(user);
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Password section appears only when clicked */}
      {showPasswordSection && (
        <div className="password-section">
          <h3>Change Password</h3>

          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="password-buttons">
            <button className="password-btn" onClick={handlePasswordUpdate}>
              Update Password
            </button>

            <button
              className="password-cancel-btn"
              onClick={() => {
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setShowPasswordSection(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
