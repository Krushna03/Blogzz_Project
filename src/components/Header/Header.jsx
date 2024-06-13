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

         {/* <div className='flex ml-4 pt-3.5 '>
        {authStatus && (
          <Input 
            type='text'
            className='text-m duration-200 hover:bg-blue-100 rounded-full text-zinc-950 pr-40'
            placeholder='Search for the Blog'
          />   
        )}
        </div> */}

          <div className='flex ml-4 pt-3.5'>
            <SearchBar authStatus={authStatus} />
          </div>

        {/* <div className='pt-3.5'>
        {authStatus && (
          <button className='h-11 w-9 rounded-lg bg-gray-200 '> 
             <svg class="pl-1 w-8 h-7 text-black" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
             <path d="M10 2a8 8 0 105.293 14.707l5 5a1 1 0 001.414-1.414l-5-5A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
            </svg>
          </button>  
        )}
        </div> */}
       

          <ul className='flex ml-auto'>
          
          {navItems.map((item) => 
             item.active ? (
               <li key={item.name}>
               
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-bock text-lg px-7 py-5 duration-200 hover:bg-blue-100 rounded-full text-zinc-950' >
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