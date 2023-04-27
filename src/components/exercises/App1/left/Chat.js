import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../redux/slices/messageSlice";
import { uuid } from "uuidv4";

export default function Chat() {
  const [text, setText] = useState("");

  const contacts = useSelector((selector) => selector.contacts.data);
  const dispatch = useDispatch();

  let selectedContactsName = "";
  let selectedContactsEmail = "";
  contacts.forEach((contact) => {
    if (contact.selected === true) {
      selectedContactsName += contact.name + ", ";
      selectedContactsEmail += contact.email + ", ";
    }
  });
  selectedContactsName = selectedContactsName.replace(/, \s*$/, "");
  selectedContactsEmail = selectedContactsEmail.replace(/, \s*$/, "");

  const onSendMessage = () => {
    contacts.forEach((contact) => {
      if (contact.selected === true) {
        dispatch(
          sendMessage({
            id: uuid(),
            receiverId: contact.id,
            receiverName: contact.name,
            content: text,
          })
        );
      }
    });
    setText("");
  };

  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={
          "Chat to " + (selectedContactsName ? selectedContactsName : "none")
        }
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={onSendMessage}>
        Send to {selectedContactsEmail ? selectedContactsEmail : "none"}
      </button>
    </section>
  );
}
