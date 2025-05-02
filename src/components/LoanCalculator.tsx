
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoanCalculator = () => {
  const [loanType, setLoanType] = useState<string>("personal");
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(10);
  const [loanTerm, setLoanTerm] = useState<number>(36);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [isEligible, setIsEligible] = useState<boolean>(true);
  
  // Loan type configuration
  const loanConfig = {
    personal: {
      minAmount: 10000,
      maxAmount: 500000,
      minTerm: 12,
      maxTerm: 60,
      baseRate: 10,
      amountStep: 10000,
    },
    home: {
      minAmount: 500000,
      maxAmount: 10000000,
      minTerm: 60,
      maxTerm: 360,
      baseRate: 7,
      amountStep: 100000,
    },
    business: {
      minAmount: 100000,
      maxAmount: 5000000,
      minTerm: 12,
      maxTerm: 84,
      baseRate: 8,
      amountStep: 100000,
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
    
    // Simple eligibility check (can be enhanced with more complex criteria)
    const debtToIncome = monthly / 50000; // Assuming an income of 50,000 per month
    setIsEligible(debtToIncome < 0.5);
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
            Calculate your loan amount, monthly payments and check your eligibility
          </p>
        </div>
        
        <Card className="max-w-4xl mx-auto">
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
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
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
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between">
            <Button variant="outline" className="w-full sm:w-auto">Compare Rates</Button>
            <Button className="w-full sm:w-auto bg-brandblue-600 hover:bg-brandblue-700">Apply Now</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoanCalculator;
