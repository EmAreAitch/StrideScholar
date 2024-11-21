import React from 'react'
import { usePage } from '@inertiajs/react'
import { useEffect } from 'react'
import { Notyf } from 'notyf';
import { Link } from '@inertiajs/react'
import {inertiaExample, dashboard, usersSessions} from '~/api'
// import logoPng from "~/assets/images/logo.png"

export default function DashboardLayout({ children }) {
  const { flash, is_signed_in } = usePage().props  
  useEffect(() => {
    const notyf = new Notyf();
    for (const type in flash) {
      switch(type) {
        case "alert":
          notyf.error(flash.alert)
          break;
        case "notice":
          notyf.success(flash.notice)
          break;
        default:
          alert(flash[type])
      }      
      delete flash[type]
    }

  })
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-72 bg-white shadow-md flex flex-col justify-between">
        {/* <div className='w-full bg-blue-500'>
        <img className="object-fit bottom-3 rounded-full cursor-pointer" src={logoPng} alt="Logo" />
        </div> */}
        <nav className="mt-5">
          <Link
            href={dashboard.index.path()}
            className="block py-4 px-4 mt-4 text-lg font-semibold text-gray-700 text-center hover:bg-blue-200"
          >
            Dashboard Home
          </Link>
          <Link
            href={dashboard.newRoom.path()}
            className="block py-4 px-4 text-lg font-semibold text-gray-700 text-center hover:bg-blue-200"
          >
            Create New Room
          </Link>        
          <Link
            href={dashboard.explore.path()}
            className="block py-4 px-4 text-lg font-semibold text-gray-700 text-center hover:bg-blue-200"
          >
            Explore rooms
          </Link>     
          {/* Add more dashboard links as needed */}
        </nav>
        <div className="mb-5">
            <Link href={usersSessions.destroy.path()} className="py-4 text-xl font-bold text-blue-600 hover:underline block mx-auto" method="delete" as="button">Sign out</Link>
        </div>
      </aside>
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}