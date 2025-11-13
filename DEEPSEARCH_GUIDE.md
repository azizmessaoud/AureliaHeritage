# DeepSearch Multi-Language Guide

## 🌍 What is DeepSearch?

DeepSearch is a **multi-language semantic search system** that supports:
- ✅ **Arabic** (Modern Standard Arabic)
- ✅ **Tunisian Arabic Dialect** (تونسي)
- ✅ **French** (common in Tunisia)
- ✅ **English**
- ✅ **Future languages** (extensible)

## 🎯 Why DeepSearch?

### Problem Solved:
1. **Language Barriers**: Users search in different languages
   - Arabic: "نابل" (Nabeul)
   - French: "poterie" (pottery)
   - English: "pottery workshop"

2. **Tunisian Dialect Variations**:
   - "قيروان" = "Kairouan" = "Kairouane"
   - "فخار" = "pottery" = "poterie"

3. **Typos & Variations**:
   - "potery" → finds "pottery"
   - "Kairwan" → finds "Kairouan"

4. **Multi-field Search**:
   - Searches title, description, location, tags simultaneously
   - Ranks by relevance (better matches first)

## 🔧 How It Works

### 1. Language Detection
```typescript
// Automatically detects:
detectLanguage("نابل") // → ['ar']
detectLanguage("pottery workshop") // → ['en']
detectLanguage("atelier de poterie") // → ['fr']
```

### 2. Transliteration
```typescript
// Arabic ↔ Latin conversion
transliterateArabic("نابل") // → "nabel"
transliterateArabic("قيروان") // → "qayrawan"
```

### 3. Tunisian Variations
```typescript
// Handles dialect variations
getTunisianVariations("نابل")
// → ["nabeul", "nabeul", "نابل", "nabel"]
```

### 4. Similarity Calculation
- **Exact match**: 1.0 score
- **Substring match**: 0.8 score
- **Word match**: 0.5-0.8 score
- **Fuzzy match** (typos): 0.0-0.6 score

### 5. Relevance Ranking
- Title matches weighted 3x
- Location matches weighted 2x
- Description matches weighted 1.5x
- Tags matches weighted 1x

## 📍 Where It's Used

### 1. Header Search Bar
```typescript
// Users can search in any language
<SearchBar placeholder="Search in Arabic, French, or English..." />
```

**Example searches:**
- "نابل" → Finds Nabeul listings
- "pottery" → Finds pottery workshops
- "فخار" → Finds pottery (Arabic)
- "atelier" → Finds workshops (French)

### 2. Accommodations Page
```typescript
// Search with filters
deepSearchWithFilters(
  accommodations,
  "نابل", // Arabic search
  { region: "Nabeul", minPrice: 50, maxPrice: 100 },
  { threshold: 0.2 }
)
```

### 3. Artisans Page
```typescript
// Search artisans by craft name
deepSearch(artisans, "حرفي", {
  weights: { title: 3, craft: 2, location: 1.5 }
})
```

### 4. API Endpoints
```typescript
// GET /api/listings?q=نابل&region=Tozeur
// Searches in Arabic, filters by region
```

## 🚀 Usage Examples

### Basic Search
```typescript
import { deepSearch } from "@/lib/deepSearch";

const results = deepSearch(listings, "pottery", {
  threshold: 0.2,
  limit: 20,
  weights: {
    title: 3,
    description: 2,
    location: 1.5
  }
});
```

### Search with Filters
```typescript
import { deepSearchWithFilters } from "@/lib/deepSearch";

const results = deepSearchWithFilters(
  listings,
  "نابل", // Arabic search
  {
    region: "Nabeul",
    type: "EXPERIENCE",
    minPrice: 50,
    maxPrice: 100
  },
  {
    threshold: 0.2,
    languages: ['ar', 'fr', 'en']
  }
);
```

### Multi-language Search
```typescript
// User searches "فخار" (Arabic for pottery)
// System finds:
// - "Pottery Workshop" (English)
// - "Atelier de Poterie" (French)
// - "ورشة الفخار" (Arabic)
```

## 🔮 Future Language Support

### Adding New Languages

```typescript
import { addLanguageSupport } from "@/lib/deepSearch";

// Example: Add Berber (Tamazight)
addLanguageSupport('ber', {
  transliteration: {
    'ⴰ': 'a',
    'ⴱ': 'b',
    // ... more characters
  },
  variations: {
    'ⴰⵎⴰⵣⵉⵖ': ['amazigh', 'berber']
  },
  patterns: {
    'amazigh': 'ⴰⵎⴰⵣⵉⵖ'
  }
});
```

## 📊 Performance

- **Fast**: Uses memoization and efficient algorithms
- **Scalable**: Handles 1000+ items efficiently
- **Accurate**: Relevance ranking ensures best results first

## 🎨 UI Integration

### SearchBar Component
```tsx
<SearchBar 
  placeholder="Search in Arabic, French, or English..."
  onResultClick={(result) => navigate(result.url)}
/>
```

**Features:**
- Real-time search as you type
- Dropdown with results
- Shows Arabic text with proper RTL support
- Keyboard navigation (Arrow keys, Enter, Escape)

## 🌐 Responsive Design

All search components are fully responsive:
- **Mobile**: Full-width search bar
- **Tablet**: Centered search with filters
- **Desktop**: Integrated in header with dropdown

## ✅ Benefits

1. **User Experience**: Users can search in their preferred language
2. **Accessibility**: Supports Arabic RTL text
3. **Accuracy**: Finds results even with typos
4. **Flexibility**: Extensible for future languages
5. **Performance**: Fast and efficient

## 🔍 Testing

### Test Cases

```typescript
// Arabic search
deepSearch(listings, "نابل") // Should find Nabeul listings

// French search
deepSearch(listings, "poterie") // Should find pottery

// English search
deepSearch(listings, "pottery") // Should find pottery

// Tunisian dialect
deepSearch(listings, "قيروان") // Should find Kairouan

// Typo handling
deepSearch(listings, "potery") // Should find "pottery"

// Mixed language
deepSearch(listings, "نابل pottery") // Should find Nabeul pottery
```

## 📝 Database Schema

To support Arabic content, add these fields:

```prisma
model Listing {
  title        String
  titleAr      String?  // Arabic title
  description  String
  descriptionAr String? // Arabic description
  location     String
  locationAr   String?  // Arabic location
  tags         String[]
  tagsAr       String[]? // Arabic tags
}
```

## 🎯 Next Steps

1. **Add Arabic content** to database listings
2. **Test with real users** in Arabic, French, English
3. **Extend variations** for more Tunisian dialect words
4. **Add more languages** as needed (Berber, Italian, etc.)

---

**DeepSearch makes AureliaHeritage accessible to all Tunisians, regardless of their preferred language!** 🌍✨

