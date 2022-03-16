import {
    GET_USER_LIST_REQUEST,
    GET_USER_LIST_SUCCESS,
    GET_USER_LIST_FAILURE,
    POST_USER_REQUEST,
    POST_USER_SUCCESS,
    POST_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    PUT_USER_REQUEST,
    PUT_USER_SUCCESS,
    PUT_USER_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    GET_TYPE_FAILURE,
    GET_TYPE_SUCCESS,
    GET_TYPE_REQUEST
} from "../constants/adminUser"

const initialState = {
    userUpdate:null,
    userList: [],
    isLoading: false,
    error: null,
    typeOfUser:[],
};

function adminUserReducer(state = initialState,action){
    switch(action.type){
//adminusers ListUser
        case GET_USER_LIST_REQUEST:{
            return {...state, 
                isLoading:true, 
                error: null};
        }
        case GET_USER_LIST_SUCCESS:{
            return {...state, 
                isLoading:false, 
                userList: action.payload.data,
            }
        }
        case GET_USER_LIST_FAILURE: {
            return{
                ...state,
                isLoading:false,
                error:action.payload.error,

            }
        }
        //tim kiem theo tên
        case GET_USER_REQUEST:{
            return{
                ...state,
                isLoading:true,
                error:null        
            }
        }
        case GET_USER_SUCCESS:{
            return{
                ...state,
                isLoading:false,
                userUpdate:action.payload,
            }
        }
        case GET_USER_FAILURE:{
            return{
                ...state,
                isLoading:false,
                error:action.payload.error,
            }
        }
        //add user
        case POST_USER_REQUEST:{
            return {...state,
            isLoading:true,
            error:null
            }
        }
        case POST_USER_SUCCESS:{
            return{
                ...state,
                isLoading: false,
            }
        }
        case POST_USER_FAILURE:{
            return{
                ...state,
                isLoading:false,
                error: action.payload.error,
            }
        }
        //update user
        case PUT_USER_REQUEST:{
            return {
                ...state,
                isLoading:true,
            }
        }
        case PUT_USER_SUCCESS:{
            return{
                ...state,
                isLoading: false,    
            }
        }
        case PUT_USER_FAILURE:{
            return{
                ...state,
                isLoading:false,
                error:action.payload.error,
            }
        }
        case DELETE_USER_REQUEST:{
            return{
                ...state,
                isLoading:true,
            }
        }
        case DELETE_USER_SUCCESS:{
            return{
            ...state,
            isLoading: false,
            }
        }
        case DELETE_USER_FAILURE:{
            return{
                ...state,
                isLoading:false,
                error: action.payload.error,
            }
        }
        //typeofuser
        case GET_TYPE_REQUEST:{
            return{
                ...state,
                isLoading:true,
                error:null        
            }
        }
        case GET_TYPE_SUCCESS:{
            return{
                ...state,
                isLoading:false,
                typeOfUser:action.payload.data,
            }
        }
        case GET_TYPE_FAILURE:{
            return{
                ...state,
                isLoading:false,
                error:action.payload.error,
            }
        }
        default:{
            return state
        }
    }
}
export default adminUserReducer;