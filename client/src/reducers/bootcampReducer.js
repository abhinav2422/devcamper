import {
  LOADING,
  GET_BOOTCAMPS,
  GET_BOOTCAMP,
  CREATE_BOOTCAMP,
  CREATE_BOOTCAMP_FAIL,
  DELETE_BOOTCAMP,
  UPDATE_BOOTCAMP,
  UPDATE_BOOTCAMP_FAIL,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_FAIL,
  CLEAR_MESSAGE,
} from '../actions/types';

const initialState = {
  bootcamps: [],
  pagination: {},
  bootcamp: {},
  message: '',
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BOOTCAMPS:
      return {
        ...state,
        bootcamps: action.payload.data.data,
        pagination: action.payload.data.pagination,
        loading: false,
      };
    case GET_BOOTCAMP:
      return {
        ...state,
        bootcamp: action.payload.data.data,
        loading: false,
      };
    case CREATE_BOOTCAMP:
      return {
        ...state,
        bootcamp: action.payload.data.data,
        loading: false,
      };
    case CREATE_BOOTCAMP_FAIL:
      return {
        ...state,
        loading: false,
      };
    case DELETE_BOOTCAMP:
      return {
        ...state,
        loading: false,
        bootcamp: {},
        message: action.payload,
      };
    case UPDATE_BOOTCAMP:
      return {
        ...state,
        loading: false,
        bootcamp: action.payload.data.data,
        message: 'UPDATE_SUCCESSFUL',
      };
    case UPDATE_BOOTCAMP_FAIL:
      return {
        ...state,
        loading: false,
      };
    case UPLOAD_IMAGE:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case UPLOAD_IMAGE_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: '',
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
