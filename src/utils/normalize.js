import countriesData from '../data/leagues.json' assert { type: 'json' };

/**
 * Build a map of country slugs to folder names
 */
const buildCountryMap = () => {
  const map = {};
  countriesData.countries.forEach(country => {
    map[country.slug] = country.folder;
  });
  return map;
};

const countryMap = buildCountryMap();

/**
 * Get the folder name for a country slug
 * @param {string} slug - The country slug from URL (e.g., "england")
 * @returns {string|null} - The actual folder name or null if not found
 */
export function getCountryFolder(slug) {
  return countryMap[slug.toLowerCase()] || null;
}

/**
 * Normalize a team name for case-insensitive matching
 * Removes special characters and converts to lowercase for comparison
 * @param {string} name - The team name to normalize
 * @returns {string} - Normalized name
 */
export function normalizeTeam(name) {
  if (!name) return '';
  return name
    .toLowerCase()
    .trim();
}

/**
 * Get similarity score between two strings (0-1)
 * Helps with fuzzy matching for special characters
 * @param {string} a - First string
 * @param {string} b - Second string
 * @returns {number} - Similarity score
 */
function stringSimilarity(a, b) {
  const aLower = normalizeTeam(a);
  const bLower = normalizeTeam(b);
  
  // Exact match
  if (aLower === bLower) return 1;
  
  // Check if one contains the other
  if (aLower.includes(bLower) || bLower.includes(aLower)) return 0.8;
  
  // Levenshtein-like: count matching characters
  let matches = 0;
  const minLen = Math.min(aLower.length, bLower.length);
  for (let i = 0; i < minLen; i++) {
    if (aLower[i] === bLower[i]) matches++;
  }
  
  return matches / Math.max(aLower.length, bLower.length);
}

/**
 * Find the best matching team filename from a list of files
 * @param {string} teamSlug - The team name from URL (may have dashes)
 * @param {string[]} files - Array of PNG filenames in the country directory
 * @returns {string|null} - The matched filename or null
 */
export function findTeamFile(teamSlug, files) {
  if (!files || files.length === 0) return null;
  
  const pngFiles = files.filter(f => f.endsWith('.png'));
  if (pngFiles.length === 0) return null;
  
  // Convert slug to search term (replace dashes with spaces, remove .png)
  const searchTerm = teamSlug.replace(/-/g, ' ');
  
  // First try: exact match (case-insensitive)
  const exactMatch = pngFiles.find(f => {
    const name = f.replace('.png', '').toLowerCase();
    return name === searchTerm.toLowerCase();
  });
  if (exactMatch) return exactMatch;
  
  // Second try: partial match (contains)
  const partialMatch = pngFiles.find(f => {
    const name = f.replace('.png', '').toLowerCase();
    return name.includes(searchTerm.toLowerCase());
  });
  if (partialMatch) return partialMatch;
  
  // Third try: fuzzy match (best similarity)
  const withScores = pngFiles.map(f => ({
    file: f,
    score: stringSimilarity(f.replace('.png', ''), searchTerm)
  }));
  
  withScores.sort((a, b) => b.score - a.score);
  
  if (withScores[0].score > 0.6) {
    return withScores[0].file;
  }
  
  return null;
}

/**
 * Get all available countries
 * @returns {object[]} - Array of country objects with slug and name
 */
export function getAvailableCountries() {
  return countriesData.countries;
}
