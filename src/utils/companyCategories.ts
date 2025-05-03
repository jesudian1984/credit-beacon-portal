
// A utility to determine company categories based on company names
// This is a simplified implementation with some example companies

type CompanyCategory = 'A' | 'B' | 'C' | 'D';

interface CompanyCategoryInfo {
  category: CompanyCategory;
  description: string;
}

// Pre-defined company category mappings
const COMPANY_MAPPINGS: Record<string, CompanyCategory> = {
  // Top Tier - Category A
  "tata": "A",
  "infosys": "A",
  "wipro": "A",
  "tcs": "A",
  "reliance": "A",
  "hdfc": "A",
  "google": "A", 
  "microsoft": "A",
  "amazon": "A",
  "apple": "A",
  "meta": "A",
  "facebook": "A",
  "ibm": "A",
  "accenture": "A",
  "mahindra": "A",
  "cisco": "A",
  "intel": "A",
  "oracle": "A",
  "icici": "A",
  "sbi": "A",
  "axis bank": "A",
  
  // Mid Tier - Category B
  "mindtree": "B",
  "cognizant": "B",
  "capgemini": "B",
  "tech mahindra": "B",
  "hcl": "B",
  "ltimindtree": "B",
  "larsen & toubro": "B",
  "adani": "B",
  "birla": "B",
  "aditya birla": "B",
  "kotak": "B",
  "yes bank": "B",
  "indusind": "B",
  "idfc": "B",
  "bajaj": "B",
  "cipla": "B",
  "zomato": "B",
  "swiggy": "B",
  "paytm": "B",
  "ola": "B",
  
  // Regular - Category C
  "state government": "C",
  "central government": "C",
  "government": "C",
  "railways": "C",
  "postal": "C",
  "education department": "C",
  "health department": "C",
  "municipality": "C",
  "panchayat": "C",
  "public works": "C",
  "public sector": "C",
  "bsnl": "C",
  "bhel": "C",
  "sail": "C",
  "ongc": "C",
  "ntpc": "C",
  "bank of india": "C",
  "bank of baroda": "C",
  "canara bank": "C",
  
  // Small Business/Self-employed - Category D
  "self employed": "D",
  "freelancer": "D",
  "consultant": "D",
  "proprietor": "D",
  "startup": "D",
  "small business": "D",
  "shop": "D",
  "retail": "D",
  "local business": "D",
  "partnership firm": "D",
  "micro enterprise": "D"
};

/**
 * Determine company category based on company name
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
  
  // Check for partial matches
  for (const [key, value] of Object.entries(COMPANY_MAPPINGS)) {
    if (normalizedName.includes(key.toLowerCase()) || key.toLowerCase().includes(normalizedName)) {
      return getCategoryInfo(value);
    }
  }
  
  // Default category if no match found
  return {
    category: 'D',
    description: 'Company not found in our database (defaulted to Category D)'
  };
}

/**
 * Get detailed information about a company category
 */
export function getCategoryInfo(category: CompanyCategory): CompanyCategoryInfo {
  switch (category) {
    case 'A':
      return {
        category: 'A',
        description: 'Top Tier (MNC/Listed Companies)'
      };
    case 'B':
      return {
        category: 'B',
        description: 'Mid Tier (Large Private Companies)'
      };
    case 'C':
      return {
        category: 'C',
        description: 'Regular (SMEs/Government)'
      };
    case 'D':
      return {
        category: 'D',
        description: 'Others (Small Business/Self-employed)'
      };
  }
}

/**
 * List of example companies for each category (for UI suggestions)
 */
export const companySuggestions = {
  A: ['Tata Consultancy Services', 'Infosys', 'Reliance Industries', 'HDFC Bank', 'ICICI Bank', 'Google India', 'Microsoft India'],
  B: ['MindTree', 'Tech Mahindra', 'Capgemini India', 'Aditya Birla Group', 'Kotak Mahindra', 'LTIMindtree'],
  C: ['State Government', 'Central Government', 'Railways', 'BSNL', 'Bank of India', 'Bank of Baroda', 'Canara Bank'],
  D: ['Self Employed', 'Freelancer', 'Local Retail Shop', 'Small Business Owner', 'Startup']
};
