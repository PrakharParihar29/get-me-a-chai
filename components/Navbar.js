"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import Search from './Search'

const Navbar = () => {

  const { data: session } = useSession();
  const [showdropdown, setShowdropdown] = useState(false);
  const router = useRouter();

  const handleSignOut = () => {
    signOut()
    router.push("/login")
  }

  return (
    <nav className='bg-gray-900 text-white flex justify-between items-center px-2 md:px-4 py-2 md:py-1'>
      <Link href="/" className="logo font-bold flex items-center justify-center gap-1 md:gap-2">
        <img className="w-6 md:w-[44px]" src="/tea.gif" alt="Chai Logo" />
        <span className="text-xs sm:text-sm md:text-lg whitespace-nowrap">Get me a chai</span>
      </Link>
      <div className='flex items-center gap-1 md:gap-3 relative'>
        <Search />

        {session && <div className="relative">
          <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" onBlur={() => { setTimeout(() => { setShowdropdown(false) }, 300); }} onClick={() => { setShowdropdown(!showdropdown) }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-2 py-1.5 md:px-5 md:py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{session.user?.name}<svg className="w-2 md:w-2.5 h-2 md:h-2.5 ms-1 md:ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
          </button>

          <div id="dropdown" className={`${showdropdown ? "" : "hidden"} absolute right-0 top-full mt-1 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
              </li>
              <li>
                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
              </li>
              <li>
                <Link href="#" onClick={() => { handleSignOut() }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
              </li>
            </ul>
          </div>
        </div>}

        {!session && <Link href={"/login"}>
          <button className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xs md:text-sm px-3 py-1.5 md:px-5 md:py-2.5 text-center">Login</button></Link>}
      </div>
    </nav>
  )
}

export default Navbar