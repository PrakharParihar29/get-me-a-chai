"use client"
import React from 'react'
import { useState } from 'react'
import Script from 'next/script'
import { params } from 'next/navigation';
import { initiate } from '@/actions/useraction'

const PaymentPage = ({ username }) => {
    const [paymentform, setpaymentform] = useState({
        name: "",
        amount: "",
        message: ""
    })

    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const pay = async (amount) => {

        //get thr order id
        let a = await initiate(amount, username, paymentform)
        let orderID = a.id
        console.log(process.env.NEXT_PUBLIC_KEY_ID, process.env.NEXT_PUBLIC_KEY_SECRET, process.env.NEXT_PUBLIC_URL);
        
        var options = {
            "key": process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. 
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": `${process.env.NEXT_PUBLIC_URL}/tea.gif`, //A sample image url
            "order_id": orderID, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className="cover w-full relative">
                <img className='object-cover w-full h-[350]' src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxNjAwLCJ3ZSI6MX0%3D/18.gif?token-hash=mwdFkhfcK_xNSCIBXxKJdmxkF7AfAw8JXOtiRF3bT5I%3D&token-time=1754265600" alt="" />
                <div className="pofile absolute left-[45%] bottom-[-20%] borderborder-white border-2 rounded-full">
                    <img className="rounded-full" width={120} src="/profile.png" alt="" />
                </div>
            </div>
            <div className="info flex justify-center items-center flex-col gap-2 py-24">
                <div className="font-bold text-lg ">@{username}</div>
                <div className='text-slate-400'>Creating Animated art for VIT's</div>
                <div className='text-slate-400'>9,719 members . 82 Posts . $15,450/release</div>

                <div className="payment flex gap-3 w-[80%]">
                    <div className="supporters w-1/2 bg-slate-900 rounded-lg p-5">
                        <h2 className='text-lg font-bold'>Supporters</h2>
                        <ul className='mx-5'>
                            <li className='my-2 flex gap-4 items-center '> <img width={33} src="avatar.gif" alt="" /> <span>Shubham donanted <span className='font-bold'>$30</span> with a message "I  support you bro lots of ❤️"</span></li>
                            <li className='my-2 flex gap-4 items-center '> <img width={33} src="avatar.gif" alt="" /> <span>Shubham donanted <span className='font-bold'>$30</span> with a message "I  support you bro lots of ❤️"</span></li>
                            <li className='my-2 flex gap-4 items-center '> <img width={33} src="avatar.gif" alt="" /> <span>Shubham donanted <span className='font-bold'>$30</span> with a message "I  support you bro lots of ❤️"</span></li>
                            <li className='my-2 flex gap-4 items-center '> <img width={33} src="avatar.gif" alt="" /> <span>Shubham donanted <span className='font-bold'>$30</span> with a message "I  support you bro lots of ❤️"</span></li>
                        </ul>
                    </div>
                    <div className="makePayment w-1/2 bg-slate-900 rounded-lg p-5">
                        <h2 className='text-lg font-bold'>Make a Payment</h2>
                        <form className='flex flex-col gap-3 mt-5'>
                            <input type="text" placeholder='Enter Name' name='name' onChange={handleChange} value={paymentform.name} className='bg-slate-800 p-2 rounded-lg' />
                            <input type="text" placeholder='Enter Amount' name='amount' onChange={handleChange} value={paymentform.amount} className='bg-slate-800 p-2 rounded-lg' />
                            <textarea placeholder='Message to creator' name='message' onChange={handleChange} value={paymentform.message} className='bg-slate-800 p-2 rounded-lg' />
                            <button className=' cursor-pointer bg-blue-500 text-white p-2 rounded-lg'>Pay</button>
                        </form>
                        <div className='flex flex-col md:flex-row gap-2 mt-5'>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(1000)}>Pay ₹10</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(2000)}>Pay ₹20</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(3000)}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
