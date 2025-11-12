import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccommodationCard, { AccommodationType } from "@/components/AccommodationCard";
import GuideCard from "@/components/GuideCard";
import BundleCard from "@/components/BundleCard";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import potteryImg from "@/assets/craft-pottery.jpg";
import weavingImg from "@/assets/craft-weaving.jpg";

// Sample data - in production, this would come from an API
const maisonsDhote = [
  {
    type: "maison-dhote" as AccommodationType,
    name: "Dar Khaled",
    location: "Tozeur",
    rating: 4.8,
    reviews: 42,
    pricePerNight: 65,
    amenities: ["Hammam", "Courtyard", "WiFi", "Traditional Meals"],
    story: "Family-run for 30 years, Dar Khaled offers authentic desert hospitality in a beautifully restored traditional house.",
    rooms: 6,
    image: potteryImg,
  },
  {
    type: "maison-dhote" as AccommodationType,
    name: "Maison Ben Youssef",
    location: "Kairouan",
    rating: 4.9,
    reviews: 38,
    pricePerNight: 55,
    amenities: ["Hammam", "Rooftop Terrace", "WiFi", "Breakfast"],
    story: "Experience sacred Kairouan from a traditional family home, where every room tells a story of heritage.",
    rooms: 4,
    image: weavingImg,
  },
  {
    type: "maison-dhote" as AccommodationType,
    name: "Dar El Medina",
    location: "Nabeul",
    rating: 4.7,
    reviews: 56,
    pricePerNight: 70,
    amenities: ["Sea View", "Courtyard", "WiFi", "Parking", "Traditional Meals"],
    story: "A coastal gem where pottery traditions meet Mediterranean hospitality.",
    rooms: 8,
    image: potteryImg,
  },
];

const hotels = [
  {
    type: "hotel" as AccommodationType,
    name: "Heritage Boutique Hotel",
    location: "Sfax",
    rating: 4.6,
    reviews: 89,
    pricePerNight: 120,
    amenities: ["AC", "WiFi", "Parking", "Restaurant", "Spa"],
    rooms: 20,
    image: weavingImg,
  },
  {
    type: "hotel" as AccommodationType,
    name: "Oasis Heritage Resort",
    location: "Tozeur",
    rating: 4.5,
    reviews: 124,
    pricePerNight: 150,
    amenities: ["Pool", "AC", "WiFi", "Parking", "Restaurant", "Desert Tours"],
    rooms: 35,
    image: potteryImg,
  },
];

const campingSites = [
  {
    type: "camping" as AccommodationType,
    name: "Desert Stars Camp",
    location: "Douz",
    rating: 4.9,
    reviews: 67,
    pricePerNight: 45,
    amenities: ["Meals Included", "Campfire", "Parking", "Showers"],
    capacity: 20,
    isGlamping: true,
    image: weavingImg,
  },
  {
    type: "camping" as AccommodationType,
    name: "Traditional Bedouin Camp",
    location: "Tozeur",
    rating: 4.7,
    reviews: 43,
    pricePerNight: 35,
    amenities: ["Traditional Meals", "Camel Rides", "Parking"],
    capacity: 15,
    isGlamping: false,
    image: potteryImg,
  },
];

const guides = [
  {
    name: "Mohamed Ben Ali",
    languages: ["Arabic", "French", "English"],
    specialties: ["Desert Heritage", "Architecture", "Archaeology"],
    yearsExperience: 15,
    pricePerDay: 80,
    certification: "Guide Touristique Agréé",
    location: "Tozeur",
    rating: 4.9,
    reviews: 52,
    image: potteryImg,
  },
  {
    name: "Fatma Trabelsi",
    languages: ["Arabic", "French", "English", "German"],
    specialties: ["Cultural Heritage", "Artisan Workshops", "Traditional Crafts"],
    yearsExperience: 12,
    pricePerDay: 75,
    certification: "Guide Touristique Agréé",
    location: "Kairouan",
    rating: 4.8,
    reviews: 41,
    image: weavingImg,
  },
  {
    name: "Youssef Haddad",
    languages: ["Arabic", "French", "English", "Italian"],
    specialties: ["Coastal Heritage", "Maritime History", "Pottery Traditions"],
    yearsExperience: 18,
    pricePerDay: 85,
    certification: "Guide Touristique Agréé",
    location: "Nabeul",
    rating: 5.0,
    reviews: 68,
    image: potteryImg,
  },
];

const bundles = [
  {
    experience: "Visit Weaver's Workshop",
    accommodation: "Maison d'Hôte Dar Khaled",
    guide: "Mohamed Ben Ali",
    totalPrice: 250,
    duration: "2 days / 1 night",
    location: "Tozeur",
    groupSize: 4,
    image: weavingImg,
  },
  {
    experience: "Pottery Masterclass",
    accommodation: "Heritage Boutique Hotel",
    guide: "Youssef Haddad",
    totalPrice: 320,
    duration: "3 days / 2 nights",
    location: "Nabeul",
    groupSize: 6,
    image: potteryImg,
  },
];

