
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoanCalculator from "@/components/LoanCalculator";
import { Button } from "@/components/ui/button";

const Eligibility = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-brandblue-600 to-brandblue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-6">Loan Eligibility Calculator</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Check your eligibility for various loan products based on your income, employment, and credit profile.
            </p>
          </div>
        </div>
        
        {/* Calculator Section */}
        <LoanCalculator />
        
        {/* Additional Information */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How Our Eligibility Calculator Works</h2>
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brandblue-100 text-brandblue-600">
                        <span className="text-xl font-bold">1</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-medium text-gray-900">Income Assessment</h3>
                      <p className="mt-2 text-gray-600">
                        We evaluate your monthly income and existing financial obligations to determine your repayment capacity.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brandblue-100 text-brandblue-600">
                        <span className="text-xl font-bold">2</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-medium text-gray-900">Employment Profile</h3>
                      <p className="mt-2 text-gray-600">
                        Your company category affects your eligibility. Top-tier companies (Category A) typically qualify for higher loan amounts and better terms.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brandblue-100 text-brandblue-600">
                        <span className="text-xl font-bold">3</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-medium text-gray-900">FOIR Calculation</h3>
                      <p className="mt-2 text-gray-600">
                        Fixed Obligation to Income Ratio (FOIR) measures your total debt obligations against your income. The maximum allowed FOIR varies by loan type and company category.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brandblue-100 text-brandblue-600">
                        <span className="text-xl font-bold">4</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-medium text-gray-900">Loan Term Impact</h3>
                      <p className="mt-2 text-gray-600">
                        Your chosen loan tenor affects your monthly EMI and overall eligibility. Longer terms mean lower EMIs but may affect total interest paid.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <Button className="bg-brandblue-600 hover:bg-brandblue-700">Talk to a Loan Expert</Button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">What is FOIR and how does it affect my loan eligibility?</h4>
                    <p className="mt-2 text-gray-600">
                      FOIR (Fixed Obligation to Income Ratio) is the proportion of your monthly income that goes towards repaying debts. Lenders typically cap this at 40-75% depending on your profile. A lower FOIR indicates better repayment capacity and higher loan eligibility.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">How does my company category affect my loan eligibility?</h4>
                    <p className="mt-2 text-gray-600">
                      Lenders classify employers into categories (A to D) based on company stability and reputation. Employees of Category A companies (like established MNCs) typically get higher loan amounts, better rates, and higher FOIR limits compared to other categories.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Why is my eligibility amount different for different types of loans?</h4>
                    <p className="mt-2 text-gray-600">
                      Different loan types carry different risk levels for lenders. Home loans typically allow higher eligibility amounts and FOIR limits due to the property collateral, while unsecured loans like personal loans have stricter eligibility criteria.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">How accurate is the eligibility calculator?</h4>
                    <p className="mt-2 text-gray-600">
                      Our calculator provides a close estimate based on standard industry parameters. However, actual eligibility may vary based on your credit score, additional income sources, and lender-specific policies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Eligibility;
