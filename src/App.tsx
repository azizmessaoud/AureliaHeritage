import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Artisans from "./pages/Artisans";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import JourneyMap from "./pages/JourneyMap";
import Stories from "./pages/Stories";
import Events from "./pages/Events";
import JoinMovement from "./pages/JoinMovement";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
  // Lenis types may differ between versions; allow `any` here to keep runtime behavior.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenis = new Lenis({ duration: 1.2, easing: (t: number) => 1 - Math.pow(1 - t, 3), smooth: true } as any);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/artisans" element={<Artisans />} />
            <Route path="/journey-map" element={<JourneyMap />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/events" element={<Events />} />
            <Route path="/join" element={<JoinMovement />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
