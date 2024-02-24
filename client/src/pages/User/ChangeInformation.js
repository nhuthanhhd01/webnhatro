import React, { useState, useEffect } from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import { Outlet } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from '../../context/auth'

function ChangeInformation() {
    const navigate = useNavigate()
    const [name, setName] = useState()
    const [address, setAddress] = useState()
    const [phone, setPhone] = useState()
    const [fbLink, setFbLink] = useState()

    const handleCancelButton = () => (
        navigate('/dashboard/user/userinfo')
    )

    const handleUpdate = () => (
        console.log('Update')
    )
  return (
    <Layout title="Cập nhật thông tin phòng trọ">
      <div className='flex flex-row bg-neutral-100 h-full w-screen overflow-hidden'>
        <UserMenu />
        <div className='p-4 '>
            <form>
                <h2 className="text-xl font-semibold leading-7 text-gray-900 pb-2">Sửa thông tin Người dùng</h2>
                {/* Name */}
                <div className="sm:col-span-3 pb-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900"></label>
                    <div className="mt-2">
                        <input 
                            type="text" 
                            value={name} 
                            placeholder='Nhập tên người dùng' 
                            onChange={(e) => setName(e.target.value)}
                            className="block w-96 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                {/* Address */}
                <div className="sm:col-span-3 pb-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Địa chỉ của phòng trọ</label>
                    <div className="mt-2">
                        <input 
                            type="text" 
                            value={address} 
                            placeholder='Nhập địa chỉ người dùng' 
                            onChange={(e) => setAddress(e.target.value)}
                            className="block w-96 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                {/* Phone */}
                <div className="sm:col-span-3 pb-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Mô tả của phòng trọ</label>
                    <div className="mt-2">
                        <input 
                            type="text" 
                            value={phone} 
                            placeholder='Nhập số điện thoại người dùng' 
                            onChange={(e) => setPhone(e.target.value)}
                            className="block w-96 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                {/* Facebook Link */}
                <div className="sm:col-span-3 pb-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Giá của phòng trọ</label>
                    <div className="mt-2">
                        <input 
                            type="text" 
                            value={fbLink} 
                            placeholder='Nhập link facebook' 
                            onChange={(e) => setFbLink(e.target.value)}
                            className="block w-96 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                
                <div className="mt-6 flex items-center justify-center gap-x-6">
                    <button 
                        type="button" 
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={handleCancelButton}
                    >
                        Cancel
                    </button>
                    <button onClick={handleUpdate} type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sửa</button>
                </div>
            </form>

          <div><Outlet /></div>
        </div>
      </div>
    </Layout>
  )
}

export default ChangeInformation
