
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
              Check your eligibility for various loan products and get personalized rate offers in just minutes.
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
                      <h3 className="text-xl font-medium text-gray-900">Enter Your Details</h3>
                      <p className="mt-2 text-gray-600">
                        Provide basic information about the loan amount, term, and type you're looking for.
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
                      <h3 className="text-xl font-medium text-gray-900">Get Instant Results</h3>
                      <p className="mt-2 text-gray-600">
                        Our calculator instantly shows your eligibility status and estimated monthly payments.
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
                      <h3 className="text-xl font-medium text-gray-900">Compare Personalized Offers</h3>
                      <p className="mt-2 text-gray-600">
                        Browse through pre-qualified loan offers from our lending partners.
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
                      <h3 className="text-xl font-medium text-gray-900">Apply Securely</h3>
                      <p className="mt-2 text-gray-600">
                        Choose the best offer and complete your application with minimal documentation.
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
                    <h4 className="text-lg font-medium text-gray-900">Does checking my eligibility affect my credit score?</h4>
                    <p className="mt-2 text-gray-600">
                      No, our eligibility calculator performs a soft credit check that doesn't impact your credit score.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">What information do I need to provide for the eligibility check?</h4>
                    <p className="mt-2 text-gray-600">
                      Basic details like loan amount, purpose, income, employment information, and existing debts.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">How accurate is the eligibility result?</h4>
                    <p className="mt-2 text-gray-600">
                      Our calculator provides a high-accuracy preliminary assessment based on the information you provide and our lending partners' criteria.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">What factors determine my loan eligibility?</h4>
                    <p className="mt-2 text-gray-600">
                      Key factors include your credit score, income, employment stability, existing debt obligations, and the loan amount requested.
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
