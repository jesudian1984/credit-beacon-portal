import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Calculator, InfoIcon, Building, X, Percent, Clock, Shield, DollarSign } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { companySuggestions, getLoanFeaturesByCompanyCategory, determineCompanyCategory } from "@/utils/companyCategories";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Define types for multiplier tables
interface MultiplierValue {
  [key: string]: number;
}

interface MultiplierCategory {
  [key: string]: MultiplierValue;
}

const LoanCalculator = () => {
  const [loanType, setLoanType] = useState<string>("personal");
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(10.35);
  const [loanTerm, setLoanTerm] = useState<number>(36);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [isEligible, setIsEligible] = useState<boolean>(true);
  
  // Enhanced state for detailed eligibility
  const [monthlySalary, setMonthlySalary] = useState<number>(50000);
  const [companyName, setCompanyName] = useState<string>("");
  const [companyCategory, setCompanyCategory] = useState<string>("A");
  const [categoryDescription, setCategoryDescription] = useState<string>("Top Tier (MNC/Listed Companies)");
  const [existingObligations, setExistingObligations] = useState<number>(0);
  const [foir, setFoir] = useState<number>(0.5); // FOIR - Fixed Obligation to Income Ratio
  const [eligibilityAmount, setEligibilityAmount] = useState<number>(0);
  const [eligibilityMessage, setEligibilityMessage] = useState<string>("");
  const [employmentType, setEmploymentType] = useState<string>("GOVT");
  const [riskBand, setRiskBand] = useState<string>("NORMAL");
  
  // Loan type configuration with updated maximum amounts
  const loanConfig = {
    personal: {
      minAmount: 10000,
      maxAmount: 10000000, // 1 crore
      minTerm: 12,
      maxTerm: 84, // Updated from 60 to 84 months
      baseRate: 10.35,
      amountStep: 50000,
      maxFoirByCategory: {
        A: 0.65, // Top tier companies
        B: 0.60, // Mid tier companies
        C: 0.55, // Regular companies
        D: 0.45  // Small businesses/self-employed
      }
    },
    home: {
      minAmount: 500000,
      maxAmount: 20000000, // 2 crores
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
      maxAmount: 15000000, // 1.5 crores
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
  
  // HDFC Bank Multiplier Tables
  const multiplierTables = {
    // Government (GA/GB/GC)
    GOVT: {
      NORMAL: {
        "below25K": {
          12: 5, 24: 9, 36: 11, 48: 14, 60: 0
        },
        "25K-38K": {
          12: 5, 24: 9, 36: 11, 48: 14, 60: 0 
        },
        "38K-50K": {
          12: 6, 24: 10, 36: 15, 48: 17, 60: 24
        },
        "50K-75K": {
          12: 7, 24: 12, 36: 16, 48: 20, 60: 24
        },
        "above75K": {
          12: 7, 24: 13, 36: 18, 48: 23, 60: 27
        }
      }
    },
    // Government Kicker
    GOVT_KICKER: {
      RISK_BAND_A1_A9: {
        "50K-75K": {
          12: 8, 24: 15, 36: 21, 48: 25, 60: 30
        },
        "above75K": {
          12: 8, 24: 15, 36: 21, 48: 25, 60: 30
        }
      },
      RISK_BAND_A1_B2: {
        "75K+": {
          12: 6, 24: 10, 36: 15, 48: 20, 60: 24
        }
      }
    },
    // Government Nurse
    GOVT_NURSE: {
      NORMAL: {
        "40K-50K": {
          12: 6, 24: 10, 36: 15, 48: 17, 60: 20
        },
        "50K-75K": {
          12: 7, 24: 12, 36: 16, 48: 20, 60: 24
        },
        "above75K": {
          12: 7, 24: 13, 36: 18, 48: 21, 60: 25
        }
      },
      A1_B9_D1: {
        "above75K": {
          12: 7, 24: 15, 36: 21, 48: 25, 60: 30
        }
      }
    },
    // Super Category A (Government/Railway/Defense)
    SUPER_CAT_A: {
      NORMAL: {
        "below35K": {
          12: 5, 24: 10, 36: 14, 48: 16, 60: 19
        },
        "35K-50K": {
          12: 6, 24: 10, 36: 16, 48: 20, 60: 22
        },
        "50K-75K": {
          12: 7, 24: 13, 36: 18, 48: 23, 60: 25
        },
        "above75K": {
          12: 7, 24: 13, 36: 18, 48: 23, 60: 27
        }
      },
      RISK_BAND: {
        "A1-B6_D1_MLB": {
          12: 7, 24: 13, 36: 18, 48: 26, 60: 30
        },
        "A1-B9_D1_MLB": {
          12: 7, 24: 15, 36: 21, 48: 27, 60: 30
        }
      }
    },
    // Category A
    CAT_A: {
      NORMAL: {
        "below35K": {
          12: 5, 24: 10, 36: 14, 48: 16, 60: 19
        },
        "35K-50K": {
          12: 6, 24: 10, 36: 16, 48: 18, 60: 20
        },
        "50K-75K": {
          12: 7, 24: 13, 36: 18, 48: 21, 60: 23
        },
        "above75K": {
          12: 7, 24: 13, 36: 18, 48: 22, 60: 24
        }
      },
      RISK_BAND: {
        "A1-B6_D1_MLB": {
          12: 7, 24: 13, 36: 18, 48: 24, 60: 26
        },
        "A1-B6_D1_MLB_HIGH": {
          12: 7, 24: 13, 36: 18, 48: 25, 60: 28
        }
      }
    },
    // Category B
    CAT_B: {
      NORMAL: {
        "below35K": {
          12: 5, 24: 9, 36: 10, 48: 12, 60: 0
        },
        "35K-50K": {
          12: 5, 24: 9, 36: 10, 48: 13, 60: 15
        },
        "50K-75K": {
          12: 6, 24: 10, 36: 14, 48: 17, 60: 20
        },
        "above75K": {
          12: 6, 24: 13, 36: 16, 48: 18, 60: 22
        }
      },
      RISK_BAND: {
        "50K-75K": {
          12: 7, 24: 11, 36: 14, 48: 20, 60: 23
        },
        "above75K": {
          12: 7, 24: 13, 36: 18, 48: 23, 60: 27
        }
      }
    },
    // Category C
    CAT_C: {
      NORMAL: {
        "below35K": {
          12: 5, 24: 7, 36: 9, 48: 11, 60: 13
        },
        "35K-50K": {
          12: 5, 24: 7, 36: 9, 48: 11, 60: 13
        },
        "50K-75K": {
          12: 6, 24: 11, 36: 15, 48: 18, 60: 20
        },
        "above75K": {
          12: 6, 24: 12, 36: 16, 48: 19, 60: 21
        }
      },
      KICKER: {
        "50K-75K": {
          12: 7, 24: 13, 36: 18, 48: 21, 60: 22
        },
        "above75K": {
          12: 7, 24: 13, 36: 18, 48: 22, 60: 25
        }
      }
    },
    // Category Medical/Education
    CAT_MED_EDU: {
      NORMAL: {
        "35K-50K": {
          12: 5, 24: 9, 36: 11, 48: 13, 60: 15
        },
        "50K-75K": {
          12: 5, 24: 9, 36: 13, 48: 15, 60: 18
        }
      }
    },
    // Category D/E
    CAT_D_E: {
      NORMAL: {
        "50K-75K": {
          12: 3, 24: 6, 36: 8, 48: 0, 60: 0
        },
        "above75K": {
          12: 4, 24: 7, 36: 9, 48: 11, 60: 0
        }
      }
    }
  };
  
  // Setting to false to remove the loan features tab
  const [showCompanyFeatures, setShowCompanyFeatures] = useState(false);
  const [companyFeatures, setCompanyFeatures] = useState<{
    interestRates: { personal: string, home: string, business: string };
    tenureOptions: { personal: string, home: string, business: string };
    preclosureCharges: { personal: string, home: string, business: string };
    maxEligibility: { personal: string, home: string, business: string };
  } | null>(null);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Handle company name input - simplified to not determine category while typing
  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setCompanyName(name);
  };
  
  // Clear company input
  const clearCompanyInput = () => {
    setCompanyName("");
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
  
  // Determine salary band for multiplier lookup
  const getSalaryBand = (salary: number): string => {
    if (salary < 25000) return "below25K";
    if (salary < 35000) return "below35K";
    if (salary < 38000) return "25K-38K";
    if (salary < 40000) return "35K-50K"; // overlap handling
    if (salary < 50000) return "40K-50K";
    if (salary < 75000) return "50K-75K";
    return "above75K";
  };
  
  // Get multiplier based on employment type, salary band, risk band, and tenure
  const getMultiplier = (
    employmentType: string, 
    salaryBand: string, 
    loanTerm: number, 
    riskBandType: string = "NORMAL"
  ): number => {
    try {
      // Round loan term to nearest available option
      const termOptions = [12, 24, 36, 48, 60];
      const closestTerm = termOptions.reduce((prev, curr) => 
        Math.abs(curr - loanTerm) < Math.abs(prev - loanTerm) ? curr : prev
      );
      
      // Get the multiplier table for employment type
      const empTable = multiplierTables[employmentType as keyof typeof multiplierTables];
      if (!empTable) return 0;
      
      // Get the risk band table
      const riskTable = empTable[riskBandType as keyof typeof empTable];
      if (!riskTable) return 0;
      
      // Find the closest salary band if exact match not found
      const salaryRanges = Object.keys(riskTable);
      const matchedBand = salaryRanges.find(range => range === salaryBand) || 
                           salaryRanges.find(range => 
                             range.includes(salaryBand.split('-')[0]) || 
                             range.includes('above') || 
                             range.toLowerCase().includes('k')
                           );
      
      if (!matchedBand) return 0;
      
      const termMultipliers = riskTable[matchedBand];
      return termMultipliers[closestTerm] || 0;
    } catch (error) {
      console.error("Error calculating multiplier:", error);
      return 0;
    }
  };
  
  // Get FOIR based on salary range as per user's requirement
  const getFoirBySalary = (salary: number): number => {
    if (salary < 40000) return 0.5;  // 50% for salary less than 40k
    if (salary < 50000) return 0.6;  // 60% for salary between 40k to 50k
    return 0.7;                      // 70% for salary above 50k
  };
  
  // Calculate eligibility based on company category, salary, obligations, tenor and FOIR
  const calculateEligibility = () => {
    const currentConfig = loanConfig[loanType as keyof typeof loanConfig];
    
    // Get salary-based FOIR instead of company category based FOIR
    const salaryBasedFoir = getFoirBySalary(monthlySalary);
    
    // Set the current FOIR value for display purposes
    setFoir(salaryBasedFoir);
    
    // Calculate monthly available income after existing obligations
    const availableIncome = monthlySalary - existingObligations;
    
    // Calculate maximum EMI allowed based on salary-based FOIR
    const maxEmi = monthlySalary * salaryBasedFoir - existingObligations;
    
    // Get appropriate salary band
    const salaryBand = getSalaryBand(monthlySalary);
    
    // Get multiplier based on employment type, salary band and loan term
    const multiplier = getMultiplier(employmentType, salaryBand, loanTerm, riskBand);
    
    // Calculate eligibility using multiplier (traditional bank method)
    const multiplierEligibility = monthlySalary * multiplier;
    
    // Calculate maximum loan eligibility using the EMI formula (alternative method)
    const monthlyRate = interestRate / 100 / 12;
    const emiBasedEligibility = maxEmi * (1 - Math.pow(1 + monthlyRate, -loanTerm)) / monthlyRate;
    
    // Use the lower of the two eligibility calculations to be conservative
    const maxLoanEligibility = Math.min(multiplierEligibility, emiBasedEligibility);
    
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
  
  // Check eligibility on button click instead of automatically
  const handleCheckEligibility = () => {
    // Now determine company category on button click instead of while typing
    if (companyName) {
      const { category, description } = determineCompanyCategory(companyName);
      setCompanyCategory(category);
      setCategoryDescription(description);
    }
    
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
                  required
                />
                <div className="text-xs text-gray-500 mt-1">
                  <span className="font-semibold">FOIR eligibility: </span>
                  {monthlySalary < 40000 ? "50% of income" : 
                   monthlySalary < 50000 ? "60% of income" : 
                   "70% of income"}
                </div>
              </div>
              
              <div>
                <Label htmlFor="company-name" className="flex items-center gap-2">
                  Company Name
                  <Building className="h-4 w-4 text-gray-500" />
                </Label>
                <div className="relative mt-1">
                  <div className="flex w-full items-center">
                    <Input
                      id="company-name"
                      type="text"
                      value={companyName}
                      onChange={handleCompanyNameChange}
                      placeholder="Enter your company name"
                      className="w-full pr-10"
                      required
                    />
                    {companyName && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute right-0 h-full px-2 py-0"
                        onClick={clearCompanyInput}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="company-category" className="flex items-center gap-2">
                  Company Category
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-gray-500" />
                      </TooltipTrigger>
                      <TooltipContent className="w-80 p-2">
                        <p>A - Top Tier (MNC/Listed Companies)</p>
                        <p>B - Mid Tier (Large Private Companies)</p>
                        <p>C - Regular (SMEs/Government)</p>
                        <p>D - Others (Small Business/Self-employed)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Select 
                  value={companyCategory} 
                  onValueChange={(value) => {
                    setCompanyCategory(value);
                    setCategoryDescription(
                      value === 'A' ? 'Top Tier (MNC/Listed Companies)' :
                      value === 'B' ? 'Mid Tier (Large Private Companies)' :
                      value === 'C' ? 'Regular (SMEs/Government)' :
                      'Others (Small Business/Self-employed)'
                    );
                  }}
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
                <div className="text-xs text-gray-500 mt-1">
                  Examples: {companySuggestions[companyCategory as keyof typeof companySuggestions]?.slice(0, 3).join(', ')}
                </div>
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
                <Label htmlFor="employment-type">Employment Type</Label>
                <Select 
                  value={employmentType} 
                  onValueChange={setEmploymentType}
                >
                  <SelectTrigger id="employment-type" className="mt-1">
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GOVT">Government (GA/GB/GC)</SelectItem>
                    <SelectItem value="GOVT_KICKER">Government - Kicker</SelectItem>
                    <SelectItem value="GOVT_NURSE">Government - Nurse</SelectItem>
                    <SelectItem value="SUPER_CAT_A">Super Category A</SelectItem>
                    <SelectItem value="CAT_A">Category A</SelectItem>
                    <SelectItem value="CAT_B">Category B</SelectItem>
                    <SelectItem value="CAT_C">Category C</SelectItem>
                    <SelectItem value="CAT_MED_EDU">Medical/Education</SelectItem>
                    <SelectItem value="CAT_D_E">Category D/E</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="risk-band">Risk Profile</Label>
                <Select 
                  value={riskBand} 
                  onValueChange={setRiskBand}
                >
                  <SelectTrigger id="risk-band" className="mt-1">
                    <SelectValue placeholder="Select risk profile" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NORMAL">Normal</SelectItem>
                    <SelectItem value="RISK_BAND">Risk Band (A1-B6)</SelectItem>
                    <SelectItem value="RISK_BAND_A1_A9">Risk Band A1-A9</SelectItem>
                    <SelectItem value="RISK_BAND_A1_B2">Risk Band A1-B2</SelectItem>
                    <SelectItem value="A1_B9_D1">Risk Band A1-B9 & D1</SelectItem>
                    <SelectItem value="KICKER">Kicker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="required-loan" className="flex items-center gap-2">
                  Required Loan Amount
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="required-loan"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="mt-1"
                  required
                  placeholder="Enter required loan amount"
                />
              </div>
              
              <div>
                <Label htmlFor="required-tenor" className="flex items-center gap-2">
                  Required Tenor (Months)
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="required-tenor"
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="mt-1"
                  required
                  min={12}
                  max={60}
                  placeholder="Enter required tenor in months"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Min: 12 months, Max: {loanType === 'home' ? '360' : '84'} months
                </div>
              </div>
              
              <div className="md:col-span-2">
                <Button 
                  onClick={handleCheckEligibility} 
                  className="w-full md:w-auto mt-6 bg-brandblue-600 hover:bg-brandblue-700"
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
                  
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-gray-800 font-medium">FOIR Applied:</span>
                    <span className="font-semibold">{Math.round(foir * 100)}%</span>
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
