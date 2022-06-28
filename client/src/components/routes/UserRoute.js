import React from 'react'
import { Navigate, Outlet, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'



const UserRoute = ({...rest }) => {
    const { user } = useSelector((state) => ({ ...state }))

    return user && user.token ? <Outlet/> : <LoadingToRedirect/>
}

export default UserRoute