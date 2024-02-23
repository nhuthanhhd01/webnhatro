import React, {useEffect, useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AddReview() {
  const { email, rid } = useParams();
  return (
    <Layout>
        <div className='w-[1200px] mx-auto mt-10 flex items-start'>
            <h1 className='text-3xl font-medium leading-normal mb-5'>Thêm bình luận cho phòng trọ</h1>
        </div>
    </Layout>
        
  )
}

export default AddReview
