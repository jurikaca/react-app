import React from 'react';
import ContactList from "./ContactList";
import Chat from "./Chat";
import Messages from "./Messages";

export default function LeftComponent() {
  return (
    <section className="left">
      <ContactList />
      <Chat />
      <Messages />
    </section>
  );
}
