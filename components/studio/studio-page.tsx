"use client";
import Navigation from "@/components/common/navigation";
import Footer from "../layouts/footer";
import HeroSection from "./hero-section";
import OurTeam from "./team";
import Awards from "./awards";

const StudioPage = () => {
  return (
    <div>
      <Navigation />
      <HeroSection />
      <OurTeam />
      <Awards />
      <Footer />
    </div>
  );
};

export default StudioPage;
