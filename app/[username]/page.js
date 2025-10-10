import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from 'next/navigation';
import connectDB from '@/db/connectDB';
import User from '@/models/User';

const Username = async({ params }) => {

// If the username is not present in the database, show a 404 page
  const checkUser = async () => {
    await connectDB()
    let u = await User.findOne({ username: params.username })
    if (!u) {
      return notFound()
    }
  }

  await checkUser()

  const { username } = await params;

  return (
    <>
      <PaymentPage username = {username} />
    </>
  )
}

export default Username

export async function generateMetadata({ params }) {
  return {
    title: `${params.username} - Get Me A Chai`,
  }
}