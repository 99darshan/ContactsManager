import { ERROR, FETCHING,LOGIN_SUCCESS } from "../appState/auhtActionTypes";
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
    console.log(loginRes);
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

const authService ={
    login,
} 

export default authService;