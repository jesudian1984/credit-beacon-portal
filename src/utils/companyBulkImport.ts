
import { CompanyCategory } from './companyTypes';
import COMPANY_MAPPINGS from './companyMappings';

/**
 * Add companies from bulk data (such as Excel imports)
 * @param companies Array of company data objects with name and category
 * @returns Number of companies added and the updated company mappings
 */
export function addCompaniesFromBulkData(companies: Array<{name: string, category: CompanyCategory}>): number {
  let addedCount = 0;
  
  companies.forEach(company => {
    if (company.name && company.category) {
      // Convert company name to proper case for display but store as lowercase
      const displayName = company.name.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      
      const normalizedName = company.name.toLowerCase().trim();
      
      // Only add if it doesn't already exist
      if (!(normalizedName in COMPANY_MAPPINGS)) {
        // We need to cast COMPANY_MAPPINGS to a non-readonly type to modify it
        (COMPANY_MAPPINGS as Record<string, CompanyCategory>)[normalizedName] = company.category;
        console.log(`Added company: ${displayName} (${company.category})`);
        addedCount++;
      } else {
        console.log(`Company already exists: ${displayName}`);
      }
    }
  });
  
  // Log the total number of mappings
  console.log(`Total companies in database: ${Object.keys(COMPANY_MAPPINGS).length}`);
  
  return addedCount;
}
