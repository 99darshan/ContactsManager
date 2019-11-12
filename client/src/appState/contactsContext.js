import React, {createContext, useContext, useReducer} from 'react';

export const ContactsContext = createContext();

// useReducer hooks returns state and dispatch which are passed down as values from Providers
// reducer and initialState are passed as props to the ContactsProvider
// let [state, dispatch] = useReducer(reducer, initialState); 
export const ContactsProvider = ({reducer, initialState, children}) => (
<ContactsContext.Provider value={useReducer(reducer, initialState)}>
    {children}
</ContactsContext.Provider>);