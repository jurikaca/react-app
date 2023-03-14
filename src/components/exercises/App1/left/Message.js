import React from 'react';
import { useContext } from 'react';
import {AppContext} from "../AppContext";

export default function Message({
  message
}) {

    console.log('render message component');
    const {
      onDeleteMessage
    } = useContext(AppContext);

  return (
    <li>
      "{message.content}" <em>(sent to {message.receiverName}, id: {message.receiverId})</em>
      <button onClick={() => onDeleteMessage(message)}>Delete</button>
    </li>
  );
}
