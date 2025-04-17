"use client"

import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function WelcomeBanner() {

    const user=useUser();
  return (
    <div className='p-5 bg-primary w-full text-white rounded-lg flex items-center gap-6'>
        <Image src={'/image1.jpg'} alt='laptop' width={100} height={100}/>
        <div>
            <h2 className='font-bold text-3xl'>Hell0, {user?.fullName}</h2>
            <p>welcome back, Its time to get back and start learning</p>
        </div>
    </div>
  )
}

export default WelcomeBanner

