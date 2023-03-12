import React from 'react';
import { useState } from 'react';
import Message from "../left/Message";

export default function MessageByContact({
    contacts, messages, onDeleteMessage, onDeleteContact
}) {

    const render = contacts.map((contact) => {
        const contactMessages = messages.map((message) => {
            if (message.receiverId === contact.id) {
                return <Message key={message.id} message={message} onDeleteMessage={onDeleteMessage} />;
            }
        });

        return <div key={contact.id}>
            <div>
                Contact: {contact.name} <button onClick={() => onDeleteContact(contact)}>Delete</button>
            </div>
            <div className={'messages'}>
                {contactMessages}
            </div>
        </div>
    });

  return (
    <section className="message-by-contact">
        {render}
    </section>
  );
}
