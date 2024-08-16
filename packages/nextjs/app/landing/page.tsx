"use client";

import { AboutSection } from "./_components/AboutSection";
import FAQ from "./_components/FAQ";
import { FeaturesSection } from "./_components/FeaturesSection";
import { Hero } from "./_components/Hero";
import type { NextPage } from "next";

const LandingPage: NextPage = () => {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <FAQ />
      <AboutSection />
    </>
  );
};

export default LandingPage;
