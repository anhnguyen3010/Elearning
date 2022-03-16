import {
  GET_COURSE_DETAIL_REQUEST,
  GET_COURSE_DETAIL_SUCCESS,
  GET_COURSE_DETAIL_FAILURE,
  GET_COURSE_ENROLL_REQUEST,
  GET_COURSE_ENROLL_SUCCESS,
  GET_COURSE_ENROLL_FAILURE,
  ENROLL_REQUEST,
  ENROLL_SUCCESS,
  ENROLL_FAILURE,
  UN_ENROLL_REQUEST,
  UN_ENROLL_SUCCESS,
  UN_ENROLL_FAILURE,
} from "src/constants/course";

import courseAPI from "src/services/courseAPI";

export function getCourseDetail(courseId) {
  return async (dispatch) => {
    dispatch({ type: GET_COURSE_DETAIL_REQUEST });
    try {
      const { data } = await courseAPI.getCourseDetail(courseId);
      dispatch({ type: GET_COURSE_DETAIL_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: GET_COURSE_DETAIL_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
}

export function getCourseEnroll(values) {
  return async (dispatch) => {
    dispatch({ type: GET_COURSE_ENROLL_REQUEST });
    try {
      const { data } = await courseAPI.getCourseEnroll(values);
      dispatch({ type: GET_COURSE_ENROLL_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: GET_COURSE_ENROLL_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
}

export function enroll(values) {
  return async (dispatch) => {
    dispatch({ type: ENROLL_REQUEST });
    try {
      const { data } = await courseAPI.enroll(values);
      dispatch({ type: ENROLL_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: ENROLL_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
}

export function unEnroll(values) {
  return async (dispatch) => {
    dispatch({ type: UN_ENROLL_REQUEST });
    try {
      const { data } = await courseAPI.unEnroll(values);
      dispatch({ type: UN_ENROLL_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: UN_ENROLL_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
}
