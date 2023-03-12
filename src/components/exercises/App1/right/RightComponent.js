import React from 'react';
import { useState } from 'react';
import MessageByContact from "./MessageByContact";

export default function RightComponent({
    contacts, messages, onDeleteMessage, onDeleteContact
}) {
  return (
    <section className="right-component">
      <MessageByContact contacts={contacts} messages={messages} onDeleteMessage={onDeleteMessage} onDeleteContact={onDeleteContact} />
    </section>
  );
}
