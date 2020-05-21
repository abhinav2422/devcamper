import axios from 'axios';

import { REVIEW_LOADING, GET_REVIEWS } from './types';

export const getReview = (id) => async (dispatch) => {
  dispatch({ type: REVIEW_LOADING });

  const reviews = await axios.get(`/api/v1/bootcamps/${id}/reviews`);
  dispatch({
    type: GET_REVIEWS,
    payload: reviews,
  });
};
