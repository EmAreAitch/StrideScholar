import { usePage } from '@inertiajs/react'
import { useEffect } from 'react'
import { Notyf } from 'notyf';
import { usersSessions } from '~/api';

import 'notyf/notyf.min.css';

export default function Layout({ children }) {
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
    <main>       
        {children}      
    </main>
  )
}