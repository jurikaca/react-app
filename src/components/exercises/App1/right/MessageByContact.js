import React from 'react';
import Message from "../left/Message";
import {useDispatch, useSelector} from "react-redux";
import { deleteContact } from "../redux/slices/contactSlice";

export default function MessageByContact() {

    const dispatch = useDispatch();
    const contacts = useSelector(selector => selector.contacts.data);
    const messages = useSelector(selector => selector.message.data);

    const render = contacts.map((contact) => {
        const contactMessages = messages.map((message) => {
            if (message.receiverId === contact.id) {
                return <Message key={message.id} message={message} />;
            }
        });

        return <div key={contact.id}>
            <div>
                Contact: {contact.name} <button onClick={() => dispatch(deleteContact(contact))}>Delete</button>
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
