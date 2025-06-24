import axios from 'axios'
import { useEffect, useState } from 'react'
import { Error, success } from './PopUp'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const token=localStorage.getItem('token')
    return token ? <Outlet /> : <Navigate to="/login" />

}

export default PrivateRoute