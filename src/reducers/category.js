import {
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,
} from "../constants/category";

const initialState = {
  category: [],
  isLoading: false,
  error: null,
};

function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY_REQUEST:
      return { ...state, isLoading: true, error: null };

    case GET_CATEGORY_SUCCESS:
      return { ...state, isLoading: false, category: action.payload.data };

    case GET_CATEGORY_FAILURE:
      return { ...state, isLoading: false, error: action.payload.error };

    default:
      return state;
  }
}

export default categoryReducer;
