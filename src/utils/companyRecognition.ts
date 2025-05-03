
import { CompanyCategoryInfo } from './companyTypes';
import COMPANY_MAPPINGS from './companyMappings';
import { getCategoryInfo } from './categoryDescriptions';

/**
 * Enhanced company category detection similar to financial aggregators
 * @param companyName The name of the company to categorize
 * @returns CompanyCategoryInfo object with category and description
 */
export function determineCompanyCategory(companyName: string): CompanyCategoryInfo {
  if (!companyName || companyName.trim() === '') {
    return {
      category: 'D',
      description: 'Unable to determine category (defaulting to Category D)'
    };
  }
  
  const normalizedName = companyName.toLowerCase().trim();
  
  // Check for exact matches in the mappings
  for (const [key, value] of Object.entries(COMPANY_MAPPINGS)) {
    if (normalizedName === key.toLowerCase()) {
      return getCategoryInfo(value);
    }
  }
  
  // Improved partial match detection with word boundary checking
  for (const [key, value] of Object.entries(COMPANY_MAPPINGS)) {
    // Match when company name contains the key as a whole word
    const keyWords = key.toLowerCase().split(' ');
    const nameWords = normalizedName.split(' ');
    
    // Check if any key word appears as a whole word in the company name
    const hasMatch = keyWords.some(keyWord => 
      nameWords.some(nameWord => nameWord === keyWord || 
                   nameWord.startsWith(keyWord + ' ') || 
                   nameWord.endsWith(' ' + keyWord) ||
                   nameWord.includes(keyWord))
    );
    
    if (hasMatch) {
      return getCategoryInfo(value);
    }
  }
  
  // Industry-based categorization for unknown companies
  if (normalizedName.includes('bank') || 
      normalizedName.includes('insurance') || 
      normalizedName.includes('finance') || 
      normalizedName.includes('invest')) {
    return getCategoryInfo('B');
  }
  
  if (normalizedName.includes('tech') || 
      normalizedName.includes('software') || 
      normalizedName.includes('digital') || 
      normalizedName.includes('info')) {
    return getCategoryInfo('B');
  }
  
  // Default category if no match found
  return {
    category: 'D',
    description: 'Company not found in our database (defaulted to Category D)'
  };
}
