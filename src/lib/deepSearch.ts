/**
 * DeepSearch - Multi-language semantic search
 * 
 * Supports:
 * - Arabic (Modern Standard Arabic)
 * - Tunisian Arabic dialect (تونسي)
 * - French (common in Tunisia)
 * - English
 * - Future languages (extensible)
 * 
 * Features:
 * - Transliteration (Arabic ↔ Latin)
 * - Dialect variations (Tunisian Arabic)
 * - Fuzzy matching (handles typos)
 * - Multi-field search
 * - Relevance ranking
 */

export interface SearchableItem {
  id: string;
  title: string;
  titleAr?: string; // Arabic title
  description?: string;
  descriptionAr?: string; // Arabic description
  location?: string;
  locationAr?: string; // Arabic location
  tags?: string[];
  tagsAr?: string[]; // Arabic tags
  [key: string]: any;
}

export interface SearchOptions {
  threshold?: number; // 0-1, minimum match score
  limit?: number; // Max results
  fields?: string[]; // Fields to search
  weights?: Record<string, number>; // Field importance
  languages?: string[]; // Languages to search in
}

// Tunisian Arabic dialect variations
const TUNISIAN_VARIATIONS: Record<string, string[]> = {
  // Common Tunisian words
  'نابل': ['nabeul', 'nabeul', 'nabeul'],
  'قيروان': ['kairouan', 'kairouane', 'qayrawan'],
  'صفاقس': ['sfax', 'safaqis'],
  'توزر': ['tozeur', 'tozeur'],
  'فخار': ['pottery', 'ceramics', 'poterie'],
  'نسيج': ['weaving', 'textile', 'tissage'],
  'نحاس': ['copper', 'cuivre'],
  'زيتون': ['olive', 'olivewood', 'olivier'],
  'حرفي': ['artisan', 'craftsman', 'artisan'],
  'تراث': ['heritage', 'patrimoine'],
};

// Arabic to Latin transliteration (simplified)
const ARABIC_TO_LATIN: Record<string, string> = {
  'ا': 'a', 'أ': 'a', 'إ': 'i', 'آ': 'aa',
  'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j',
  'ح': 'h', 'خ': 'kh', 'د': 'd', 'ذ': 'dh',
  'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'sh',
  'ص': 's', 'ض': 'd', 'ط': 't', 'ظ': 'z',
  'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q',
  'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n',
  'ه': 'h', 'و': 'w', 'ي': 'y', 'ى': 'a',
  'ة': 'a', 'ء': 'a',
};

// Latin to Arabic (reverse transliteration)
const LATIN_TO_ARABIC_PATTERNS: Record<string, string> = {
  'nabeul': 'نابل',
  'kairouan': 'قيروان',
  'sfax': 'صفاقس',
  'tozeur': 'توزر',
  'pottery': 'فخار',
  'weaving': 'نسيج',
  'copper': 'نحاس',
  'olive': 'زيتون',
  'artisan': 'حرفي',
  'heritage': 'تراث',
};

/**
 * Detect language of text
 */
function detectLanguage(text: string): string[] {
  const languages: string[] = [];
  
  // Check for Arabic script
  if (/[\u0600-\u06FF]/.test(text)) {
    languages.push('ar');
  }
  
  // Check for French (common words)
  if (/\b(et|le|la|les|de|du|des|dans|pour|avec|sur|sous|par|chez)\b/i.test(text)) {
    languages.push('fr');
  }
  
  // Check for English
  if (/\b(the|and|or|but|in|on|at|to|for|of|with|by)\b/i.test(text)) {
    languages.push('en');
  }
  
  // Default to all if no specific language detected
  return languages.length > 0 ? languages : ['ar', 'fr', 'en'];
}

/**
 * Transliterate Arabic to Latin script
 */
