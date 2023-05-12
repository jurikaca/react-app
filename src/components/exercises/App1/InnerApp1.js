import React, { useEffect } from "react";
import Login from "./auth/LogInForm";
import RightComponent from "./right/RightComponent";
import LeftComponent from "./left/LeftComponent";
import AddContact from "./AddContact";
import User from "./auth/User";
import ProfileSettings from "./ProfileSettings";
import { useDispatch, useSelector } from "react-redux";
import {
  logInThunk,
  logOutThunk,
  logUserInThunk,
} from "./redux/slices/userSlice";
import { fetchContacts } from "./redux/slices/contactSlice";
import { fetchMessages } from "./redux/slices/messageSlice";

export default function InnerApp1() {
  const dispatch = useDispatch();
  const contacts = useSelector((selector) => selector.contacts);
  const messages = useSelector((selector) => selector.message);

  const { data: contactsData, status: contactsStatus } = contacts;
  const { status: messageStatus } = messages;

  if (contactsStatus === "idle") {
    useEffect(() => {
      dispatch(fetchContacts());
    }, []);
  }
  if (messageStatus === "idle") {
    useEffect(() => {
      dispatch(fetchMessages());
    }, []);
  }
  useEffect(() => {
    dispatch(logUserInThunk());
  }, []);

  const loggedInUser = useSelector((selector) => selector.user.loggedInUser);
  const logInError = useSelector((selector) => selector.user.logInError);
  const usernameHandle = useSelector((selector) => selector.user.username);
  const passwordHandle = useSelector((selector) => selector.user.password);
  console.log("contacts selector", contacts);

  return (
    <>
      <div>
        <b>
          {loggedInUser ? (
            "User logged in " + loggedInUser.username
          ) : (
            <>
              User not logged in' +{" "}
              <button
                onClick={() => {
                  dispatch(logInThunk({ usernameHandle }, { passwordHandle }));
                }}
              >
                log in
              </button>
              <Login
                handleLogInThunk={() =>
                  dispatch(logInThunk({ usernameHandle }, { passwordHandle }))
                }
                logInError={logInError}
              />
            </>
          )}
        </b>

        {contactsData && (
          <div style={{ display: "flex" }}>
            <div style={{ innerWidth: "50%" }}>
              <LeftComponent />
            </div>
            <div style={{ innerWidth: "50%" }}>
              <RightComponent loggedInUser={loggedInUser} />
            </div>
          </div>
        )}
        <div>
          <hr />
          <label>Add new contact section</label>
          <AddContact />
        </div>
        <>
          <User
            loggedInUser={loggedInUser}
            onLogOut={() => dispatch(logOutThunk())}
          />
        </>
      </div>
    </>
  );
}
