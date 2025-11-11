import React, { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const stops = [
  { name: "Nabeul", coords: [36.4516, 10.7361], craft: "Pottery & Ceramics" },
  { name: "Kairouan", coords: [35.6781, 10.0963], craft: "Traditional Weaving" },
  { name: "Sfax", coords: [34.7406, 10.7603], craft: "Copper & Metalwork" },
  { name: "Tozeur", coords: [33.9197, 8.1339], craft: "Oasis Patterns & Crafts" },
];

const JourneyMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView([34, 9], 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const latlngs: L.LatLngExpression[] = stops.map((s) => s.coords as L.LatLngExpression);

    const poly = L.polyline(latlngs, { color: "#E27A3F", dashArray: "8,6" }).addTo(map);
    map.fitBounds(poly.getBounds(), { padding: [40, 40] });

    stops.forEach((s) => {
      const marker = L.circleMarker(s.coords as L.LatLngExpression, {
        radius: 8,
        color: "#E27A3F",
        fillColor: "#E27A3F",
        fillOpacity: 1,
      }).addTo(map);

      marker.bindPopup(`<strong>${s.name}</strong><br/>${s.craft}<br/><a href='/artisans?region=${encodeURIComponent(
        s.name,
      )}'>See artisans</a>`);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-serif font-bold mb-2">The Journey Map</h1>
          <p className="text-muted-foreground mb-6">An interactive circular path connecting the artisan centers of Tunisia.</p>
        </div>

        <div className="container mx-auto px-6 pb-16">
          <div className="w-full h-[70vh] rounded-lg overflow-hidden shadow">
            <div ref={mapRef} className="w-full h-full" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JourneyMap;
