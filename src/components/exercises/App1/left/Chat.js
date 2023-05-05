import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../redux/slices/messageSlice";
import { uuid } from "uuidv4";

export default function Chat() {
  const [text, setText] = useState("");

  const selectedContact = useSelector(
    (selector) => selector.contacts.selectedContact
  );
  const dispatch = useDispatch();

  const onSendMessage = () => {
    dispatch(
      sendMessageThunk({
        id: uuid(),
        receiverId: selectedContact.id,
        receiverName: selectedContact.name,
        content: text,
      })
    );
    setText("");
  };

  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={
          "Chat to " + (selectedContact ? selectedContact.name : "none")
        }
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={onSendMessage}>
        Send to {selectedContact ? selectedContact.email : "none"}
      </button>
    </section>
  );
}
