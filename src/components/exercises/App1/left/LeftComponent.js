import React from 'react';
import { useState } from 'react';
import ContactList from "./ContactList";
import Chat from "./Chat";
import Messages from "./Messages";

export default function LeftComponent({
    contacts, messages, selectedContact, onSelectContact, onSendMessage, onDeleteMessage, onDeleteContact, loggedInUser
}) {
  return (
    <section className="left">
      <ContactList
        contacts={contacts}
        selectedContact={selectedContact}
        onSelect={onSelectContact}
        onDeleteContact={onDeleteContact}
        loggedInUser={loggedInUser}
      />
      <Chat contact={selectedContact} onSendMessage={onSendMessage} />
      <Messages messages={messages} onDeleteMessage={onDeleteMessage} />
    </section>
  );
}
