import React from 'react'
import Layout from '../components/Layout/Layout'
import { ImPriceTags } from "react-icons/im";
import { MdElectricBolt, MdPlace, MdEmail } from "react-icons/md";
import { IoIosWater } from "react-icons/io";
import { FaFacebook, FaUser } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import { FaMessage } from "react-icons/fa6";

function RoomDetail() {
  return (
    <Layout>
        <div className='w-[1200px] mx-auto mt-10 flex items-start'>
            <div className='mr-5 w-[46%]'>
                <img className='h-full object-cover' src='/images/room.jpg' alt="" />
            </div>

            <div className='w-5/12'>
              <h3 className='font-sans text-2xl font-medium tracking-tight text-slate-900 sm:text-4xl mb-4'>Cho thuê nhà ngõ 124 Minh Khai </h3>

              <div className='flex mb-4'>
                <MdPlace size={22} color='red' className='mt-1.5'/>
                <p className='tracking-tight font-light font-sans text-2xl ml-2 font-normal'>12 Ngõ 211 Minh Khai</p>
              </div>

              <div className='flex mb-4'>
                <ImPriceTags size={22} color='#008000' className='mt-1.5'/>
                <p className='tracking-tight font-light font-sans text-2xl ml-2 font-normal'>Giá: 3500000 đ</p>
              </div>

              <h3 className='font-sans text-lg font-normal tracking-tight text-slate-900 sm:text-xl mb-4'>Phòng tầng 2 rộng tầm 35m2 có ban công khu nấu ăn riêng chỗ phơi đồ ngoài ban công cam an ninh 24/24 từng tầng</h3>

              <div className='mb-10'>
                <div className='flex mb-1'>
                  <MdElectricBolt size={20} color='#F5E04E' className='mt-1.5'/>
                  <p className='tracking-tight font-light font-sans text-xl ml-2 font-normal'>Giá điện: 3500đ / 1 số</p>
                </div>

                <div className='flex mb-4'>
                  <IoIosWater size={20} color='#376AD6' className='mt-1.5'/>
                  <p className='tracking-tight font-light font-sans text-xl ml-2 font-normal'>Giá nước: 18000đ / 1 khối</p>
                </div>
              </div>

              <div>
                <div className='flex'>
                  <FaUser size={30} className='mt-1.5 ml-2 mb-2'/>
                  <p className='tracking-tight font-sans text-xl ml-2 mb-2 font-medium mt-3.5'>Chủ nhà: Nguyễn Như Thành</p>
                </div>
                <p className='tracking-tight font-sans text-xl ml-2 mb-2 font-normal'>Liên hệ ngay bằng các cách liên hệ dưới đây:</p>
                <div className='flex ml-2'>
                  <div className='flex mb-1 mr-4'>
                    <FaFacebook size={30} color='#1877F2' className='mt-1.5'/>
                  </div>

                  <div className='flex mb-4 mr-4'>
                    <BsTelephoneFill size={30} className='mt-1.5'/>
                  </div>

                  <div className='flex mb-4 mr-4'>
                    <MdEmail size={32} color='#0090D2' className='mt-1.5'/>
                  </div>

                  <div className='flex mb-4'>
                    <FaMessage size={30} color='#1ebc3f' className='mt-1.5'/>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </Layout>
        
  )
}

export default RoomDetail
