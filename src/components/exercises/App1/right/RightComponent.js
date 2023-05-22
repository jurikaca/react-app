import React from "react";
import { useState } from "react";
import MessageByContact from "./MessageByContact";
import ProfileSettings from "../ProfileSettings";

export default function RightComponent(props) {
  return (
    <section className="right-component">
      {props.loggedInUser && <ProfileSettings />}
      <MessageByContact />
    </section>
  );
}
