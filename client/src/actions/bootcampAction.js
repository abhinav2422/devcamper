import axios from 'axios';

import { LOADING, GET_BOOTCAMPS, GET_BOOTCAMP } from './types';
import { getCourses } from './courseAction';

export const getBootcamps = () => async (dispatch) => {
  dispatch({ type: LOADING });
  const bootcamps = await axios.get('/api/v1/bootcamps');
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
