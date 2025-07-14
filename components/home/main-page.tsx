'use client'

import HeroSection from "./hero-section";

import React from 'react'
import Projects from "./projects";
import Services from "./service";
import Testimonials from "./testimonials";
import Footer from "../layouts/footer";

const MainPage = () => {
  return (
    <main className="relative perspective-wrapper">
        <HeroSection />
        <Projects />
        <Services />
        <Testimonials />
        <Footer />
    </main>
  )
}

export default MainPage;

