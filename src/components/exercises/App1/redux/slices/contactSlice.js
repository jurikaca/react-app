import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import "babel-polyfill";

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
    const response = await fetch('list-contacts.php').then(response => response.json());
    return response.contacts;
});

export const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        status: 'idle',
        data: [],
        selectedContact: null,
    },
    reducers: {
        addContact: (state, action) => {
            state.data.push(action.payload);
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
            state.data = state.data.filter((contact) => contact.id !== action.payload.id);
            contactSlice.caseReducers.setDefaultSelectedContact(state);
        },
        editContact: (state, action) => {
            state.data.forEach((contact) => {
                if (contact.id === action.payload) {
                    contact.edit = !contact.edit;
                }
            });
        }
    },
    extraReducers(builder){
        builder.addCase(fetchContacts.fulfilled, (state, action) => {
            state.data = action.payload;
            contactSlice.caseReducers.setDefaultSelectedContact(state);
        }).addCase(fetchContacts.rejected, (state, action) => {
            console.log('extra reducers rejected', action);
        })
    }
});

export const { addContact, selectContact, deleteContact, editContact } = contactSlice.actions;

export default contactSlice.reducer;