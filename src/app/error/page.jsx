"use client"; 
import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


const Page = () => {

  const router = useRouter();

  const [message, setMessage] = useState('');


    setTimeout(() => {
      router.push(`/`);
    }, 3000); // Redirect after 2 seconds
  
  


  useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      setMessage(urlParams.get('message') || 'Something went wrong');
  }, []);
  return (
    <div className='bg-white w-full h-screen flex justify-center items-center'>
        <div className='flex flex-col gap-8 items-center custom-font'>
            <div>
                <img src='/errors.svg' className='w-40'/>
            </div>
            <div className=' flex flex-col '>
            <p className='text-[#00230F] text-center text-xl custom-font-bold'>
              {message}

            </p>
            <p className='text-[#9B9B9B] custom-font-bold text-lg text-center'>
              Please  try again
                               </p>
            </div>
        
        </div>
        


    </div>
  )
}

export default Page