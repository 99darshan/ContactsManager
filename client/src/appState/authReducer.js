import {FETCHING, LOGIN_SUCCESS, LOGOUT_SUCCESS} from './auhtActionTypes';
import initialAuthState from './authStore';
export const authReducer = (state, action) => {
  switch (action.type) {
    case FETCHING:
      return { ...state, isFetching: true };
    case LOGIN_SUCCESS:
        return {...state, user: action.payload.user, isLoggedIn:true, isFetching: false, hasError:false, error:{}}
    case LOGOUT_SUCCESS:
        return{...initialAuthState}
  }
};
