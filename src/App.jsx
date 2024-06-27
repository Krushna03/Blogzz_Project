import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet, useLocation } from 'react-router-dom'
import Spinner from './pages/Spin/Spinner'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/login') {
      setLoading(true);
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => 
      // setTimeout(() => {
      setLoading(false)
    // }, 3000) 
    )
   }
  }, [])
  

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
    }, 3000)
}, [])


  return !loading ? (
    <div className='pt-0 min-h-screen flex flex-wrap content-between bg-white px-5 lg:px-20'>
      <div className='w-full block'>
        <Header />
        <main>
         <Outlet />
        </main>
        {location.pathname === '/' && <Footer/>}
      </div>
    </div>
  ) : <Spinner />
  
}

export default App