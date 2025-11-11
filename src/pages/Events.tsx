import * as React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, MapPin, Users } from "lucide-react";

const events = [
  { title: "Pottery Revival Workshop", location: "Nabeul", date: "March 15, 2025", img: "@/assets/event-pottery.jpg", registered: 24, capacity: 30 },
  { title: "Weaving Masterclass", location: "Kairouan", date: "April 2025", img: "@/assets/event-weaving.jpg", registered: 12, capacity: 20 },
  { title: "Copper Works Exhibition", location: "Sfax", date: "May 2025", img: "@/assets/event-copper.jpg", registered: 40, capacity: 100 },
];

const Events: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-serif font-bold mb-6">Events & Workshops</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((e) => (
              <div key={e.title} className="bg-card rounded-lg overflow-hidden shadow hover:translate-y-[-4px] transition-transform">
                <div className="aspect-video overflow-hidden">
                  <img src={e.img} alt={e.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif text-lg font-bold">{e.title}</h3>
                    <span className="bg-[#E27A3F] text-white text-xs px-2 py-1 rounded">Workshop</span>
                  </div>

                  <div className="mt-3 text-sm text-muted-foreground space-y-2">
                    <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {e.date}</div>
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {e.location}</div>
                    <div className="flex items-center gap-2"><Users className="h-4 w-4" /> {e.registered}/{e.capacity} registered</div>
                  </div>

                  <p className="mt-3 text-sm">Join us to learn, practice and support the revival of traditional crafts.</p>

                  <button className="mt-4 bg-[#E27A3F] text-white px-4 py-2 rounded">Register Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
