import { LOADING, GET_BOOTCAMPS } from '../actions/types';

const initialState = {
  bootcamps: [],
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
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
