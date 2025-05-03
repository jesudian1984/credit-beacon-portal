
import * as XLSX from 'xlsx';
import { addCompaniesFromBulkData } from './companyCategories';
import type { CompanyCategory } from './companyTypes';

export interface ExcelCompanyData {
  name: string;
  category: CompanyCategory;
}

/**
 * Parse Excel file and extract company data
 * @param file Excel file to parse
 * @returns Promise that resolves to an array of parsed company data
 */
export const parseExcelFile = async (file: File): Promise<ExcelCompanyData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert Excel data to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Map the data to our expected format
        const companyData = jsonData.map((row: any) => {
          // Try to find company name and category in different possible column names
          const name = row.CompanyName || row.Company || row.Name || row['Company Name'] || '';
          let category = row.Category || row.CompanyCategory || row['Company Category'] || 'D';
          
          // Validate and normalize category
          if (typeof category === 'string') {
            category = category.trim().toUpperCase();
            if (!['A', 'B', 'C', 'D'].includes(category)) {
              category = 'D'; // Default to D if invalid
            }
          } else {
            category = 'D'; // Default to D if not a string
          }
          
          return {
            name: name ? name.toString().trim() : '',
            category: category as CompanyCategory
          };
        }).filter(item => item.name); // Filter out items with no name
        
        resolve(companyData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    reader.readAsBinaryString(file);
  });
};

/**
 * Process Excel file and add companies to database
 * @param file Excel file to process
 * @returns Promise that resolves to the number of companies added
 */
export const processExcelFile = async (file: File): Promise<number> => {
  try {
    const companies = await parseExcelFile(file);
    const addedCount = addCompaniesFromBulkData(companies);
    return addedCount;
  } catch (error) {
    console.error('Error processing Excel file:', error);
    throw error;
  }
};
