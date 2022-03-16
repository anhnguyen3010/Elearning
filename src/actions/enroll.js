import {
  ENROLL_REQUEST,
  ENROLL_SUCCESS,
  ENROLL_FAILURE,
  CANCEL_ENROLL_REQUEST,
  CANCEL_ENROLL_SUCCESS,
  CANCEL_ENROLL_FAILURE,
} from "src/constants/enroll";

import enrollAPI from "src/services/enrollAPI";

export function enrollCourse(values) {
  return async (dispatch) => {
    dispatch({ type: ENROLL_REQUEST });
    try {
      const { data } = await enrollAPI.enrollCourse(values);
      dispatch({ type: ENROLL_SUCCESS, payload: { data } });
      alert("Enroll course successfully");
    } catch (error) {
      dispatch({
        type: ENROLL_FAILURE,
        payload: { error: error.response.data },
      });
      alert("you've already enrolled this course");
    }
  };
}

export function cancelCourse(values) {
  return async (dispatch) => {
    dispatch({ type: CANCEL_ENROLL_REQUEST });
    try {
      const { data } = await enrollAPI.cancelCourse(values);
      dispatch({ type: CANCEL_ENROLL_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: CANCEL_ENROLL_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
}
