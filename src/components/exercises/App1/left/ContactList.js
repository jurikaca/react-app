import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { deleteContact ,selectContact } from "../redux/slices/contactSlice";

export default function ContactList() {

    const contacts = useSelector(selector => selector.contacts.data);
    const dispatch = useDispatch();

  return (
    <section className="contact-list">
      <ul>
        {contacts.map(contact =>
          <li key={contact.email}>
            <button onClick={() => {
              dispatch(selectContact(contact.id));
            }}>
              {contact.name} ({contact.selected ? 'selected' : 'not selected'})
            </button>
            <button onClick={() => dispatch(deleteContact(contact))}>Delete</button>
            <button>Edit</button>
          </li>
        )}
      </ul>
    </section>
  );
}
