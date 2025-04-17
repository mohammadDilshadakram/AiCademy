'use client'

import { db } from '@/configs/db';
import { USER_TABLE } from '@/configs/schema';
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'

function Upgrade() {


    const { user } = useUser();
    const [userDetail, setUserDetail] = useState()

    useEffect(() => {
        user && GetUserDetail()
    }, [user])


    const GetUserDetail = async () => {
        const result = await db.select().from(USER_TABLE)
            .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress))

        setUserDetail(result[0]);
    }




    const onCheckoutClick = async () => {
        const result = await axios.post('/api/payment/checkout', {
            priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY
        })

        console.log(result.data)
        window.open(result.data?.url)


    }


    const onPaymentManage = async () => {
        const result = await axios.post('/api/payment/manage-payment', {
            customerId: userDetail?.customerId
        })

        console.log(result.data)
    }




    return (

        <div class="flex flex-col min-h-screen pt-6 px-4 lg:pt-8 lg:px-10">
            <div class="w-full lg:w-3/4 mx-auto">
                <p class="text-[#00153B] text-lg lg:text-xl font-semibold mb-4 text-center">
                    Your Subscription
                </p>



                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-evenly">
                    <div key="1" class="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y">
                        <div class="pt-[15px] px-[25px] pb-[25px]">
                            <div class="flex justify-end">
                                <div class="bg-[#F6F6F7] rounded-full px-4 py-1">
                                    <p class="text-[#00153B] text-xs lg:text-sm font-bold">
                                        Starter
                                    </p>
                                </div>
                            </div>

                            <div class="mt-4">
                                <p class="text-[#00153B] text-lg lg:text-xl font-bold">
                                    Trial
                                </p>
                                <p class="text-[#00153B] text-4xl lg:text-5xl font-bold">
                                    Free
                                </p>
                            </div>

                            <div class="mt-4 space-y-2">
                                <p class="text-[#717F87] text-sm lg:text-base">
                                    5 Credits
                                </p>
                                <p class="text-[#717F87] text-sm lg:text-base">
                                    1 User
                                </p>
                            </div>
                        </div>

                        <div class="pt-[25px] px-[25px] pb-[35px]">
                           

                            <div class="mt-[25px]">
                                <button class="bg-[#E1E3E5] mt-6 rounded-lg py-2 px-6 text-white text-sm lg:text-base font-semibold">Starter Plan</button>
                            </div>
                        </div>
                    </div>



                    <div class="bg-white rounded-lg shadow-md border border-[#E1E3E5]">
                        <div class="p-6">
                            <div class="flex justify-end">
                                <div class="bg-[#F6F6F7] rounded-full px-4 py-1">
                                    <p class="text-[#00153B] text-xs lg:text-sm font-bold">Pro</p>
                                </div>
                            </div>
                            <div class="mt-4">
                                <p class="text-[#00153B] text-lg lg:text-xl font-bold">Premium</p>
                                <p class="text-[#00153B] text-4xl lg:text-5xl font-bold">$9</p>
                            </div>
                            <div class="mt-4 space-y-2">
                                <p class="text-[#717F87] text-sm lg:text-base">Unlimited Credits</p>
                                <p class="text-[#717F87] text-sm lg:text-base">Unlimited users</p>
                            </div>
                        </div>
                        <div class="p-6 border-t border-[#E1E3E5] space-y-2">
                           
                            <div class="mt-6">


                                {userDetail?.member == false
                                    ? <button
                                        onClick={onCheckoutClick}
                                        class="bg-[#006EF5] rounded-lg py-2 px-6 text-white text-sm lg:text-base font-semibold">
                                        Upgrade +
                                    </button>
                                    : <button
                                        onClick={onPaymentManage}
                                        class="bg-[#006EF5] rounded-lg py-2 px-6 text-white text-sm lg:text-base font-semibold">
                                        Manage Payment
                                    </button>

                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upgrade