import React from 'react';
import Message from "./Message";

export default function Messages({
  messages, onDeleteMessage
}) {
  console.log('rendered messages component');
  return (
    <section className="messages">
        { messages[0] ? <ul>
            {messages.map(message =>
              <Message key={message.id} message={message} onDeleteMessage={onDeleteMessage}/>
            )}
          </ul> : <p>No messages yet</p> }
    </section>
  );
}
