import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function UserRoom() {
  const [auth, setAuth] = useAuth()
  const [rooms, setRooms] = useState([])
  const navigate = useNavigate()
  

  const getAllRooms = async () => {
    try {
      const { data } = await axios.get(`/api/room/user-list-room/${auth.user._id}`)
      setRooms(data.rooms)
    } catch (error) {
      console.log(error);
    }
  }

  //method
  useEffect(() => {
    getAllRooms();
  }, [])

  // Delete a room
  const handleDelete = async (id) => {
    try {
      let answer = window.prompt("Bạn có chắc muốn xóa phòng trọ này không ? ");
      if (!answer) return;
      const { data } = await axios.put(
        `/api/room/delete-room/${auth.user.email}/${id}`
      );
      toast.success("Xóa phòng trọ thành công");
      window.location.reload()
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <Layout title="Phòng trọ đã đăng">
      <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
        <UserMenu />
        <div className='p-4 w-4/6'>
          <div className='p-5 h-screen'>
            <h1 className='text-xl mb-2'>Danh sách phòng trọ đã đăng</h1>

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
                      <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg'>Active</span>
                    </td>
                    <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                      <button
                        className='p-1.5 text-xs font-medium tracking-wider text-white bg-[#28a745] hover:bg-[#218838] rounded-lg  mr-3'
                        onClick={() => navigate(`/dashboard/user/update-room/${room._id}`)}
                      >
                        Sửa
                      </button>
                      <button
                        className='p-1.5 text-xs font-medium  tracking-wider text-white bg-[#dc3545] hover:bg-[#c82333] rounded-lg '
                        onClick={() => handleDelete(room._id)}
                      >
                        Xóa
                      </button>
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

export default UserRoom
