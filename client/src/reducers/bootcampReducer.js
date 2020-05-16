import { LOADING, GET_BOOTCAMPS, GET_BOOTCAMP } from '../actions/types';

const initialState = {
  bootcamps: [],
  bootcamp: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BOOTCAMPS:
      return {
        ...state,
        bootcamps: action.payload.data.data,
        loading: false,
      };
    case GET_BOOTCAMP:
      console.log(action.payload.data.data);

      return {
        ...state,
        bootcamp: action.payload.data.data,
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
