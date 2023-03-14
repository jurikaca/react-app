import React from 'react';
import { useContext } from 'react';
import RightComponent from "./right/RightComponent";
import LeftComponent from "./left/LeftComponent";
import AddContact from "./AddContact";
import User from "./auth/User";
import {AppContext, AppProvider} from "./AppContext";

export default function InnerApp1() {

    const {
      contacts,
      loggedInUser,
      onLogOut,
      onLogIn
    } = useContext(AppContext);

  return <AppProvider>
      <div>

        <b>{loggedInUser ? 'User logged in '+loggedInUser.username : <>User not logged in' + <button onClick={onLogIn}>log in</button></>}</b>

      {
          contacts && <div style={{display: 'flex'}}>
              <div style={{innerWidth: '50%'}}>
                <LeftComponent />
              </div>
              <div style={{innerWidth: '50%'}}>
                <RightComponent />
              </div>
          </div>
      }
      <div>
          <hr />
          <label>Add new contact section</label>
          <AddContact />
      </div>
      <>
          <User loggedInUser={loggedInUser} onLogOut={onLogOut} />
      </>
  </div>
  </AppProvider>
}