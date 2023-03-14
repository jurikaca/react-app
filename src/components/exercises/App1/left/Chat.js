import React from 'react';
import { useState, useContext } from 'react';
import {AppContext} from "../AppContext";

export default function Chat() {
  const [text, setText] = useState('');

    const {
      selectedContact,
      onSendMessage
    } = useContext(AppContext);

  const sendMessage = () => {
      onSendMessage(text, selectedContact);
      setText('');
  };

  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={'Chat to ' + (selectedContact ? selectedContact.name : 'none')}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button onClick={sendMessage}>Send to {(selectedContact ? selectedContact.email : 'none')}</button>
    </section>
  );
}
