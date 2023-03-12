import React from 'react';

export default function Message({
  message,
  onDeleteMessage
}) {
  console.log('rendered message component');

  return (
    <li>
      "{message.content}" <em>(sent to {message.receiverName}, id: {message.receiverId})</em>
      <button onClick={() => onDeleteMessage(message)}>Delete</button>
    </li>
  );
}
