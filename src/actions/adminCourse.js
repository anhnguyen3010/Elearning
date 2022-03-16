import adminAPI from 'src/services/adminAPI';
import {
    GET_COURSE_LIST_REQUEST,
    GET_COURSE_LIST_FAILURE,
    GET_COURSE_LIST_SUCCESS,
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
    GET_COURSE_CATEGORY_FAILURE,
    GET_COURSE_CATEGORY_REQUEST,
    GET_COURSE_CATEGORY_SUCCESS,
    GET_ONE_CATEGORY_SUCCESS,
    GET_ONE_CATEGORY_REQUEST,
    GET_ONE_CATEGORY_FAILURE
} from '../constants/adminCourse';

export function getCourseList() {
    return async (dispatch) => {
        dispatch({type:GET_COURSE_LIST_REQUEST})
        try{
            const {data} = await adminAPI.getListCourses();
            dispatch({
                type:GET_COURSE_LIST_SUCCESS,
                payload: {data}
            })
        }catch(error){

            dispatch({
                type:GET_COURSE_LIST_FAILURE,
                payload:{ error:error.response.data }
            })
        }
    }
}

export function getOneCourse(courseId) {
    return async (dispatch) => {
        dispatch({type:GET_COURSE_REQUEST})
        try{
            const {data} = await adminAPI.getOneCourse(courseId);
            dispatch({
                type:GET_COURSE_SUCCESS,
                payload: {data},
            })
        }catch(error){
            alert(error.data)
            dispatch({
                type:GET_COURSE_FAILURE,
                payload:{error:error.response.data}
            })
        }
    }
}

export function addNewCourse(values) {
    return async (dispatch) => {
        dispatch({type:ADD_COURSE_REQUEST})
        try{
            let form_data = new FormData();
            for (let key in values) {
                form_data.append(key, values[key]);
            }
            const {data} = await adminAPI.addCourse(form_data);
            dispatch({
                type:ADD_COURSE_SUCCESS,
                payload: {data},
            })
            alert('Add Course Successfully');
        }catch(error){
            dispatch({
                type: ADD_COURSE_FAILURE,
                payload:{error: error.data}
            })
        }
    }
}

export function updateCourse(values) {
    return async (dispatch) => {
        dispatch({type: EDIT_COURSE_REQUEST})
        try{
            let form_data = new FormData();
            for (let key in values) {
                form_data.append(key, values[key]);
            }
            const {data} = await adminAPI.updateUser(form_data);
            alert('Update Course Successfully');

            dispatch({
                type:EDIT_COURSE_SUCCESS,
                payload: {data}
            })
        }catch(error){
            alert(error.data)

            dispatch({
                type: EDIT_COURSE_FAILURE,
                payload: {error:error.response.data}
            })
        }
    }
}

export function deleteCourse (courseId) {
    return async (dispatch) => {
        dispatch({type: DELETE_COURSE_REQUEST})
        try{
            const {data} = await adminAPI.deleteCourse(courseId);
            alert('Delete Course Successfully');

            dispatch({
                type:DELETE_COURSE_SUCCESS,
                payload: {data}
            })
        }catch(error){
            alert(error)
            console.log(error);
            dispatch({
                type: DELETE_COURSE_FAILURE,
                payload: {error:error.response.data}
            })
        }
    }
}

export function getAllCategories() {
    return async (dispatch) => {
        dispatch({type:GET_COURSE_CATEGORY_REQUEST})
        try{
            const {data} = await adminAPI.getCourseCategory();
            dispatch({
                type:GET_COURSE_CATEGORY_SUCCESS,
                payload: {data}
            })
        }catch(error){

            dispatch({
                type:GET_COURSE_CATEGORY_FAILURE,
                payload:{ error:error.response.data }
            })
        }
    }
}