import {
  REVIEW_LOADING,
  GET_REVIEWS,
  CREATE_REVIEW_FAIL,
  CREATE_REVIEW,
} from '../actions/types';

const initialState = {
  reviewLoading: false,
  reviews: [],
  review: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REVIEW_LOADING:
      return {
        ...state,
        reviewLoading: true,
      };
    case GET_REVIEWS:
      return {
        ...state,
        reviewLoading: false,
        reviews: action.payload.data.data,
      };
    case CREATE_REVIEW:
      return {
        ...state,
        reviewLoading: false,
        review: action.payload.data.data,
      };
    case CREATE_REVIEW_FAIL:
      return {
        ...state,
        reviewLoading: false,
      };
    default:
      return state;
  }
}
