import React from "react";

import logoPng from "~/assets/LandingPageImage/logo.png"

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10">
    

      {/* Highlight Box */}
      <div className="border-t border-black w-10/12 mx-auto mt-5"></div>
      <div className="flex justify-center my-6">
      <img className="h-[20vh] w-[15vw] mix-blend-multiply  scale-75 cursor-pointer" src={logoPng} alt="Logo" />

      </div>

      {/* Divider Line */}
      <div className="border-t border-black w-10/12 mx-auto mt-5"></div>

      {/* Circles for Social Icons or Indicators */}
      <div className="flex justify-center space-x-8 my-6">
        <div className="w-10 h-10 border-2 border-black rounded-full"></div>
        <div className="w-10 h-10 border-2 border-black rounded-full"></div>
        <div className="w-10 h-10 border-2 border-black rounded-full"></div>
        <div className="w-10 h-10 border-2 border-black rounded-full"></div>
        <div className="w-10 h-10 border-2 border-black rounded-full"></div>
      </div>

      {/* Footer Bottom Text */}
      <div className="flex justify-center text-sm text-gray-700">
        <span>© Stride Scholars 2024 — 2025 </span>
        <span className="mx-2">|</span>
        <a href="#" className="hover:underline">Privacy</a>
        <span className="mx-2">—</span>
        <a href="#" className="hover:underline">Terms</a>
      </div>
    </footer>
  );
};

export default Footer;
