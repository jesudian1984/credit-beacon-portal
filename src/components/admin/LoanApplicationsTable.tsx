import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';

interface LoanApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company_name: string | null;
  monthly_salary: number | null;
  loan_amount: number;
  loan_type: string;
  loan_purpose: string | null;
  employment_type: string | null;
  work_experience: string | null;
  tenure_months: number | null;
  existing_loans: boolean | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  date_of_birth: string | null;
  status: string;
  created_at: string;
}

const LoanApplicationsTable = () => {
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<LoanApplication | null>(null);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('loan_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error: any) {
      toast.error('Failed to fetch applications: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'disbursed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className="py-4">Loading applications...</div>;

  if (applications.length === 0) {
    return <div className="py-4 text-muted-foreground">No loan applications found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Loan Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applied On</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell className="font-medium">{app.full_name}</TableCell>
              <TableCell>{app.phone}</TableCell>
              <TableCell className="capitalize">{app.loan_type}</TableCell>
              <TableCell>₹{app.loan_amount?.toLocaleString()}</TableCell>
              <TableCell>{app.company_name || '-'}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(app.status || 'pending')}>
                  {app.status || 'pending'}
                </Badge>
              </TableCell>
              <TableCell>{format(new Date(app.created_at), 'dd MMM yyyy')}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setSelectedApp(app)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Loan Application Details</DialogTitle>
                    </DialogHeader>
                    {selectedApp && (
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Full Name</p>
                          <p className="font-medium">{selectedApp.full_name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{selectedApp.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium">{selectedApp.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Date of Birth</p>
                          <p className="font-medium">{selectedApp.date_of_birth || '-'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Loan Type</p>
                          <p className="font-medium capitalize">{selectedApp.loan_type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Loan Amount</p>
                          <p className="font-medium">₹{selectedApp.loan_amount?.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Loan Purpose</p>
                          <p className="font-medium">{selectedApp.loan_purpose || '-'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Tenure</p>
                          <p className="font-medium">{selectedApp.tenure_months ? `${selectedApp.tenure_months} months` : '-'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Employment Type</p>
                          <p className="font-medium capitalize">{selectedApp.employment_type || '-'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Company</p>
                          <p className="font-medium">{selectedApp.company_name || '-'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Monthly Salary</p>
                          <p className="font-medium">{selectedApp.monthly_salary ? `₹${selectedApp.monthly_salary.toLocaleString()}` : '-'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Work Experience</p>
                          <p className="font-medium">{selectedApp.work_experience || '-'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Existing Loans</p>
                          <p className="font-medium">{selectedApp.existing_loans ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <Badge className={getStatusColor(selectedApp.status || 'pending')}>
                            {selectedApp.status || 'pending'}
                          </Badge>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-muted-foreground">Address</p>
                          <p className="font-medium">
                            {[selectedApp.address, selectedApp.city, selectedApp.state, selectedApp.pincode].filter(Boolean).join(', ') || '-'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Applied On</p>
                          <p className="font-medium">{format(new Date(selectedApp.created_at), 'dd MMM yyyy, hh:mm a')}</p>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LoanApplicationsTable;
