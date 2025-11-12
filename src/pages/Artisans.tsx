import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccommodationCard from "@/components/AccommodationCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import potteryImg from "@/assets/craft-pottery.jpg";
import weavingImg from "@/assets/craft-weaving.jpg";
import olivewoodImg from "@/assets/craft-olivewood.jpg";
import leatherImg from "@/assets/craft-leather.jpg";
import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const artisans = [
  {
    name: "Fatma Zahra",
    craft: "Pottery Artisan",
    region: "Nabeul",
    bio: "For over 30 years, Fatma has been shaping clay into beautiful terracotta pieces. Her work reflects the deep connection between earth and tradition.",
    image: potteryImg,
  },
  {
    name: "Mohamed Slim",
    craft: "Master Weaver",
    region: "Kairouan",
    bio: "Mohamed learned the art of weaving from his grandmother. Each pattern he creates tells a story of his family's heritage spanning five generations.",
    image: weavingImg,
  },
  {
    name: "Ahmed Ben Amor",
    craft: "Olivewood Carver",
    region: "Sfax",
    bio: "Working with ancient olive trees, Ahmed transforms wood into timeless pieces. His craft honors the connection between nature and artistry.",
    image: olivewoodImg,
  },
  {
    name: "Leila Ben Salah",
    craft: "Leather Artisan",
    region: "Tozeur",
    bio: "Leila's leather work combines traditional techniques with contemporary design. Each piece is a testament to her dedication and skill.",
    image: leatherImg,
  },
  {
    name: "Youssef Haddad",
    craft: "Pottery Master",
    region: "Nabeul",
    bio: "Youssef specializes in traditional Nabeuli pottery, keeping alive techniques that date back centuries in his coastal hometown.",
    image: potteryImg,
  },
  {
    name: "Amina Trabelsi",
    craft: "Textile Designer",
    region: "Kairouan",
    bio: "Amina creates stunning textiles using natural dyes and traditional patterns. Her work bridges the past and present beautifully.",
    image: weavingImg,
  },
];

const Artisans = () => {
  const [region, setRegion] = useState<string>("All");
  const [craftType, setCraftType] = useState<string>("All");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return artisans.filter((a) => {
      if (region !== "All" && a.region !== region) return false;
      if (craftType !== "All" && !a.craft.toLowerCase().includes(craftType.toLowerCase())) return false;
      return true;
    });
  }, [region, craftType]);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-6 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-4">Meet the Masters</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">Our Artisans</h1>
            <p className="text-xl text-muted-foreground">Behind every craft is a person, a story, and a legacy.</p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-muted">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-4">
          <div className="w-full md:w-1/3">
            <Select value={region} onValueChange={(v: string) => setRegion(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Nabeul">Nabeul</SelectItem>
                <SelectItem value="Kairouan">Kairouan</SelectItem>
                <SelectItem value="Sfax">Sfax</SelectItem>
                <SelectItem value="Tozeur">Tozeur</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-1/3">
            <Select value={craftType} onValueChange={(v: string) => setCraftType(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Craft Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Pottery">Pottery</SelectItem>
                <SelectItem value="Weaving">Weaving</SelectItem>
                <SelectItem value="Olivewood">Olivewood</SelectItem>
                <SelectItem value="Leather">Leather</SelectItem>
                <SelectItem value="Embroidery">Embroidery</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Artisans Grid */}
      <section className="py-8 bg-muted">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((artisan, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl overflow-hidden shadow-lg hover-lift cursor-pointer"
                onClick={() => setSelected(index)}
              >
                <div className="aspect-square overflow-hidden">
                  <img src={artisan.image} alt={artisan.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-serif font-bold mb-1">{artisan.name}</h3>
                    <p className="text-primary font-medium">{artisan.craft}</p>
                    <p className="text-sm text-muted-foreground">{artisan.region}</p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{artisan.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Accommodations Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">Stay Near Our Artisans</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete your heritage journey by staying in authentic accommodations near our artisans' workshops
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {filtered.slice(0, 3).map((artisan, index) => {
              // Sample nearby accommodations - in production, this would be fetched based on artisan location
              const nearbyAccommodations = [
                {
                  type: "maison-dhote" as const,
                  name: `Dar near ${artisan.name}`,
                  location: artisan.region,
                  rating: 4.7,
                  reviews: 28 + index * 5,
                  pricePerNight: 55 + index * 10,
                  amenities: ["Traditional Meals", "WiFi", "Parking"],
                  story: `Authentic guesthouse within walking distance of ${artisan.name}'s workshop.`,
                  rooms: 4 + index,
                  image: artisan.image,
                },
              ];

              return (
                <div key={index} className="space-y-4">
                  <div className="text-center mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Near {artisan.name}</p>
                    <h3 className="text-lg font-semibold">{artisan.region}</h3>
                  </div>
                  {nearbyAccommodations.map((acc, accIdx) => (
                    <AccommodationCard key={accIdx} {...acc} />
                  ))}
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link to="/accommodations">
              <Button size="lg" className="bg-[#E27A3F] hover:bg-[#E27A3F]/90">
                View All Accommodations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Dialog modal for details */}
      {selected !== null && (
        <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{artisans[selected].name}</DialogTitle>
              <DialogDescription>{artisans[selected].craft} — {artisans[selected].region}</DialogDescription>
            </DialogHeader>

            <div className="mt-4">
              <img src={artisans[selected].image} alt={artisans[selected].name} className="w-full h-80 object-cover rounded-md" />
              <p className="mt-4">{artisans[selected].bio}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Artisans;
