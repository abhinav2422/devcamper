import axios from 'axios';

import {
  LOADING,
  GET_BOOTCAMPS,
  GET_BOOTCAMP,
  CREATE_BOOTCAMP,
  CREATE_BOOTCAMP_FAIL,
  DELETE_BOOTCAMP,
  UPDATE_BOOTCAMP,
  UPDATE_BOOTCAMP_FAIL,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_FAIL,
  GET_BOOTCAMPS_BY_DISTANCE,
  CLEAR_MESSAGE,
} from './types';
import { tokenConfig } from './authAction';
import { getCourses } from './courseAction';
import { getReview } from './reviewAction';
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
  dispatch(getReview(id));
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
    const bootcamp = await axios.post(
      `/api/v1/bootcamps`,
      body,
      tokenConfig(getState)
    );
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

export const updateBootcamp = (
  { name, description, website, email, phone, address },
  id
) => async (dispatch, getState) => {
  dispatch({ type: LOADING });

  const body = JSON.stringify({
    name,
    description,
    website,
    email,
    phone,
    address,
  });

  try {
    const bootcamp = await axios.put(
      `/api/v1/bootcamps/${id}`,
      body,
      tokenConfig(getState)
    );
    dispatch({
      type: UPDATE_BOOTCAMP,
      payload: bootcamp,
    });
  } catch (error) {
    dispatch(
      getErrors(
        error.response.data,
        error.response.status,
        'BOOTCAMP_UPDATE_ERROR'
      )
    );
    dispatch({
      type: UPDATE_BOOTCAMP_FAIL,
    });
  }
};

export const deleteBootcamp = (id) => async (dispatch, getState) => {
  dispatch({ type: LOADING });
  const config = {
    headers: {
      authorization: 'Bearer ' + getState().auth.token,
    },
  };

  await axios.delete(`/api/v1/bootcamps/${id}`, config);
  dispatch({
    type: DELETE_BOOTCAMP,
    payload: 'DELETE_SUCCESSFUL',
  });
};

export const uploadPhoto = (file, id) => async (dispatch, getState) => {
  dispatch({ type: LOADING });

  const data = new FormData();
  data.append('files', file);

  try {
    await axios.put(
      `/api/v1/bootcamps/${id}/photo`,
      data,
      tokenConfig(getState)
    );
    dispatch({
      type: UPLOAD_IMAGE,
      payload: 'UPLOAD_SUCCESSFUL',
    });
  } catch (error) {
    dispatch(
      getErrors(
        error.response.data,
        error.response.status,
        'UPLOAD_IMAGE_ERROR'
      )
    );
    dispatch({
      type: UPLOAD_IMAGE_FAIL,
      payload: 'UPLOAD_FAIL',
    });
  }
};

export const getBootcampsByRadius = (zipcode, distance) => async (dispatch) => {
  dispatch({ type: LOADING });
  const bootcamps = await axios.get(`/api/v1/bootcamps/${zipcode}/${distance}`);

  dispatch({
    type: GET_BOOTCAMPS_BY_DISTANCE,
    payload: bootcamps,
  });
};

export const clearMessage = () => {
  return {
    type: CLEAR_MESSAGE,
  };
};
