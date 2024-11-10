import React from "react";
import Header from "./components/Header.jsx";
import TestimonialSection from "./components/TestimonialSection.jsx";
import MainContent from "./components/MainContent.jsx";
import SectionThree from "./components/SectionThree.jsx";
import Footer from "./components/Footer.jsx";
import { usePage } from "@inertiajs/react";
import logoPng from "~/assets/LandingPageImage/logo.png"
function App() {

  const {is_signed_in} = usePage().props
  return (
    <div className="App">
       <link rel="icon" className="w-full h-screen" href={usePage}></link>
      <title>Stride Scholars</title>
      <Header />
      <MainContent />
      <TestimonialSection />
      <SectionThree />
      <Footer />
    </div>
  );
}

export default App;
