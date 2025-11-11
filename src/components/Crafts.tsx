import potteryImg from "@/assets/craft-pottery.jpg";
import weavingImg from "@/assets/craft-weaving.jpg";
import olivewoodImg from "@/assets/craft-olivewood.jpg";
import leatherImg from "@/assets/craft-leather.jpg";

const crafts = [
  {
    title: "Pottery",
    description: "Hand-shaped terracotta crafted with ancient techniques passed through generations.",
    image: potteryImg,
  },
  {
    title: "Weaving",
    description: "Intricate patterns woven on traditional looms, each thread telling a story.",
    image: weavingImg,
  },
  {
    title: "Olivewood Carving",
    description: "Transforming ancient olive trees into timeless pieces of functional art.",
    image: olivewoodImg,
  },
  {
    title: "Leather Crafting",
    description: "Premium leather goods crafted with precision and traditional methods.",
    image: leatherImg,
  },
];

const Crafts = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-4">
            Living Traditions
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            Heritage in Every Piece
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Each craft tells a story of patience, skill, and dedication. Discover the artisans who keep these traditions alive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {crafts.map((craft, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover-lift cursor-pointer"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={craft.image}
                  alt={craft.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-serif font-bold mb-2">{craft.title}</h3>
                <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                  {craft.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Crafts;
