import axios from 'axios';

import {
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
} from './types';

import { getErrors } from './errorAction';

export const getUser = () => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  try {
    const user = await axios.get('/api/v1/auth/me', tokenConfig(getState));

    dispatch({
      type: USER_LOADED,
      payload: user.data,
    });
  } catch (err) {
    dispatch(getErrors(err.response.data, err.response.status));
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const registerUser = ({ name, email, password, role }) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password, role });

  try {
    const res = await axios.post('/api/v1/auth/register', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(getUser());
  } catch (err) {
    dispatch(
      getErrors(err.response.data, err.response.status, 'REGISTRATION_FAIL')
    );
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = ({ email, password }, router) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/v1/auth/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(getUser());
  } catch (err) {
    dispatch(getErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  await axios.get('/api/v1/auth/logout');

  dispatch({
    type: LOGOUT_SUCCESS,
  });
};

const tokenConfig = (getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let token;
  if (getState().auth.token) {
    token = 'Bearer ' + getState().auth.token;
  }

  if (token) {
    config.headers['authorization'] = token;
  }

  return config;
};
