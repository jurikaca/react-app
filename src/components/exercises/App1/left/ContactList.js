import React from 'react';

export default function ContactList({
  selectedContact,
  contacts,
  onSelect,
  onDeleteContact,
  loggedInUser
}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map(contact =>
          <li key={contact.email}>
            <button onClick={() => {
              onSelect(contact.id);
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
