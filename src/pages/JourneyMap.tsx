import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ArrowRight, Sparkles, Clock, Users, Award, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import potteryImg from "@/assets/craft-pottery.jpg";
import weavingImg from "@/assets/craft-weaving.jpg";
import olivewoodImg from "@/assets/craft-olivewood.jpg";
import leatherImg from "@/assets/craft-leather.jpg";

// Fix for default marker icons in Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconRetinaUrl: iconRetina,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const stops = [
  {
    id: 1,
    name: "Nabeul",
    coords: [36.4516, 10.7361] as [number, number],
    craft: "Pottery & Ceramics",
    description: "Where pottery meets passion in the heart of artisan markets. Nabeul is renowned for its terracotta craftsmanship.",
    image: potteryImg,
    artisans: 12,
    workshops: 8,
    color: "orange",
    icon: "🏺",
    heritage: "Coastal pottery traditions dating back centuries",
  },
  {
    id: 2,
    name: "Kairouan",
    coords: [35.6781, 10.0963] as [number, number],
    craft: "Traditional Weaving",
    description: "Sacred city where traditional weaving and carpet-making are passed through generations.",
    image: weavingImg,
    artisans: 15,
    workshops: 10,
    color: "indigo",
    icon: "🧵",
    heritage: "UNESCO World Heritage site with ancient weaving techniques",
  },
  {
    id: 3,
    name: "Sfax",
    coords: [34.7406, 10.7603] as [number, number],
    craft: "Copper & Metalwork",
    description: "Coastal heritage where copper work and metalcraft shine under Mediterranean sun.",
    image: olivewoodImg,
    artisans: 10,
    workshops: 6,
    color: "yellow",
    icon: "⚒️",
    heritage: "Mediterranean metalworking traditions",
  },
  {
    id: 4,
    name: "Tozeur",
    coords: [33.9197, 8.1339] as [number, number],
    craft: "Oasis Patterns & Crafts",
    description: "Desert oasis where oasis-inspired designs are woven into every piece of craftsmanship.",
    image: leatherImg,
    artisans: 8,
    workshops: 5,
    color: "green",
    icon: "🌴",
    heritage: "Desert oasis crafts and palm frond weaving",
  },
];

const colorMap = {
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-300",
    text: "text-orange-700",
    accent: "bg-orange-500",
    badge: "bg-orange-100 text-orange-800",
  },
  indigo: {
    bg: "bg-indigo-50",
    border: "border-indigo-300",
    text: "text-indigo-700",
    accent: "bg-indigo-500",
    badge: "bg-indigo-100 text-indigo-800",
  },
  yellow: {
    bg: "bg-yellow-50",
    border: "border-yellow-300",
    text: "text-yellow-700",
    accent: "bg-yellow-500",
    badge: "bg-yellow-100 text-yellow-800",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-300",
    text: "text-green-700",
    accent: "bg-green-500",
    badge: "bg-green-100 text-green-800",
  },
};

const JourneyMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selectedStop, setSelectedStop] = useState<typeof stops[0] | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map with better view
    const map = L.map(mapRef.current, {
      zoomControl: true,
      attributionControl: true,
    }).setView([35.0, 9.5], 7);

    // Use a more visually appealing tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Create custom icons for each stop
    const createCustomIcon = (stop: typeof stops[0]) => {
      return L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            background: linear-gradient(135deg, ${stop.color === 'orange' ? '#f97316' : stop.color === 'indigo' ? '#6366f1' : stop.color === 'yellow' ? '#eab308' : '#22c55e'}, ${stop.color === 'orange' ? '#ea580c' : stop.color === 'indigo' ? '#4f46e5' : stop.color === 'yellow' ? '#ca8a04' : '#16a34a'});
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 4px solid white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            cursor: pointer;
            transition: transform 0.2s;
          " onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">
            ${stop.icon}
          </div>
        `,
        iconSize: [50, 50],
        iconAnchor: [25, 25],
        popupAnchor: [0, -25],
      });
    };

    // Add route polyline with animation
    const latlngs: L.LatLngExpression[] = stops.map((s) => s.coords);
    const poly = L.polyline(latlngs, {
      color: "#E27A3F",
      weight: 4,
      opacity: 0.8,
      dashArray: "10, 10",
      lineCap: "round",
    }).addTo(map);

    // Fit bounds with padding
    map.fitBounds(poly.getBounds(), { padding: [80, 80] });

    // Add markers with enhanced popups
    stops.forEach((stop, index) => {
      const marker = L.marker(stop.coords, {
        icon: createCustomIcon(stop),
      }).addTo(map);

      const colors = colorMap[stop.color as keyof typeof colorMap];
      
      marker.bindPopup(`
        <div style="min-width: 250px; font-family: system-ui;">
          <div style="background: linear-gradient(135deg, ${stop.color === 'orange' ? '#f97316' : stop.color === 'indigo' ? '#6366f1' : stop.color === 'yellow' ? '#eab308' : '#22c55e'}, ${stop.color === 'orange' ? '#ea580c' : stop.color === 'indigo' ? '#4f46e5' : stop.color === 'yellow' ? '#ca8a04' : '#16a34a'}); padding: 12px; border-radius: 8px 8px 0 0; color: white; font-weight: bold; font-size: 18px;">
            ${stop.icon} ${stop.name}
          </div>
          <div style="padding: 12px; background: white;">
            <p style="margin: 0 0 8px 0; color: #374151; font-size: 14px;"><strong>${stop.craft}</strong></p>
            <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 13px; line-height: 1.5;">${stop.description}</p>
            <div style="display: flex; gap: 12px; margin-bottom: 12px; font-size: 12px; color: #6b7280;">
              <span>👥 ${stop.artisans} artisans</span>
              <span>🎨 ${stop.workshops} workshops</span>
            </div>
            <a href="/artisans?region=${encodeURIComponent(stop.name)}" 
               style="display: inline-block; background: #E27A3F; color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600; margin-top: 8px;">
              Explore Artisans →
            </a>
          </div>
        </div>
      `);

      // Add click handler to select stop
      marker.on("click", () => {
        setSelectedStop(stop);
      });
    });

    setIsMapLoaded(true);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleStopClick = (stop: typeof stops[0]) => {
    setSelectedStop(stop);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(stop.coords, 10, {
        animate: true,
        duration: 1.0,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF7ED] via-orange-50/20 to-[#FFF7ED]">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/30 via-amber-100/20 to-yellow-100/30" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300">
              <MapPin className="h-3 w-3 mr-1" />
              Interactive Journey
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-orange-700 via-amber-700 to-yellow-700 bg-clip-text text-transparent">
              From Nabeul to Nabeul
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Explore Tunisia's artisan heartlands through an interactive journey. Click on each city to discover its unique crafts and traditions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map and Sidebar */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Journey Timeline Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-2xl font-serif font-bold mb-4 text-gray-800">Journey Stops</h2>
              {stops.map((stop, index) => {
                const colors = colorMap[stop.color as keyof typeof colorMap];
                const isSelected = selectedStop?.id === stop.id;
                
                return (
                  <motion.div
                    key={stop.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`${colors.bg} border-2 ${isSelected ? colors.border + ' shadow-xl' : 'border-transparent'} cursor-pointer hover:shadow-lg transition-all duration-300 ${
                        isSelected ? 'scale-105' : ''
                      }`}
                      onClick={() => handleStopClick(stop)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`text-3xl ${isSelected ? 'scale-125' : ''} transition-transform`}>
                            {stop.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className={`font-serif font-bold text-lg ${colors.text}`}>
                                {stop.name}
                              </h3>
                              {index < stops.length - 1 && (
                                <ArrowRight className="h-4 w-4 text-gray-400" />
                              )}
                            </div>
                            <p className="text-sm font-medium text-gray-700 mb-2">{stop.craft}</p>
                            <div className="flex gap-3 text-xs text-gray-600">
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {stop.artisans}
                              </span>
                              <span className="flex items-center gap-1">
                                <Award className="h-3 w-3" />
                                {stop.workshops}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}

              {/* Journey Stats */}
              <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 mt-6">
                <CardContent className="p-6">
                  <h3 className="font-serif font-bold text-lg mb-4 text-orange-800">Journey Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Total Stops</span>
                      <span className="font-bold text-orange-700">{stops.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Artisans</span>
                      <span className="font-bold text-orange-700">{stops.reduce((sum, s) => sum + s.artisans, 0)}+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Workshops</span>
                      <span className="font-bold text-orange-700">{stops.reduce((sum, s) => sum + s.workshops, 0)}+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Heritage Sites</span>
                      <Badge className="bg-green-100 text-green-800 border-green-300">
                        <Leaf className="h-3 w-3 mr-1" />
                        Protected
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Container */}
            <div className="lg:col-span-2">
              <Card className="border-2 border-orange-200 shadow-2xl overflow-hidden">
                <div className="relative w-full h-[70vh] rounded-lg overflow-hidden">
                  <div ref={mapRef} className="w-full h-full" />
                  {!isMapLoaded && (
                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading map...</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Selected Stop Details */}
              {selectedStop && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <Card className={`border-2 ${colorMap[selectedStop.color as keyof typeof colorMap].border} shadow-xl`}>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-4xl">{selectedStop.icon}</span>
                            <div>
                              <h3 className="text-2xl font-serif font-bold text-gray-800">
                                {selectedStop.name}
                              </h3>
                              <p className="text-orange-600 font-medium">{selectedStop.craft}</p>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4 leading-relaxed">
                            {selectedStop.description}
                          </p>
                          <div className="flex items-center gap-2 mb-4">
                            <Badge className="bg-green-100 text-green-800 border-green-300">
                              <Leaf className="h-3 w-3 mr-1" />
                              {selectedStop.heritage}
                            </Badge>
                          </div>
                          <Button
                            className="bg-[#E27A3F] hover:bg-[#E27A3F]/90"
                            onClick={() => window.location.href = `/artisans?region=${encodeURIComponent(selectedStop.name)}`}
                          >
                            Explore {selectedStop.name} Artisans
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                        <div className="relative rounded-lg overflow-hidden">
                          <img
                            src={selectedStop.image}
                            alt={selectedStop.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <div className="flex gap-4 text-white text-sm">
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {selectedStop.artisans} artisans
                              </span>
                              <span className="flex items-center gap-1">
                                <Award className="h-4 w-4" />
                                {selectedStop.workshops} workshops
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Journey Story Section */}
      <section className="py-16 bg-gradient-to-b from-white to-orange-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4 text-gray-800">The Circular Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A journey through Tunisia's artisan heartlands, celebrating the circular nature of tradition—what begins in our hands returns to our heritage.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {stops.map((stop, index) => {
                const colors = colorMap[stop.color as keyof typeof colorMap];
                return (
                  <motion.div
                    key={stop.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    className="flex gap-6 items-start"
                  >
                    <div className={`flex-shrink-0 w-16 h-16 rounded-full ${colors.accent} flex items-center justify-center text-3xl shadow-lg`}>
                      {stop.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-2xl font-serif font-bold mb-2 ${colors.text}`}>
                        {index + 1}. {stop.name}
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-3">{stop.description}</p>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {stop.artisans} master artisans
                        </span>
                        <span className="flex items-center gap-1">
                          <Award className="h-4 w-4" />
                          {stop.workshops} active workshops
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JourneyMap;
