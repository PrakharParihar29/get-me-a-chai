"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { fetchuser, fetchpayments, initiate } from '@/actions/useraction'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const PaymentPage = ({ username }) => {
    const [paymentform, setpaymentform] = useState({
        name: "",
        amount: "",
        message: ""
    })

    const [currentUser, setCurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast('Thanks for your donation!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        router.push(`/${username}`)

    }, [])

    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setCurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
    }

    const pay = async (amount) => {

        //get thr order id
        let a = await initiate(amount, username, paymentform)
        let orderID = a.id

        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
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
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme="light"
            />
            <ToastContainer />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            {/* Cover Section */}
      <div className="relative w-full">
        <img className="object-cover w-full h-[250px] sm:h-[350px]" src={currentUser?.coverpic || "/cover.jpg"} alt="cover" />
        <div className="absolute left-1/2 bottom-[-60px] transform -translate-x-1/2 border-2 border-white rounded-full">
          <img className="rounded-full w-[100px] sm:w-[120px]" src={currentUser.profilepic || "/profile.png"} alt="profile" />
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col items-center gap-2 py-32 px-4 text-center">
        <div className="font-bold text-lg">@{username}</div>
        <div className="text-slate-400">Let&quot;s help {username} get a chai!</div>
        <div className="text-slate-400">
          {payments.length} Payments · ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
        </div>

        {/* Payment Section */}
        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mt-8">
          {/* Supporters */}
          <div className="w-full lg:w-1/2 bg-slate-900 rounded-lg p-5">
            <h2 className="text-lg font-bold mb-4">Top 10 Supporters</h2>
            <ul className="space-y-3">
              {payments.length === 0 && (
                <div className="text-slate-400">No supporters yet. Be the first one!</div>
              )}
              {payments.map((p, i) => (
                <li key={i} className="flex gap-3 items-center text-sm text-left">
                  <img width={33} src="/avatar.gif" alt="avatar" />
                  <span>
                    <span className="font-semibold">{p.name}</span> donated <span className="font-bold">₹{p.amount}</span> with a message: &quot;{p.message}&quot;
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Make Payment */}
          <div className="w-full lg:w-1/2 bg-slate-900 rounded-lg p-5">
            <h2 className="text-lg font-bold mb-4">Make a Payment</h2>
            <div className="flex flex-col gap-3 mt-2">
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                onChange={handleChange}
                value={paymentform.name}
                className="bg-slate-800 p-2 rounded-lg text-sm w-full"
              />
              <input
                type="text"
                placeholder="Enter Amount"
                name="amount"
                onChange={handleChange}
                value={paymentform.amount}
                className="bg-slate-800 p-2 rounded-lg text-sm w-full"
              />
              <textarea
                placeholder="Message to creator"
                name="message"
                onChange={handleChange}
                value={paymentform.message}
                className="bg-slate-800 p-2 rounded-lg text-sm w-full"
              />
              <button
                onClick={() => pay(Number.parseInt(paymentform.amount) * 100)}
                className="bg-blue-500 text-white p-2 rounded-lg disabled:cursor-not-allowed w-full"
                disabled={
                  paymentform.name.length < 3 ||
                  paymentform.message.length < 4 ||
                  paymentform.amount.length < 1
                }
              >
                Pay
              </button>
            </div>

            {/* Quick Pay Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 mt-5">
              {[10, 20, 30].map((amt) => (
                <button
                  key={amt}
                  className="bg-slate-800 p-3 rounded-lg text-sm disabled:cursor-not-allowed w-full sm:w-auto"
                  disabled={paymentform.name.length < 3 || paymentform.message.length < 4}
                  onClick={() => pay(amt * 100)}
                >
                  Pay ₹{amt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

        </>
    )
}

export default PaymentPage


{/* <div className="cover w-full relative">
                <img className='object-cover w-full h-[350]' src={currentUser?.coverpic || "/cover.jpg"} alt="" />
                <div className="pofile absolute left-[45%] bottom-[-20%] borderborder-white border-2 rounded-full">
                    <img className="rounded-full" width={120} src={currentUser.profilepic || "/profile.png"} alt="" />
                </div>
            </div>
            <div className="info flex justify-center items-center flex-col gap-2 py-24">
                <div className="font-bold text-lg ">@{username}</div>
                <div className='text-slate-400'>Lets help {username} get a chai !</div>
                <div className='text-slate-400'>{payments.length} Payments .   ₹{payments.reduce((a, b) => a + b.amount, 0)} raised</div>

                <div className="payment flex gap-3 w-[80%]">
                    <div className="supporters w-1/2 bg-slate-900 rounded-lg p-5">
                        <h2 className='text-lg font-bold'>Top 10 Supporters</h2>
                        <ul className='mx-5'>
                            {payments.length === 0 && <div className='text-slate-400'>No supporters yet. Be the first one!</div>}
                            {payments.map((p, i) => {
                                return <li key={i} className='my-2 flex gap-4 items-center '>
                                    <img width={33} src="avatar.gif" alt="" />
                                    <span>{p.name} donanted <span className='font-bold'>₹{p.amount}</span> with a message "{p.message}"</span>
                                </li>
                            })}
                        </ul>
                    </div>
                    <div className="makePayment w-1/2 bg-slate-900 rounded-lg p-5">
                        <h2 className='text-lg font-bold'>Make a Payment</h2>
                        <div className='flex flex-col gap-3 mt-5'>
                            <input type="text" placeholder='Enter Name' name='name' onChange={handleChange} value={paymentform.name} className='bg-slate-800 p-2 rounded-lg' />
                            <input type="text" placeholder='Enter Amount' name='amount' onChange={handleChange} value={paymentform.amount} className='bg-slate-800 p-2 rounded-lg' />
                            <textarea placeholder='Message to creator' name='message' onChange={handleChange} value={paymentform.message} className='bg-slate-800 p-2 rounded-lg' />
                            <button onClick={() => { pay(Number.parseInt(paymentform.amount) * 100) }} className=' cursor-pointer bg-blue-500 text-white p-2 rounded-lg disabled:cursor-no-drop' disabled={paymentform.name.length < 3 || paymentform.message.length < 4 || paymentform.amount.length < 1}>Pay</button>
                        </div>

                        <div className='flex flex-col md:flex-row gap-2 mt-5'>
                            <button className='bg-slate-800 p-3 rounded-lg disabled:cursor-no-drop' disabled={paymentform.name.length < 3 || paymentform.message.length < 4} onClick={() => pay(1000)}>Pay ₹10</button>
                            <button className='bg-slate-800 p-3 rounded-lg disabled:cursor-no-drop' disabled={paymentform.name.length < 3 || paymentform.message.length < 4} onClick={() => pay(2000)}>Pay ₹20</button>
                            <button className='bg-slate-800 p-3 rounded-lg disabled:cursor-no-drop' disabled={paymentform.name.length < 3 || paymentform.message.length < 4} onClick={() => pay(3000)}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div> */}