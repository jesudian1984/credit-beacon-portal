
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
  
  // Then add first-word boundary matches (for multi-word companies)
  if (matches.length < limit) {
    const firstWordMatches = companyNames
      .filter(name => 
        !matches.includes(toProperCase(name)) && // Skip already matched
        name.split(' ')[0] === searchTerm
      )
      .map(name => toProperCase(name));
    
    matches.push(...firstWordMatches.slice(0, limit - matches.length));
  }
  
  // Then add word-boundary matches (for multi-word companies like "atam apparels private limited")
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
  
  // Finally, implement fuzzy matching for partial word matches
  if (matches.length < limit) {
    const fuzzyMatches = companyNames
      .filter(name => {
        if (matches.includes(toProperCase(name))) return false;
        
        // Check if any part of the company name contains the search term
        const nameParts = name.split(/[\s\-_\.]/); // Split by spaces, hyphens, underscores, periods
        return nameParts.some(part => part.includes(searchTerm));
      })
      .map(name => toProperCase(name));
    
    matches.push(...fuzzyMatches.slice(0, limit - matches.length));
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

/**
 * Get loan features by company category
 * @param category Company category (A, B, C, D)
 */
export function getLoanFeaturesByCompanyCategory(category: string): {
  interestRates: { personal: string, home: string, business: string };
  tenureOptions: { personal: string, home: string, business: string };
  preclosureCharges: { personal: string, home: string, business: string };
  maxEligibility: { personal: string, home: string, business: string };
} {
  const baseInterestRates = {
    personal: "10.35% - 12.50%",
    home: "8.40% - 9.25%",
    business: "16.00% - 18.50%",
  };
  
  const baseTenureOptions = {
    personal: "1 - 7 years",
    home: "5 - 30 years",
    business: "1 - 7 years",
  };
  
  const basePreclosureCharges = {
    personal: "2% of outstanding",
    home: "0% (after 3 years)",
    business: "3% of outstanding",
  };
  
  const baseMaxEligibility = {
    personal: "Up to 30X monthly income",
    home: "Up to 60X monthly income",
    business: "Up to 24X monthly income",
  };
  
  // Adjust values based on company category
  switch(category) {
    case 'A':
      return {
        interestRates: {
          personal: "9.75% - 11.50%",
          home: "8.20% - 8.95%",
          business: "15.00% - 17.50%",
        },
        tenureOptions: baseTenureOptions,
        preclosureCharges: {
          personal: "1% of outstanding",
          home: "0% (after 1 year)",
          business: "2% of outstanding",
        },
        maxEligibility: {
          personal: "Up to 36X monthly income",
          home: "Up to 70X monthly income",
          business: "Up to 30X monthly income",
        },
      };
      
    case 'B':
      return {
        interestRates: {
          personal: "10.15% - 12.00%",
          home: "8.30% - 9.10%",
          business: "15.50% - 18.00%",
        },
        tenureOptions: baseTenureOptions,
        preclosureCharges: {
          personal: "1.5% of outstanding",
          home: "0% (after 2 years)",
          business: "2.5% of outstanding",
        },
        maxEligibility: {
          personal: "Up to 30X monthly income",
          home: "Up to 65X monthly income",
          business: "Up to 27X monthly income",
        },
      };
      
    case 'C':
      return {
        interestRates: baseInterestRates,
        tenureOptions: baseTenureOptions,
        preclosureCharges: basePreclosureCharges,
        maxEligibility: baseMaxEligibility,
      };
      
    case 'D':
    default:
      return {
        interestRates: {
          personal: "11.50% - 14.00%",
          home: "9.00% - 10.25%",
          business: "17.50% - 20.00%",
        },
        tenureOptions: {
          personal: "1 - 5 years",
          home: "5 - 25 years",
          business: "1 - 5 years",
        },
        preclosureCharges: {
          personal: "3% of outstanding",
          home: "0.5% (any time)",
          business: "4% of outstanding",
        },
        maxEligibility: {
          personal: "Up to 24X monthly income",
          home: "Up to 50X monthly income",
          business: "Up to 18X monthly income",
        },
      };
  }
}
