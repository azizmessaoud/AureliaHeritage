import { Button } from "@/components/ui/button";
import { Star, MapPin, Users, Wifi, Car, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type AccommodationType = "maison-dhote" | "hotel" | "camping";

interface AccommodationCardProps {
  type: AccommodationType;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  pricePerNight: number;
  amenities: string[];
  story?: string;
  rooms?: number;
  capacity?: number;
  image?: string;
  isGlamping?: boolean;
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({
  type,
  name,
  location,
  rating,
  reviews,
  pricePerNight,
  amenities,
  story,
  rooms,
  capacity,
  image,
  isGlamping,
}) => {
  const typeLabels = {
    "maison-dhote": "Maison d'Hôte",
    hotel: "Hôtel",
    camping: isGlamping ? "Glamping" : "Camping",
  };

  const typeIcons = {
    "maison-dhote": "🏠",
    hotel: "🏨",
    camping: "⛺",
  };

  const amenityIcons: Record<string, React.ReactNode> = {
    WiFi: <Wifi className="h-4 w-4" />,
    Parking: <Car className="h-4 w-4" />,
    "Meals Included": <Utensils className="h-4 w-4" />,
  };

  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover-lift transition-all duration-300">
      {image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{typeIcons[type]}</span>
              <Badge variant="secondary" className="text-xs">
                {typeLabels[type]}
              </Badge>
            </div>
            <h3 className="text-2xl font-serif font-bold">{name}</h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        {story && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{story}</p>
        )}

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-semibold">{rating}</span>
            <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
          </div>
          {rooms && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{rooms} rooms</span>
            </div>
          )}
          {capacity && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Up to {capacity} guests</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {amenities.slice(0, 4).map((amenity, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-full"
            >
              {amenityIcons[amenity] || null}
              <span>{amenity}</span>
            </div>
          ))}
          {amenities.length > 4 && (
            <span className="text-xs text-muted-foreground">+{amenities.length - 4} more</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <span className="text-2xl font-bold">{pricePerNight} TND</span>
            <span className="text-sm text-muted-foreground"> / night</span>
          </div>
          <Button className="bg-[#E27A3F] hover:bg-[#E27A3F]/90">
            Reserve
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccommodationCard;

