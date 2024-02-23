import React, {useEffect, useState} from 'react'
import Layout from '../components/Layout/Layout'
import { ImPriceTags } from "react-icons/im";
import { MdElectricBolt, MdPlace, MdEmail } from "react-icons/md";
import { IoIosWater } from "react-icons/io";
import { FaFacebook, FaUser } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import { FaMessage } from "react-icons/fa6";
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RoomDetail() {
  // Room Detail
  const [title, setTitle] = useState()
  const [address, setAddress] = useState()
  const [price, setPrice] = useState()
  const [description, setDescription] = useState()
  const [elecPrice, setElecPrice] = useState()
  const [waterPrice, setWaterPrice] = useState()
  const { rid } = useParams();

  // User Data
  const [ownerName, setOwnerName] = useState()
  const [ownerPhone, setOwnerPhone] = useState()
  const [ownerEmail, setOwnerEmail] = useState()

  //method
  useEffect(() => {
    if (rid) getDataRoomDetail(rid);
    if (rid) getDataRoomOwner(rid);
  }, [rid])

  // Get data user owner
  const getDataRoomOwner = async (rid) => {
    try {
        const dataRoomOwner = await axios.get(
            `/api/room/get-room-owner/${rid}`
        );
        const roomOwner = dataRoomOwner.data
        setOwnerName(roomOwner.name)
        setOwnerPhone(roomOwner.phone)
        setOwnerEmail(roomOwner.email)
    } catch (error) {
      console.log(error);
    }
  }

  // Get data detail of room
  const getDataRoomDetail = async (rid) => {
    try {
        const dataRoomDetail = await axios.get(
            `/api/room/get-room-detail/${rid}`
        );
        const roomDetail = dataRoomDetail.data[0]
        setTitle(roomDetail.title)
        setAddress(roomDetail.address)
        setPrice(roomDetail.price)
        setDescription(roomDetail.description)
        setElecPrice(roomDetail.elecPrice)
        setWaterPrice(roomDetail.waterPrice)
    } catch (error) {
      console.log(error);
    }
  }

  // Get room photo


  return (
    <Layout>
        <div className='w-[1200px] mx-auto mt-10 flex items-start'>
            <div className='mr-5 w-[46%]'>
                <img className='h-[550px] w-full object-cover' src={`/api/room/product-photo/${rid}`} alt="" />
            </div>

            <div className='w-5/12'>
              <h3 className='font-sans text-2xl font-medium tracking-tight text-slate-900 sm:text-4xl mb-4'>{title}</h3>

              <div className='flex mb-4'>
                <MdPlace size={22} color='red' className='mt-1.5'/>
                <p className='tracking-tight font-light font-sans text-2xl ml-2 font-normal'>{address}</p>
              </div>

              <div className='flex mb-4'>
                <ImPriceTags size={22} color='#008000' className='mt-1.5'/>
                <p className='tracking-tight font-light font-sans text-2xl ml-2 font-normal'>Giá: {price} đ</p>
              </div>

              <h3 className='font-sans text-lg font-normal tracking-tight text-slate-900 sm:text-xl mb-4'>{description}</h3>

              <div className='mb-10'>
                <div className='flex mb-1'>
                  <MdElectricBolt size={20} color='#F5E04E' className='mt-1.5'/>
                  <p className='tracking-tight font-light font-sans text-xl ml-2 font-normal'>Giá điện: {elecPrice}đ / 1 số</p>
                </div>

                <div className='flex mb-4'>
                  <IoIosWater size={20} color='#376AD6' className='mt-1.5'/>
                  <p className='tracking-tight font-light font-sans text-xl ml-2 font-normal'>Giá nước: {waterPrice}đ / 1 khối</p>
                </div>
              </div>

              <div>
                <div className='flex'>
                  <FaUser size={30} className='mt-1.5 ml-2 mb-2'/>
                  <p className='tracking-tight font-sans text-xl ml-2 mb-2 font-medium mt-3.5'>Chủ nhà: {ownerName}</p>
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
