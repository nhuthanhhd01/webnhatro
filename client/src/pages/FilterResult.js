import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Layout from '../components/Layout/Layout'
import { useParams } from 'react-router-dom'
import RoomCard from '../components/RoomCard'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function FilterResult() {
    const { district, option1, option2 } = useParams()
    const [rooms, setRooms] = useState([])

    const getListFilterRooms = async () => {
        const { data } = await axios.get(`/api/room/product-filter/${district}/${option1}/${option2}`)
        console.log(data)
        setRooms(data)
    }

    //method  
    useEffect(() => {
        getListFilterRooms()
    }, [])
    return (
        <Layout>
            {/* List Room  */}  
            <div className='list-room'>
                <h3 className='text-3xl font-medium leading-normal mb-5 mt-2'>Danh sách phòng trọ phù hợp với bạn</h3>
                <div className='flex place-content-between flex-wrap'>
                    {rooms.map((room, index) => (
                        <RoomCard key={index} data={room}/>
                    ))}
                </div>
            </div>

            {/* About  */}
            <div className='bg-[#0FB45F] flex'>
                <div className='w-[1200px] mx-auto flex'>
                <div className='w-[45%] flex flex-col mr-10 justify-center '>
                    <h4 className='text-4xl text-white font-bold leading-[1.3] mb-5'>Simplifying Your Search, Matching Your Needs with Ease!</h4>
                    <p className='mb-5 text-white text-base leading-[1.4] font-normal'>
                        Với PhongTroHN, bạn có thể duyệt qua hàng ngàn phòng trọ trên khắp khu vực, tùy chỉnh theo ngân sách, tiện nghi, và vị trí. Hệ thống tìm kiếm thông minh của chúng tôi giúp bạn nhanh chóng đáp ứng đúng nhu cầu của mình.
                    </p>
                    <p className='mb-5 text-white text-base leading-[1.4] font-normal'>
                        Hãy để PhongTroHN trở thành người bạn đồng hành đáng tin cậy của bạn trong hành trình tìm kiếm nơi ở mới. Tìm kiếm dễ dàng, chính xác, và thuận tiện.
                    </p>
                    <a href='/' className='text-lg font-medium text-white bg-gradient-to-l from-[#140C40] to-[#0e0835] py-[14px] px-[34px] inline-block rounded-3xl w-[190px] hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500'>
                        Tìm hiểu thêm
                    </a>
                </div>

                <div className='flex'>
                    <img 
                    src='/images/about_image.jpg' 
                    className='min-h-[580px] '
                    alt=""
                    />
                </div>
                </div>
            </div>
        </Layout>
    )
}

export default FilterResult
