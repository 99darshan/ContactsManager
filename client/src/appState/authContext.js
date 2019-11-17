import React, {createContext, useEffect, useReducer} from 'react';
import {authReducer} from './authReducer';
import initialAuthState from "./authStore";
import authService from '../services/authService';


export const AuthContext = createContext();


export default function AuthProvider(props){

    // useReducer hooks returns state and dispatch which are passed down as values from Providers
    // reducer and initialState are passed as props to the ContactsProvider
    let [authState, authDispatch] = useReducer(authReducer, initialAuthState); 

    // TODO: if the jwt has expired or the any error occurs trigger logout and prompt user to re-login
    useEffect(() => {
            // Everytime th authcontext mounts we check if a vlaid jwt token exists in the local storage,
            // if it exists the user is still logged in, if the token expired or is tampered with logout the user
            authService.verifyJwtToken(authDispatch);
            //console.log(authState);
      }, []);
    return (<AuthContext.Provider value={{authState: authState, authDispatch: authDispatch}}>
        {props.children}
    </AuthContext.Provider>)
};

