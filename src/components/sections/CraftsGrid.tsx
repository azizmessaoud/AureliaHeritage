import * as React from "react";
import { motion } from "framer-motion";

const crafts = [
  { name: "Pottery", img: "@/assets/craft-pottery.jpg", desc: "Wheel-thrown ceramics from Nabeul" },
  { name: "Weaving", img: "@/assets/craft-weaving.jpg", desc: "Handloomed textiles" },
  { name: "Olivewood", img: "@/assets/craft-olivewood.jpg", desc: "Carved olivewood pieces" },
  { name: "Leather", img: "@/assets/craft-leather.jpg", desc: "Traditional leatherwork" },
  { name: "Embroidery", img: "@/assets/craft-embroidery.jpg", desc: "Delicate regional stitching" },
];

const CraftsGrid: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold text-center mb-8">Crafts & Techniques</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {crafts.map((c) => (
            <motion.div whileHover={{ scale: 1.02 }} key={c.name} className="bg-card rounded-xl overflow-hidden shadow-md">
              <div className="relative aspect-square overflow-hidden">
                <img src={c.img} alt={c.name} className="w-full h-full object-cover transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-serif text-lg font-bold">{c.name}</h3>
                    <p className="text-sm mt-1">{c.desc}</p>
                    <p className="text-xs mt-2 italic">Handcrafted with passion since generations</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CraftsGrid;
