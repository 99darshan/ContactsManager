import React, {createContext, useEffect, useReducer} from 'react';
import initialContactState from "./contactsStore";
import {contactsReducer} from "./contactsReducer";
import httpService from "../services/httpService";
import {API_BASE_URL} from "../constants/routeConstants";
import {FETCH_ALL_CONTACTS_SUCCESS, FETCHING} from "../appState/contactsActionTypes";

export const ContactsContext = createContext();


export default function ContactsProvider(props){
    // useReducer hooks returns state and dispatch which are passed down as values from Providers
    // reducer and initialState are passed as props to the ContactsProvider
    let [state, dispatch] = useReducer(contactsReducer, initialContactState); 

    // second empty [] makes this effect behave as componentDidMount else it will also be called on componentDidUpdate and fetching data from api in every request.
    // shouldn't call fetching of all contacts when the  contacts provider component mount
    // this is moved to the component that is rendered on /contacts route
    // useEffect(() => {        
    //     dispatch({type:FETCHING});
    //     httpService.GET(`${API_BASE_URL}/contacts`, dispatch, FETCH_ALL_CONTACTS_SUCCESS);

    //   }, []);

    return (<ContactsContext.Provider value={{state, dispatch}}>
        {props.children}
    </ContactsContext.Provider>)
};

