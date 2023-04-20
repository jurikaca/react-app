import React, {useEffect} from 'react';
import { useContext } from 'react';
import RightComponent from "./right/RightComponent";
import LeftComponent from "./left/LeftComponent";
import AddContact from "./AddContact";
import User from "./auth/User";
import {AppProvider} from "./AppContext";
import {useDispatch, useSelector} from "react-redux";
import { log_in, log_out } from "./redux/slices/userSlice";
import {fetchContacts} from "./redux/slices/contactSlice";
import {fetchMessages} from "./redux/slices/messageSlice";

export default function InnerApp1() {

    const dispatch = useDispatch();
    const contacts = useSelector(selector => selector.contacts);
    const messages = useSelector(selector => selector.message);

    const { data: contactsData, status: contactsStatus } = contacts;
    const { status: messageStatus } = messages;

    if (contactsStatus === 'idle') {
        useEffect(() => {
            dispatch(fetchContacts());
        },[]);
    }
    if (messageStatus === 'idle') {
        useEffect(() => {
            dispatch(fetchMessages());
        },[]);
    }


    const loggedInUser = useSelector(selector => selector.user);
    console.log('contacts selector', contacts);

  return <>
      <div>

        <b>{loggedInUser ? 'User logged in '+loggedInUser.username : <>User not logged in' + <button onClick={() => {dispatch(log_in())}}>log in</button></>}</b>

      {
          contactsData && <div style={{display: 'flex'}}>
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
          <User loggedInUser={loggedInUser} onLogOut={() => dispatch(log_out())} />
      </>
  </div>
  </>
}