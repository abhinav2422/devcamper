import axios from 'axios';

import {
  LOADING,
  GET_BOOTCAMPS,
  GET_BOOTCAMP,
  CREATE_BOOTCAMP,
  CREATE_BOOTCAMP_FAIL,
} from './types';
import { getCourses } from './courseAction';
import { getErrors } from './errorAction';

export const getBootcamps = (filters) => async (dispatch) => {
  dispatch({ type: LOADING });

  var URL = '/api/v1/bootcamps?';
  Object.keys(filters).forEach((key) => {
    if (filters[key]) URL = URL + key + '=' + filters[key] + '&';
  });

  const bootcamps = await axios.get(URL);
  dispatch({
    type: GET_BOOTCAMPS,
    payload: bootcamps,
  });
};

export const getBootcamp = (id) => async (dispatch) => {
  dispatch({ type: LOADING });
  dispatch(getCourses(id));
  const bootcamp = await axios.get(`/api/v1/bootcamps/${id}`);
  dispatch({
    type: GET_BOOTCAMP,
    payload: bootcamp,
  });
};

export const createBootcamp = ({
  name,
  description,
  website,
  email,
  phone,
  address,
  careers,
  housing,
  jobAssistance,
  jobGuarantee,
}) => async (dispatch, getState) => {
  dispatch({ type: LOADING });

  const config = {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getState().auth.token,
    },
  };

  const body = JSON.stringify({
    name,
    description,
    website,
    email,
    phone,
    address,
    careers,
    housing,
    jobAssistance,
    jobGuarantee,
  });

  try {
    const bootcamp = await axios.post(`/api/v1/bootcamps`, body, config);
    dispatch({
      type: CREATE_BOOTCAMP,
      payload: bootcamp,
    });
  } catch (error) {
    dispatch(
      getErrors(
        error.response.data,
        error.response.status,
        'BOOTCAMP_CREATE_ERROR'
      )
    );
    dispatch({
      type: CREATE_BOOTCAMP_FAIL,
    });
  }
};
