import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContactThunk,
  selectContact,
  editContact,
} from "../redux/slices/contactSlice";
import AddContact from "../AddContact";

export default function ContactList() {
  const contacts = useSelector((selector) => selector.contacts.data);
  const dispatch = useDispatch();

  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.email}>
            <button
              onClick={() => {
                dispatch(selectContact(contact.id));
              }}
            >
              {contact.name} ({contact.selected ? "selected" : "not selected"})
            </button>
            <button
              onClick={() => dispatch(deleteContactThunk({ id: contact.id }))}
            >
              Delete
            </button>
            <button onClick={() => dispatch(editContact(contact.id))}>
              Edit
            </button>
            <br />
            {contact.edit && <AddContact contact={contact} />}
          </li>
        ))}
      </ul>
    </section>
  );
}
