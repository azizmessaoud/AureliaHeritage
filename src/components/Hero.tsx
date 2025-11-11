import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-nabeul.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Tunisian Artisan Market in Nabeul"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-background/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-primary-foreground/90 text-sm uppercase tracking-[0.2em] font-medium">
            From Nabeul to Nabeul
          </p>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-primary-foreground leading-tight">
            Where Tunisian Traditions Never Die
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            A journey through Tunisia's living heritage, where ancient craftsmanship meets the hands of modern artisans.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" variant="default" className="text-lg px-8 py-6">
              Discover Artisans
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-background/10 backdrop-blur-sm border-primary-foreground text-primary-foreground hover:bg-background/20">
              Explore the Journey
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
