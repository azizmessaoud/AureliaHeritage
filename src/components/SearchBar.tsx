import { useState, useRef, useEffect } from "react";
import { Search, X, MapPin, Sparkles, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { deepSearch } from "@/lib/deepSearch";

interface SearchResult {
  id: string;
  title: string;
  titleAr?: string;
  type: string;
  location: string;
  locationAr?: string;
  url: string;
}

interface SearchBarProps {
  onResultClick?: (result: SearchResult) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onResultClick,
  placeholder = "Search in Arabic, French, or English...",
  className = "",
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Sample searchable data (in production, fetch from API)
  const searchableItems: SearchResult[] = [
    {
      id: "1",
      title: "Pottery Workshop",
      titleAr: "ورشة الفخار",
      type: "Experience",
      location: "Nabeul",
      locationAr: "نابل",
      url: "/experiences/1",
    },
    {
      id: "2",
      title: "Weaving Masterclass",
      titleAr: "ورشة النسيج",
      type: "Experience",
      location: "Kairouan",
      locationAr: "قيروان",
      url: "/experiences/2",
    },
    {
      id: "3",
      title: "Dar Khaled",
      titleAr: "دار خالد",
      type: "Maison d'Hôte",
      location: "Tozeur",
      locationAr: "توزر",
      url: "/accommodations",
    },
    // Add more items...
  ];

  // Perform search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const searchResults = deepSearch(searchableItems, query, {
        threshold: 0.2,
        limit: 8,
        fields: ['title', 'titleAr', 'location', 'locationAr', 'type'],
        weights: {
          title: 3,
          titleAr: 3,
          location: 2,
          locationAr: 2,
          type: 1,
        },
      });

      setResults(searchResults as SearchResult[]);
      setIsOpen(true);
      setIsLoading(false);
    }, 200);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setQuery("");
    } else if (e.key === "Enter" && results.length > 0) {
      handleResultClick(results[0]);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    if (onResultClick) {
      onResultClick(result);
    } else {
      navigate(result.url);
    }
    setIsOpen(false);
    setQuery("");
    inputRef.current?.blur();
  };

  const typeColors: Record<string, string> = {
    Experience: "bg-orange-100 text-orange-800 border-orange-300",
    "Maison d'Hôte": "bg-blue-100 text-blue-800 border-blue-300",
    Hotel: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Camping: "bg-green-100 text-green-800 border-green-300",
    Guide: "bg-purple-100 text-purple-800 border-purple-300",
  };

  return (
    <div ref={searchRef} className={`relative w-full max-w-2xl ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-10 pr-10 py-6 text-base border-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-full"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <Card className="absolute top-full mt-2 w-full z-50 shadow-2xl border-2 border-orange-200 max-h-96 overflow-y-auto">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 text-center">
                <Loader2 className="h-6 w-6 animate-spin mx-auto text-orange-500" />
                <p className="text-sm text-gray-600 mt-2">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="w-full text-left px-4 py-3 hover:bg-orange-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <MapPin className="h-4 w-4 text-orange-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-800 truncate">
                            {result.title}
                          </h4>
                          {result.titleAr && (
                            <span className="text-sm text-gray-600 font-arabic">
                              {result.titleAr}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge
                            className={`text-xs ${
                              typeColors[result.type] || "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {result.type}
                          </Badge>
                          <span className="text-sm text-gray-600">
                            {result.location}
                            {result.locationAr && (
                              <span className="mr-2 font-arabic">
                                {" "}({result.locationAr})
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                      <Sparkles className="h-4 w-4 text-orange-500 flex-shrink-0 mt-1" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-600">No results found</p>
                <p className="text-sm text-gray-500 mt-1">
                  Try searching in Arabic, French, or English
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchBar;

