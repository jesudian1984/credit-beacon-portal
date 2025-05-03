
import { CompanyCategory } from './companyTypes';
import COMPANY_MAPPINGS from './companyMappings';

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
      if (!(normalizedName in COMPANY_MAPPINGS)) {
        // We need to cast COMPANY_MAPPINGS to a non-readonly type to modify it
        (COMPANY_MAPPINGS as Record<string, CompanyCategory>)[normalizedName] = company.category;
        addedCount++;
      }
    }
  });
  
  return addedCount;
}
