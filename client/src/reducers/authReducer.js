import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  USER_LOADING,
  USER_LOADED,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  userLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        userLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        userLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        token: action.payload.token,
        isAuthenticated: true,
        userLoading: false,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        token: null,
        isAuthenticated: false,
        userLoading: false,
        user: null,
      };
    default:
      return state;
  }
}
