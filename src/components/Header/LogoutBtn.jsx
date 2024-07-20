import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='inline-block text-lg px-7 py-5 duration-200 hover:bg-gray-200 rounded-full text-zinc-950'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn