import {
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,
} from "../constants/category";

import categoryAPI from "../services/categoryAPI";

export function getCategory() {
  console.log('getCategory')
  return async (dispatch) => {
    dispatch({ type: GET_CATEGORY_REQUEST });
    try {
      const { data } = await categoryAPI.getCategory();
      dispatch({ type: GET_CATEGORY_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: GET_CATEGORY_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
}
