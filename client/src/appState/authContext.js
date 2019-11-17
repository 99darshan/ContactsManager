import React, {createContext, useEffect, useReducer} from 'react';
import {authReducer} from './authReducer';
import initialAuthState from "./authStore";

export const AuthContext = createContext();


export default function AuthProvider(props){
    // useReducer hooks returns state and dispatch which are passed down as values from Providers
    // reducer and initialState are passed as props to the ContactsProvider
    let [state, dispatch] = useReducer(authReducer, initialAuthState); 

    return (<AuthContext.Provider value={{authState: state, dispatch}}>
        {props.children}
    </AuthContext.Provider>)
};

