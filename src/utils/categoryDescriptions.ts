
import { CompanyCategory, CompanyCategoryInfo } from './companyTypes';

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
        description: 'Small Business/Self-employed)'
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
