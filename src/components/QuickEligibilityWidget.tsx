import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickEligibilityWidget = () => {
  const navigate = useNavigate();
  const [loanType, setLoanType] = useState("personal");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [loanAmount, setLoanAmount] = useState("");

  const formatCurrency = (value: string) => {
    if (!value) return "";
    const number = parseInt(value.replace(/,/g, ""));
    return new Intl.NumberFormat('en-IN').format(number);
  };

  const handleCheckEligibility = () => {
    navigate('/eligibility', { 
      state: { 
        loanType, 
        monthlyIncome: parseInt(monthlyIncome.replace(/,/g, "")), 
        loanAmount: parseInt(loanAmount.replace(/,/g, "")) 
      } 
    });
  };

  return (
    <div className="py-16 bg-gradient-to-br from-brandblue-50 via-white to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-4xl mx-auto shadow-2xl border-none">
          <CardHeader className="text-center pb-8 bg-gradient-to-r from-primary to-accent text-white rounded-t-lg">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
                <Calculator className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold">
              Check Your Loan Eligibility
            </CardTitle>
            <CardDescription className="text-lg text-white/90 mt-2">
              Get instant results in just 3 simple steps
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="space-y-2">
                <Label htmlFor="loan-type" className="text-base font-semibold">
                  1. Select Loan Type
                </Label>
                <Select value={loanType} onValueChange={setLoanType}>
                  <SelectTrigger id="loan-type" className="h-12 text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal Loan</SelectItem>
                    <SelectItem value="home">Home Loan</SelectItem>
                    <SelectItem value="business">Business Loan</SelectItem>
                    <SelectItem value="doctor">Doctor Loan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthly-income" className="text-base font-semibold">
                  2. Monthly Income (₹)
                </Label>
                <Input
                  id="monthly-income"
                  type="text"
                  placeholder="e.g., 50,000"
                  value={monthlyIncome}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, "");
                    if (/^\d*$/.test(value)) {
                      setMonthlyIncome(formatCurrency(value));
                    }
                  }}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="loan-amount" className="text-base font-semibold">
                  3. Loan Amount (₹)
                </Label>
                <Input
                  id="loan-amount"
                  type="text"
                  placeholder="e.g., 5,00,000"
                  value={loanAmount}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, "");
                    if (/^\d*$/.test(value)) {
                      setLoanAmount(formatCurrency(value));
                    }
                  }}
                  className="h-12 text-base"
                />
              </div>
            </div>

            <Button 
              onClick={handleCheckEligibility}
              disabled={!monthlyIncome || !loanAmount}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              Check Eligibility Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">30 Sec</div>
                <div className="text-sm text-muted-foreground">Quick Process</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Bank Partners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Secure & Free</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuickEligibilityWidget;
