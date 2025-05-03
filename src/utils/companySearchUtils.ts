
import COMPANY_MAPPINGS from './companyMappings';

/**
 * Find company name suggestions based on partial input
 */
export function findCompanySuggestions(input: string, limit: number = 6): string[] {
  if (!input || input.trim().length < 2) return [];
  
  const searchTerm = input.toLowerCase().trim();
  const matches: string[] = [];
  
  // Convert object keys to proper case for display
  const companyNames = Object.keys(COMPANY_MAPPINGS).map(key => {
    // Convert from lowercase key to proper case (capitalize first letter of each word)
    return key.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  });
  
  // Find matches that start with the search term first
  const startsWithMatches = companyNames.filter(name => 
    name.toLowerCase().startsWith(searchTerm)
  );
  matches.push(...startsWithMatches);
  
  // Then add contains matches if we haven't hit the limit
  if (matches.length < limit) {
    const containsMatches = companyNames.filter(name => 
      !name.toLowerCase().startsWith(searchTerm) && 
      name.toLowerCase().includes(searchTerm)
    );
    matches.push(...containsMatches.slice(0, limit - matches.length));
  }
  
  return matches.slice(0, limit);
}
