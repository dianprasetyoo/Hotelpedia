import * as types from './../types'

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  auth: []
};

export default function reducerRegister(state = initialState, action) {
  switch (action.type) {
    case `${types.REGISTER}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.REGISTER}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        auth: action.payload.data
      };

    case `${types.REGISTER}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
}