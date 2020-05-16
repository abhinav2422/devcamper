import {
  LOADING,
  GET_BOOTCAMPS,
  GET_BOOTCAMP,
  CREATE_BOOTCAMP,
  CREATE_BOOTCAMP_FAIL,
} from '../actions/types';

const initialState = {
  bootcamps: [],
  pagination: {},
  bootcamp: {},
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
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
