import React, { useState } from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import { Outlet } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from '../../context/auth'

function NewRoom() {
    const districts = [" Quận Ba Đình", " Quận Cầu Giấy", "Quận Đống Đa", "Quận Hai Bà Trưng", "Quận Hoàn Kiếm", "Quận Thanh Xuân",
 "Quận Hoàng Mai", "Quận Long Biên", "Quận Hà Đông", "Quận Tây Hồ", "Quận Nam Từ Liêm", "Quận Bắc Từ Liêm"]
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [tag, setTag] = useState()
    const [address, setAddress] = useState('')
    const [price, setPrice] = useState('')
    const [waterPrice, setWaterPrice] = useState('')
    const [elecPrice, setElecPrice] = useState('')
    const [description, setDescription] = useState('')
    const [photo, setPhoto] = useState('')

    // Context Auth
    const [auth, setAuth] = useAuth()

    const handleCancelButton = () => {
        navigate('/dashboard/user')
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const roomData = new FormData()
            roomData.append("title", title)
            roomData.append("tag", tag)
            roomData.append("address", address)
            roomData.append("price", price)
            roomData.append("waterPrice", waterPrice)
            roomData.append("elecPrice", elecPrice)
            roomData.append("description", description)
            roomData.append("photo", photo)
            const { data } = axios.put(
                `/api/room/create-room/${auth.user._id}`,
                roomData
              );
              if (data?.success) {
                toast.error(data?.message);
              } else {
                toast.success("Room Created Successfully");
                navigate("/dashboard/user");
              }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    //handle select change
    const handleTagChange = (e) => (
        setTag(e.target.value)
    )
    
  return (
    <Layout title="Đăng phòng trọ mới">
      <div className='flex flex-row bg-neutral-100 h-full w-screen overflow-hidden'>
        <UserMenu />
        <div className='p-4 '>
            <form>
                <h2 class="text-xl font-semibold leading-7 text-gray-900 pb-2">Tạo phòng trọ mới</h2>
                {/* Title */}
                <div class="sm:col-span-3 pb-2">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Tên phòng trọ</label>
                    <div class="mt-2">
                        <input 
                            type="text" 
                            value={title} 
                            placeholder='Nhập tên phòng trọ' 
                            onChange={(e) => setTitle(e.target.value)}
                            class="block w-96 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                {/* Tag */}
                <div className="sm:col-span-3 pb-2">
                    <label className="block text-sm font-medium leading-6 text-gray-900">Địa chỉ của phòng trọ</label>
                    <div className="mt-2">
                    < select
                        onChange={e => handleTagChange(e)}
                        className="block w-96 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" >
                        {
                            districts.map((district, index) => <option key={index} value={district}>{district}</option>)
                        }
                        </select >
                    </div>
                </div>

                {/* Address */}
                <div class="sm:col-span-3 pb-2">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Địa chỉ của phòng trọ</label>
                    <div class="mt-2">
                        <input 
                            type="text" 
                            value={address} 
                            placeholder='Nhập địa chỉ phòng trọ' 
                            onChange={(e) => setAddress(e.target.value)}
                            class="block w-96 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                {/* Description */}
                <div class="sm:col-span-3 pb-2">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Mô tả của phòng trọ</label>
                    <div class="mt-2">
                        <input 
                            type="text" 
                            value={description} 
                            placeholder='Nhập mô tả của phòng trọ' 
                            onChange={(e) => setDescription(e.target.value)}
                            class="block w-96 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                {/* Price */}
                <div class="sm:col-span-3 pb-2">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Giá của phòng trọ</label>
                    <div class="mt-2">
                        <input 
                            type="text" 
                            value={price} 
                            placeholder='Nhập giá của phòng trọ' 
                            onChange={(e) => setPrice(e.target.value)}
                            class="block w-96 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                {/* Water Price */}
                <div class="sm:col-span-3 pb-2">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Giá nước của phòng trọ</label>
                    <div class="mt-2">
                        <input 
                            type="text" 
                            value={waterPrice} 
                            placeholder='Nhập giá nước của phòng trọ' 
                            onChange={(e) => setWaterPrice(e.target.value)}
                            class="block w-96 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                {/* Elec Price */}
                <div class="sm:col-span-3 pb-2">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Giá điện của phòng trọ</label>
                    <div class="mt-2">
                        <input 
                            type="text" 
                            value={elecPrice} 
                            placeholder='Nhập giá điện của phòng trọ' 
                            onChange={(e) => setElecPrice(e.target.value)}
                            class="block w-96 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                {/* Image */}
                <div class="sm:col-span-3 pb-2 w-2/5">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Tải ảnh lên</label>
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

                
                <div class="mt-6 flex items-center justify-center gap-x-6">
                    <button 
                        type="button" 
                        class="text-sm font-semibold leading-6 text-gray-900"
                        onClick={handleCancelButton}
                    >
                        Huỷ
                    </button>
                    <button onClick={handleCreate} type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Tạo</button>
                </div>
            </form>

          <div><Outlet /></div>
        </div>
      </div>
    </Layout>
  )
}

export default NewRoom
