import React from 'react';
import { useState, useCallback } from 'react';

export default function Chat({ contact, onSendMessage }) {
  const [text, setText] = useState('');

  const sendMessage = () => {
      onSendMessage(text, contact);
      setText('');
  };

  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={'Chat to ' + (contact ? contact.name : 'none')}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button onClick={sendMessage}>Send to {(contact ? contact.email : 'none')}</button>
    </section>
  );
}
