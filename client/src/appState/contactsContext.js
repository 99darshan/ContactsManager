import React, {createContext, useEffect, useReducer} from 'react';
//import {initialState} from "./contactsStore";
import {contactsReducer} from "./contactsReducer";

export const ContactsContext = createContext();

// useReducer hooks returns state and dispatch which are passed down as values from Providers
// reducer and initialState are passed as props to the ContactsProvider
export default function ContactsProvider(props){
    let initialState = {contacts:[], isFetching: true}
    let [state, dispatch] = useReducer(contactsReducer, initialState); 

    // Fetch initialContacts array from the server TODO:
    // second empty [] makes this effect behave as componentDidMount else it will also be called on componentDidUpdate and fetching data from api in every request.
    useEffect(async() => {
        try {
            // TODO: handle error, check status code??
            let response = await fetch('http://localhost:3000/contacts');
            let res = await response.json();
            dispatch({
                type:"FETCH_ALL_CONTACTS",
                payload: res
            });
            //initialState = {...initialState, contacts:[...res], isFetching:false}
            console.table(res);
            console.table(initialState);
            
        } catch (error) {
            console.log(error.message);
        }
      }, []);

    return (<ContactsContext.Provider value={{state, dispatch}}>
        {props.children}
    </ContactsContext.Provider>)
};

