import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BundleCardProps {
  experience: string;
  accommodation: string;
  guide?: string;
  totalPrice: number;
  duration: string;
  location?: string;
  groupSize?: number;
  image?: string;
}

const BundleCard: React.FC<BundleCardProps> = ({
  experience,
  accommodation,
  guide,
  totalPrice,
  duration,
  location,
  groupSize,
  image,
}) => {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover-lift transition-all duration-300 border-2 border-primary/20">
      {image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={experience}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Badge className="bg-primary">Complete Package</Badge>
          {groupSize && (
            <Badge variant="secondary">
              <Users className="h-3 w-3 mr-1" />
              Up to {groupSize}
            </Badge>
          )}
        </div>

        <h3 className="text-2xl font-serif font-bold mb-4">{experience}</h3>

        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-sm">✨</span>
            </div>
            <div>
              <p className="text-sm font-semibold">Experience</p>
              <p className="text-sm text-muted-foreground">{experience}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-sm">🏠</span>
            </div>
            <div>
              <p className="text-sm font-semibold">Accommodation</p>
              <p className="text-sm text-muted-foreground">{accommodation}</p>
            </div>
          </div>

          {guide && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm">👨‍🏫</span>
              </div>
              <div>
                <p className="text-sm font-semibold">Guide</p>
                <p className="text-sm text-muted-foreground">{guide}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            {location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <span className="text-2xl font-bold">{totalPrice} TND</span>
            <span className="text-sm text-muted-foreground"> / package</span>
          </div>
          <Button className="bg-[#E27A3F] hover:bg-[#E27A3F]/90">
            Customize Journey
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BundleCard;

