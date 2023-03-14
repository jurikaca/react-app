import React from 'react';
import {AppContext} from "../AppContext";
import { useContext } from 'react';

export default function ContactList() {

    const {
      contacts,
      onDeleteContact,
      onSelectContact
    } = useContext(AppContext);

  return (
    <section className="contact-list">
      <ul>
        {contacts.map(contact =>
          <li key={contact.email}>
            <button onClick={() => {
              onSelectContact(contact.id);
            }}>
              {contact.name} ({contact.selected ? 'selected' : 'not selected'})
            </button>
            <button onClick={() => onDeleteContact(contact)}>Delete</button>
          </li>
        )}
      </ul>
    </section>
  );
}
