import * as actionTypes from "./contactsActionTypes";

export const contactsReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCHING:
      return { ...state, isFetching: true };

    // NOTE: ALL sucess action would reset the isFetching and hasError state to false and reset the error object to blank
    case actionTypes.FETCH_ALL_CONTACTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasError: false,
        contacts: [...action.payload.values],
        error: {}
      };

    case actionTypes.CREATE_CONTACT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasError: false,
        error:{},
        contacts: [...state.contacts, ...action.payload.values]
      };

    case actionTypes.UPDATE_CONTACT_SUCCESS:
      if (action.payload.values.length > 0) {
        const updatedContact = action.payload.values[0];
        const updatedIndex = state.contacts.findIndex(
          contact => contact.id === updatedContact.id
        );
        let newContactsState = [...state.contacts];
        newContactsState.splice(updatedIndex, 1, updatedContact);
        return {
          ...state,
          isFetching: false,
          hasError: false,
          error: {},
          contacts: [...newContactsState]
        };
      }
      return { ...state, isFetching: false, hasError: false, error: {} };

    case actionTypes.GET_CONTACT_DETAILS_SUCCESS:
      break;

    case actionTypes.DELETE_CONTACT_SUCCESS:
      console.log(action.payload.deleteResourceId);
      let contactsState = [...state.contacts];
      const deletedIndex = contactsState.findIndex(
        contact => contact.id === action.payload.deleteResourceId
      );
      console.log(deletedIndex);
      if (deletedIndex !== -1) {
        contactsState.splice(deletedIndex, 1);
        return {
          ...state,
          contacts: [...contactsState],
          isFetching: false,
          hasError: false,
          error: {}
        };
      }
      return { ...state, isFetching: false, hasError: false, error: {} };

    // case actionTypes.ERROR_FETCHING_DATA:
    //     break;
    case actionTypes.ERROR: 
      //TODO:
      break;
  }
};
