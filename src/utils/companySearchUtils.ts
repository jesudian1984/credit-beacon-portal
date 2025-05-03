
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
  
  // First, find exact matches and matches that start with the search term
  const exactMatches = companyNames
    .filter(name => name === searchTerm)
    .map(name => toProperCase(name));
    
  const startsWithMatches = companyNames
    .filter(name => name !== searchTerm && name.startsWith(searchTerm))
    .map(name => toProperCase(name));
  
  matches.push(...exactMatches, ...startsWithMatches);
  
  // Then add word-boundary matches (for multi-word companies like "tata consultancy services")
  if (matches.length < limit) {
    const wordBoundaryMatches = companyNames
      .filter(name => 
        !matches.includes(toProperCase(name)) && // Skip already matched
        name.split(' ').some(word => word.startsWith(searchTerm))
      )
      .map(name => toProperCase(name));
    
    matches.push(...wordBoundaryMatches.slice(0, limit - matches.length));
  }
  
  // Then add contains matches if we haven't hit the limit
  if (matches.length < limit) {
    const containsMatches = companyNames
      .filter(name => 
        !matches.includes(toProperCase(name)) && // Skip already matched
        !name.startsWith(searchTerm) && 
        name.includes(searchTerm)
      )
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
