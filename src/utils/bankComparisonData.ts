
export interface LoanFeature {
  interestRate: string;
  processingFee: string;
  maxLoanAmount: string;
  maxTenure: string;
  prepaymentPenalty: string;
  eligibilityCriteria: string;
  turnaroundTime: string;
  specialFeatures: string[];
}

export interface BankLoanData {
  id: string;
  name: string;
  logo?: string;
  type: 'Bank' | 'NBFC';
  category?: string;
  personalLoan: LoanFeature;
  homeLoan: LoanFeature;
  businessLoan: LoanFeature;
}

// Data for various banks and NBFCs
const bankComparisonData: BankLoanData[] = [
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    type: 'Bank',
    category: 'Private Bank',
    personalLoan: {
      interestRate: '10.90% - 16.00% p.a.',
      processingFee: '1.00% - 2.50%',
      maxLoanAmount: '₹ 40 Lakhs',
      maxTenure: '84 Months (7 Years)',
      prepaymentPenalty: '2% on outstanding amount',
      eligibilityCriteria: 'Min. salary ₹25,000/month (metro cities), Credit score >725',
      turnaroundTime: '24-48 hours',
      specialFeatures: ['Instant disbursal option', 'Flexible repayment options', 'No collateral required']
    },
    homeLoan: {
      interestRate: '7.00% - 7.55% p.a.',
      processingFee: '0.50% or max ₹10,000',
      maxLoanAmount: '₹ 10 Crores',
      maxTenure: '30 Years',
      prepaymentPenalty: 'Nil for floating rate loans',
      eligibilityCriteria: 'Min. salary ₹30,000/month, Credit score >750',
      turnaroundTime: '3-7 days',
      specialFeatures: ['Special rates for women borrowers', 'Property search assistance', 'Step-up EMI facility']
    },
    businessLoan: {
      interestRate: '14.00% - 18.50% p.a.',
      processingFee: '1.50% - 2.50%',
      maxLoanAmount: '₹ 50 Lakhs',
      maxTenure: '3-5 Years',
      prepaymentPenalty: '3% on outstanding amount',
      eligibilityCriteria: 'Business vintage minimum 3 years, Annual turnover ₹20 lakhs',
      turnaroundTime: '4-7 days',
      specialFeatures: ['Minimal documentation', 'Minimal collateral', 'Customized repayment schedules']
    }
  },
  {
    id: 'icici',
    name: 'ICICI Bank',
    type: 'Bank',
    category: 'Private Bank',
    personalLoan: {
      interestRate: '10.90% - 16.50% p.a.',
      processingFee: '1.00% - 2.25%',
      maxLoanAmount: '₹ 50 Lakhs',
      maxTenure: '84 Months (7 Years)',
      prepaymentPenalty: '2% on outstanding amount',
      eligibilityCriteria: 'Min. salary ₹22,500/month (metro cities), Credit score >700',
      turnaroundTime: '24 hours',
      specialFeatures: ['Digital approval process', 'Pre-approved loans for existing customers', 'No security required']
    },
    homeLoan: {
      interestRate: '7.10% - 7.70% p.a.',
      processingFee: '0.50% or max ₹10,000',
      maxLoanAmount: '₹ No upper limit',
      maxTenure: '30 Years',
      prepaymentPenalty: 'Nil for floating rate loans',
      eligibilityCriteria: 'Min. salary ₹30,000/month, Credit score >700',
      turnaroundTime: '3-8 days',
      specialFeatures: ['Overdraft facility', 'Home loan balance transfer', 'Special rates for salaried customers']
    },
    businessLoan: {
      interestRate: '15.00% - 19.00% p.a.',
      processingFee: '1.75% - 2.50%',
      maxLoanAmount: '₹ 40 Lakhs',
      maxTenure: '4 Years',
      prepaymentPenalty: '3% on outstanding amount',
      eligibilityCriteria: 'Business vintage minimum 2 years, Annual turnover ₹15 lakhs',
      turnaroundTime: '3-7 days',
      specialFeatures: ['Online application', 'GST-based lending', 'Relationship manager support']
    }
  },
  {
    id: 'axis',
    name: 'Axis Bank',
    type: 'Bank',
    category: 'Private Bank',
    personalLoan: {
      interestRate: '10.75% - 17.00% p.a.',
      processingFee: '1.00% - 2.00%',
      maxLoanAmount: '₹ 40 Lakhs',
      maxTenure: '84 Months (7 Years)',
      prepaymentPenalty: '2% on outstanding amount',
      eligibilityCriteria: 'Min. salary ₹25,000/month, Credit score >725',
      turnaroundTime: '24-48 hours',
      specialFeatures: ['Express credit', 'Digital KYC', 'Pre-qualified offers']
    },
    homeLoan: {
      interestRate: '7.15% - 7.85% p.a.',
      processingFee: '0.50% or max ₹10,000',
      maxLoanAmount: '₹ 7.5 Crores',
      maxTenure: '30 Years',
      prepaymentPenalty: 'Nil for floating rate loans',
      eligibilityCriteria: 'Min. salary ₹25,000/month, Credit score >725',
      turnaroundTime: '4-8 days',
      specialFeatures: ['Special discounts for existing customers', 'Home loan insurance', 'Balance transfer options']
    },
    businessLoan: {
      interestRate: '14.50% - 18.50% p.a.',
      processingFee: '1.50% - 2.25%',
      maxLoanAmount: '₹ 30 Lakhs',
      maxTenure: '5 Years',
      prepaymentPenalty: '2% on outstanding amount',
      eligibilityCriteria: 'Business vintage minimum 3 years, Annual turnover ₹15 lakhs',
      turnaroundTime: '4-7 days',
      specialFeatures: ['Business assessment score', 'Customized lending solutions', 'Overdraft options']
    }
  },
  {
    id: 'indusind',
    name: 'IndusInd Bank',
    type: 'Bank',
    category: 'Private Bank',
    personalLoan: {
      interestRate: '10.35% - 18.00% p.a.',
      processingFee: '1.50% - 2.50%',
      maxLoanAmount: '₹ 25 Lakhs',
      maxTenure: '84 Months (7 Years)',
      prepaymentPenalty: '3% on outstanding amount',
      eligibilityCriteria: 'Min. salary ₹30,000/month, Credit score >725',
      turnaroundTime: '2-3 days',
      specialFeatures: ['Flexible tenures', 'Quick disbursal', 'Multiple EMI options']
    },
    homeLoan: {
      interestRate: '7.55% - 8.75% p.a.',
      processingFee: '1.00% or max ₹10,000',
      maxLoanAmount: '₹ 5 Crores',
      maxTenure: '25 Years',
      prepaymentPenalty: '1% for fixed rate loans, Nil for floating',
      eligibilityCriteria: 'Min. salary ₹35,000/month, Credit score >750',
      turnaroundTime: '5-9 days',
      specialFeatures: ['Loan against property option', 'Top-up facility', 'Joint applicant benefits']
    },
    businessLoan: {
      interestRate: '15.50% - 19.50% p.a.',
      processingFee: '1.75% - 2.75%',
      maxLoanAmount: '₹ 30 Lakhs',
      maxTenure: '4 Years',
      prepaymentPenalty: '3% on outstanding amount',
      eligibilityCriteria: 'Business vintage minimum 3 years, Annual turnover ₹20 lakhs',
      turnaroundTime: '5-8 days',
      specialFeatures: ['Limited documentation', 'Business expansion funding', 'Equipment financing']
    }
  },
  {
    id: 'bandhan',
    name: 'Bandhan Bank',
    type: 'Bank',
    category: 'Private Bank',
    personalLoan: {
      interestRate: '10.75% - 19.00% p.a.',
      processingFee: '2.00% - 3.00%',
      maxLoanAmount: '₹ 15 Lakhs',
      maxTenure: '60 Months (5 Years)',
      prepaymentPenalty: '3% on outstanding amount',
      eligibilityCriteria: 'Min. salary ₹18,000/month, Credit score >680',
      turnaroundTime: '3-5 days',
      specialFeatures: ['Micro-loan options', 'Rural focus lending', 'Self-employed friendly']
    },
    homeLoan: {
      interestRate: '7.99% - 9.50% p.a.',
      processingFee: '1.00% or max ₹15,000',
      maxLoanAmount: '₹ 1.5 Crores',
      maxTenure: '25 Years',
      prepaymentPenalty: 'Nil after 6 months',
      eligibilityCriteria: 'Min. salary ₹25,000/month, Credit score >700',
      turnaroundTime: '5-10 days',
      specialFeatures: ['Affordable housing focus', 'Home improvement loans', 'Semi-urban property financing']
    },
    businessLoan: {
      interestRate: '16.00% - 20.00% p.a.',
      processingFee: '2.00% - 3.00%',
      maxLoanAmount: '₹ 20 Lakhs',
      maxTenure: '3 Years',
      prepaymentPenalty: '4% on outstanding amount',
      eligibilityCriteria: 'Business vintage minimum 2 years, Annual turnover ₹10 lakhs',
      turnaroundTime: '4-7 days',
      specialFeatures: ['Small business focus', 'Micro-entrepreneur support', 'Community business networks']
    }
  },
  {
    id: 'bajaj',
    name: 'Bajaj Finance',
    type: 'NBFC',
    category: 'Large NBFC',
    personalLoan: {
      interestRate: '11.00% - 16.00% p.a.',
      processingFee: '1.50% - 3.50%',
      maxLoanAmount: '₹ 25 Lakhs',
      maxTenure: '84 Months (7 Years)',
      prepaymentPenalty: '4% on outstanding amount',
      eligibilityCriteria: 'Min. salary ₹25,000/month, Credit score >700',
      turnaroundTime: '24 hours',
      specialFeatures: ['No guarantor required', 'Flexi loan facility', 'Existing customer benefits']
    },
    homeLoan: {
      interestRate: '8.50% - 11.00% p.a.',
      processingFee: '1.00% - 2.00%',
      maxLoanAmount: '₹ 5 Crores',
      maxTenure: '25 Years',
      prepaymentPenalty: '2% on prepaid amount (case by case)',
      eligibilityCriteria: 'Min. salary ₹35,000/month, Credit score >725',
      turnaroundTime: '4-8 days',
      specialFeatures: ['Property search services', 'Digital documentation', 'Home loan insurance bundling']
    },
    businessLoan: {
      interestRate: '14.00% - 20.00% p.a.',
      processingFee: '2.00% - 4.00%',
      maxLoanAmount: '₹ 45 Lakhs',
      maxTenure: '5 Years',
      prepaymentPenalty: '4% on outstanding amount',
      eligibilityCriteria: 'Business vintage minimum 3 years, Annual turnover ₹15 lakhs',
      turnaroundTime: '3 days',
      specialFeatures: ['Doctor loans', 'Professional loans', 'Flexible EMI options']
    }
  },
  {
    id: 'axis-finance',
    name: 'Axis Finance',
    type: 'NBFC',
    category: 'Bank-backed NBFC',
    personalLoan: {
      interestRate: '13.50% - 18.00% p.a.',
      processingFee: '1.00% - 3.00%',
      maxLoanAmount: '₹ 20 Lakhs',
      maxTenure: '72 Months (6 Years)',
      prepaymentPenalty: '3% on outstanding amount',
      eligibilityCriteria: 'Min. salary ₹30,000/month, Credit score >700',
      turnaroundTime: '2-3 days',
      specialFeatures: ['Axis Bank customer benefits', 'Customized solutions', 'Digital processing']
    },
    homeLoan: {
      interestRate: '8.75% - 10.50% p.a.',
      processingFee: '1.00% - 2.00%',
      maxLoanAmount: '₹ 3 Crores',
      maxTenure: '20 Years',
      prepaymentPenalty: '1-2% based on loan type',
      eligibilityCriteria: 'Min. salary ₹40,000/month, Credit score >750',
      turnaroundTime: '5-9 days',
      specialFeatures: ['Under-construction property funding', 'Ready-to-move options', 'Cross-selling benefits']
    },
    businessLoan: {
      interestRate: '15.50% - 20.50% p.a.',
      processingFee: '1.75% - 3.50%',
      maxLoanAmount: '₹ 35 Lakhs',
      maxTenure: '7 Years',
      prepaymentPenalty: '3% on outstanding amount',
      eligibilityCriteria: 'Business vintage minimum 2 years, Annual turnover ₹25 lakhs',
      turnaroundTime: '3-7 days',
      specialFeatures: ['Working capital funding', 'Asset financing', 'Specialized industry solutions']
    }
  },
  {
    id: 'muthoot',
    name: 'Muthoot Finance',
    type: 'NBFC',
    category: 'Gold Loan NBFC',
    personalLoan: {
      interestRate: '15.00% - 24.00% p.a.',
      processingFee: '1.00% - 2.50%',
      maxLoanAmount: '₹ 10 Lakhs',
      maxTenure: '36 Months (3 Years)',
      prepaymentPenalty: '2% on outstanding amount',
      eligibilityCriteria: 'Gold collateral, No strict income requirement',
      turnaroundTime: '1 hour - 1 day',
      specialFeatures: ['Gold loan specialist', 'Immediate disbursal', 'Minimal documentation']
    },
    homeLoan: {
      interestRate: '9.50% - 12.00% p.a.',
      processingFee: '1.00% - 2.50%',
      maxLoanAmount: '₹ 50 Lakhs',
      maxTenure: '15 Years',
      prepaymentPenalty: '2% on prepaid amount',
      eligibilityCriteria: 'Min. salary ₹30,000/month, Credit score >700',
      turnaroundTime: '7-14 days',
      specialFeatures: ['Property valuation expertise', 'Location-based offerings', 'Self-employed options']
    },
    businessLoan: {
      interestRate: '16.00% - 24.00% p.a.',
      processingFee: '2.00% - 3.00%',
      maxLoanAmount: '₹ 25 Lakhs',
      maxTenure: '5 Years',
      prepaymentPenalty: '3% on outstanding amount',
      eligibilityCriteria: 'Business vintage minimum 1 year, Gold collateral advantage',
      turnaroundTime: '1-3 days',
      specialFeatures: ['Gold-backed business loans', 'Quick processing', 'Flexible repayment']
    }
  },
  {
    id: 'yes-bank',
    name: 'Yes Bank',
    type: 'Bank',
    category: 'Private Bank',
    personalLoan: {
      interestRate: '10.99% - 16.50% p.a.',
      processingFee: '1.00% - 2.50%',
      maxLoanAmount: '₹ 40 Lakhs',
      maxTenure: '60 Months (5 Years)',
      prepaymentPenalty: '2% on outstanding amount',
      eligibilityCriteria: 'Min. salary ₹25,000/month, Credit score >700',
      turnaroundTime: '24-72 hours',
      specialFeatures: ['Digital onboarding', 'Paperless approval', 'Priority customer benefits']
    },
    homeLoan: {
      interestRate: '7.45% - 8.50% p.a.',
      processingFee: '0.50% - 1.00%',
      maxLoanAmount: '₹ 5 Crores',
      maxTenure: '30 Years',
      prepaymentPenalty: 'Nil for floating rate loans',
      eligibilityCriteria: 'Min. salary ₹35,000/month, Credit score >725',
      turnaroundTime: '5-9 days',
      specialFeatures: ['Home construction options', 'Land purchase financing', 'Top-up loan facility']
    },
    businessLoan: {
      interestRate: '14.50% - 18.00% p.a.',
      processingFee: '1.50% - 2.50%',
      maxLoanAmount: '₹ 50 Lakhs',
      maxTenure: '5 Years',
      prepaymentPenalty: '3% on outstanding amount',
      eligibilityCriteria: 'Business vintage minimum 3 years, Annual turnover ₹25 lakhs',
      turnaroundTime: '3-7 days',
      specialFeatures: ['Business current account benefits', 'Digital banking integration', 'Relationship manager']
    }
  },
  {
    id: 'lt-finance',
    name: 'L&T Finance',
    type: 'NBFC',
    category: 'Corporate-backed NBFC',
    personalLoan: {
      interestRate: '11.50% - 19.00% p.a.',
      processingFee: '1.50% - 3.00%',
      maxLoanAmount: '₹ 25 Lakhs',
      maxTenure: '60 Months (5 Years)',
      prepaymentPenalty: '3% on outstanding amount',
      eligibilityCriteria: 'Min. salary ₹25,000/month, Credit score >700',
      turnaroundTime: '3-5 days',
      specialFeatures: ['Specialized professional loans', 'Balance transfer options', 'Flexible tenures']
    },
    homeLoan: {
      interestRate: '8.60% - 11.00% p.a.',
      processingFee: '1.00% - 2.00%',
      maxLoanAmount: '₹ 5 Crores',
      maxTenure: '25 Years',
      prepaymentPenalty: '2% for fixed rate, Nil for floating',
      eligibilityCriteria: 'Min. salary ₹35,000/month, Credit score >725',
      turnaroundTime: '7-10 days',
      specialFeatures: ['Rural housing finance', 'Property search assistance', 'Home loan insurance']
    },
    businessLoan: {
      interestRate: '15.00% - 20.00% p.a.',
      processingFee: '2.00% - 3.50%',
      maxLoanAmount: '₹ 50 Lakhs',
      maxTenure: '7 Years',
      prepaymentPenalty: '4% on outstanding amount',
      eligibilityCriteria: 'Business vintage minimum 3 years, Annual turnover ₹20 lakhs',
      turnaroundTime: '7-10 days',
      specialFeatures: ['Infrastructure financing expertise', 'Equipment financing', 'Project-based funding']
    }
  },
  {
    id: 'idfc',
    name: 'IDFC First Bank',
    type: 'Bank',
    category: 'Private Bank',
    personalLoan: {
      interestRate: '10.99% - 17.00% p.a.',
      processingFee: '1.00% - 2.00%',
      maxLoanAmount: '₹ 30 Lakhs',
      maxTenure: '60 Months (5 Years)',
      prepaymentPenalty: '2% on outstanding amount',
      eligibilityCriteria: 'Min. salary ₹25,000/month, Credit score >700',
      turnaroundTime: '24-48 hours',
      specialFeatures: ['Zero bouncing charges', 'No foreclosure charges', 'Zero charges on EMI via NACH']
    },
    homeLoan: {
      interestRate: '7.00% - 8.75% p.a.',
      processingFee: '0.50% or max ₹10,000',
      maxLoanAmount: '₹ 5 Crores',
      maxTenure: '30 Years',
      prepaymentPenalty: 'Nil',
      eligibilityCriteria: 'Min. salary ₹25,000/month, Credit score >700',
      turnaroundTime: '3-7 days',
      specialFeatures: ['Attractive interest rates', 'No prepayment charges', 'Fixed and floating options']
    },
    businessLoan: {
      interestRate: '14.00% - 19.00% p.a.',
      processingFee: '1.50% - 2.50%',
      maxLoanAmount: '₹ 35 Lakhs',
      maxTenure: '5 Years',
      prepaymentPenalty: '2% on outstanding amount',
      eligibilityCriteria: 'Business vintage minimum 2 years, Annual turnover ₹15 lakhs',
      turnaroundTime: '3-7 days',
      specialFeatures: ['Working capital financing', 'Business expansion loans', 'Digital banking benefits']
    }
  }
];

export default bankComparisonData;
