import * as types from './../types'

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  customers: [],
  imageUrl: ''
};

export default function reducerCustomer(state = initialState, action) {
  switch (action.type) {
    //GET CUSTOMER
    case `${types.GET_CUSTOMER}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.GET_CUSTOMER}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        customers: action.payload.data
      };

    case `${types.GET_CUSTOMER}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true
      };

      //ADD CUSTOMER
      case `${types.ADD_CUSTOMER}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.ADD_CUSTOMER}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };

    case `${types.ADD_CUSTOMER}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true
      };

      //EDIT CUSTOMER
      case `${types.EDIT_CUSTOMER}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.EDIT_CUSTOMER}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };

    case `${types.EDIT_CUSTOMER}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true
      };

       //UPLOAD IMAGE CUSTOMER
       case `${types.UPLOAD_IMAGE_CUSTOMER}_PENDING`:
        return {
          ...state,
          isLoading: true
        };
  
      case `${types.UPLOAD_IMAGE_CUSTOMER}_FULFILLED`:
        console.log('Reducer',action.payload.data)
        return {
          ...state,
          isLoading: false,
          isSuccess: true,
          imageUrl: action.payload.data.url
        };
  
      case `${types.UPLOAD_IMAGE_CUSTOMER}_REJECTED`:
        return {
          ...state,
          isLoading: false,
          isError: true
        };

        //DELETE CUSTOMER
       case `${types.DELETE_CUSTOMER}_PENDING`:
        return {
          ...state,
          isLoading: true
        };
  
      case `${types.DELETE_CUSTOMER}_FULFILLED`:
        console.log('Reducer',action.payload.data)
        return {
          ...state,
          isLoading: false,
          isSuccess: true,
          imageUrl: action.payload.data.url
        };
  
      case `${types.DELETE_CUSTOMER}_REJECTED`:
        return {
          ...state,
          isLoading: false,
          isError: true
        };

    default:
      return state;
  }
}