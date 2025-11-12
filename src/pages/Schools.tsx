import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BundleCard from "@/components/BundleCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Calendar, MapPin, Shield, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import potteryImg from "@/assets/craft-pottery.jpg";
import weavingImg from "@/assets/craft-weaving.jpg";

const schoolPackages = [
  {
    experience: "3-Day Heritage Adventure",
    accommodation: "Maison d'Hôte Group Rate",
    guide: "Certified Educational Guide",
    totalPrice: 150,
    duration: "3 days / 2 nights",
    location: "Nabeul & Kairouan",
    groupSize: 30,
    image: potteryImg,
  },
  {
    experience: "Desert Culture Immersion",
    accommodation: "Camping Experience",
    guide: "Desert Heritage Specialist",
    totalPrice: 180,
    duration: "4 days / 3 nights",
    location: "Tozeur & Douz",
    groupSize: 25,
    image: weavingImg,
  },
];

const Schools = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-4">
              Educational Programs
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">
              Heritage Education for Schools
            </h1>
            <p className="text-xl text-muted-foreground">
              Transform your students' understanding of Tunisian heritage through immersive, hands-on experiences
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">What We Offer</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete educational packages designed for school groups
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <CardTitle>Hands-On Workshops</CardTitle>
                <CardDescription>
                  Students learn directly from master artisans in pottery, weaving, and traditional crafts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Interactive craft workshops</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Heritage site visits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Cultural documentation projects</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl">🏠</span>
                </div>
                <CardTitle>Group Accommodations</CardTitle>
                <CardDescription>
                  Safe, comfortable lodging with special rates for educational groups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Maisons d'hôte group rates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Camping adventure options</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Boutique hotel partnerships</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl">👨‍🏫</span>
                </div>
                <CardTitle>Certified Guides</CardTitle>
                <CardDescription>
                  Professional guides specialized in educational heritage tours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Multi-language support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Age-appropriate content</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Educational curriculum alignment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Logistics Made Easy */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">Logistics Made Easy</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We handle the complete school experience from start to finish
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-card p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="h-6 w-6 text-primary" />
                <h3 className="font-semibold">Multi-Day Itineraries</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Carefully planned schedules with certified guides, balancing education and exploration
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <Users className="h-6 w-6 text-primary" />
                <h3 className="font-semibold">Group Accommodations</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Discounted rates for school groups at partner maisons d'hôte and hotels
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <Utensils className="h-6 w-6 text-primary" />
                <h3 className="font-semibold">Meals & Catering</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Packed lunches, traditional meals, and dietary requirement accommodations
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-6 w-6 text-primary" />
                <h3 className="font-semibold">Safety & Compliance</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Insurance coverage, safety protocols, and full compliance with educational standards
              </p>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-serif font-bold mb-4 text-center">
              Example Package: 3-Day Heritage Adventure
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Day 1
                </h4>
                <p className="text-sm text-muted-foreground">
                  Artisan workshop visit + Maison d'hôte check-in + Traditional dinner
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Day 2
                </h4>
                <p className="text-sm text-muted-foreground">
                  Guided heritage site tour + Hands-on craft workshop + Cultural documentation
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Day 3
                </h4>
                <p className="text-sm text-muted-foreground">
                  Museum visit + Student presentations + Return journey
                </p>
              </div>
            </div>
            <div className="text-center pt-4 border-t">
              <p className="text-3xl font-bold text-primary mb-2">150 TND per student</p>
              <p className="text-sm text-muted-foreground">All-inclusive (accommodation, meals, guides, activities)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Package Options */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">Package Options</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Pre-designed packages or customize your own itinerary
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {schoolPackages.map((pkg, idx) => (
              <BundleCard key={idx} {...pkg} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/contact">
              <Button size="lg" className="bg-[#E27A3F] hover:bg-[#E27A3F]/90">
                Request Custom Package Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Transportation Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <MapPin className="h-6 w-6" />
                  Transportation Coordination
                </CardTitle>
                <CardDescription>
                  We can help coordinate transportation for your school group
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Bus & Coach Services</p>
                      <p className="text-sm text-muted-foreground">
                        Partnered with reliable transportation providers for safe group travel
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Route Planning</p>
                      <p className="text-sm text-muted-foreground">
                        Optimized routes connecting workshops, accommodations, and heritage sites
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Flexible Options</p>
                      <p className="text-sm text-muted-foreground">
                        Support for groups bringing their own transportation or needing local transfers
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Schools;

