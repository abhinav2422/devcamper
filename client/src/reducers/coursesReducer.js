import { GET_COURSES } from '../actions/types';

const initialState = {
  courses: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload.data.data,
      };
    default:
      return state;
  }
}