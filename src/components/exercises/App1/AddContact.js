import React from 'react';
import { useState } from 'react';

export default function AddContact({ onAddContact }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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
