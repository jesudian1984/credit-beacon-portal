
// Re-export from smaller files
import { determineCompanyCategory } from './companyRecognition';
import { getCategoryInfo, companySuggestions } from './categoryDescriptions';
import { addCompaniesFromBulkData } from './companyBulkImport';
import COMPANY_MAPPINGS from './companyMappings';

// Export all the functions and constants
export { 
  determineCompanyCategory, 
  getCategoryInfo, 
  companySuggestions,
  addCompaniesFromBulkData,
  COMPANY_MAPPINGS
};
