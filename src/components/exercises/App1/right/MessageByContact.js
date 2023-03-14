import React from 'react';
import { useContext } from 'react';
import Message from "../left/Message";
import {AppContext} from "../AppContext";

export default function MessageByContact() {

    const {
        contacts,
        messages,
        onDeleteContact
    } = useContext(AppContext);

    const render = contacts.map((contact) => {
        const contactMessages = messages.map((message) => {
            if (message.receiverId === contact.id) {
                return <Message key={message.id} message={message} />;
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
