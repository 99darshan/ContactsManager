import { ERROR, FETCHING,LOGIN_SUCCESS} from "../appState/auhtActionTypes";
import {API_BASE_URL} from "../constants/routeConstants";

async function login(fbResponse, authDispatch) {
  
  authDispatch({
    type: FETCHING
  });
  try {
    let loginResponse = await fetch(`${API_BASE_URL}/auth/facebook/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fbUserId: fbResponse.userID,
        accessToken: fbResponse.accessToken
      })
    });
    let loginRes = await loginResponse.json();
    // response will have a jwt token, save it to local storage, use it to make any other subsequent requests
    // TODO: expore if it would be better to store as a http cookie on the server??
    window.localStorage.setItem("contactsManagerJwt", loginRes.jwt);
    window.localStorage.setItem(
      "contactsManagerUserProfile",
      loginRes.user.profilePicture
    );
    window.localStorage.setItem("contactsManagerUserName", loginRes.user.name);
    // console.log(window.localStorage.getItem("contactsManagerUserProfile"));
    // console.log(window.localStorage.getItem("contactsManagerUserName"));

    authDispatch({
      type: LOGIN_SUCCESS,
      payload: { user: loginRes.user }
    });
    
  } catch (error) {
      authDispatch({
          type:ERROR,
          payload:{error}
      });

  }
}

async function verifyJwtToken(authDispatch){
    authDispatch({
        type: FETCHING
    });
    try {
        //console.log(`${API_BASE_URL}/auth/verify-jwt-token`);
        let verifyTokenResponse =await fetch(`${API_BASE_URL}/auth/verify-jwt-token`,{
            method: 'GET',
            headers:{
                "Content-Type": "application/json",
                'Authorization': `Bearer ${window.localStorage.getItem("contactsManagerJwt")}`
            }
        });
        // if 403 token is invalid or expired so delete the invalid jwt and dispatch the error action else dispatch sucess action
        
        if(verifyTokenResponse.status===403){
            let verifyTokenRes = await verifyTokenResponse.json();

            console.log(`403 , removing item`);
            window.localStorage.removeItem("contactsManagerJwt");
            authDispatch({
                type:ERROR,
                payload:{...verifyTokenRes}
            });
        }else{
            console.log('set loging success');
             let verTokenResJson = await verifyTokenResponse.json();
            //console.log(verTokenResJson);
            authDispatch({
                type:LOGIN_SUCCESS,
                payload:{...verTokenResJson}
                // payload:{user:{name:window.localStorage.getItem('contactsManagerUserName'), profilePicture:window.localStorage.getItem("contactsManagerUserProfile")}}
            });
        }
    } catch (error) {
        console.log(error);
        window.localStorage.removeItem("contactsManagerJwt");
            authDispatch({
                type:ERROR,
                payload:{error}
            });
    }
}

const authService ={
    login,
    verifyJwtToken
} 

export default authService;