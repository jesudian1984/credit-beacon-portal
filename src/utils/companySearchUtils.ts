
import COMPANY_MAPPINGS from './companyMappings';

/**
 * Find company name suggestions based on partial input
 */
export function findCompanySuggestions(input: string, limit: number = 6): string[] {
  if (!input || input.trim().length < 2) return [];
  
  const searchTerm = input.toLowerCase().trim();
  const matches: string[] = [];
  
  // Get all company names from mappings
  const companyNames = Object.keys(COMPANY_MAPPINGS);
  
  // First, find matches that start with the search term
  const startsWithMatches = companyNames
    .filter(name => name.startsWith(searchTerm))
    .map(name => toProperCase(name));
  
  matches.push(...startsWithMatches);
  
  // Then add contains matches if we haven't hit the limit
  if (matches.length < limit) {
    const containsMatches = companyNames
      .filter(name => !name.startsWith(searchTerm) && name.includes(searchTerm))
      .map(name => toProperCase(name));
    
    matches.push(...containsMatches.slice(0, limit - matches.length));
  }
  
  return matches.slice(0, limit);
}

/**
 * Convert a string to proper case (capitalizing first letter of each word)
 */
function toProperCase(str: string): string {
  return str.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
