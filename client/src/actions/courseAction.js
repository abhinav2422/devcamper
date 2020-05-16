import axios from 'axios';

import { GET_COURSES } from './types';

export const getCourses = (id) => async (dispatch) => {
  const courses = await axios.get(`/api/v1/bootcamps/${id}/courses`);
  dispatch({
    type: GET_COURSES,
    payload: courses,
  });
};
