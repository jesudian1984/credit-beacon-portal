
export type CompanyCategory = 'A' | 'B' | 'C' | 'D';

export interface CompanyCategoryInfo {
  category: CompanyCategory;
  description: string;
}

export interface CompanyImportStats {
  total: number;
  added: number;
  skipped: number;
}
