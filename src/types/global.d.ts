
interface Window {
  viewLoanApplications?: () => Array<{
    name: string;
    phone: string;
    loanType: string;
    loanAmount: string;
    timestamp: string;
  }>;
}
