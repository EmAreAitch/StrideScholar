import React from "react";
import FourPng from "~/assets/LandingPageImage/4.jpg"
const TestimonialSection = () => {
  return (
    <section className="w-full h-screen flex justify-between items-center p-10 bg-blue-100 ">
      {/* Overlapping Boxes */}
      <div className="relative flex-shrink-0">
        {/* Background White Box */}
        {/* Foreground Blue Box */}
        <div className="w-[45vw] h-[45vh] bg-blue-600 relative">
        <img className=" h-[45vh] w-[45vw] object-cover absolute top-10 left-10" src={FourPng} alt="image1" />

        </div>
      </div>

      {/* Testimonial Text */}
      <div className="ml-2.5 max-w-lg">
        <h2 className="text-5xl font-bold mb-4">Collaborate and Learn Together</h2>
        <p className="text-base font-medium mb-6">
        Stride Scholars is your ultimate course management platform for learners. Whether you're enrolled in courses on Udemy, Coursera, YouTube, or other learning platforms, we help you stay connected and organized.
        </p>
        <p className="text-sm font-medium text-gray-600 mb-6">
        Create study rooms with peers who are taking the same course, track your progress, and interact with fellow students in real-time. Stride Scholars enhances your learning journey by bringing structure and community to your online education experience.
        </p>
      </div>
    </section>
  );
};

export default TestimonialSection;
