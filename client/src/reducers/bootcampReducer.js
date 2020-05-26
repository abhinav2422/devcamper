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
  GET_BOOTCAMPS_BY_DISTANCE,
  CLEAR_MESSAGE,
  GET_BOOTCAMPS_OF_USER,
  GET_BOOTCAMPS_OF_USER_FAIL,
} from '../actions/types';

const initialState = {
  bootcamps: [],
  pagination: {},
  bootcamp: {},
  message: '',
  toggleFilters: true,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BOOTCAMPS:
      return {
        ...state,
        toggleFilters: true,
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
    case GET_BOOTCAMPS_BY_DISTANCE:
      return {
        ...state,
        loading: false,
        toggleFilters: false,
        bootcamps: action.payload.data.data,
      };
    case GET_BOOTCAMPS_OF_USER:
      return {
        ...state,
        loading: false,
        bootcamps: action.payload.data.data,
      };
    case GET_BOOTCAMPS_OF_USER_FAIL:
      return {
        ...state,
        loading: false,
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