function transliterateArabic(text: string): string {
  return text
    .split('')
    .map(char => ARABIC_TO_LATIN[char] || char)
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Get Tunisian dialect variations
 */
function getTunisianVariations(text: string): string[] {
  const variations = [text.toLowerCase()];
  
  // Check if text matches known Tunisian variations
  Object.entries(TUNISIAN_VARIATIONS).forEach(([arabic, latin]) => {
    if (text.includes(arabic) || text.toLowerCase().includes(latin[0])) {
      variations.push(...latin);
      variations.push(arabic);
    }
  });
  
  // Add reverse transliteration
  if (/[\u0600-\u06FF]/.test(text)) {
    variations.push(transliterateArabic(text));
  }
  
  // Add Arabic equivalent if Latin
  Object.entries(LATIN_TO_ARABIC_PATTERNS).forEach(([latin, arabic]) => {
    if (text.toLowerCase().includes(latin)) {
      variations.push(arabic);
    }
  });
  
  return [...new Set(variations)]; // Remove duplicates
}

/**
 * Normalize text for search (handles Arabic, French, English)
 */
function normalizeText(text: string): string[] {
  const normalized: string[] = [];
  
  // Original lowercase
  normalized.push(text.toLowerCase().trim());
  
  // Remove diacritics (Arabic tashkeel)
  const withoutDiacritics = text.replace(/[\u064B-\u065F\u0670]/g, '');
  if (withoutDiacritics !== text) {
    normalized.push(withoutDiacritics.toLowerCase().trim());
  }
  
  // Transliteration variants
  if (/[\u0600-\u06FF]/.test(text)) {
    normalized.push(transliterateArabic(text).toLowerCase());
  }
  
  // Tunisian variations
  normalized.push(...getTunisianVariations(text));
  
  return [...new Set(normalized)];
}

/**
 * Tokenize text (handles multiple languages)
 */
function tokenize(text: string): string[] {
  // Split by spaces and punctuation
  const tokens = text
    .toLowerCase()
    .split(/[\s\u200C\u200D\u00A0,.;:!?()\[\]{}'"]+/)
    .filter(token => token.length > 0);
  
  // Also create normalized versions
  const normalizedTokens: string[] = [];
  tokens.forEach(token => {
    normalizedTokens.push(token);
    normalizedTokens.push(...normalizeText(token));
  });
  
  return [...new Set(normalizedTokens)];
}

/**
 * Calculate similarity between query and text
 * Handles Arabic, French, English, and transliteration
 */
function calculateSimilarity(query: string, text: string): number {
  // Normalize both
  const queryVariants = normalizeText(query);
  const textVariants = normalizeText(text);
  
  let maxScore = 0;
  
  // Check all combinations
  queryVariants.forEach(qVariant => {
    textVariants.forEach(tVariant => {
      // Exact match
      if (tVariant === qVariant) {
        maxScore = Math.max(maxScore, 1.0);
        return;
      }
      
      // Substring match
      if (tVariant.includes(qVariant) || qVariant.includes(tVariant)) {
        maxScore = Math.max(maxScore, 0.8);
        return;
      }
      
      // Word boundary match
      const tWords = tVariant.split(/\s+/);
      const qWords = qVariant.split(/\s+/);
      let wordMatches = 0;
      
      qWords.forEach(qWord => {
        if (tWords.some(tWord => tWord.includes(qWord) || qWord.includes(tWord))) {
          wordMatches++;
        }
      });
      
      if (wordMatches > 0) {
        maxScore = Math.max(maxScore, 0.5 + (wordMatches / qWords.length) * 0.3);
        return;
      }
      
      // Levenshtein distance for typos
      const distance = levenshteinDistance(qVariant, tVariant);
      const maxLen = Math.max(qVariant.length, tVariant.length);
      if (maxLen > 0) {
        const similarity = 1 - (distance / maxLen);
        maxScore = Math.max(maxScore, similarity * 0.6); // Lower weight for fuzzy matches
      }
    });
  });
  
  return maxScore;
}

/**
 * Levenshtein distance - measures string similarity
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

/**
 * Get nested field value safely
 */
function getFieldValue(obj: any, field: string): any {
  if (field.includes('.')) {
    return field.split('.').reduce((val, key) => val?.[key], obj);
  }
  return obj[field];
}

/**
 * DeepSearch - Multi-language semantic search
 * 
 * HOW IT WORKS:
 * 1. Detects language (Arabic, French, English)
 * 2. Normalizes text (removes diacritics, transliterates)
 * 3. Gets Tunisian dialect variations
 * 4. Calculates similarity scores across all variants
 * 5. Weights different fields (title > description > location)
 * 6. Returns ranked results
 * 
 * WHY IT'S POWERFUL:
 * - Searches in Arabic, French, English simultaneously
 * - Handles Tunisian dialect variations
 * - Transliteration support (Arabic ↔ Latin)
 * - Fuzzy matching (handles typos in any language)
 * - Multi-field search (searches all relevant fields)
 * - Relevance ranking (better matches first)
 * 
 * WHERE IT'S USED:
 * - Main search bar (header)
 * - Accommodations page
 * - Artisans page
 * - Events page
 * - API endpoints (/api/listings)
 * - Future: Any searchable content
 */
export function deepSearch<T extends SearchableItem>(
  items: T[],
  query: string,
  options: SearchOptions = {}
): T[] {
  const {
    threshold = 0.2, // Lower threshold for multi-language
    limit = 20,
    fields = ['title', 'titleAr', 'description', 'descriptionAr', 'location', 'locationAr', 'tags', 'tagsAr'],
    weights = { 
      title: 3, 
      titleAr: 3, 
      description: 2, 
      descriptionAr: 2, 
      location: 1.5, 
      locationAr: 1.5,
      tags: 1,
      tagsAr: 1
    },
    languages = ['ar', 'fr', 'en'] // Default: Arabic, French, English
  } = options;

  if (!query.trim()) return items.slice(0, limit);

  // Detect query language
  const queryLanguages = detectLanguage(query);
  const queryLower = query.toLowerCase();
  const queryVariants = normalizeText(query);

  // Calculate relevance score for each item
  const scored = items.map(item => {
    let totalScore = 0;
    let maxPossibleScore = 0;

    fields.forEach(field => {
      const fieldValue = getFieldValue(item, field);
      if (!fieldValue) return;

      const weight = weights[field] || 1;
      maxPossibleScore += weight;

      if (Array.isArray(fieldValue)) {
        // For arrays (tags, amenities)
        fieldValue.forEach(val => {
          const valStr = String(val);
          queryVariants.forEach(qVariant => {
            const score = calculateSimilarity(qVariant, valStr);
            totalScore += score * weight;
          });
        });
      } else {
        // For strings - check all query variants
        const valStr = String(fieldValue);
        queryVariants.forEach(qVariant => {
          const score = calculateSimilarity(qVariant, valStr);
          totalScore += score * weight;
        });
      }
    });

    const relevance = maxPossibleScore > 0 ? totalScore / maxPossibleScore : 0;
    return { item, relevance };
  });

  // Filter by threshold and sort by relevance
  return scored
    .filter(({ relevance }) => relevance >= threshold)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit)
    .map(({ item }) => item);
}

/**
 * Search with filters (region, type, price)
 * Supports Arabic location names
 */
export function deepSearchWithFilters<T extends SearchableItem>(
  items: T[],
  query: string,
  filters: {
    region?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
  },
  options?: SearchOptions
): T[] {
  let filtered = items;

  // Apply filters first (with Arabic support)
  if (filters.region) {
    const regionVariants = normalizeText(filters.region);
    filtered = filtered.filter(item => {
      const location = item.location?.toLowerCase() || '';
      const locationAr = item.locationAr?.toLowerCase() || '';
      
      return regionVariants.some(variant => 
        location.includes(variant) || 
        locationAr.includes(variant) ||
        calculateSimilarity(variant, location) > 0.7 ||
        calculateSimilarity(variant, locationAr) > 0.7
      );
    });
  }

  if (filters.type) {
    const typeVariants = normalizeText(filters.type);
    filtered = filtered.filter(item => {
      const itemType = (item as any).type?.toLowerCase() || '';
      const tags = item.tags?.map(t => String(t).toLowerCase()) || [];
      const tagsAr = item.tagsAr?.map(t => String(t).toLowerCase()) || [];
      
      return typeVariants.some(variant =>
        itemType.includes(variant) ||
        tags.some(tag => tag.includes(variant)) ||
        tagsAr.some(tag => tag.includes(variant))
      );
    });
  }

  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(item => 
      (item as any).price >= filters.minPrice!
    );
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(item => 
      (item as any).price <= filters.maxPrice!
    );
  }

  // Then apply deep search
  return deepSearch(filtered, query, options);
}

/**
 * Add support for future languages
 * Extend this function to add new language support
 */
export function addLanguageSupport(
  languageCode: string,
  config: {
    transliteration?: Record<string, string>;
    variations?: Record<string, string[]>;
    patterns?: Record<string, string>;
  }
) {
  // Add transliteration rules
  if (config.transliteration) {
    Object.assign(ARABIC_TO_LATIN, config.transliteration);
  }
  
  // Add variations
  if (config.variations) {
    Object.assign(TUNISIAN_VARIATIONS, config.variations);
  }
  
  // Add patterns
  if (config.patterns) {
    Object.assign(LATIN_TO_ARABIC_PATTERNS, config.patterns);
  }
}

// Example: Add support for Berber (Tamazight) in the future
// addLanguageSupport('ber', {
//   transliteration: { 'ⴰ': 'a', 'ⴱ': 'b', ... },
//   variations: { 'ⴰⵎⴰⵣⵉⵖ': ['amazigh', 'berber'] },
//   patterns: { 'amazigh': 'ⴰⵎⴰⵣⵉⵖ' }
// });

