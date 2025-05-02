
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Calculator } from "lucide-react";

const LoanCalculator = () => {
  const [loanType, setLoanType] = useState<string>("personal");
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(10.35);
  const [loanTerm, setLoanTerm] = useState<number>(36);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [isEligible, setIsEligible] = useState<boolean>(true);
  
  // New state for detailed eligibility
  const [monthlySalary, setMonthlySalary] = useState<number>(50000);
  const [companyCategory, setCompanyCategory] = useState<string>("A");
  const [existingObligations, setExistingObligations] = useState<number>(0);
  const [foir, setFoir] = useState<number>(0.5); // FOIR - Fixed Obligation to Income Ratio
  const [eligibilityAmount, setEligibilityAmount] = useState<number>(0);
  const [eligibilityMessage, setEligibilityMessage] = useState<string>("");
  
  // Loan type configuration with updated interest rates
  const loanConfig = {
    personal: {
      minAmount: 10000,
      maxAmount: 500000,
      minTerm: 12,
      maxTerm: 60,
      baseRate: 10.35,
      amountStep: 10000,
      maxFoirByCategory: {
        A: 0.65, // Top tier companies
        B: 0.60, // Mid tier companies
        C: 0.55, // Regular companies
        D: 0.45  // Small businesses/self-employed
      }
    },
    home: {
      minAmount: 500000,
      maxAmount: 10000000,
      minTerm: 60,
      maxTerm: 360,
      baseRate: 8.40,
      amountStep: 100000,
      maxFoirByCategory: {
        A: 0.75,
        B: 0.70,
        C: 0.65,
        D: 0.55
      }
    },
    business: {
      minAmount: 100000,
      maxAmount: 5000000,
      minTerm: 12,
      maxTerm: 84,
      baseRate: 16.00,
      amountStep: 100000,
      maxFoirByCategory: {
        A: 0.70,
        B: 0.65,
        C: 0.60, 
        D: 0.50
      }
    }
  };
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Calculate loan details
  const calculateLoan = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;
    const monthly = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    
    setMonthlyPayment(isNaN(monthly) ? 0 : monthly);
    setTotalPayment(monthly * numberOfPayments);
    setTotalInterest((monthly * numberOfPayments) - loanAmount);
    
    // Enhanced eligibility check
    calculateEligibility();
  };
  
  // Calculate eligibility based on company category, salary, obligations, tenor and FOIR
  const calculateEligibility = () => {
    const currentConfig = loanConfig[loanType as keyof typeof loanConfig];
    const maxFoir = currentConfig.maxFoirByCategory[companyCategory as keyof typeof currentConfig.maxFoirByCategory];
    
    // Calculate monthly available income after existing obligations
    const availableIncome = monthlySalary - existingObligations;
    
    // Calculate maximum EMI allowed based on FOIR
    const maxEmi = monthlySalary * maxFoir - existingObligations;
    
    // Calculate maximum loan eligibility using the EMI formula
    const monthlyRate = interestRate / 100 / 12;
    const maxLoanEligibility = maxEmi * (1 - Math.pow(1 + monthlyRate, -loanTerm)) / monthlyRate;
    
    setEligibilityAmount(Math.floor(maxLoanEligibility));
    
    // Check if requested loan amount is within eligibility
    const eligible = loanAmount <= maxLoanEligibility && maxEmi > 0;
    setIsEligible(eligible);
    
    // Set appropriate message
    if (eligible) {
      setEligibilityMessage(`You are eligible for a loan of up to ${formatCurrency(maxLoanEligibility)}`);
    } else if (maxEmi <= 0) {
      setEligibilityMessage("Your existing obligations exceed the maximum allowed FOIR for this loan type");
    } else {
      setEligibilityMessage(`Your requested amount exceeds your eligibility of ${formatCurrency(maxLoanEligibility)}`);
    }
  };
  
  // Check if the view is income-based or property-based (for home loans)
  const handleCheckEligibility = () => {
    calculateEligibility();
    toast.success("Eligibility calculation completed");
  };

  // Initialize and recalculate when parameters change
  useEffect(() => {
    const currentConfig = loanConfig[loanType as keyof typeof loanConfig];
    setLoanAmount(currentConfig.minAmount);
    setInterestRate(currentConfig.baseRate);
    setLoanTerm(currentConfig.minTerm);
  }, [loanType]);
  
  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm, loanType]);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Loan Eligibility Calculator</h2>
          <p className="mt-4 text-lg text-gray-600">
            Calculate your loan eligibility based on your income, obligations, and company category
          </p>
        </div>
        
        <Card className="max-w-5xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-6 w-6" /> 
              Personal Details
            </CardTitle>
            <CardDescription>Enter your financial details to check eligibility</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="monthly-salary">Monthly Salary (Net Income)</Label>
                <Input
                  id="monthly-salary"
                  type="number"
                  value={monthlySalary}
                  onChange={(e) => setMonthlySalary(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="company-category">Company Category</Label>
                <Select 
                  value={companyCategory} 
                  onValueChange={setCompanyCategory}
                >
                  <SelectTrigger id="company-category" className="mt-1">
                    <SelectValue placeholder="Select company category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A - Top Tier (MNC/Listed Companies)</SelectItem>
                    <SelectItem value="B">B - Mid Tier (Large Private Companies)</SelectItem>
                    <SelectItem value="C">C - Regular (SMEs/Government)</SelectItem>
                    <SelectItem value="D">D - Others (Small Business/Self-employed)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="existing-emi">Existing Monthly Obligations (EMIs)</Label>
                <Input
                  id="existing-emi"
                  type="number"
                  value={existingObligations}
                  onChange={(e) => setExistingObligations(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Button 
                  onClick={handleCheckEligibility} 
                  className="w-full md:w-auto mt-6"
                >
                  Check My Eligibility
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="max-w-5xl mx-auto">
          <CardHeader>
            <CardTitle>Loan Calculator & Eligibility Checker</CardTitle>
            <CardDescription>Adjust the parameters to see your estimated loan details</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal" value={loanType} onValueChange={setLoanType} className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Loan</TabsTrigger>
                <TabsTrigger value="home">Home Loan</TabsTrigger>
                <TabsTrigger value="business">Business Loan</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Loan Amount</Label>
                  <span className="font-medium">{formatCurrency(loanAmount)}</span>
                </div>
                <Slider
                  value={[loanAmount]}
                  min={loanConfig[loanType as keyof typeof loanConfig].minAmount}
                  max={loanConfig[loanType as keyof typeof loanConfig].maxAmount}
                  step={loanConfig[loanType as keyof typeof loanConfig].amountStep}
                  onValueChange={(values) => setLoanAmount(values[0])}
                  className="my-4"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Interest Rate</Label>
                  <span className="font-medium">{interestRate}%</span>
                </div>
                <Slider
                  value={[interestRate]}
                  min={loanConfig[loanType as keyof typeof loanConfig].baseRate - 2}
                  max={loanConfig[loanType as keyof typeof loanConfig].baseRate + 8}
                  step={0.25}
                  onValueChange={(values) => setInterestRate(values[0])}
                  className="my-4"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Loan Term {loanType === 'home' ? '(Years)' : '(Months)'}</Label>
                  <span className="font-medium">
                    {loanType === 'home' ? `${loanTerm / 12} years` : `${loanTerm} months`}
                  </span>
                </div>
                <Slider
                  value={[loanTerm]}
                  min={loanConfig[loanType as keyof typeof loanConfig].minTerm}
                  max={loanConfig[loanType as keyof typeof loanConfig].maxTerm}
                  step={loanType === 'home' ? 12 : 6}
                  onValueChange={(values) => setLoanTerm(values[0])}
                  className="my-4"
                />
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Payment:</span>
                  <span className="font-semibold">{formatCurrency(monthlyPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Payment:</span>
                  <span className="font-semibold">{formatCurrency(totalPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Interest:</span>
                  <span className="font-semibold">{formatCurrency(totalInterest)}</span>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium">Maximum Eligible Amount:</span>
                    <span className={`font-semibold ${isEligible ? "text-brandgreen-600" : "text-red-600"}`}>
                      {formatCurrency(eligibilityAmount)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-gray-800 font-medium">Eligibility Status:</span>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="eligibility" className={isEligible ? "text-brandgreen-600" : "text-red-600"}>
                        {isEligible ? "Eligible" : "Not Eligible"}
                      </Label>
                      <Switch 
                        id="eligibility" 
                        checked={isEligible}
                        disabled 
                      />
                    </div>
                  </div>
                  
                  <div className={`mt-4 p-3 rounded text-sm ${isEligible ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
                    {eligibilityMessage}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between">
            <Button variant="outline" className="w-full sm:w-auto">Compare Rates</Button>
            <Button 
              className={`w-full sm:w-auto ${isEligible ? "bg-brandblue-600 hover:bg-brandblue-700" : "bg-gray-400 cursor-not-allowed"}`}
              disabled={!isEligible}
            >
              Apply Now
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoanCalculator;
