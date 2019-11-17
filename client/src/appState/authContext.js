import React, {createContext, useEffect, useReducer} from 'react';
import {authReducer} from './authReducer';
import initialAuthState from "./authStore";
import { FETCHING, LOGIN_SUCCESS } from "../appState/auhtActionTypes";


export const AuthContext = createContext();


export default function AuthProvider(props){

    // useReducer hooks returns state and dispatch which are passed down as values from Providers
    // reducer and initialState are passed as props to the ContactsProvider
    let [authState, authDispatch] = useReducer(authReducer, initialAuthState); 

    // TODO: if the jwt has expired or the any error occurs trigger logout and prompt user to re-login
    useEffect(() => {
        // when Homepage mounts checks the local storage for jwt, if jwt exists user is assumed logged in
        const jwtToken = window.localStorage.getItem("contactsManagerJwt");
        const profilePic = window.localStorage.getItem(
          "contactsManagerUserProfile"
        );
        const userName = window.localStorage.getItem("contactsManagerUserName");
        if (jwtToken && profilePic && userName) {
            authDispatch({
            type: LOGIN_SUCCESS,
            payload: { user: { name: userName, profilePicture: profilePic } }
          });
        }
      }, []);
    return (<AuthContext.Provider value={{authState: authState, authDispatch: authDispatch}}>
        {props.children}
    </AuthContext.Provider>)
};

