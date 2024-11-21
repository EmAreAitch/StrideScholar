import React from 'react'
import { usePage } from '@inertiajs/react'
import { useEffect } from 'react'
import { Notyf } from 'notyf';
import { Link } from '@inertiajs/react'
import {inertiaExample, dashboard, usersSessions} from '~/api'

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
    <div className="flex h-screen bg-blue-100">
      <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
        <nav className="mt-5">
          <Link
            href={dashboard.index.path()}
            className="block py-2 px-4 text-gray-700 hover:bg-blue-200"
          >
            Dashboard Home
          </Link>
          <Link
            href={dashboard.newRoom.path()}
            className="block py-2 px-4 text-gray-700 hover:bg-blue-200"
          >
            Create New Room
          </Link>        
          <Link
            href={dashboard.explore.path()}
            className="block py-2 px-4 text-gray-700 hover:bg-blue-200"
          >
            Explore rooms
          </Link>     
          {/* Add more dashboard links as needed */}
        </nav>
        <div className="mb-5">
            <Link href={usersSessions.destroy.path()} className="text-blue-500 hover:underline block mx-auto" method="delete" as="button">Sign out</Link>
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