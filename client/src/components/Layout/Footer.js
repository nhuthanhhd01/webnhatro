import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Footer() {
  return (
    <div className='flex flex-col items-center py-6'>
      <div className='flex'>
        <Link href="/#" className="-m-1.5 p-1.5">
          <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
        </Link>
        <Link to="/" className="text-gray-950 text-xl pt-1 pl-3">
          PhongTroHN
        </Link>
      </div>

      <div className='pt-3'>
        <ul className='flex'>
          <li>
            <NavLink to="/" className="text-base px-3 font-semibold leading-6 text-gray-950 hover:text-red-500">
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/" className="text-base px-3 font-semibold leading-6 text-gray-950 hover:text-red-500">
              About
            </NavLink>
          </li>

          <li>
            <NavLink to="/" className="text-base px-3 font-semibold leading-6 text-gray-950 hover:text-red-500">
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      <p className='text-gray-400 pt-3'>
          Copyright @2023 All rights reserved | This website is made by Black Tea
      </p>
    </div>
  )
}

export default Footer
