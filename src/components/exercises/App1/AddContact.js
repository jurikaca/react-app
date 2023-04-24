import React from "react";
import { useState, useContext } from "react";
import { addContact, updateContact } from "./redux/slices/contactSlice";
import { useDispatch, useSelector } from "react-redux";
import { uuid } from "uuidv4";

export default function AddContact(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const isEditForm = props.contact ? true : false;

  const dispatch = useDispatch();

  const addContactHandler = () => {
    if (isEditForm) {
      dispatch(
        updateContact({
          id: props.contact.id,
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
        placeholder={isEditForm ? props.contact.name : "Enter Name"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder={isEditForm ? props.contact.email : "Enter Email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      {!isEditForm && (
        <button onClick={addContactHandler}>Add new contact</button>
      )}
      {isEditForm && <button onClick={addContactHandler}>Save</button>}
    </section>
  );
}
