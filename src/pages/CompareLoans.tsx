import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { findCompanySuggestions, getLoanFeaturesByCompanyCategory, determineCompanyCategory } from "@/utils/companyCategories";
import { Search, X, ArrowRight, Building, Banknote, Users, ListCheck } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the form schema for loan comparison
const loanComparisonSchema = z.object({
  monthlySalary: z.string().min(1, "Monthly salary is required"),
  existingObligations: z.string().default("0"),
  preferredTenor: z.string().min(1, "Preferred tenor is required"),
  loanType: z.enum(["personal", "home", "business"])
});

type LoanComparisonForm = z.infer<typeof loanComparisonSchema>;

const CompareLoans = () => {
  // State for company selection
  const [company1, setCompany1] = useState<string>("");
  const [company2, setCompany2] = useState<string>("");
  const [company1Category, setCompany1Category] = useState<string>("");
  const [company2Category, setCompany2Category] = useState<string>("");
  const [company1Suggestions, setCompany1Suggestions] = useState<string[]>([]);
  const [company2Suggestions, setCompany2Suggestions] = useState<string[]>([]);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  
  // State for company features
  const [company1Features, setCompany1Features] = useState<any>(null);
  const [company2Features, setCompany2Features] = useState<any>(null);
  const [showComparison, setShowComparison] = useState(false);
  
  // Form for additional comparison criteria
  const form = useForm<LoanComparisonForm>({
    resolver: zodResolver(loanComparisonSchema),
    defaultValues: {
      monthlySalary: "",
      existingObligations: "0",
      preferredTenor: "3",
      loanType: "personal"
    }
  });

  // Handle company name input and search for the first company
  const handleCompany1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setCompany1(name);
    
    // Get suggestions as the user types
    if (name.trim().length >= 2) {
      const suggestions = findCompanySuggestions(name);
      setCompany1Suggestions(suggestions);
      setIsOpen1(suggestions.length > 0);
    } else {
      setCompany1Suggestions([]);
      setIsOpen1(false);
    }
  };
  
  // Handle company name input and search for the second company
  const handleCompany2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setCompany2(name);
    
    // Get suggestions as the user types
    if (name.trim().length >= 2) {
      const suggestions = findCompanySuggestions(name);
      setCompany2Suggestions(suggestions);
      setIsOpen2(suggestions.length > 0);
    } else {
      setCompany2Suggestions([]);
      setIsOpen2(false);
    }
  };
  
  // Handle company selection from dropdown for company 1
  const handleCompany1Selection = (company: string) => {
    setCompany1(company);
    setIsOpen1(false);
    
    const { category } = determineCompanyCategory(company);
    setCompany1Category(category);
    
    // Get loan features based on company category
    const features = getLoanFeaturesByCompanyCategory(category);
    setCompany1Features(features);
    
    toast.info(`Company 1 category detected: ${category}`);
  };
  
  // Handle company selection from dropdown for company 2
  const handleCompany2Selection = (company: string) => {
    setCompany2(company);
    setIsOpen2(false);
    
    const { category } = determineCompanyCategory(company);
    setCompany2Category(category);
    
    // Get loan features based on company category
    const features = getLoanFeaturesByCompanyCategory(category);
    setCompany2Features(features);
    
    toast.info(`Company 2 category detected: ${category}`);
  };
  
  // Clear company input fields
  const clearCompany1Input = () => {
    setCompany1("");
    setCompany1Suggestions([]);
    setIsOpen1(false);
    setCompany1Features(null);
  };
  
  const clearCompany2Input = () => {
    setCompany2("");
    setCompany2Suggestions([]);
    setIsOpen2(false);
    setCompany2Features(null);
  };
  
  // Compare companies with additional criteria
  const onSubmit = (data: LoanComparisonForm) => {
    if (!company1 || !company2) {
      toast.error("Please select two companies to compare");
      return;
    }
    
    console.log("Form data:", data);
    setShowComparison(true);
    
    // Calculate eligibility based on salary and obligations
    const monthlySalary = parseFloat(data.monthlySalary);
    const obligations = parseFloat(data.existingObligations);
    const netIncome = monthlySalary - obligations;
    const loanType = data.loanType;
    
    if (netIncome <= 0) {
      toast.error("Your obligations exceed your income. Loan eligibility may be limited.");
    } else {
      toast.success("Companies compared successfully! Showing offers based on your profile.");
    }
  };
  
  // Format interest rate difference to highlight better rate
  const renderRateComparison = (rate1: string, rate2: string) => {
    // Extract the first number from each rate range for simple comparison
    const firstNum1 = parseFloat(rate1.split("%")[0].trim());
    const firstNum2 = parseFloat(rate2.split("%")[0].trim());
    
    if (firstNum1 < firstNum2) {
      return (
        <>
          <TableCell className="font-medium text-green-600">{rate1}</TableCell>
          <TableCell>{rate2}</TableCell>
        </>
      );
    } else if (firstNum2 < firstNum1) {
      return (
        <>
          <TableCell>{rate1}</TableCell>
          <TableCell className="font-medium text-green-600">{rate2}</TableCell>
        </>
      );
    } else {
      return (
        <>
          <TableCell>{rate1}</TableCell>
          <TableCell>{rate2}</TableCell>
        </>
      );
    }
  };

  // Calculate eligibility based on form inputs
  const calculateEligibility = (maxIncomeMultiple: string, monthlySalary: string, obligations: string) => {
    if (!monthlySalary) return maxIncomeMultiple;
    
    const salary = parseFloat(monthlySalary);
    const obligationAmount = parseFloat(obligations || "0");
    const netIncome = salary - obligationAmount;
    
    // Extract the multiple from strings like "Up to 30X monthly income"
    const multipleMatch = maxIncomeMultiple.match(/(\d+)X/);
    if (multipleMatch && multipleMatch[1] && netIncome > 0) {
      const multiple = parseInt(multipleMatch[1]);
      const eligibilityAmount = netIncome * multiple;
      return `${maxIncomeMultiple} (₹${eligibilityAmount.toLocaleString()})`;
    }
    
    return maxIncomeMultiple;
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Compare Loan Features</h2>
          <p className="mt-4 text-lg text-gray-600">
            Compare loan offers based on your company profile and financial situation
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
              {/* Company Selection Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Companies to Compare</CardTitle>
                  <CardDescription>Choose two companies to see their loan features side by side</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Company 1 Selection */}
                    <div>
                      <Label htmlFor="company1" className="flex items-center gap-2 mb-2">
                        Company 1 <Building className="h-4 w-4 text-gray-500" />
                      </Label>
                      <div className="relative">
                        <Popover open={isOpen1} onOpenChange={setIsOpen1}>
                          <PopoverTrigger asChild>
                            <div className="flex w-full items-center">
                              <Input
                                id="company1"
                                type="text"
                                value={company1}
                                onChange={handleCompany1Change}
                                placeholder="Enter company name"
                                className="w-full pr-10"
                                onFocus={() => company1.length >= 2 && setIsOpen1(true)}
                              />
                              {company1 && (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="absolute right-10 h-full px-2 py-0"
                                  onClick={clearCompany1Input}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <Search className="h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="p-0 w-[300px]" align="start">
                            <Command>
                              <CommandInput placeholder="Search companies..." />
                              <CommandList>
                                {company1Suggestions.length > 0 ? (
                                  <CommandGroup>
                                    {company1Suggestions.map((company) => (
                                      <CommandItem 
                                        key={company} 
                                        onSelect={() => handleCompany1Selection(company)}
                                        className="cursor-pointer"
                                      >
                                        {company}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                ) : (
                                  <CommandEmpty>No companies found.</CommandEmpty>
                                )}
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      {company1 && company1Category && (
                        <p className={`text-sm mt-1 ${
                          company1Category === 'A' ? 'text-green-600' : 
                          company1Category === 'B' ? 'text-blue-600' : 
                          company1Category === 'C' ? 'text-amber-600' : 
                          'text-red-600'
                        }`}>
                          Category: {company1Category}
                        </p>
                      )}
                    </div>
                    
                    {/* Company 2 Selection */}
                    <div>
                      <Label htmlFor="company2" className="flex items-center gap-2 mb-2">
                        Company 2 <Building className="h-4 w-4 text-gray-500" />
                      </Label>
                      <div className="relative">
                        <Popover open={isOpen2} onOpenChange={setIsOpen2}>
                          <PopoverTrigger asChild>
                            <div className="flex w-full items-center">
                              <Input
                                id="company2"
                                type="text"
                                value={company2}
                                onChange={handleCompany2Change}
                                placeholder="Enter company name"
                                className="w-full pr-10"
                                onFocus={() => company2.length >= 2 && setIsOpen2(true)}
                              />
                              {company2 && (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="absolute right-10 h-full px-2 py-0"
                                  onClick={clearCompany2Input}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <Search className="h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="p-0 w-[300px]" align="start">
                            <Command>
                              <CommandInput placeholder="Search companies..." />
                              <CommandList>
                                {company2Suggestions.length > 0 ? (
                                  <CommandGroup>
                                    {company2Suggestions.map((company) => (
                                      <CommandItem 
                                        key={company} 
                                        onSelect={() => handleCompany2Selection(company)}
                                        className="cursor-pointer"
                                      >
                                        {company}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                ) : (
                                  <CommandEmpty>No companies found.</CommandEmpty>
                                )}
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      {company2 && company2Category && (
                        <p className={`text-sm mt-1 ${
                          company2Category === 'A' ? 'text-green-600' : 
                          company2Category === 'B' ? 'text-blue-600' : 
                          company2Category === 'C' ? 'text-amber-600' : 
                          'text-red-600'
                        }`}>
                          Category: {company2Category}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Financial Details</CardTitle>
                  <CardDescription>Enter your financial information to get personalized loan offers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Monthly Salary */}
                    <FormField
                      control={form.control}
                      name="monthlySalary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            Monthly Salary (₹) <Banknote className="h-4 w-4 text-gray-500" />
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="50000" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Enter your monthly in-hand salary after tax
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Existing EMIs/Obligations */}
                    <FormField
                      control={form.control}
                      name="existingObligations"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            Existing Monthly EMIs (₹) <ListCheck className="h-4 w-4 text-gray-500" />
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="0" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Total of all your existing EMIs and financial obligations
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Preferred Tenor */}
                    <FormField
                      control={form.control}
                      name="preferredTenor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Loan Tenor (years)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select loan tenor" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">1 year</SelectItem>
                              <SelectItem value="2">2 years</SelectItem>
                              <SelectItem value="3">3 years</SelectItem>
                              <SelectItem value="5">5 years</SelectItem>
                              <SelectItem value="7">7 years</SelectItem>
                              <SelectItem value="10">10 years</SelectItem>
                              <SelectItem value="15">15 years</SelectItem>
                              <SelectItem value="20">20 years</SelectItem>
                              <SelectItem value="30">30 years</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose your preferred repayment period
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Loan Type */}
                    <FormField
                      control={form.control}
                      name="loanType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Loan Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select loan type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="personal">Personal Loan</SelectItem>
                              <SelectItem value="home">Home Loan</SelectItem>
                              <SelectItem value="business">Business Loan</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Select the type of loan you're interested in
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-center mt-8">
              <Button 
                type="submit"
                className="bg-brandblue-600 hover:bg-brandblue-700"
                disabled={!company1 || !company2}
              >
                Compare Loan Features
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
        
        {/* Comparison Results */}
        {showComparison && company1Features && company2Features && (
          <Card className="max-w-7xl mx-auto mt-12">
            <CardHeader>
              <CardTitle>Loan Features Comparison</CardTitle>
              <CardDescription>Compare loan features between {company1} and {company2} based on your financial profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Selected Loan Type Comparison */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 capitalize">
                    {form.getValues().loanType} Loans
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Feature</TableHead>
                        <TableHead>{company1}</TableHead>
                        <TableHead>{company2}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Interest Rate</TableCell>
                        {renderRateComparison(
                          company1Features.interestRates[form.getValues().loanType],
                          company2Features.interestRates[form.getValues().loanType]
                        )}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Tenure Options</TableCell>
                        <TableCell>{company1Features.tenureOptions[form.getValues().loanType]}</TableCell>
                        <TableCell>{company2Features.tenureOptions[form.getValues().loanType]}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Preclosure Charges</TableCell>
                        <TableCell>{company1Features.preclosureCharges[form.getValues().loanType]}</TableCell>
                        <TableCell>{company2Features.preclosureCharges[form.getValues().loanType]}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Maximum Eligibility</TableCell>
                        <TableCell>
                          {calculateEligibility(
                            company1Features.maxEligibility[form.getValues().loanType],
                            form.getValues().monthlySalary,
                            form.getValues().existingObligations
                          )}
                        </TableCell>
                        <TableCell>
                          {calculateEligibility(
                            company2Features.maxEligibility[form.getValues().loanType],
                            form.getValues().monthlySalary,
                            form.getValues().existingObligations
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                {/* Loan Comparison Insights */}
                <div className="p-4 bg-blue-50 text-blue-800 rounded-md">
                  <h4 className="font-medium mb-2">Comparison Insights</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>The better interest rates are highlighted in green.</li>
                    <li>
                      {form.getValues().monthlySalary && (
                        <>
                          Based on your monthly salary of ₹{parseFloat(form.getValues().monthlySalary).toLocaleString()}, 
                          the maximum loan eligibility is calculated.
                        </>
                      )}
                    </li>
                    <li>
                      {form.getValues().existingObligations && parseFloat(form.getValues().existingObligations) > 0 && (
                        <>
                          Your existing obligations of ₹{parseFloat(form.getValues().existingObligations).toLocaleString()}/month
                          have been considered in the eligibility calculation.
                        </>
                      )}
                    </li>
                    <li>Preferred loan tenor: {form.getValues().preferredTenor} years</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CompareLoans;
