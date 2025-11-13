import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccommodationCard, { AccommodationType } from "@/components/AccommodationCard";
import GuideCard from "@/components/GuideCard";
import BundleCard from "@/components/BundleCard";
import { deepSearchWithFilters } from "@/lib/deepSearch";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Combine all accommodations for DeepSearch
  const allAccommodations = useMemo(() => {
    return [
      ...maisonsDhote.map(item => ({ 
        ...item, 
        id: `maison-${item.name}`,
        title: item.name, 
        description: item.story || "",
        type: "MAISON_DHOTE",
        price: item.pricePerNight * 100 // Convert to minor units
      })),
      ...hotels.map(item => ({ 
        ...item, 
        id: `hotel-${item.name}`,
        title: item.name,
        description: "",
        type: "HOTEL",
        price: item.pricePerNight * 100
      })),
      ...campingSites.map(item => ({ 
        ...item, 
        id: `camping-${item.name}`,
        title: item.name,
        description: "",
        type: "CAMPING",
        price: item.pricePerNight * 100
      })),
    ];
  }, []);

  // Apply DeepSearch with filters for Maisons
  const filteredMaisons = useMemo(() => {
    const priceFilter = priceRange === "Budget" 
      ? { minPrice: 0, maxPrice: 60 * 100 }
      : priceRange === "Mid"
      ? { minPrice: 60 * 100, maxPrice: 100 * 100 }
      : priceRange === "Luxury"
      ? { minPrice: 100 * 100, maxPrice: Infinity }
      : {};

    const filtered = deepSearchWithFilters(
      allAccommodations.filter(item => item.type === "MAISON_DHOTE"),
      searchQuery,
      {
        region: region !== "All" ? region : undefined,
        ...priceFilter
      },
      {
        threshold: 0.2,
        weights: { title: 3, location: 2, description: 1.5, tags: 1 }
      }
    );

    // Map back to AccommodationCard format
    return filtered.map((item: any) => {
      const original = maisonsDhote.find(m => m.name === item.title);
      return original || {
        type: "maison-dhote" as AccommodationType,
        name: item.title,
        location: item.location,
        rating: item.rating,
        reviews: item.reviews,
        pricePerNight: item.price / 100,
        amenities: item.amenities,
        story: item.description,
        rooms: item.rooms,
        image: item.image,
      };
    });
  }, [region, priceRange, searchQuery, allAccommodations]);

  const filteredHotels = useMemo(() => {
    const priceFilter = priceRange === "Budget" 
      ? { minPrice: 0, maxPrice: 100 * 100 }
      : priceRange === "Mid"
      ? { minPrice: 100 * 100, maxPrice: 150 * 100 }
      : priceRange === "Luxury"
      ? { minPrice: 150 * 100, maxPrice: Infinity }
      : {};

    const filtered = deepSearchWithFilters(
      allAccommodations.filter(item => item.type === "HOTEL"),
      searchQuery,
      {
        region: region !== "All" ? region : undefined,
        ...priceFilter
      },
      {
        threshold: 0.2,
        weights: { title: 3, location: 2, description: 1.5, tags: 1 }
      }
    );

    return filtered.map((item: any) => {
      const original = hotels.find(h => h.name === item.title);
      return original || {
        type: "hotel" as AccommodationType,
        name: item.title,
        location: item.location,
        rating: item.rating,
        reviews: item.reviews,
        pricePerNight: item.price / 100,
        amenities: item.amenities,
        rooms: item.rooms,
        image: item.image,
      };
    });
  }, [region, priceRange, searchQuery, allAccommodations]);

  const filteredCamping = useMemo(() => {
    const filtered = deepSearchWithFilters(
      allAccommodations.filter(item => item.type === "CAMPING"),
      searchQuery,
      {
        region: region !== "All" ? region : undefined,
      },
      {
        threshold: 0.2,
        weights: { title: 3, location: 2, description: 1.5, tags: 1 }
      }
    );

    return filtered.map((item: any) => {
      const original = campingSites.find(c => c.name === item.title);
      return original || {
        type: "camping" as AccommodationType,
        name: item.title,
        location: item.location,
        rating: item.rating,
        reviews: item.reviews,
        pricePerNight: item.price / 100,
        amenities: item.amenities,
        capacity: item.capacity,
        isGlamping: item.isGlamping,
        image: item.image,
      };
    });
  }, [region, searchQuery, allAccommodations]);

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

      {/* Filters & Search */}
      <section className="py-6 bg-muted border-b">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search in Arabic (نابل), French, or English..."
                  className="pl-10 pr-4 py-6 text-base border-2 border-gray-300 focus:border-orange-500 rounded-full w-full"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="flex-1 sm:flex-initial sm:w-full sm:max-w-xs">
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Regions</SelectItem>
                    <SelectItem value="Nabeul">Nabeul / نابل</SelectItem>
                    <SelectItem value="Kairouan">Kairouan / قيروان</SelectItem>
                    <SelectItem value="Sfax">Sfax / صفاقس</SelectItem>
                    <SelectItem value="Tozeur">Tozeur / توزر</SelectItem>
                    <SelectItem value="Douz">Douz / دوز</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 sm:flex-initial sm:w-full sm:max-w-xs">
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-full">
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
        </div>
      </section>

      {/* Tabs for different accommodation types */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 mb-8 h-auto">
              <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
              <TabsTrigger value="maisons" className="text-xs sm:text-sm">Maisons</TabsTrigger>
              <TabsTrigger value="hotels" className="text-xs sm:text-sm">Hôtels</TabsTrigger>
              <TabsTrigger value="camping" className="text-xs sm:text-sm hidden sm:block">Camping</TabsTrigger>
              <TabsTrigger value="guides" className="text-xs sm:text-sm hidden sm:block">Guides</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-12">
              {/* Bundles Section */}
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-4">Complete Packages</h2>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Experience + Accommodation + Guide bundles for a seamless journey
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
                  {bundles.map((bundle, idx) => (
                    <BundleCard key={idx} {...bundle} />
                  ))}
                </div>
              </div>

              {/* Maisons d'Hôte */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4 sm:mb-6">🏠 Maisons d'Hôte</h2>
                <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                  Traditional family-run guesthouses offering authentic local hospitality
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredMaisons.map((maison, idx) => (
                    <AccommodationCard key={idx} {...maison} />
                  ))}
                </div>
              </div>

              {/* Hotels */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4 sm:mb-6">🏨 Boutique Hotels</h2>
                <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                  Heritage hotels combining comfort with cultural authenticity
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredHotels.map((hotel, idx) => (
                    <AccommodationCard key={idx} {...hotel} />
                  ))}
                </div>
              </div>

              {/* Camping */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4 sm:mb-6">⛺ Camping & Glamping</h2>
                <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                  Authentic desert and rural camping experiences
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredCamping.map((camp, idx) => (
                    <AccommodationCard key={idx} {...camp} />
                  ))}
                </div>
              </div>

              {/* Guides */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4 sm:mb-6">👨‍🏫 Certified Tour Guides</h2>
                <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                  Professional guides specializing in heritage, culture, and authentic experiences
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {guides.map((guide, idx) => (
                    <GuideCard key={idx} {...guide} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="maisons">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredMaisons.map((maison, idx) => (
                  <AccommodationCard key={idx} {...maison} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hotels">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredHotels.map((hotel, idx) => (
                  <AccommodationCard key={idx} {...hotel} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="camping">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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

