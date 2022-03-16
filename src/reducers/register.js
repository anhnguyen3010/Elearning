import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../constants/auth";

const initialState = {
  user: [],
  registered: false,
  isLoading: false,
  error: null,
};

function registerReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, isLoading: true, registered: false, error: null };
    case REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        registered: true,
        user: action.payload.data,
      };
    }
    case REGISTER_FAILURE: {
      return { ...state, isLoading: false, error: action.payload.error };
    }

    default:
      return state;
  }
}

export default registerReducer;
