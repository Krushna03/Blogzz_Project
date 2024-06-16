import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import { useState } from 'react';
import { useEffect } from 'react';


function Footer() {
    const [loading , setLoading] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
             setLoading(true)
         },3000)
         return () => clearTimeout(timer)
       }, [])

  return loading ? (
    <footer className="py-6 bg-gray-100 border-t-2 border-t-slate-300 mt-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="mb-4">
              <Logo width="100px" />
            </div>
            <p className="text-sm text-gray-600">
              &copy; Copyright 2023. All Rights Reserved by DevUI.
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">Links</h3>
            <ul>
              <li className="mb-2">
                <Link className="text-base text-gray-900 hover:text-gray-700 underline" to="/">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link className="text-base text-gray-900 hover:text-gray-700 underline" to="/all-posts">
                  All Posts
                </Link>
              </li>
              <li className="mb-2">
                <Link className="text-base text-gray-900 hover:text-gray-700 underline" to="/add-post">
                  Add Post
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">Legal</h3>
            <ul>
              <li className="mb-2">
                <Link className="text-base text-gray-900 hover:text-gray-700" to="">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li className="mb-2">
                <Link className="text-base text-gray-900 hover:text-gray-700" to="">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">Contact</h3>
            <ul>
              <li className="mb-2">
                <Link className="text-base text-gray-900 hover:text-gray-700" to="">
                  Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link className="text-base text-gray-900 hover:text-gray-700" to="">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  ): null
}

export default Footer;
