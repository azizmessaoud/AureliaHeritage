import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImg from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const zoom = useTransform(scrollY, [0, 500], [1, 1.12]);
  const fade = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen overflow-hidden">
      <motion.div
        style={{ scale: zoom }}
        className="absolute inset-0 bg-center bg-cover"
        aria-hidden
      >
        <div
          className="w-full h-full bg-center bg-cover"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/50" />

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-cream text-[#FFF7ED] font-bold">From Nabeul to Nabeul</h1>
        <p className="mt-4 text-xl text-[#FFF7ED]/90">A Journey of Living Traditions</p>

        <div className="mt-8 flex gap-4">
          <Link to="/artisans">
            <Button className="bg-[#E27A3F]">Discover Artisans</Button>
          </Link>
          <Link to="/journey-map">
            <Button variant="outline">Explore the Journey</Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
