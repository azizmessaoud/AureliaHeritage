import  { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Our Artisans", to: "/artisans" },
  { label: "The Journey", to: "/journey-map" },
  { label: "Stories", to: "/stories" },
  { label: "Events", to: "/events" },
  { label: "Contact", to: "/contact" },
];

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur bg-white/50 dark:bg-black/40 border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-2xl">🏺</span>
            <div className="leading-tight">
              <div className="font-serif font-bold text-lg">AureliaHeritage</div>
              <div className="text-xs text-muted-foreground">Where Tunisian traditions never die</div>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-1 rounded hover:bg-[#E27A3F] hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link to="/join">
            <Button className="ml-2">{"Join Movement"}</Button>
          </Link>
        </nav>

        {/* Mobile */}
        <div className="md:hidden">
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-md"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden bg-background/90 border-t border-border">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded hover:bg-[#E27A3F] hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/join" onClick={() => setOpen(false)}>
              <Button className="w-full mt-2">Join Movement</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

