
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const loanTypes = [
  {
    icon: (
      <svg className="h-10 w-10 text-brandblue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: "Home Loans",
    description: "Purchase your dream home with competitive interest rates and flexible repayment terms.",
    rate: "From 6.75% p.a.",
    link: "/loans/home",
  },
  {
    icon: (
      <svg className="h-10 w-10 text-brandblue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Personal Loans",
    description: "Get funds for your personal needs with quick approval and minimal documentation.",
    rate: "From 9.5% p.a.",
    link: "/loans/personal",
  },
  {
    icon: (
      <svg className="h-10 w-10 text-brandblue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Business Loans",
    description: "Expand your business or manage cash flow with our business financing solutions.",
    rate: "From 8.25% p.a.",
    link: "/loans/business",
  },
  {
    icon: (
      <svg className="h-10 w-10 text-brandblue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: "Credit Cards",
    description: "Choose from a range of credit cards with rewards, cashback, and travel benefits.",
    rate: "From 12.99% p.a.",
    link: "/loans/credit-cards",
  },
];

const LoanTypes = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Explore Our Loan Products</h2>
          <p className="mt-4 text-lg text-gray-600">
            Find the right financial solution tailored to your specific needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loanTypes.map((loan, index) => (
            <Link to={loan.link} key={index} className="group">
              <Card className="h-full transition-all duration-200 hover:shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="rounded-full bg-brandblue-50 p-3 mb-4">
                    {loan.icon}
                  </div>
                  <h3 className="font-semibold text-xl text-gray-900 group-hover:text-brandblue-600">
                    {loan.title}
                  </h3>
                  <p className="text-gray-600 mt-2 flex-grow">{loan.description}</p>
                  <div className="mt-4 text-brandgreen-600 font-medium">{loan.rate}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoanTypes;
