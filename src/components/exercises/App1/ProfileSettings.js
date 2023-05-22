import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileDataThunk } from "./redux/slices/userSlice";

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const messageSubmit = useSelector((selector) => selector.user.submitedData);
  const [clicked, setClicked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      profileId: Date.now(),
      firstName,
      lastName,
      username,
    };

    dispatch(profileDataThunk(data));
    setClicked(true);
  };

  return (
    <section className="right-component">
      <p>Profile settings</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value="example@example.com" disabled />
        </div>
        <button type="submit">Save</button>
        {clicked ? JSON.stringify(messageSubmit) : ""}
      </form>
    </section>
  );
};

export default ProfileSettings;
