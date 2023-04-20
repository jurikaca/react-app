import React from 'react';
import { useState, useContext } from 'react';
import { addContact } from "./redux/slices/contactSlice";
import {useDispatch} from "react-redux";
import {uuid} from "uuidv4";

export default function AddContact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const addContactHandler = () => {
      dispatch(addContact({
          id: uuid(),
          name: name,
          email: email,
          selected: false
      }));
      setName('');
      setEmail('');
  };

  return (
    <section className="add-contact">
        <input type="text" placeholder={'Enter Name'} value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="text" placeholder={'Enter Email'} value={email} onChange={(e) => setEmail(e.target.value)}/>
      <br />
      <button onClick={addContactHandler}>Add new contact</button>
    </section>
  );
}
