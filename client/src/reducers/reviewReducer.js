import { REVIEW_LOADING, GET_REVIEWS } from '../actions/types';

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
    default:
      return state;
  }
}
