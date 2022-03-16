import {
  GET_COURSES_REQUEST,
  GET_COURSES_SUCCESS,
  GET_COURSES_FAILURE,
} from "../constants/courses";

import coursesAPI from "../services/coursesAPI";

export function getCoursesByCategory(category) {
  return async (dispatch) => {
    dispatch({ type: GET_COURSES_REQUEST });
    try {
      const { data } = await coursesAPI.getCoursesByCategory(category);
      dispatch({ type: GET_COURSES_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: GET_COURSES_FAILURE,
        payload: { error: error.data },
      });
    }
  };
}


export function getCoursesByEnroll(courseName){
  return async (dispatch) =>{
    dispatch({ type: GET_COURSES_REQUEST });
    try {
      const { data } = await coursesAPI.getCourseEnroll(courseName);
      dispatch({ type: GET_COURSES_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: GET_COURSES_FAILURE,
        payload: { error: error.data },
      });
    }
  }
}

export function getCourses() {
  return async (dispatch) => {
    dispatch({ type: GET_COURSES_REQUEST });
    try {
      const { data } = await coursesAPI.getCourses();
      dispatch({ type: GET_COURSES_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: GET_COURSES_FAILURE,
        payload: { error: error.data },
      });
    }
  };
}
