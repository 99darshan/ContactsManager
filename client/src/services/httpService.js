import {ERROR} from '../appState/contactsActionTypes';
/**
 *
 * @param {string} url
 * @param {any} dispatch
 * @param {string} actionType
 * receives an url and a dispatch object and a action type
 * makes http Get requests and dispatches action to update the existing state once the request completes
 */
// TODO: send successActionType and FailureActionType makes this service modular and can be used by any other context
async function GET(url, dispatch, actionType) {
  try {
    let response = await fetch(url, { 
      method: 'GET', 
      headers:{
        'Authorization': `Bearer ${window.localStorage.getItem("contactsManagerJwt")}`
      }});
    if (response.status === 200) {
      let res = await response.json();
      dispatch({
        type: actionType,
        payload: { values: res.values }
      });
    } else {
      let res = await response.json();
      dispatch({
        type: ERROR,
        payload: { error:res.error }
      });
    }
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: { error }
    });
  }
}

async function POST(url, reqBody, dispatch, actionType) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${window.localStorage.getItem("contactsManagerJwt")}`
      },
      body: JSON.stringify(reqBody)
    });
    console.log('post status:' +  response.status);
    const res = await response.json();
    if (response.status === 200 || response.status === 201) {
      dispatch({
        type: actionType,
        payload: { values: res.values }
      });
    } else {
      console.log('dispatching error action....');
      dispatch({
        type: ERROR,
        payload: { error: res.error }
      });
    }
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: { error }
    });
  }
}

async function PUT(url, reqBody, dispatch, actionType) {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${window.localStorage.getItem("contactsManagerJwt")}`
      },
      body: JSON.stringify(reqBody)
    });
    if (response.status === 200 || response.status === 201) {
      const res = await response.json();
      console.log(res);
      dispatch({
        type: actionType,
        payload: {
          values: res.values,
        }
      });
    } else {
      let res = await response.json();

      dispatch({
        type: ERROR,
        payload: { error: res.error }
      });
    }
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: { error }
    });
  }
}

async function DELETE(url, dispatch, actionType, deleteResourceId) {
  console.log(deleteResourceId);
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${window.localStorage.getItem("contactsManagerJwt")}`
      }
    });
    if (response.status === 200) {
      let res = await response.json();
      dispatch({
        type: actionType,
        payload: {
          deleteResourceId: deleteResourceId,
          values: res.values
        }
      });
    } else {
      let res = await response.json();
      dispatch({
        type: ERROR,
        payload: { error: res.error }
      });
    }
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: { error }
    });
  }
}

const httpService = {
    GET,
    POST,
    PUT,
    DELETE
}

export default httpService;

