import React from 'react';
import Message from "./Message";
import {useSelector} from "react-redux";

export default function Messages() {

    const messages = useSelector(selector => selector.message.messages);

  console.log('rendered messages component');
  return (
    <section className="messages">
        { messages && messages[0] ? <ul>
            {messages.map(message =>
              <Message key={message.id} message={message}/>
            )}
          </ul> : <p>No messages yet</p> }
    </section>
  );
}
