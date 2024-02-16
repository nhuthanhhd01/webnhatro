import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

function RoomCard({ data }) {
  return (
    <div className='room'>
        <img 
            className='object-cover'
            src='https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2018/12/18/anh-phong-tro-1_1545126166.jpg'
            alt='card'
        />

        <div className='p-5 flex flex-col gap-3'>
            <div className='flex items-center gap-2'>
                <span className='badge'>Test</span>
            </div>

            <h2 className='product-title'>{data.title}</h2>

            <div className='flex '>
                <FaLocationDot className='mt-1' color='#0FB45F'/>
                <p className='ml-1 text-black'>{ data.address }</p>
            </div>

            <div className='flex place-content-between'>
                <div className='flex mt-2'>
                    {[...Array(5)].map((star, index) => {
                        return <FaStar key={index} size={14} color='#ffc107'/>;
                    })}
                </div>
                <span className='text-xl font-bold text-[#0FB45F]'>{data.price}đ</span>
            </div>

        </div>
    </div>
  )
}

export default RoomCard
