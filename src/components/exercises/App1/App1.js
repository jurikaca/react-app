import React from 'react';
import { useState, useReducer, useCallback, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import RightComponent from "./right/RightComponent";
import LeftComponent from "./left/LeftComponent";
import AddContact from "./AddContact";
import api from "../../../services/api";
import User from "./auth/User";

export default function App1() {
  const [ contacts, dispatchContact ] = useReducer(contactsReducer, []);
  const [ messages, dispatchMessage ] = useReducer(messagesReducer, []);
  const [ loggedInUser, dispatchUser ] = useReducer(UserReducer, {});

  useEffect(() => {
      api.get('list-contacts.php').then((data) => {
            dispatchContact({
                type: 'LIST',
                contacts: data.contacts
            })
         })
         .catch((err) => {
            console.log(err.message);
         });

      api.get('list-messages.php')
          .then((data) => {
            dispatchMessage({
                type: 'LIST',
                messages: data.messages
            })
         })
          .catch((err) => {
            console.log(err.message);
          });

      api.get('logged-in-user.php')
          .then((data) => {
            dispatchUser({
                type: 'GET',
                user: data.user
            })
         })
          .catch((err) => {
            console.log(err.message);
          });
  }, []);

  const selectedContact = contacts?.find(contact => {
      return contact.selected === true;
  });

  const onSendMessage = useCallback((message, to) => {
      dispatchMessage({
          type: 'SEND',
          message: {
              id: uuid(),
              receiverId: to.id,
              receiverName: to.name,
              content: message,
          }
      });
  }, [dispatchMessage]);

  const onDeleteMessage = (message) => {
      dispatchMessage({
        type: 'DELETE',
        messageId: message.id
      });
  };

  const onDeleteContact = (contact) => {
      // TODO: delete messages for this contact
      dispatchContact({
        type: 'DELETE',
        contactId: contact.id
      });
  };

  const onAddContact = (contact) => {
      dispatchContact({
          type: 'ADD',
          contact: {
              id: uuid(),
              name: contact.name,
              email: contact.email,
              selected: false
          }
      });
  };

  const onSelectContact = (contactId) => {
      dispatchContact({
        type: 'SELECT',
        contactId: contactId
      });
  };

  const onLogOut = () => {
      api.get('log-out.php')
          .then((data) => {
              dispatchUser({
                type: 'LOG_OUT'
              });
         })
          .catch((err) => {
            console.log(err.message);
          });
  };

  const onLogIn = () => {
      api.get('log-in.php')
          .then((data) => {
              dispatchUser({
                type: 'LOG_IN'
              });
         })
          .catch((err) => {
            console.log(err.message);
          });
  };

  return <div>

        <b>{loggedInUser ? 'User logged in '+loggedInUser.username : <>User not logged in' + <button onClick={onLogIn}>log in</button></>}</b>

      {
          contacts && <div style={{display: 'flex'}}>
              <div style={{innerWidth: '50%'}}>
                <LeftComponent
                    contacts={contacts}
                    messages={messages}
                    selectedContact={selectedContact}
                    onSelectContact={onSelectContact}
                    onSendMessage={onSendMessage}
                    onDeleteMessage={onDeleteMessage}
                    onDeleteContact={onDeleteContact}
                    loggedInUser={loggedInUser}
                />
              </div>
              <div style={{innerWidth: '50%'}}>
                <RightComponent
                    contacts={contacts}
                    messages={messages}
                    onDeleteMessage={onDeleteMessage}
                    onDeleteContact={onDeleteContact}
                />
              </div>
          </div>
      }
      <div>
          <hr />
          <label>Add new contact section</label>
          <AddContact onAddContact={onAddContact} />
      </div>
      <>
          <User loggedInUser={loggedInUser} onLogOut={onLogOut} />
      </>
  </div>
}

function messagesReducer (state, action) {
    switch (action.type) {
        case 'SEND':
            return [...state, action.message];
        case 'LIST':
            return action.messages;
        case 'DELETE':
            return state.filter((message) => message.id !== action.messageId);
        default:
            throw Error('Action type ' + action.type + ' not known.');

    }
}

function contactsReducer (state, action) {
    switch (action.type) {
        case 'ADD':
            return [...state, action.contact];
        case 'LIST':
            return action.contacts;
        case 'SELECT':
            return state.map((contact) => {
                contact.selected = false;
                if (contact.id === action.contactId) {
                    contact.selected = true;
                }
                return contact;
            });
        case 'DELETE':
            return state.filter((contact) => contact.id !== action.contactId);
        default:
            throw Error('Action type ' + action.type + ' not known.');

    }
}

function UserReducer (state, action) {
    switch (action.type) {
        case 'LOG_IN':
            return action.user;
        case 'LOG_OUT':
            return null;
        case 'GET':
            return action.user;
        default:
            throw Error('Action type ' + action.type + ' not known.');

    }
}