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
import { MdOutlineRateReview } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { FaStar } from 'react-icons/fa';


function RoomDetail() {
  const navigate = useNavigate()
  // Room Detail
  const [title, setTitle] = useState()
  const [address, setAddress] = useState()
  const [price, setPrice] = useState()
  const [description, setDescription] = useState()
  const [elecPrice, setElecPrice] = useState()
  const [waterPrice, setWaterPrice] = useState()
  const { rid } = useParams();
    // Get Reviews
  const [reviews, setReviews] = useState([])

  // User Data
  const [ownerName, setOwnerName] = useState()
  const [ownerPhone, setOwnerPhone] = useState()
  const [ownerEmail, setOwnerEmail] = useState()
  const [fbLink, setOwnerFbLink] = useState()

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
        const email = roomOwner.email
        console.log(email)
        setOwnerName(roomOwner.name)
        setOwnerPhone(roomOwner.phone)
        setOwnerFbLink(roomOwner.fbLink)
        setOwnerEmail(email)
        const reviewsData = await axios.get(
          `/api/room/get-reviews/${email}/${rid}`
        );
       setReviews(reviewsData.data)
       console.log(reviewsData.data)
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

  // // Get reviews
  // const getReviews = async () => {
  //     try {
  //         const reviewsData = await axios.get(
  //             `/api/room/get-reviews/${ownerPhone}/${rid}`
  //         );
  //         setReviews(reviewsData)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  // handle add review
  const handleAddReview = () => {
    navigate(`/review/${ownerEmail}/${rid}`)
  }


  return (
    <Layout>
        <div className='w-[1200px] mx-auto mt-10 mb-5 flex items-start'>
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
                    <a href={fbLink}>
                      <FaFacebook size={30} color='#1877F2' className='mt-1.5'/>
                    </a>
                  </div>

                  <div className='flex mb-4 mr-4'>
                    <a href={`tel:${ownerPhone}`}>
                      <BsTelephoneFill size={30} className='mt-1.5'/>
                    </a>
                  </div>

                  <div className='flex mb-4 mr-4'>
                  <a href={`mailto:${ownerEmail}`}>
                    <MdEmail size={32} color='#0090D2' className='mt-1.5'/>
                    </a>
                    
                  </div>

                  <div className='flex mb-4'>
                    <FaMessage size={30} color='#1ebc3f' className='mt-1.5'/>
                  </div>
                </div>
              </div>
            </div>
        </div>

        {/* Reviews */}
        <div className='w-[1200px] mx-auto'>
          <div className='flex'>
            <MdOutlineRateReview size={24}/>
            <h1 className='text-xl font-medium leading-normal mb-5 ml-2'>Đánh giá của phòng trọ</h1>
          </div>

          {/* List Reviews */}
          {reviews.map((review) => (
            <div class="flex items-center space-x-2 mb-3">
              <div class="flex flex-shrink-0 self-start cursor-pointer">
                <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="" class="h-12 w-12 object-fill rounded-full"/>
              </div>

              <div className="flex space-x-2">
                <div className="block">
                  <div className="bg-gray-100 w-auto rounded-xl px-2 pb-2">
                    <div className="font-medium ">
                      <a href="#" class="hover:underline text-lg">
                        <small>{review.reviewUser}</small>
                      </a>
                    </div>

                    <div className='flex '>
                      {
                        [...Array(5)].map((star, index) => {
                          const currentRate = index + 1
                          return (
                            <>
                              <label>
                                <FaStar 
                                  size={20} 
                                  color= {currentRate <= review.reviewStar ? '#F7BE00' : 'grey '}
                                />
                              </label>
                            </>
                          )
                        })
                      }
                    </div>
                     
                    <div className="text-sm mt-1">
                      {review.reviewContent}
                    </div>
                  </div>
                </div>
              </div>
            </div>
             
          ))}
          {/* Button add review */}
          <button 
            className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full mt-4'
            onClick={handleAddReview}
          >
            Thêm bình luận của bạn
          </button>
        </div>
    </Layout>
        
  )
}

export default RoomDetail
