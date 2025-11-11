import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Fatma Zahra",
    location: "Pottery Artisan, Nabeul",
    text: "Working with clay is not just my craft—it's my connection to generations before me. Every piece carries our story.",
    rating: 5,
  },
  {
    name: "Mohamed Slim",
    location: "Weaver, Kairouan",
    text: "The patterns I weave today are the same my grandmother taught me. Heritage is not what we keep behind—it's what we carry forward.",
    rating: 5,
  },
  {
    name: "Leila Ben Salah",
    location: "Leather Artisan, Sfax",
    text: "Every stitch tells a story. Through my craft, I honor the past while creating for the future.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            Voices of Our Artisans
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-md hover-lift"
            >
              <Quote className="h-10 w-10 text-primary mb-4" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-card-foreground mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="border-t border-border pt-4">
                <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
