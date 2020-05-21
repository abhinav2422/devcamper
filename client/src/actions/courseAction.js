import axios from 'axios';

import {
  COURSE_LOADING,
  GET_COURSES,
  CREATE_COURSE,
  CREATE_COURSE_FAIL,
} from './types';

import { getErrors } from './errorAction';
import { tokenConfig } from './authAction';

export const getCourses = (id) => async (dispatch) => {
  const courses = await axios.get(`/api/v1/bootcamps/${id}/courses`);
  dispatch({
    type: GET_COURSES,
    payload: courses,
  });
};

export const createCourse = (
  { title, description, weeks, tuition, minimumSkill, scholarshipsAvailable },
  id
) => async (dispatch, getState) => {
  dispatch({ type: COURSE_LOADING });

  const body = JSON.stringify({
    title,
    description,
    weeks,
    tuition,
    minimumSkill,
    scholarshipsAvailable,
  });

  try {
    const course = await axios.post(
      `/api/v1/bootcamps/${id}/courses`,
      body,
      tokenConfig(getState)
    );
    dispatch({
      type: CREATE_COURSE,
      payload: course,
    });
  } catch (error) {
    dispatch(
      getErrors(
        error.response.data,
        error.response.status,
        'COURSE_CREATE_ERROR'
      )
    );
    dispatch({
      type: CREATE_COURSE_FAIL,
    });
  }
};
