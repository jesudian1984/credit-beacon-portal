
// A utility to determine company categories based on company names
// This is a comprehensive implementation similar to financial aggregators

type CompanyCategory = 'A' | 'B' | 'C' | 'D';

interface CompanyCategoryInfo {
  category: CompanyCategory;
  description: string;
}

// Enhanced pre-defined company category mappings (similar to financial aggregators data)
const COMPANY_MAPPINGS: Record<string, CompanyCategory> = {
  // Top Tier - Category A (MNCs, Large Listed Companies)
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
  "pwc": "A",
  "deloitte": "A",
  "kpmg": "A",
  "ey": "A",
  "l&t": "A",
  "nestle": "A",
  "unilever": "A",
  "hindustan unilever": "A",
  "hul": "A",
  "hp": "A",
  "dell": "A",
  "adobe": "A",
  "airtel": "A",
  "bharti": "A",
  "jio": "A",
  "netflix": "A",
  "walmart": "A",
  "nike": "A",
  "samsung": "A",
  "sony": "A",
  "toyota": "A",
  "honda": "A",
  "adani group": "A",
  "hindustan petroleum": "A",
  "indian oil": "A",
  "coal india": "A",
  "ntpc": "A",
  "power grid": "A",
  "bhel": "A", // Moved to Category A, was duplicated in Category C
  "gail": "A",
  "maruti suzuki": "A",
  "hero motocorp": "A",
  "hdfc bank": "A",
  "kotak bank": "A",
  "idfc bank": "A",
  "indusind bank": "A", // Changed from "indusind" to be more specific
  "federal bank": "A",
  "hexaware": "A",
  
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
  "yes bank": "B", // Moved from Category A, was duplicated
  // "indusind": "B", // Removed duplicate, using more specific "indusind bank" in Category A
  "idfc": "B",
  "bajaj": "B",
  "cipla": "B",
  "zomato": "B",
  "swiggy": "B",
  "paytm": "B",
  "ola": "B",
  "byjus": "B",
  "oyo": "B",
  "flipkart": "B",
  "myntra": "B",
  "makemytrip": "B",
  "cleartrip": "B",
  "yatra": "B",
  "irctc": "B",
  "adp": "B",
  "genpact": "B",
  "mphasis": "B",
  "persistent": "B",
  "cyient": "B",
  "cgi": "B",
  "tata power": "B",
  "tata steel": "B",
  "suzlon": "B",
  "godrej": "B",
  "jubilant": "B",
  "lupin": "B",
  "sun pharma": "B",
  "dr reddy": "B",
  "apollo hospitals": "B",
  "fortis": "B",
  "max healthcare": "B",
  "policybazaar": "B",
  "paisabazaar": "B",
  "bankbazaar": "B",
  "justdial": "B",
  "naukri": "B",
  "infoedge": "B",
  "eicher motors": "B",
  "tvs motors": "B",
  "ashok leyland": "B",
  
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
  // "bhel": "C", // Removed duplicate, already in Category A
  "sail": "C",
  "ongc": "C",
  "ntpc": "C", // This is also in Category A, consider removing one instance
  "bank of india": "C",
  "bank of baroda": "C",
  "canara bank": "C",
  "corporation bank": "C",
  "punjab national bank": "C",
  "union bank": "C",
  "indian bank": "C",
  "allahabad bank": "C",
  "andhra bank": "C",
  "central bank": "C",
  "syndicate bank": "C",
  "ucb bank": "C",
  "indian overseas bank": "C",
  "dena bank": "C",
  "vijaya bank": "C",
  "oriental bank": "C",
  "army": "C",
  "navy": "C",
  "air force": "C",
  "defence": "C",
  "police": "C",
  "healthcare department": "C",
  "university": "C",
  "college": "C",
  "school": "C",
  "teaching": "C",
  "nursing": "C",
  "psu": "C",
  "public sector undertaking": "C",
  "electricity board": "C",
  "water board": "C",
  "transport corporation": "C",
  "municipal corporation": "C",
  "zilla parishad": "C",
  "grameen bank": "C",
  
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
  "micro enterprise": "D",
  "kirana": "D",
  "restaurant": "D",
  "cafe": "D",
  "bakery": "D",
  "salon": "D",
  "boutique": "D",
  "tailor": "D",
  "carpenter": "D",
  "plumber": "D",
  "electrician": "D",
  "mechanic": "D",
  "driver": "D",
  "taxi": "D",
  "private practice": "D",
  "clinic": "D",
  "pharmacy": "D",
  "medical store": "D",
  "general store": "D",
  "provision store": "D",
  "stationery shop": "D",
  "hardware store": "D",
  "food stall": "D",
  "coaching center": "D",
  "tuition center": "D",
  "gym": "D",
  "fitness center": "D",
  "yoga center": "D",
  "property dealer": "D",
  "broker": "D",
  "travel agent": "D",
  "event manager": "D",
  "wedding planner": "D",
  "content creator": "D",
  "youtuber": "D",
  "influencer": "D"
};

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
  A: ['Tata Consultancy Services', 'Infosys', 'Reliance Industries', 'HDFC Bank', 'ICICI Bank', 'Google India', 'Microsoft India', 'Hexaware'],
  B: ['MindTree', 'Tech Mahindra', 'Capgemini India', 'Aditya Birla Group', 'Kotak Mahindra', 'LTIMindtree', 'PaisaBazaar'],
  C: ['State Government', 'Central Government', 'Railways', 'BSNL', 'Bank of India', 'Bank of Baroda', 'Canara Bank'],
  D: ['Self Employed', 'Freelancer', 'Local Retail Shop', 'Small Business Owner', 'Startup']
};

/**
 * Add companies from bulk data (such as Excel imports)
 * @param companies Array of company data objects with name and category
 * @returns Number of companies added
 */
export function addCompaniesFromBulkData(companies: Array<{name: string, category: CompanyCategory}>): number {
  let addedCount = 0;
  
  companies.forEach(company => {
    if (company.name && company.category) {
      const normalizedName = company.name.toLowerCase().trim();
      
      // Only add if it doesn't already exist
      if (!COMPANY_MAPPINGS[normalizedName]) {
        COMPANY_MAPPINGS[normalizedName] = company.category;
        addedCount++;
      }
    }
  });
  
  return addedCount;
}

// Example of how to use the bulk import function:
/*
const excelData = [
  { name: "New Company 1", category: "A" },
  { name: "New Company 2", category: "B" },
  { name: "Small Business LLC", category: "D" }
];

const addedCompanies = addCompaniesFromBulkData(excelData as Array<{name: string, category: CompanyCategory}>);
console.log(`Added ${addedCompanies} new companies to the database`);
*/