const Accommodations = () => {
  const [region, setRegion] = useState<string>("All");
  const [accommodationType, setAccommodationType] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<string>("All");

  const filteredMaisons = useMemo(() => {
    return maisonsDhote.filter((item) => {
      if (region !== "All" && item.location !== region) return false;
      if (priceRange === "Budget" && item.pricePerNight > 60) return false;
      if (priceRange === "Mid" && (item.pricePerNight <= 60 || item.pricePerNight > 100)) return false;
      if (priceRange === "Luxury" && item.pricePerNight <= 100) return false;
      return true;
    });
  }, [region, priceRange]);

  const filteredHotels = useMemo(() => {
    return hotels.filter((item) => {
      if (region !== "All" && item.location !== region) return false;
      if (priceRange === "Budget" && item.pricePerNight > 100) return false;
      if (priceRange === "Mid" && (item.pricePerNight <= 100 || item.pricePerNight > 150)) return false;
      if (priceRange === "Luxury" && item.pricePerNight <= 150) return false;
      return true;
    });
  }, [region, priceRange]);

  const filteredCamping = useMemo(() => {
    return campingSites.filter((item) => {
      if (region !== "All" && item.location !== region) return false;
      return true;
    });
  }, [region]);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-4">
              Complete Your Journey
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">
              Where to Stay on Your Heritage Journey
            </h1>
            <p className="text-xl text-muted-foreground">
              From traditional guesthouses to certified guides, we connect you with authentic experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-muted border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:w-1/3">
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Regions</SelectItem>
                  <SelectItem value="Nabeul">Nabeul</SelectItem>
                  <SelectItem value="Kairouan">Kairouan</SelectItem>
                  <SelectItem value="Sfax">Sfax</SelectItem>
                  <SelectItem value="Tozeur">Tozeur</SelectItem>
                  <SelectItem value="Douz">Douz</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-1/3">
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Prices</SelectItem>
                  <SelectItem value="Budget">Budget (&lt; 60 TND)</SelectItem>
                  <SelectItem value="Mid">Mid (60-100 TND)</SelectItem>
                  <SelectItem value="Luxury">Luxury (&gt; 100 TND)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs for different accommodation types */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="maisons">Maisons d'Hôte</TabsTrigger>
              <TabsTrigger value="hotels">Hôtels</TabsTrigger>
              <TabsTrigger value="camping">Camping</TabsTrigger>
              <TabsTrigger value="guides">Guides</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-12">
              {/* Bundles Section */}
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-serif font-bold mb-4">Complete Packages</h2>
                  <p className="text-muted-foreground">
                    Experience + Accommodation + Guide bundles for a seamless journey
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                  {bundles.map((bundle, idx) => (
                    <BundleCard key={idx} {...bundle} />
                  ))}
                </div>
              </div>

              {/* Maisons d'Hôte */}
              <div>
                <h2 className="text-3xl font-serif font-bold mb-6">🏠 Maisons d'Hôte</h2>
                <p className="text-muted-foreground mb-6">
                  Traditional family-run guesthouses offering authentic local hospitality
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredMaisons.map((maison, idx) => (
                    <AccommodationCard key={idx} {...maison} />
                  ))}
                </div>
              </div>

              {/* Hotels */}
              <div>
                <h2 className="text-3xl font-serif font-bold mb-6">🏨 Boutique Hotels</h2>
                <p className="text-muted-foreground mb-6">
                  Heritage hotels combining comfort with cultural authenticity
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredHotels.map((hotel, idx) => (
                    <AccommodationCard key={idx} {...hotel} />
                  ))}
                </div>
              </div>

              {/* Camping */}
              <div>
                <h2 className="text-3xl font-serif font-bold mb-6">⛺ Camping & Glamping</h2>
                <p className="text-muted-foreground mb-6">
                  Authentic desert and rural camping experiences
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCamping.map((camp, idx) => (
                    <AccommodationCard key={idx} {...camp} />
                  ))}
                </div>
              </div>

              {/* Guides */}
              <div>
                <h2 className="text-3xl font-serif font-bold mb-6">👨‍🏫 Certified Tour Guides</h2>
                <p className="text-muted-foreground mb-6">
                  Professional guides specializing in heritage, culture, and authentic experiences
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {guides.map((guide, idx) => (
                    <GuideCard key={idx} {...guide} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="maisons">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMaisons.map((maison, idx) => (
                  <AccommodationCard key={idx} {...maison} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hotels">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredHotels.map((hotel, idx) => (
                  <AccommodationCard key={idx} {...hotel} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="camping">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCamping.map((camp, idx) => (
                  <AccommodationCard key={idx} {...camp} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="guides">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {guides.map((guide, idx) => (
                  <GuideCard key={idx} {...guide} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Customize Your Journey</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Need help building a multi-day itinerary? Our team can create a custom package combining
            experiences, accommodations, and guides tailored to your interests.
          </p>
          <Button size="lg" className="bg-[#E27A3F] hover:bg-[#E27A3F]/90">
            Contact Us to Build Your Package
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Accommodations;

