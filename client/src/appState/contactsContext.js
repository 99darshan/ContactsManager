import React, {createContext, useEffect, useReducer} from 'react';
//import {initialState} from "./contactsStore";
import {contactsReducer} from "./contactsReducer";
import {Get} from "../services/httpService";

export const ContactsContext = createContext();

// useReducer hooks returns state and dispatch which are passed down as values from Providers
// reducer and initialState are passed as props to the ContactsProvider
export default function ContactsProvider(props){
    // TODO: move initial state outside to the store
    let initialState = {contacts:[], isFetching: true, hasError: false}
    let [state, dispatch] = useReducer(contactsReducer, initialState); 

    // Fetch initialContacts array from the server TODO:
    // second empty [] makes this effect behave as componentDidMount else it will also be called on componentDidUpdate and fetching data from api in every request.
    // TODO: shoudl return a function, fix this,add loading and error to the state
    useEffect(() => {        
        // async function fetchData(){
        //     try {
        //         // TODO: port to base url, what if status code other than 200 or 500
        //         let response = await fetch('http://localhost:5000/contacts');
        //         if(response.status ===  200)
        //         {
        //             let res = await response.json();
        //             dispatch({
        //               type: "FETCH_ALL_CONTACTS",
        //               payload: {contacts: res.values, isFetching: false}
        //             });
                    
        //         }

        //         if(response.status === 500)
        //         {
        //             let res = await response.json();
        //             dispatch({
        //                 type:"ERROR",
        //                 payload:{res}
        //             })
        //         }
                
        //         //initialState = {...initialState, contacts:[...res], isFetching:false}
        //         //console.table(res);
        //         console.table(initialState);
                
        //     } catch (error) {
        //         console.log(error.message);
        //         dispatch({
        //             type:"ERROR",
        //             payload:{message: "Error Fetching Data From The Api"}
        //         })
        //     }
        // };

        //fetchData();
        Get('http://localhost:5000/contacts', dispatch);

        
      }, []);

    return (<ContactsContext.Provider value={{state, dispatch}}>
        {props.children}
    </ContactsContext.Provider>)
};

