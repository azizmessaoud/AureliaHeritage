import { Button } from "@/components/ui/button";
import { Star, Award, Languages, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GuideCardProps {
  name: string;
  languages: string[];
  specialties: string[];
  yearsExperience: number;
  pricePerDay: number;
  certification?: string;
  location?: string;
  rating?: number;
  reviews?: number;
  image?: string;
}

const GuideCard: React.FC<GuideCardProps> = ({
  name,
  languages,
  specialties,
  yearsExperience,
  pricePerDay,
  certification,
  location,
  rating,
  reviews,
  image,
}) => {
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
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">👨‍🏫</span>
              {certification && (
                <Badge variant="secondary" className="text-xs">
                  {certification}
                </Badge>
              )}
            </div>
            <h3 className="text-2xl font-serif font-bold">{name}</h3>
            {location && (
              <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
            )}
          </div>
        </div>

        {rating && reviews && (
          <div className="flex items-center gap-1 mb-4">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-semibold">{rating}</span>
            <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
          </div>
        )}

        <div className="space-y-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Languages className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">Languages</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {languages.map((lang, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">Specialties</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {specialties.map((spec, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <span className="font-semibold">{yearsExperience} years</span> of experience
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <span className="text-2xl font-bold">{pricePerDay} TND</span>
            <span className="text-sm text-muted-foreground"> / day</span>
          </div>
          <Button className="bg-[#E27A3F] hover:bg-[#E27A3F]/90">
            Book Guide
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GuideCard;

