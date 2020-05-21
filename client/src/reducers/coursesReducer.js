import {
  COURSE_LOADING,
  GET_COURSES,
  CREATE_COURSE,
  CREATE_COURSE_FAIL,
  DELETE_COURSE,
} from '../actions/types';

const initialState = {
  courseLoading: false,
  courses: [],
  course: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COURSE_LOADING:
      return {
        ...state,
        courseLoading: true,
      };
    case GET_COURSES:
      return {
        ...state,
        courseLoading: false,
        courses: action.payload.data.data,
      };
    case CREATE_COURSE:
      return {
        ...state,
        courseLoading: false,
        course: action.payload.data.data,
      };
    case CREATE_COURSE_FAIL:
      return {
        ...state,
        courseLoading: false,
      };
    case DELETE_COURSE:
      return {
        ...state,
        courseLoading: false,
        courses: state.courses.filter(
          (course) => course._id !== action.payload
        ),
      };
    default:
      return state;
  }
}
