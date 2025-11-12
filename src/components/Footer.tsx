import * as React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2F2F2F] text-[#FFF7ED] mt-16">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-serif text-xl font-bold">AureliaHeritage</h3>
          <p className="text-sm text-[#FFF7ED]/90 mt-2">Where Tunisian traditions never die</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm text-[#FFF7ED]/90">
            <li><Link to="/artisans">Artisans</Link></li>
            <li><Link to="/journey-map">Journey</Link></li>
            <li><Link to="/stories">Stories</Link></li>
            <li><Link to="/events">Events</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Get Involved</h4>
          <ul className="space-y-1 text-sm text-[#FFF7ED]/90">
            <li><Link to="/join">Join Movement</Link></li>
            <li><Link to="/schools">For Schools</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Partners</h4>
          <div className="flex items-center gap-3">
            <div className="w-20 h-12 bg-white/10 flex items-center justify-center rounded">CONECT</div>
            <div className="w-20 h-12 bg-white/10 flex items-center justify-center rounded">GAME</div>
            <div className="w-20 h-12 bg-white/10 flex items-center justify-center rounded">Denmark</div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#444]">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#FFF7ED]/80">© {new Date().getFullYear()} AureliaHeritage. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Facebook" className="text-[#FFF7ED]/90 hover:text-white"><Facebook className="h-5 w-5" /></a>
            <a href="#" aria-label="Instagram" className="text-[#FFF7ED]/90 hover:text-white"><Instagram className="h-5 w-5" /></a>
            <a href="#" aria-label="Twitter" className="text-[#FFF7ED]/90 hover:text-white"><Twitter className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

