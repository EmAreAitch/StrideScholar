import React from "react";
import Header from "./components/Header.jsx";
import TestimonialSection from "./components/TestimonialSection.jsx";
import MainContent from "./components/MainContent.jsx";
import SectionThree from "./components/SectionThree.jsx";
import Footer from "./components/Footer.jsx";
import Marquee from "./components/marquee.jsx";
import { usePage } from "@inertiajs/react";
import logoPng from "~/assets/LandingPageImage/logo.png"

function App() {

  const {is_signed_in} = usePage().props
  return (
    <div className="App">       
      <title>Stride Scholars</title>
      <Header />
      <MainContent />
      <TestimonialSection />
     <Marquee/>
      <SectionThree />
      <Footer />
    </div>
  );
}

export default App;
