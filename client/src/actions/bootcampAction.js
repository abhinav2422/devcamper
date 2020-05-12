import axios from 'axios';

import { LOADING, GET_BOOTCAMPS } from './types';

export const getBootcamps = () => async (dispatch) => {
  dispatch({ type: LOADING });
  const bootcamps = await axios.get('/api/v1/bootcamps');
  dispatch({
    type: GET_BOOTCAMPS,
    payload: bootcamps,
  });
};
