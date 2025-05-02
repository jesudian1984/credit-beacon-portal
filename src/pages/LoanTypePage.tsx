
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoanCalculator from "@/components/LoanCalculator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface LoanTypePageProps {
  title: string;
}

const LoanTypePage = ({ title }: LoanTypePageProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-brandblue-600 to-brandblue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-4">
              <Link to="/" className="flex items-center text-white hover:text-brandblue-100">
                <ChevronLeft className="h-5 w-5 mr-1" />
                Back to Home
              </Link>
            </div>
            <h1 className="text-4xl font-bold mb-6">{title}</h1>
            <p className="text-xl max-w-2xl">
              Find the best {title.toLowerCase()} options tailored to your needs with our competitive rates and flexible terms.
            </p>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Check Your Eligibility</h2>
              <p className="mt-4 text-lg text-gray-600">
                Use our calculator to see how much you qualify for
              </p>
            </div>
            
            <div className="mb-12 text-center">
              <Link to="/eligibility">
                <Button className="bg-brandblue-600 hover:bg-brandblue-700">
                  Calculate My Eligibility
                </Button>
              </Link>
            </div>
            
            {/* Loan Calculator */}
            <LoanCalculator />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoanTypePage;
