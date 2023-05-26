import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContact,
  selectContact,
  editContact,
} from "../redux/slices/contactSlice";
import AddContact from "../AddContact";

export default function ContactList() {
  const contacts = useSelector((selector) => selector.contacts.data);
  const dispatch = useDispatch();

  const pageSize = 10;

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages
  const totalPages = Math.ceil(contacts.length / pageSize);

  // Slice contacts array based on current page and page size
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedContacts = contacts.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="contact-list">
      <ul>
        {displayedContacts.map((contact) => (
          <li key={contact.email}>
            <button
              onClick={() => {
                dispatch(selectContact(contact.id));
              }}
            >
              {contact.name} ({contact.selected ? "selected" : "not selected"})
            </button>
            <button onClick={() => dispatch(deleteContact(contact))}>
              Delete
            </button>
            <button onClick={() => dispatch(editContact(contact.id))}>
              Edit
            </button>
            <br />
            {contact.edit && <AddContact contact={contact} />}
          </li>
        ))}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              disabled={currentPage === pageNumber}
            >
              {pageNumber}
            </button>
          )
        )}
      </ul>
    </section>
  );
}
