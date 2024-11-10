import React from "react";
import cs from "../Page.module.css"
import logoPng from "~/assets/LandingPageImage/logo.png"
import { Link } from '@inertiajs/react'
import { usersSessions, usersRegistrations} from '~/api'
const MainContent = () => {
  console.log(cs)
  return (
    
    <main className={cs["background-animate"] + " h-screen w-full flex gap-28 p-10 text-white bg-gradient-to-r from-violet-500 via-blue-500 to-blue-500"}>
      {/* Text Section */}
      <div className="max-w-lg mx-10 my-36">
        <h1 className="text-6xl font-bold mb-4">Welcome to,<br />Stride Scholars</h1>
        <p className="text-lg mb-6">
        Stride Scholar: A Self-Paced Learning Accelerator
        </p>
        <Link className="bg-black text-white py-3 px-6 shadow-xl shadow-indigo-800/50" href={usersRegistrations.new.path()} as="button" type="button">Start Learning Now</Link>
      </div>

      {/* Placeholder Window */}
      <div className="w-8/12 h-4/6 my-20 bg-gray-100 rounded-lg relative">
        <div className="absolute top-2 left-3 w-3 h-3 bg-red-500 rounded-full cursor-pointer">
        </div>
        <div className="absolute top-2 left-8 w-3 h-3 bg-green-500 rounded-full cursor-pointer"></div>
        <img className="my-10 w-full h-5/6" src="https://i.pinimg.com/originals/6e/8d/0b/6e8d0b94a946a0068a445e7a714edcf1.gif" alt="" />
      </div>
    </main>
    
  );
};

export default MainContent;
