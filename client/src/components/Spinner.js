import React, { useState, useEffect} from 'react'
import RingLoader from "react-spinners/RingLoader";
import { useNavigate, useLocation } from 'react-router-dom'

function Spinner({ path = "login" }) {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((value) => --value );
    }, 1000);
    count === 0 && navigate(`/${path}`, {
      state: location.pathname,
    });
    return () => clearInterval(interval)
  }, [count, navigate, location, path])
  return (
    <div className='relative flex flex-col'>
      <RingLoader className='absolute top-60 left-2/4' color="rgba(0, 0, 0, 1)" size={100} />
      <p className='text-2xl font-medium text-center ml-24'>Redirecting to you in {count} second </p>
    </div>
  )
}

export default Spinner
