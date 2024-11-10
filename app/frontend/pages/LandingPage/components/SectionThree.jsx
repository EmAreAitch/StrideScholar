import React from 'react';
import OnePng from "~/assets/LandingPageImage/1.png"
import TwoPng from "~/assets/LandingPageImage/2.png"
import ThreePng from "~/assets/LandingPageImage/3.png"
const SectionThree = () => {
  return (
    <div className="w-full h-screen bg-gray-100 py-16">
      <div className="text-center mb-20">
        <h2 className="text-6xl font-semibold mt-20">Key Features</h2>
        <p className="font-medium mt-4 font-semibold text-gray-600 max-w-2xl mx-auto">
        Learn at your own speed, anytime, anywhere
        </p>
      </div>

      {/* Flexbox container for the cards */}
      <div className="flex justify-center space-x-8">
        
        {/* First Card */}
        <div className="flex flex-col items-center w-64">
          <div className="w-full h-64 bg-blue-500 -rotate-90 overflow-hidden border-solid border-[1px] border-black">
            <img src={OnePng} alt="" />
          </div>
          <h3 className="mt-4 text-center text-xl font-medium">
          Monitor your learning journey with detailed analytics.
          </h3>
        
        </div>

        {/* Second Card */}
        <div className="flex flex-col items-center w-64">
          <div className="w-full h-64 bg-white border border-black overflow-hidden -rotate-90 border-solid border-[1px] border-black">
          {/* <img className='-rotate-90 object-contain' src="" alt="" /> */}
          <img src={TwoPng} alt="" />
          </div>
          <h3 className="mt-4 text-center text-xl font-medium">
          Connect and study with peers in real-time.
          </h3>
         
        </div>

        {/* Third Card */}
        <div className="flex flex-col items-center w-64">
          <div className="w-full h-64 bg-blue-100 overflow-hidden -rotate-90 border-solid border-[1px] border-black">
          <img className='bottom-0 absolute' src={ThreePng} alt="" />
          </div>
          <h3 className="mt-4 text-center text-xl font-medium">
          Easily share and access study materials within your group.
          </h3>
          
        </div>
      </div>
    </div>
  );
};

export default SectionThree;
