import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";
import Artisans from "./pages/Artisans";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import JourneyMap from "./pages/JourneyMap";
import Stories from "./pages/Stories";
import Events from "./pages/Events";
import JoinMovement from "./pages/JoinMovement";
import Accommodations from "./pages/Accommodations";
import Schools from "./pages/Schools";
import { useEffect } from "react";
import Lenis from "lenis";

const queryClient = new QueryClient();

// build the future flags object and cast to any to avoid type errors with installed react-router types
// Build future flags dynamically to avoid TypeScript complaining about unknown object literal properties.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const futureFlags: any = {};
futureFlags.v7_startTransition = true;
futureFlags.v7_relativeSplatPath = true;

const router = createBrowserRouter(
  [
    { path: "/", element: <Index /> },
    { path: "/artisans", element: <Artisans /> },
    { path: "/accommodations", element: <Accommodations /> },
    { path: "/journey-map", element: <JourneyMap /> },
    { path: "/stories", element: <Stories /> },
    { path: "/events", element: <Events /> },
    { path: "/join", element: <JoinMovement /> },
    { path: "/schools", element: <Schools /> },
    { path: "/contact", element: <Contact /> },
    { path: "*", element: <NotFound /> },
  ],
  // cast options to any because react-router types here may not include these future flags.
  ({ future: futureFlags } as any)
);

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
        {/* RouterProvider using the prebuilt router (with future flags enabled) */}
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
