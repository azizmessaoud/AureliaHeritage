import * as React from "react";
import { motion } from "framer-motion";

const stops = [
  { region: "Nabeul", craft: "Pottery & Ceramics", image: "@/assets/craft-pottery.jpg", text: "Where it begins and completes." },
  { region: "Kairouan", craft: "Traditional Weaving", image: "@/assets/craft-weaving.jpg", text: "Intricate patterns and looms." },
  { region: "Sfax", craft: "Copper & Metalwork", image: "@/assets/craft-copper.jpg", text: "Metal shaped by skilled hands." },
  { region: "Tozeur", craft: "Oasis Patterns & Crafts", image: "@/assets/craft-oasis.jpg", text: "Designs inspired by the desert." },
  { region: "Nabeul", craft: "The Circle Completes", image: "@/assets/craft-pottery.jpg", text: "Return and renewal." },
];

const reveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const JourneyTimeline: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold text-center mb-8">The Journey</h2>

        <div className="space-y-12">
          {stops.map((s, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row items-center gap-6"
              >
                {left ? (
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-serif text-[#E27A3F] font-bold">{s.region}</h3>
                    <p className="text-sm text-[#B45C36] font-medium">{s.craft}</p>
                    <p className="mt-3 text-muted-foreground">{s.text}</p>
                  </div>
                ) : null}

                <div className="md:w-1/2">
                  <div className="aspect-video overflow-hidden rounded-xl">
                    <img src={s.image} alt={s.region} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                  </div>
                </div>

                {!left ? (
                  <div className="md:w-1/2 md:order-first">
                    <h3 className="text-2xl font-serif text-[#E27A3F] font-bold">{s.region}</h3>
                    <p className="text-sm text-[#B45C36] font-medium">{s.craft}</p>
                    <p className="mt-3 text-muted-foreground">{s.text}</p>
                  </div>
                ) : null}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
