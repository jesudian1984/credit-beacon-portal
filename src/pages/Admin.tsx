
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ExcelUploader from '@/components/ExcelUploader';

const Admin = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Company Data Management</CardTitle>
            <CardDescription>
              Upload and manage company data for loan eligibility assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Import Company Data</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload an Excel file with company data to add to the system. The file should have
                  columns for "Company Name" and "Category" (A, B, C, or D).
                </p>
                <ExcelUploader 
                  onSuccess={(count) => {
                    console.log(`Successfully added ${count} companies`);
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
