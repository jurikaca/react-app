import React from "react";
import { useState } from "react";
import {
  addContact,
  updateContact,
  updateContactThunk,
} from "./redux/slices/contactSlice";
import { useDispatch } from "react-redux";
import { uuid } from "uuidv4";

export default function AddContact({ contact }) {
  const isEditForm = contact ? true : false;
  const [name, setName] = useState(isEditForm ? contact.name : "");
  const [email, setEmail] = useState(isEditForm ? contact.email : "");

  const dispatch = useDispatch();

  const addContactHandler = () => {
    if (isEditForm) {
      dispatch(
        updateContactThunk({
          id: contact.id,
          name: name,
          email: email,
        })
      );
    } else {
      dispatch(
        addContact({
          id: uuid(),
          name: name,
          email: email,
          selected: false,
        })
      );
    }
    setName("");
    setEmail("");
  };

  return (
    <section className="add-contact">
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <button onClick={addContactHandler}>
        {isEditForm ? "Save" : "Add Contact"}
      </button>
    </section>
  );
}
