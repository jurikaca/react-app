import React from 'react';
import {useDispatch} from "react-redux";
import { deleteMessage } from "../redux/slices/messageSlice";

export default function Message({
  message
}) {

    const dispatch = useDispatch();
    console.log('render message component');

  return (
    <li>
      "{message.content}" <em>(sent to {message.receiverName}, id: {message.receiverId})</em>
      <button onClick={() => dispatch(deleteMessage(message.id))}>Delete</button>
    </li>
  );
}
