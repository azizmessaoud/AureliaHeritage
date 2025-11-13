import * as React from "react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, MapPin, Users, Clock, Sparkles, Leaf, Award, Quote, ArrowRight, TrendingUp, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import potteryImg from "@/assets/craft-pottery.jpg";
import weavingImg from "@/assets/craft-weaving.jpg";
import olivewoodImg from "@/assets/craft-olivewood.jpg";
import { motion } from "framer-motion";
import FloatingHelp from "@/components/FloatingHelp";

// Craft type colors inspired by Tunisian heritage
const craftColors = {
  pottery: {
    bg: "bg-gradient-to-br from-amber-50 to-orange-50",
    border: "border-orange-300",
    accent: "bg-orange-500",
    text: "text-orange-700",
    badge: "bg-amber-100 text-amber-800 border-amber-300",
  },
  weaving: {
    bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
    border: "border-indigo-300",
    accent: "bg-indigo-500",
    text: "text-indigo-700",
    badge: "bg-blue-100 text-blue-800 border-blue-300",
  },
  copper: {
    bg: "bg-gradient-to-br from-amber-50 to-yellow-50",
    border: "border-yellow-400",
    accent: "bg-yellow-500",
    text: "text-yellow-700",
    badge: "bg-yellow-100 text-yellow-800 border-yellow-300",
  },
  olivewood: {
    bg: "bg-gradient-to-br from-green-50 to-emerald-50",
    border: "border-green-300",
    accent: "bg-green-500",
    text: "text-green-700",
    badge: "bg-green-100 text-green-800 border-green-300",
  },
};

const events = [
  {
    id: 1,
    title: "Pottery Revival Workshop",
    location: "Nabeul",
    date: "March 15, 2025",
    time: "10:00 AM - 4:00 PM",
    img: potteryImg,
    registered: 24,
    capacity: 30,
    craft: "pottery" as keyof typeof craftColors,
    price: 80,
    description: "Learn traditional pottery techniques from master artisans. Create your own terracotta piece using ancient methods.",
    eco: true,
    impact: "Supports 5 local artisans",
    spotsLeft: 6,
  },
  {
    id: 2,
    title: "Weaving Masterclass",
    location: "Kairouan",
    date: "April 12, 2025",
    time: "9:00 AM - 5:00 PM",
    img: weavingImg,
    registered: 12,
    capacity: 20,
    craft: "weaving" as keyof typeof craftColors,
    price: 100,
    description: "Experience the art of traditional weaving on authentic looms. Learn patterns passed through generations.",
    eco: true,
    impact: "Preserves 3 heritage patterns",
    spotsLeft: 8,
  },
  {
    id: 3,
    title: "Copper Works Exhibition & Workshop",
    location: "Sfax",
    date: "May 20, 2025",
    time: "2:00 PM - 6:00 PM",
    img: olivewoodImg,
    registered: 40,
    capacity: 100,
    craft: "copper" as keyof typeof craftColors,
    price: 60,
    description: "Discover the beauty of traditional copper work. Watch demonstrations and try your hand at metalcraft.",
    eco: true,
    impact: "Features 8 master craftsmen",
    spotsLeft: 60,
  },
  {
    id: 4,
    title: "Olivewood Carving Intensive",
    location: "Sfax",
    date: "June 8, 2025",
    time: "10:00 AM - 3:00 PM",
    img: olivewoodImg,
    registered: 8,
    capacity: 15,
    craft: "olivewood" as keyof typeof craftColors,
    price: 90,
    description: "Transform ancient olive trees into timeless pieces. Learn carving techniques from experienced artisans.",
    eco: true,
    impact: "Uses reclaimed olive wood",
    spotsLeft: 7,
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    role: "Workshop Participant",
    text: "The pottery workshop was transformative! I left with not just a beautiful piece, but a deep connection to Tunisian heritage.",
    craft: "pottery",
  },
  {
    name: "Ahmed T.",
    role: "Weaving Workshop",
    text: "Learning traditional patterns from master weavers was incredible. This is how we keep our culture alive!",
    craft: "weaving",
  },
  {
    name: "Leila B.",
    role: "Copper Workshop",
    text: "The artisans' passion is contagious. I'm coming back for more workshops—this is stress relief and meaning combined!",
    craft: "copper",
  },
];

