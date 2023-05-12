import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInThunk } from "../redux/slices/userSlice";

import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const logInError = useSelector((state) => state.user.logInError);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logInThunk({ username, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Log In</button>
      {logInError && <p>Error: {logInError.message}</p>}
    </form>
  );
}
