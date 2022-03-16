import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "../constants/user";

import userAPI from "../services/userAPI";

export function getAccountInfo(account) {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      const { data } = await userAPI.getAccountInfo(account);
      dispatch({ type: GET_USER_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: GET_USER_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
}

export function updateAccountInfo(account) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    try {
      const { data } = await userAPI.updateAccountInfo(account);
      dispatch({ type: UPDATE_USER_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
}
