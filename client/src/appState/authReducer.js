import {FETCHING, LOGIN_SUCCESS, LOGOUT_SUCCESS,ERROR,JWT_VERIFICATION_COMPLETE} from './auhtActionTypes';
import initialAuthState from './authStore';
export const authReducer = (state, action) => {
  switch (action.type) {
    case FETCHING:
      return { ...state, isFetching: true };
    case LOGIN_SUCCESS:
        return {...state, user: action.payload.user, isLoggedIn:true, isFetching: false, hasError:false, error:{}}
    case LOGOUT_SUCCESS:
        return{...initialAuthState}
    case JWT_VERIFICATION_COMPLETE:
        return {...state, isJwtValid: action.payload.isJwtValid}
    case ERROR:
        return {isFetching:false, hasError: true, error:action.payload.error, isLoggedIn: false}
  }
};
