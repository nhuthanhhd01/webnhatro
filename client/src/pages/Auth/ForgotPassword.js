import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import loginImg from '../../images/login-image.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [answer, setAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post(
            '/api/auth/forgot-password',
            { email, answer, newPassword }
          );
          if (res && res.data.success) {
            toast.success(res.data && res.data.message);
            navigate("/login");
          }
          else {
            toast.error(res.data.message)
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong!")
        }
      }
  return (
    <Layout title={'Forgot Password'}>
      <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
      <div className='hidden sm:block'>
        <img className='w-full h-full object-cover' src={loginImg} alt="" />
      </div>

      <div className='bg-gray-800 flex flex-col justify-center'>
        <form 
          className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg'
          onSubmit={handleSubmit}
        >
          <h2 className='uppercase text-3xl text-white font-bold text-center'>Quên mật khẩu</h2>

          <div className='flex flex-col text-gray-400 py-2'>
              <label>Email của bạn</label>
              <input 
                className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus: bg-gray-800 focus:outline-none' 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
          </div>

          <div className='flex flex-col text-gray-400 py-2'>
              <label>Trả lời câu hỏi bảo mật</label>
              <input 
                className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus: bg-gray-800 focus:outline-none' 
                type="text" 
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
          </div>  

          <div className='flex flex-col text-gray-400 py-2'>
              <label>Nhập mật khẩu mới</label>
              <input 
                className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus: bg-gray-800 focus:outline-none' 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
          </div>  
          <button className='w-full my-5 py-2 bg-teal-500 shadow-lg'>Đặt lại mật khẩu</button>

        </form>
      </div>
    </div>
    </Layout>
  )
}

export default ForgotPassword
