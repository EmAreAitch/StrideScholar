import React from "react";
import logoPng from "~/assets/LandingPageImage/logo.png"
import cs from "../Page.module.css"
import { Link } from '@inertiajs/react'
import { usersSessions, usersRegistrations} from '~/api'
import { usePage } from '@inertiajs/react'
import {dashboard} from "~/api"



const Header = () => {
  const {is_signed_in} = usePage().props
  return (
    <header className="flex justify-between items-center p-7 bg-white border-b relative">
      <nav className="flex">
      <div className="w-36 h-12 ml-[2vw] bg-white ">
        <img className="object-fit bottom-3 rounded-full cursor-pointer" src={logoPng} alt="Logo" />
        </div> {/* Logo placeholder */}
      </nav>
      <div className="flex space-x-4">
      {is_signed_in ? (<div>
        <Link className={" border border-black py-2 px-4"} method="delete" href={usersSessions.destroy.path()} as="button" type="button">Log Out</Link>
        <Link className={cs["background-animate"] +" bg-gradient-to-r from-violet-500 via-blue-500 to-blue-500 text-white py-2 px-4 shadow-lg shadow-indigo-500/50 ml-2"} href={dashboard.index.path()} as="button" type="button">Dashboard</Link>

        </div>) : (<div>
          <Link className="border border-black py-2 px-4" href={usersRegistrations.new.path()} as="button" type="button">Sign Up</Link>
          <Link className={cs["background-animate"] +" bg-gradient-to-r from-violet-500 via-blue-500 to-blue-500 text-white py-2 px-4 shadow-lg shadow-indigo-500/50 ml-2"} href={usersSessions.new.path()} as="button" type="button">Log In</Link>
       
        </div>)}
      
      </div>
    </header>
  );
};
export default Header;
