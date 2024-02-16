import React, { useState } from 'react'
import loginImg from '../../images/login-image.png'
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        '/api/auth/login',
        { email, password }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
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
          <h2 className='uppercase text-4xl text-white font-bold text-center'>Đăng nhập</h2>

          <div className='flex flex-col text-gray-400 py-2'>
              <label>Emnail của bạn</label>
              <input 
                className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus: bg-gray-800 focus:outline-none' 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
          </div>

          <div className='flex flex-col text-gray-400 py-2'>
              <label>Mật khẩu</label>
              <input 
                className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus: bg-gray-800 focus:outline-none' 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
          </div>  
          <div className='flex justify-between text-gray-400 py-2'>
              <p className='flex items-center'><input className='mr-2' type="checkbox" /> Ghi nhớ đăng nhập</p>
              <p className='cursor-pointer' onClick={() => { navigate("/forgot-password")}}>Quên mật khẩu</p>
          </div>
          <button className='w-full my-5 py-2 bg-teal-500 shadow-lg'>Đăng nhập</button>

        </form>
      </div>
    </div>
    </Layout> 
  )
}

export default Login
