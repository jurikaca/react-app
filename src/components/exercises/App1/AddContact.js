import React from 'react';
import { useState, useContext } from 'react';
import {AppContext} from "./AppContext";

export default function AddContact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

    const {
        onAddContact
    } = useContext(AppContext);

  const addContact = () => {
      onAddContact({
          name: name,
          email: email,
      });
      setName('');
      setEmail('');
  };

  return (
    <section className="add-contact">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <br />
      <button onClick={addContact}>Add new contact</button>
    </section>
  );
}
