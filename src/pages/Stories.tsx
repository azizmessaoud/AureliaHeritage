import * as React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import potteryImg from "@/assets/craft-pottery.jpg";
import weavingImg from "@/assets/craft-weaving.jpg";
import olivewoodImg from "@/assets/craft-olivewood.jpg";
import leatherImg from "@/assets/craft-leather.jpg";

const posts = [
  {
    id: 1,
    title: "The Art of Nabeul Pottery",
    category: "Pottery",
    author: "Fatma Zahra",
    authorRole: "Master Potter",
    date: "March 1, 2025",
    img: potteryImg,
    excerpt: "A deep dive into Nabeul's ceramics tradition, where every piece tells a story of earth, fire, and generations of skilled hands.",
    readTime: "5 min read",
    color: "orange",
  },
  {
    id: 2,
    title: "Weavers of Kairouan",
    category: "Weaving",
    author: "Amina Trabelsi",
    authorRole: "Textile Master",
    date: "April 8, 2025",
    img: weavingImg,
    excerpt: "The looms and the elders who tend them. Discover how traditional patterns are preserved through the art of weaving.",
    readTime: "7 min read",
    color: "indigo",
  },
  {
    id: 3,
    title: "Sfax Copper Secrets",
    category: "Metalwork",
    author: "Mohamed Slim",
    authorRole: "Copper Artisan",
    date: "May 3, 2025",
    img: olivewoodImg,
    excerpt: "Forging tradition into modern pieces. Learn the ancient techniques of copper work that shine under the Mediterranean sun.",
    readTime: "6 min read",
    color: "yellow",
  },
  {
    id: 4,
    title: "Oasis Patterns from Tozeur",
    category: "Carving",
    author: "Leila Ben Salah",
    authorRole: "Desert Craft Master",
    date: "June 10, 2025",
    img: leatherImg,
    excerpt: "Designs born from desert life. Explore how oasis-inspired patterns are woven into every piece of craftsmanship.",
    readTime: "4 min read",
    color: "green",
  },
];

const colorMap = {
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-300",
    text: "text-orange-700",
    accent: "bg-orange-500",
    badge: "bg-orange-100 text-orange-800 border-orange-300",
  },
  indigo: {
    bg: "bg-indigo-50",
    border: "border-indigo-300",
    text: "text-indigo-700",
    accent: "bg-indigo-500",
    badge: "bg-indigo-100 text-indigo-800 border-indigo-300",
  },
  yellow: {
    bg: "bg-yellow-50",
    border: "border-yellow-300",
    text: "text-yellow-700",
    accent: "bg-yellow-500",
    badge: "bg-yellow-100 text-yellow-800 border-yellow-300",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-300",
    text: "text-green-700",
    accent: "bg-green-500",
    badge: "bg-green-100 text-green-800 border-green-300",
  },
};

const Stories: React.FC = () => {
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
              <BookOpen className="h-3 w-3 mr-1" />
              Heritage Stories
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-orange-700 via-amber-700 to-yellow-700 bg-clip-text text-transparent">
              Stories from the Heart
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Discover the people, traditions, and crafts that make Tunisia's heritage come alive. 
              Each story is a window into the world of our master artisans.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="space-y-16">
            {posts.map((post, i) => {
              const colors = colorMap[post.color as keyof typeof colorMap];
              const left = i % 2 === 0;

              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <Card
                    className={`${colors.bg} border-2 ${colors.border} overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                      {/* Image Section */}
                      <div className={`relative h-80 md:h-auto overflow-hidden ${!left ? "md:order-2" : ""}`}>
                        <motion.img
                          src={post.img}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <Badge className={colors.badge}>
                            {post.category}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-2 text-white text-sm">
                            <Calendar className="h-4 w-4" />
                            <span>{post.date}</span>
                            <span className="mx-2">•</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <CardContent className={`p-8 md:p-12 flex flex-col justify-center ${!left ? "md:order-1" : ""}`}>
                        <div className="mb-4">
                          <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-4 ${colors.text}`}>
                            {post.title}
                          </h2>
                          <p className="text-gray-700 text-lg leading-relaxed mb-6">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                          <div className={`w-12 h-12 rounded-full ${colors.accent} flex items-center justify-center text-white font-bold`}>
                            {post.author.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{post.author}</div>
                            <div className="text-sm text-gray-600">{post.authorRole}</div>
                          </div>
                        </div>

                        <Button
                          className={`${colors.accent} hover:opacity-90 text-white w-full md:w-auto group`}
                          size="lg"
                        >
                          Read Full Story
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Share Your Story
            </h2>
            <p className="text-xl mb-8 text-orange-50">
              Are you an artisan with a story to tell? We'd love to feature your journey and craft.
            </p>
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-orange-50 font-bold text-lg px-8 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Submit Your Story
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Stories;
