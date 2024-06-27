import React, {useState} from 'react'
import {Container, Input, Logo, LogoutBtn, Button} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar';
import { FaBars } from 'react-icons/fa';

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!menuOpen);
  };

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
    <header className="py-3 shadow">
      <nav className="flex items-center justify-between px-2">
        <div>
          <Link to="/">
            <Logo width="120px"/>
          </Link>
        </div>
        <div className="flex items-center lg:ml-6">
          <div className="md:flex ml-2 pt-1 w-full">
            <SearchBar authStatus={authStatus} />
          </div>
          <button
            className="md:hidden text-2xl ml-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
          </button>
        </div>
        <ul className="hidden md:flex ml-auto">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className="inline-block text-lg px-7 py-5 duration-200 hover:bg-gray-200 rounded-full text-zinc-950"
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {authStatus && (
            <li className="py-3 text-lg">
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>

      {menuOpen && (
        <div className="lg:hidden">
          <ul className="flex flex-col items-start p-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="w-full">
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      setMenuOpen(false);
                    }}
                    className="block w-full text-lg px-7 py-5 duration-200 hover:bg-gray-200 rounded-full text-zinc-950"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li className='py-3 text-lg w-full'>
                <LogoutBtn />
              </li>
            )}

          </ul>
        </div>
      )}
    </header>
  )
}

export default Header