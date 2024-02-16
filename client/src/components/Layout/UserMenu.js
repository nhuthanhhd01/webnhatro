import React from 'react'
import { FcHome } from "react-icons/fc";
import { USER_NAV_LINKS } from '../../lib/consts/usernav';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames'

const linkClasses = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

export default function UserMenu() {
  return (
    <div className='bg-neutral-900 w-60 p-3 flex flex-col text-white'>
        <div className='flex items-center gap-2 px-1 py-3'>
            <FcHome fontSize={24} />
            <span className='text-neutral-100 text-lg'>PhongTroHN</span>
        </div>
        <div className='flex-1 py-8 flex flex-col gap-0.5'>
            {USER_NAV_LINKS.map((item) => (
                <SidebarLink key={item.key} item={item} />
            ))}
        </div>
    </div>
  )
}

function SidebarLink({ item }) {
    const { pathname } = useLocation()

    return (
        <Link to={item.path} className={classNames(pathname === item.path ? 'text-white bg-neutral-600' : 'text-neutral-400', linkClasses)}>
            <span className='text-xl pr-2'>{item.icon}</span>
            {item.label}
        </Link>
    )
}

