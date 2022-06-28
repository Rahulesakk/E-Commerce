import React from 'react'
import { Routes,Route, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'



const UserRoute = ({ children, ...rest }) => {
    console.log(children,"adassasdasdas");
    const { user } = useSelector((state) => ({ ...state }))

    return user && user.token ? <Routes><Route {...rest} render={() => children} /></Routes> : <LoadingToRedirect/>
}

export default UserRoute