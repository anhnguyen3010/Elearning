import {
  GET_COURSE_LIST_REQUEST,
  GET_COURSE_LIST_SUCCESS,
  GET_COURSE_LIST_FAILURE,
  ADD_COURSE_FAILURE,
  ADD_COURSE_REQUEST,
  ADD_COURSE_SUCCESS,
  DELETE_COURSE_FAILURE,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_SUCCESS,
  EDIT_COURSE_FAILURE,
  EDIT_COURSE_REQUEST,
  EDIT_COURSE_SUCCESS,
  GET_COURSE_FAILURE,
  GET_COURSE_REQUEST,
  GET_COURSE_SUCCESS,
  GET_COURSE_CATEGORY_REQUEST,
  GET_COURSE_CATEGORY_SUCCESS,
  GET_COURSE_CATEGORY_FAILURE,
} from "../constants/adminCourse";

const initialState = {
  courseUpdate: [],
  courseList: [],
  isLoading: false,
  error: null,
  categoryList: [],
};

function adminCourseReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COURSE_LIST_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }
    case GET_COURSE_LIST_SUCCESS: {
      return { ...state, isLoading: false, courseList: action.payload.data };
    }
    case GET_COURSE_LIST_FAILURE: {
      return {
        ...state,
        isLoading: true,
        error: action.payload.error,
      };
    }
    case GET_COURSE_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }
    case GET_COURSE_SUCCESS: {
      return { ...state, isLoading: false, courseUpdate: action.payload.data };
    }
    case GET_COURSE_FAILURE: {
      return { ...state, isLoading: true, error: action.payload.error };
    }
    case ADD_COURSE_SUCCESS: {
      return { ...state, isLoading: false, courseUpdate: action.payload.data };
    }
    case ADD_COURSE_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }
    case ADD_COURSE_FAILURE: {
      return { ...state, isLoading: false, error: action.payload.error };
    }
    case EDIT_COURSE_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }
    case EDIT_COURSE_SUCCESS: {
      return { ...state, isLoading: false, error: null };
    }
    case EDIT_COURSE_FAILURE: {
      return { ...state, isLoading: false, error: action.payload.error };
    }
    case DELETE_COURSE_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }
    case DELETE_COURSE_SUCCESS: {
      return { ...state, isLoading: false, error: null };
    }
    case DELETE_COURSE_FAILURE: {
      return { ...state, isLoading: false, error: action.payload.error };
    }
    case GET_COURSE_CATEGORY_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }
    case GET_COURSE_CATEGORY_SUCCESS: {
      return { ...state, isLoading: false, categoryList: action.payload.data };
    }
    case GET_COURSE_CATEGORY_FAILURE: {
      return { ...state, isLoading: true, error: action.payload.error };
    }
    default: {
      return state;
    }
  }
}
export default adminCourseReducer;
