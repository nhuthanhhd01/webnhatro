import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { Outlet } from 'react-router-dom'
import axios from 'axios'

function Rooms() {
  const [rooms, setRooms] = useState([])

  const getAllRooms = async () => {
    try {
      const { data } = await axios.get("/api/room/get-rooms")
      setRooms(data)
    } catch (error) {
      console.log(error);
    }
  }

  //method
  useEffect(() => {
    getAllRooms();
    console.log(rooms)
  }, [])

  return (
    <Layout>
      <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
        <AdminMenu />
        <div className='p-4 w-4/6'>
          <div className='p-5 h-screen'>
            <h1 className='text-xl mb-2'>Danh sách phòng trọ</h1>

            <div className='overflow-auto rounded-lg shadow md:block'>
              <table className='w-full'>
                <thead className='bg-gray-50 border-b-2 border-gray-200'>
                <tr>
                  <th className='w-20 text-sm font-semibold tracking-wide text-left pl-2'>STT</th>
                  <th className='p-3 text-sm font-semibold tracking-wide text-left'>Tên phòng trọ</th>
                  <th className='w-24 text-sm font-semibold tracking-wide text-left pl-3'>Địa Chỉ</th>
                  <th className='w-24 text-sm font-semibold tracking-wide text-left pl-3'>Giá phòng</th>
                  <th className='w-24 text-sm font-semibold tracking-wide text-left pl-3'>Giá nước</th>
                  <th className='w-24 text-sm font-semibold tracking-wide text-left pl-3'>Giá điện</th>
                  <th className='p-3 text-sm font-semibold tracking-wide text-left'>Trạng thái</th>
                </tr>
                </thead>

                <tbody className='divide-y divide-gray-100'>
                {rooms.map((room,index) => (
                  <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} key={index}>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                      <a className='font-bold text-blue-500 hover:underline' href='#'>{index + 1}</a>
                    </td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{room.title}</td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{room.address}</td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{room.price}</td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{room.waterPrice}</td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{room.elecPrice}</td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                      <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50'>Active</span>
                    </td>
                  </tr>
                ))}
                
                </tbody>
              </table>
            </div>

          </div>

          <div><Outlet /></div>
        </div>
      </div>
    </Layout>
  )
}

export default Rooms
