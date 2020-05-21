import axios from 'axios';

import {
  REVIEW_LOADING,
  GET_REVIEWS,
  CREATE_REVIEW,
  CREATE_REVIEW_FAIL,
  DELETE_REVIEW,
} from './types';

import { getErrors } from './errorAction';
import { tokenConfig } from './authAction';

export const getReview = (id) => async (dispatch) => {
  dispatch({ type: REVIEW_LOADING });

  const reviews = await axios.get(`/api/v1/bootcamps/${id}/reviews`);
  dispatch({
    type: GET_REVIEWS,
    payload: reviews,
  });
};

export const createReview = ({ title, text, rating }, id) => async (
  dispatch,
  getState
) => {
  dispatch({ type: REVIEW_LOADING });

  const body = JSON.stringify({
    title,
    text,
    rating,
  });

  try {
    const review = await axios.post(
      `/api/v1/bootcamps/${id}/reviews`,
      body,
      tokenConfig(getState)
    );
    dispatch({
      type: CREATE_REVIEW,
      payload: review,
    });
  } catch (error) {
    dispatch(
      getErrors(
        error.response.data,
        error.response.status,
        'REVIEW_CREATE_ERROR'
      )
    );
    dispatch({
      type: CREATE_REVIEW_FAIL,
    });
  }
};

export const deleteReview = (id) => async (dispatch, getState) => {
  dispatch({ type: REVIEW_LOADING });

  await axios.delete(`/api/v1/reviews/${id}`, tokenConfig(getState));
  dispatch({
    type: DELETE_REVIEW,
    payload: id,
  });
};
