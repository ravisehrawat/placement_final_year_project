import React from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Recruiters from "../components/Recruiters";
import Stats from "../components/Stats";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Recruiters />
      <Footer />
    </>
  );
};

export default Home;
