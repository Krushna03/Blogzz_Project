import React from 'react'
import {Container, Input, Logo, LogoutBtn, Button} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar';

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
    <header className=' py-3 shadow '>
      <Container>
        <nav className='flex'>
          <div className='mr-4 ml-4'>
            <Link to='/'>
               <Logo width='135px'   />
              </Link>
          </div>


          <div className='flex ml-4 pt-3.5'>
            <SearchBar authStatus={authStatus} />
          </div>
       
          <ul className='flex ml-auto'>
          
          {navItems.map((item) => 
             item.active ? (
               <li key={item.name}>
               
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-bock text-lg px-7 py-5 duration-200 hover:bg-gray-200 rounded-full text-zinc-950' >
                    {item.name}
                  </button>

               </li>
            ) : null
            )}

            {authStatus && (
              <li className='py-3 text-lg '>
                <LogoutBtn />
              </li>
            )}
              
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header