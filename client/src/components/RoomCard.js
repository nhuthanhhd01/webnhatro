import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function RoomCard({ data }) {
    const navigate = useNavigate()
  return (
    <div 
        className='room'
        onClick={() => (navigate(`/room/${data._id}`))}
    >
        <img 
            className='object-cover w-[390px] h-[220px]'
            src={`/api/room/product-photo/${data._id}`}
            alt='card'
        />

        <div className='p-5 flex flex-col gap-3'>
            <div className='flex items-center gap-2'>
                <span className='bg-[#0FB45F] px-2 py-1 text-white rounded-[50px] text-xs'>{data.tag}</span>
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
