import React, {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';

function AddReview() {
  const navigate = useNavigate()
  const [auth, setAuth] = useAuth()
  const { email, rid } = useParams();
  const [content, setContent] = useState()
  const [star, setStar] = useState(1)

    const handleCancelButton = () => (
        navigate(`/room/${rid}`)
    )

    const handleCreate = (e) => {
        e.preventDefault()
        try {
            const reviewData = new FormData()
            const name = auth.user.name
            reviewData.append("name", name)
            reviewData.append("content", content)
            reviewData.append("star", star)
            console.log(star)
            const { data } = axios.put(
                `/api/room/add-review/${email}/${rid}`,
                reviewData
              );
              if (data?.success) {
                toast.error(data?.message);
              } else {
                toast.success("Review Created Successfully");
                navigate(`/room/${rid}`);
              }
        } catch (error) { 
            console.log(error)
            toast.error("Something went wrong")
        }
    }
  return (
    <Layout>
        <div className='w-[1200px] mx-auto mt-10 flex items-start flex-col'>
            <h1 className='text-3xl font-medium leading-normal mb-5'>Thêm bình luận cho phòng trọ</h1>
            <div className='mr-5 w-[46%]'>
                <img className='h-[400px] w-full object-cover' src={`/api/room/product-photo/${rid}`} alt="" />
            </div>
            <form className='mt-6 w-[600px]'>
                <h3 className='font-sans text-lg font-medium tracking-tight text-slate-900 sm:text-lg mb-1'>Nội dung đánh giá</h3>
                <textarea
                    value={content}
                    placeholder="Nhập nội dung đánh giá"
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-44 resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                ></textarea>

                <h3 className='font-sans text-lg font-medium tracking-tight text-slate-900 sm:text-lg mb-1 mt-2'>Đánh giá sao</h3>
                <select
                    onChange={e => setStar(e.target.value)}
                    className="block w-20 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                >
                    <option value='1'>1 Sao</option>
                    <option value='2'>2 Sao</option>
                    <option value='3'>3 Sao</option>
                    <option value='4'>4 Sao</option>
                    <option value='5'>5 Sao</option>
                </select >

                <div className="mt-6 flex items-center justify-center gap-x-6">
                    <button 
                        type="button" 
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={handleCancelButton}
                    >
                        Huỷ
                    </button>
                    <button onClick={handleCreate} type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Xác nhận</button>
                </div>
            </form>
        </div>
    </Layout>
        
  )
}

export default AddReview
