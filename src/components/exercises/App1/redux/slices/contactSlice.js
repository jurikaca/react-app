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

export const updateContactThunk = createAsyncThunk(
  "contacts/updateContactThunk",
  async (data) => {
    const response = await fetch("contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => response.json());
    return {
      response,
      request: data,
    };
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState: {
    status: "idle",
    data: [],
    selectedContact: null,
  },
  reducers: {
    addContact: (state, action) => {
      state.data.push(action.payload);
    },
    selectContact: (state, action) => {
      state.data.forEach((contact) => {
        if (contact.id === action.payload) {
          contact.selected = !contact.selected;
          if (contact.selected === true) {
            state.selectedContact = contact;
          } else {
            state.selectedContact = false;
          }
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
      })
      .addCase(updateContactThunk.fulfilled, (state, action) => {
        const contactFound = state.data.find(
          (contact) => contact.id === action.payload.request.id
        );

        if (contactFound) {
          contactFound.name = action.payload.request.name;
          contactFound.email = action.payload.request.email;
          contactFound.edit = !contactFound.edit;
        }
      })
      .addCase(updateContactThunk.rejected, (state, action) => {
        console.log("extra reducers rejected", action);
      });
  },
});

export const { addContact, selectContact, deleteContact, editContact } =
  contactSlice.actions;

export default contactSlice.reducer;
