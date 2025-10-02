import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ExcelUploader from '@/components/ExcelUploader';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [checkingAdmin, setCheckingAdmin] = React.useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        toast.error("Please login to access admin panel");
        navigate('/auth');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          toast.error("Access denied. Admin privileges required.");
          navigate('/');
          return;
        }

        setIsAdmin(true);
      } catch (error: any) {
        toast.error("Failed to verify admin status");
        navigate('/');
      } finally {
        setCheckingAdmin(false);
      }
    };

    if (!loading) {
      checkAdminStatus();
    }
  }, [user, loading, navigate]);

  if (loading || checkingAdmin) {
    return <div className="container mx-auto py-10 px-4">Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

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