const impactStats = [
  { label: "Artisans Supported", value: "45+", icon: Heart, color: "text-orange-600" },
  { label: "Workshops Completed", value: "120+", icon: Award, color: "text-indigo-600" },
  { label: "Heritage Patterns Preserved", value: "28", icon: Sparkles, color: "text-yellow-600" },
  { label: "Eco-Friendly Materials", value: "100%", icon: Leaf, color: "text-green-600" },
];

const Events: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF7ED] via-orange-50/30 to-[#FFF7ED]">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/20 via-amber-100/20 to-yellow-100/20" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200 transition-colors">
              <Sparkles className="h-3 w-3 mr-1" />
              Live Workshops & Events
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-orange-700 via-amber-700 to-yellow-700 bg-clip-text text-transparent">
              Events & Workshops
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Join hands-on workshops with master artisans. Learn traditional crafts, support local communities, and connect with Tunisia's living heritage.
            </p>

            {/* Impact Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {impactStats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-orange-100"
                  >
                    <Icon className={`h-6 w-6 ${stat.color} mb-2 mx-auto`} />
                    <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                    <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {events.map((event, idx) => {
              const colors = craftColors[event.craft];
              const percentage = (event.registered / event.capacity) * 100;
              const isUrgent = event.spotsLeft <= 10;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  onMouseEnter={() => setHoveredCard(event.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group"
                >
                  <Card
                    className={`${colors.bg} border-2 ${colors.border} overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative`}
                  >
                    {/* Urgency Badge */}
                    {isUrgent && (
                      <div className="absolute top-4 right-4 z-10 animate-pulse">
                        <Badge className="bg-red-500 text-white border-red-600 shadow-lg">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Only {event.spotsLeft} left!
                        </Badge>
                      </div>
                    )}

                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={event.img}
                        alt={event.title}
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                          hoveredCard === event.id ? "scale-110" : "scale-100"
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* Eco Badge */}
                      {event.eco && (
                        <div className="absolute top-4 left-4">
                          <Badge className={`${colors.badge} border shadow-md`}>
                            <Leaf className="h-3 w-3 mr-1" />
                            Eco-Friendly
                          </Badge>
                        </div>
                      )}

                      {/* Craft Type Badge */}
                      <div className="absolute bottom-4 left-4">
                        <Badge className="bg-white/90 text-gray-800 border-white shadow-md capitalize">
                          {event.craft}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      {/* Title & Price */}
                      <div className="flex justify-between items-start mb-4">
                        <h3 className={`text-2xl font-serif font-bold ${colors.text} flex-1`}>
                          {event.title}
                        </h3>
                        <div className="text-right ml-4">
                          <div className={`text-2xl font-bold ${colors.text}`}>{event.price} TND</div>
                          <div className="text-xs text-gray-600">per person</div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 mb-4 leading-relaxed">{event.description}</p>

                      {/* Impact */}
                      <div className="flex items-center gap-2 mb-4 text-sm">
                        <Heart className="h-4 w-4 text-orange-500" />
                        <span className="text-gray-700 font-medium">{event.impact}</span>
                      </div>

                      {/* Details */}
                      <div className="space-y-2 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-orange-600" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-orange-600" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-orange-600" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      {/* Registration Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">
                              {event.registered}/{event.capacity} registered
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-gray-700">{Math.round(percentage)}% full</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ delay: idx * 0.2, duration: 0.8 }}
                            className={`h-full ${colors.accent} rounded-full`}
                          />
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Button
                        className={`w-full ${colors.accent} hover:opacity-90 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group/btn`}
                        size="lg"
                      >
                        Register Now
                        <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-b from-white to-orange-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4 text-gray-800">What Participants Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real stories from people who've experienced the magic of traditional crafts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => {
              const colors = craftColors[testimonial.craft as keyof typeof craftColors];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-100 hover:shadow-xl transition-shadow"
                >
                  <Quote className={`h-8 w-8 ${colors.text} mb-4 opacity-50`} />
                  <p className="text-gray-700 italic mb-4 leading-relaxed">"{testimonial.text}"</p>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Help Artisans Thrive—Join Today!
            </h2>
            <p className="text-xl mb-8 text-orange-50">
              Every registration supports local artisans and preserves Tunisia's living heritage for future generations.
            </p>
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-orange-50 font-bold text-lg px-8 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Explore All Workshops
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <FloatingHelp />
      <Footer />
    </div>
  );
};

export default Events;
