import * as React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const posts = [
  { title: "The Art of Nabeul Pottery", category: "Pottery", author: "Fatma Z.", date: "Mar 1, 2025", img: "@/assets/story-pottery.jpg", excerpt: "A deep dive into Nabeul's ceramics." },
  { title: "Weavers of Kairouan", category: "Weaving", author: "Amina T.", date: "Apr 8, 2025", img: "@/assets/story-weaving.jpg", excerpt: "The looms and the elders who tend them." },
  { title: "Sfax Copper Secrets", category: "Metalwork", author: "Mohamed S.", date: "May 3, 2025", img: "@/assets/story-copper.jpg", excerpt: "Forging tradition into modern pieces." },
  { title: "Oasis Patterns from Tozeur", category: "Carving", author: "Leila B.", date: "Jun 10, 2025", img: "@/assets/story-oasis.jpg", excerpt: "Designs born from desert life." },
];

const Stories: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-serif font-bold mb-8">Heritage Stories</h1>

          <div className="space-y-12">
            {posts.map((p, i) => {
              const left = i % 2 === 0;
              return (
                <motion.article key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row items-center gap-6">
                  {left && (
                    <div className="md:w-1/2">
                      <img src={p.img} alt={p.title} className="w-full rounded-lg object-cover h-64" />
                    </div>
                  )}

                  <div className="md:w-1/2">
                    <span className="inline-block bg-[#E27A3F] text-white px-3 py-1 rounded text-sm">{p.category}</span>
                    <h2 className="text-2xl font-serif font-bold mt-4">{p.title}</h2>
                    <p className="text-sm text-muted-foreground mt-2">{p.excerpt}</p>
                    <p className="text-xs text-muted-foreground mt-4">{p.author} — {p.date}</p>
                    <button className="mt-4 inline-block bg-[#E27A3F] text-white px-4 py-2 rounded">Read Full Story</button>
                  </div>

                  {!left && (
                    <div className="md:w-1/2">
                      <img src={p.img} alt={p.title} className="w-full rounded-lg object-cover h-64" />
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Stories;
