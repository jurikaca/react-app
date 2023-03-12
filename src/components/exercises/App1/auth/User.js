import React from 'react';

export default function User({
  loggedInUser, onLogOut
}) {
  return (
    <section className="contact-list">
        {
            loggedInUser ?
                <>
                    <b>User logged in {loggedInUser.username}</b>
                    <button onClick={onLogOut}>Log out</button>
                </>
            :
                <p>User not logged in</p>
        }
    </section>
  );
}
