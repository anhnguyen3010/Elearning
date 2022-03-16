import {
  GET_COURSE_DETAIL_REQUEST,
  GET_COURSE_DETAIL_SUCCESS,
  GET_COURSE_DETAIL_FAILURE,
  GET_COURSE_ENROLL_REQUEST,
  GET_COURSE_ENROLL_SUCCESS,
  GET_COURSE_ENROLL_FAILURE,
} from "src/constants/course";

const initialState = {
  course: [],
  isLoading: false,
  error: null,
};
function courseReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COURSE_DETAIL_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }
    case GET_COURSE_DETAIL_SUCCESS: {
      return { ...state, isLoading: false, course: action.payload.data };
    }
    case GET_COURSE_DETAIL_FAILURE: {
      return { ...state, isLoading: false, error: action.payload.error };
    }
    case GET_COURSE_ENROLL_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }
    case GET_COURSE_ENROLL_SUCCESS: {
      return { ...state, isLoading: false, course: action.payload.data };
    }
    case GET_COURSE_ENROLL_FAILURE: {
      return { ...state, isLoading: false, error: action.payload.error };
    }
    
    default:
      return state;
  }
}

export default courseReducer;
