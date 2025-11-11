import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-4">
              Get In Touch
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions about our artisans or want to support the heritage movement? 
              We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-serif font-bold mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us how you'd like to support or collaborate..."
                    rows={6}
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-card rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-serif font-bold mb-6">
                  Join the Movement
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Whether you're an artisan, supporter, or simply passionate about preserving cultural heritage, 
                  we welcome you to be part of our journey.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Location</h3>
                      <p className="text-muted-foreground">
                        Nabeul, Tunisia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">
                        hello@aureliaheritage.tn
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-muted-foreground">
                        +216 XX XXX XXX
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/10 rounded-2xl p-8 border-2 border-secondary">
                <h3 className="text-2xl font-serif font-bold mb-4">
                  Support Our Mission
                </h3>
                <p className="text-muted-foreground mb-6">
                  Help us preserve Tunisian craftsmanship for future generations.
                </p>
                <Button variant="default" size="lg" className="w-full">
                  Become a Supporter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
