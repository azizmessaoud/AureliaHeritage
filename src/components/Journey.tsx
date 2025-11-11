import { MapPin } from "lucide-react";

const journeyStops = [
  {
    city: "Nabeul",
    region: "The Beginning",
    description: "Where pottery meets passion in the heart of artisan markets.",
    color: "primary",
  },
  {
    city: "Kairouan",
    region: "Sacred Crafts",
    description: "Traditional weaving and carpet-making passed through generations.",
    color: "secondary",
  },
  {
    city: "Sfax",
    region: "Coastal Heritage",
    description: "Where copper work and metalcraft shine under Mediterranean sun.",
    color: "accent",
  },
  {
    city: "Tozeur",
    region: "Desert Patterns",
    description: "Oasis-inspired designs woven into every piece of craftsmanship.",
    color: "primary",
  },
  {
    city: "Nabeul",
    region: "Full Circle",
    description: "Returning home, carrying forward the traditions of our ancestors.",
    color: "secondary",
  },
];

const Journey = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-4">
            Our Circular Journey
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            From Nabeul to Nabeul
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A journey through Tunisia's artisan heartlands, celebrating the circular nature of tradition—
            what begins in our hands returns to our heritage.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Journey Timeline */}
          <div className="space-y-8">
            {journeyStops.map((stop, index) => (
              <div
                key={index}
                className="relative flex flex-col md:flex-row items-start md:items-center gap-6 group"
              >
                {/* Timeline dot */}
                <div className="flex-shrink-0 relative">
                  <div className={`w-16 h-16 rounded-full bg-${stop.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <MapPin className="h-8 w-8 text-primary-foreground" />
                  </div>
                  {index < journeyStops.length - 1 && (
                    <div className="absolute top-16 left-8 w-0.5 h-16 bg-border" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 bg-card rounded-xl p-6 shadow-md hover-lift">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-2xl font-serif font-bold">{stop.city}</h3>
                    <span className="text-sm text-muted-foreground">{stop.region}</span>
                  </div>
                  <p className="text-muted-foreground">{stop.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
