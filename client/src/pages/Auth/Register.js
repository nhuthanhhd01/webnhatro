import React, { useState } from 'react'
import loginImg from '../../images/login-image.png'
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        '/api/auth/register',
        { name, email, password, phone, address, answer }
      );
      if (res && res.data.success) {
        toast.success("Đăng ký thành công");
        navigate('/login');
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
      <div className='hidden sm:block'>
        <img className='w-full h-full object-cover' src={loginImg} alt="" />
      </div>

      <div className='bg-gray-800 flex flex-col justify-center'>
        <form 
          className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg'
          onSubmit={handleSubmit}
        >
          <h2 className='uppercase text-4xl text-white font-bold text-center'>register form</h2>

          <div className='flex flex-col text-gray-400 py-2'>
              <label>User name</label>
              <input 
                className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus: bg-gray-800 focus:outline-none' 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
          </div>

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
              <label>Your Phone Number</label>
              <input 
                className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus: bg-gray-800 focus:outline-none' 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
          </div>

          <div className='flex flex-col text-gray-400 py-2'>
              <label>Your Address</label>
              <input 
                className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus: bg-gray-800 focus:outline-none' 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
          </div>

          <div className='flex flex-col text-gray-400 py-2'>
              <label>Password</label>
              <input 
                className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus: bg-gray-800 focus:outline-none' 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
          </div> 

          <div className='flex flex-col text-gray-400 py-2'>
              <label>What is Your Favorite sports</label>
              <input 
                className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus: bg-gray-800 focus:outline-none' 
                type="textthangla" 
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
          </div>   
          <button className='w-full my-5 py-2 bg-teal-500 shadow-lg'>Sign In</button>

        </form>
      </div>
    </div>
    </Layout> 
  )
}

export default Register
