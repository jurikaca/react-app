import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import "babel-polyfill";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const response = await fetch("list-contacts.php").then((response) =>
      response.json()
    );
    return response.contacts;
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState: {
    status: "idle",
    data: [],
    selectedContact: null,
    updateRequired: false,
  },
  reducers: {
    addContact: (state, action) => {
      state.data.push(action.payload);
    },
    updateContact: (state, action) => {
      const contactId = action.payload;
      const contactIndex = state.data.findIndex((contact) => {
        contact.id === contactId.id;

        if (contactIndex !== -1 && contact.id === contactId.id) {
          console.log(contactId.name);
          contact.name = contactId.name;
          contact.email = contactId.email;
          contact.edit = !contact.edit;
        }
      });
    },
    selectContact: (state, action) => {
      state.data.forEach((contact) => {
        contact.selected = false;
        if (contact.id === action.payload) {
          contact.selected = true;
          state.selectedContact = contact;
        }
      });
    },
    setDefaultSelectedContact: (state) => {
      state.selectedContact = null;
      state.data.forEach((contact) => {
        if (contact.selected === true) {
          state.selectedContact = contact;
        }
      });
    },
    deleteContact: (state, action) => {
      state.data = state.data.filter(
        (contact) => contact.id !== action.payload.id
      );
      contactSlice.caseReducers.setDefaultSelectedContact(state);
    },
    editContact: (state, action) => {
      state.data.forEach((contact) => {
        if (contact.id === action.payload) {
          contact.edit = !contact.edit;
        }
      });

      state.updateRequired = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.data = action.payload;
        contactSlice.caseReducers.setDefaultSelectedContact(state);
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        console.log("extra reducers rejected", action);
      });
  },
});

export const {
  addContact,
  selectContact,
  deleteContact,
  editContact,
  updateContact,
} = contactSlice.actions;

export default contactSlice.reducer;
