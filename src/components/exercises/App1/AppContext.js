import React from 'react';
import { useReducer, useCallback, useEffect, createContext } from 'react';
import { v4 as uuid } from 'uuid';
import api from "../../../services/api";

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const initialContactsState = {
        contacts: [],
        selectedContact: null,
    };

  const [ contactsState, dispatchContact ] = useReducer(contactsReducer, initialContactsState);
  const [ messages, dispatchMessage ] = useReducer(messagesReducer, []);
  const [ loggedInUser, dispatchUser ] = useReducer(UserReducer, {});
  const [ counter, dispatchCounter ] = useReducer(CounterReducer, 0);

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

  const setCounter = () => {
      dispatchCounter({
        type: 'INCREMENT'
      });
  };


  const value = {
      contacts: contactsState.contacts,
      messages,
      loggedInUser,
      selectedContact: contactsState.selectedContact,
      onSendMessage,
      onDeleteMessage,
      onDeleteContact,
      onAddContact,
      onSelectContact,
      onLogOut,
      onLogIn,
      counter, setCounter
  };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
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
    let newSelectedContact = state.selectedContact;
    switch (action.type) {
        case 'ADD':
            return {contacts: [...state.contacts, action.contact], selectedContact: newSelectedContact};
        case 'LIST':
            action.contacts.forEach((contact) => {
                if (contact.selected === true) {
                    newSelectedContact = contact
                }
            });

            return {contacts: action.contacts, selectedContact: newSelectedContact};
        case 'SELECT':
            const newContacts = state.contacts.map((contact) => {
                contact.selected = false;
                if (contact.id === action.contactId) {
                    contact.selected = true;
                    newSelectedContact = contact
                }
                return contact;
            });

            return {contacts: newContacts, selectedContact: newSelectedContact};
        case 'DELETE':
            return { ...state, contacts: state.contacts.filter((contact) => contact.id !== action.contactId)};
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