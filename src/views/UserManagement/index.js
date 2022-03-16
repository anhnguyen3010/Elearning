import React,{useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getListUser} from "../../actions/adminUser";
import { useLocation } from 'react-router-dom';

export default function UserManagement() {
    const {pathname} = useLocation()
    const dispatch = useDispatch();
    const {userList,isLoading,error} = useSelector(
        (state)=> state.admin
        );
    console.log(userList)
    useEffect(()=>{
        dispatch(getListUser());
    },[pathname])

    console.log(userList)
    return (
        <div>
            UserManagerment
        </div>
    )
}
