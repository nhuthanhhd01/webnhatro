import React, { useState, useEffect } from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import { Outlet } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from '../../context/auth'

function UpdateRoom() {
    const navigate = useNavigate()
    const [room, setRoom] = useState()
    const [title, setTitle] = useState()
    const [address, setAddress] = useState()
    const [price, setPrice] = useState()
    const [waterPrice, setWaterPrice] = useState()
    const [elecPrice, setElecPrice] = useState()
    const [description, setDescription] = useState()
    const [photo, setPhoto] = useState()
    const [oldPhoto, setOldPhoto] = useState()

    // Context Auth
    const [auth, setAuth] = useAuth()

    // Get data of select room
    const getSingleRoom = async () => {
        try {
            var url = window.location.pathname;
            var rid = url.substring(url.lastIndexOf('/') + 1);
            const { data } = await axios.get(
                `/api/room/get-room/${auth.user.email}/${rid}`
              );
          setRoom(data.rooms)
          setTitle(data.rooms[0].title)
          setAddress(data.rooms[0].address)
          setPrice(data.rooms[0].price)
          setWaterPrice(data.rooms[0].waterPrice)
          setElecPrice(data.rooms[0].elecPrice)
          setDescription(data.rooms[0].description)
          setOldPhoto(data.rooms[0].photo)
        } catch (error) {
          console.log(error);
        }
      }
    
      //method
      useEffect(() => {
        getSingleRoom();
      }, [])


    const handleCancelButton = () => {
        navigate('/dashboard/user/userroom')
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            var url = window.location.pathname;
            var rid = url.substring(url.lastIndexOf('/') + 1);
            const roomData = new FormData()
            roomData.append("title", title)
            roomData.append("address", address)
            roomData.append("price", price)
            roomData.append("waterPrice", waterPrice)
            roomData.append("elecPrice", elecPrice)
            roomData.append("description", description)
            if(!photo) {
                roomData.append("photo", oldPhoto)
            }
            else {
                roomData.append("photo", photo)
            }
            const { data } = axios.put(
                `/api/room/update-room/${auth.user._id}/${rid}`,
                roomData
              );
              if (data?.success) {
                toast.error(data?.message);
              } else {
                toast.success("Room Updated Successfully");
                window.location.href = '/dashboard/user/userroom';
              }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
    
  return (
    <Layout title="Đăng phòng trọ mới">
      <div className='flex flex-row bg-neutral-100 h-max w-screen overflow-hidden'>
        <UserMenu />
        <div className='p-4 '>
            <form>
                <h2 className="text-xl font-semibold leading-7 text-gray-900 pb-2">Sửa thông tin phòng trọ</h2>
                {/* Title */}
                <div className="sm:col-span-3 pb-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Tên phòng trọ</label>
                    <div className="mt-2">
                        <input 
                            type="text" 
                            value={title} 
                            placeholder='Nhập tên phòng trọ' 
                            onChange={(e) => setTitle(e.target.value)}
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
                            placeholder='Nhập địa chỉ phòng trọ' 
                            onChange={(e) => setAddress(e.target.value)}
                            className="block w-96 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="sm:col-span-3 pb-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Mô tả của phòng trọ</label>
                    <div className="mt-2">
                        <input 
                            type="text" 
                            value={description} 
                            placeholder='Nhập mô tả của phòng trọ' 
                            onChange={(e) => setDescription(e.target.value)}
                            className="block w-96 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                {/* Price */}
                <div className="sm:col-span-3 pb-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Giá của phòng trọ</label>
                    <div className="mt-2">
                        <input 
                            type="text" 
                            value={price} 
                            placeholder='Nhập giá của phòng trọ' 
                            onChange={(e) => setPrice(e.target.value)}
                            className="block w-96 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                {/* Water Price */}
                <div className="sm:col-span-3 pb-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Giá nước của phòng trọ</label>
                    <div className="mt-2">
                        <input 
                            type="text" 
                            value={waterPrice} 
                            placeholder='Nhập giá nước của phòng trọ' 
                            onChange={(e) => setWaterPrice(e.target.value)}
                            className="block w-96 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                {/* Elec Price */}
                <div className="sm:col-span-3 pb-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Giá điện của phòng trọ</label>
                    <div className="mt-2">
                        <input 
                            type="text" 
                            value={elecPrice} 
                            placeholder='Nhập giá điện của phòng trọ' 
                            onChange={(e) => setElecPrice(e.target.value)}
                            className="block w-96 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                {/* Image */}
                <div className="sm:col-span-3 pb-2 w-2/5">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Tải ảnh lên</label>
                    <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
    
                    />
                    {photo && (
                    <div className="text-center">
                        <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                        />
                    </div>
                    )}
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

export default UpdateRoom
