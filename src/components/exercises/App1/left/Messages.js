import React from 'react';
import Message from "./Message";
import { useContext } from 'react';
import {AppContext} from "../AppContext";

export default function Messages() {

    const {
      messages
    } = useContext(AppContext);

  console.log('rendered messages component');
  return (
    <section className="messages">
        { messages[0] ? <ul>
            {messages.map(message =>
              <Message key={message.id} message={message}/>
            )}
          </ul> : <p>No messages yet</p> }
    </section>
  );
}
