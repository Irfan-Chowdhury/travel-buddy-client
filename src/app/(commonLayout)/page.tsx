import { DestinationGrid } from "@/components/sections/DestinationGrid";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { TopTravelers } from "@/components/sections/TopTravelers";
import { TravelCategories } from "@/components/sections/TravelCategories";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <DestinationGrid />
      <HowItWorks />
      <TopTravelers />
      <TravelCategories />
      <Testimonials />
    </>
  );
}
