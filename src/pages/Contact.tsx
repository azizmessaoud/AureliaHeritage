import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, Heart, Sparkles, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email anytime",
      value: "hello@aureliaheritage.tn",
      color: "orange",
      action: () => window.location.href = "mailto:hello@aureliaheritage.tn",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Mon-Fri, 9AM-6PM",
      value: "+216 XX XXX XXX",
      color: "amber",
      action: () => window.location.href = "tel:+21612345678",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our headquarters",
      value: "Nabeul, Tunisia",
      color: "yellow",
      action: () => window.open("https://maps.google.com/?q=Nabeul,Tunisia", "_blank"),
    },
  ];

  const colorMap = {
    orange: {
      bg: "bg-orange-50",
      border: "border-orange-300",
      text: "text-orange-700",
      accent: "bg-orange-500",
    },
    amber: {
      bg: "bg-amber-50",
      border: "border-amber-300",
      text: "text-amber-700",
      accent: "bg-amber-500",
    },
    yellow: {
      bg: "bg-yellow-50",
      border: "border-yellow-300",
      text: "text-yellow-700",
      accent: "bg-yellow-500",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF7ED] via-orange-50/20 to-[#FFF7ED]">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/30 via-amber-100/20 to-yellow-100/30" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300">
              <MessageCircle className="h-3 w-3 mr-1" />
              Get In Touch
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-orange-700 via-amber-700 to-yellow-700 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Have questions about our artisans or want to support the heritage movement? 
              We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((method, idx) => {
              const colors = colorMap[method.color as keyof typeof colorMap];
              const Icon = method.icon;
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  <Card
                    className={`${colors.bg} border-2 ${colors.border} hover:shadow-xl transition-all duration-300 cursor-pointer group`}
                    onClick={method.action}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 ${colors.accent} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className={`text-xl font-serif font-bold mb-2 ${colors.text}`}>
                        {method.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                      <p className="font-semibold text-gray-800">{method.value}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-2 border-orange-200 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                      <Send className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-gray-800">Send a Message</h2>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700">
                        Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        required
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-700">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        placeholder="What's this about?"
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Tell us how you'd like to support or collaborate..."
                        rows={6}
                        required
                        className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-[#E27A3F] hover:bg-[#E27A3F]/90 text-white font-semibold py-6"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Info Cards */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-2 border-orange-200 shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                        <Heart className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-serif font-bold text-gray-800">
                        Join the Movement
                      </h2>
                    </div>
                    <p className="text-gray-700 mb-8 leading-relaxed">
                      Whether you're an artisan, supporter, or simply passionate about preserving cultural heritage, 
                      we welcome you to be part of our journey.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg">
                        <MapPin className="h-5 w-5 text-orange-600 mt-0.5" />
                        <div>
                          <h3 className="font-semibold mb-1 text-gray-800">Location</h3>
                          <p className="text-gray-600">Nabeul, Tunisia</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-lg">
                        <Mail className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div>
                          <h3 className="font-semibold mb-1 text-gray-800">Email</h3>
                          <p className="text-gray-600">hello@aureliaheritage.tn</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg">
                        <Phone className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h3 className="font-semibold mb-1 text-gray-800">Phone</h3>
                          <p className="text-gray-600">+216 XX XXX XXX</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Card className="bg-gradient-to-br from-orange-500 to-amber-500 border-2 border-orange-400 shadow-xl">
                  <CardContent className="p-8 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <Sparkles className="h-8 w-8" />
                      <h3 className="text-2xl font-serif font-bold">
                        Support Our Mission
                      </h3>
                    </div>
                    <p className="text-orange-50 mb-6 leading-relaxed">
                      Help us preserve Tunisian craftsmanship for future generations. 
                      Every contribution makes a difference.
                    </p>
                    <Button
                      variant="default"
                      size="lg"
                      className="w-full bg-white text-orange-600 hover:bg-orange-50 font-bold"
                    >
                      <Heart className="mr-2 h-5 w-5" />
                      Become a Supporter
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
