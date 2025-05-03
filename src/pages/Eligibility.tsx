
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoanCalculator from "@/components/LoanCalculator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PhoneCall, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Eligibility = () => {
  const handleCallExpert = (e) => {
    e.preventDefault();
    const phoneNumber = "8610111595";
    
    // Use the tel: protocol to initiate a phone call
    const telLink = `tel:${phoneNumber}`;
    
    // Create and click an anchor element to trigger the call
    const a = document.createElement('a');
    a.href = telLink;
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Show a toast notification
    toast({
      title: "Calling Loan Expert",
      description: `Connecting you with our loan expert at ${phoneNumber}`,
      duration: 5000, // Show toast for 5 seconds
    });
  };

  const handleWhatsAppChat = (e) => {
    e.preventDefault();
    const phoneNumber = "8610111595";
    const message = encodeURIComponent("Hi, I'm interested in checking my loan eligibility. Can you help me?");
    
    // Create WhatsApp URL with phone number and pre-filled message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    // Show a toast notification
    toast({
      title: "WhatsApp Chat",
      description: "Opening WhatsApp chat with our loan expert",
      duration: 5000, // Show toast for 5 seconds
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-brandblue-600 to-brandblue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-6">Loan Eligibility Calculator</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Check your eligibility for various loan products based on your income, employment type, and credit profile.
            </p>
            <div className="mt-6">
              <Link to="/bank-comparison">
                <Button variant="outline" className="bg-white text-brandblue-700 hover:bg-gray-100">
                  Compare Banks & NBFCs
                </Button>
              </Link>
            </div>
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
                        Your employment type (Government, Railway, Defense, Medical, etc.) and company category affects your eligibility. Different categories qualify for different multipliers.
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
                      <h3 className="text-xl font-medium text-gray-900">Multiplier System</h3>
                      <p className="mt-2 text-gray-600">
                        Banks use income multipliers based on your employment type, income band, and loan tenure. Our calculator uses industry-standard multipliers similar to major banks like HDFC.
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
                      <h3 className="text-xl font-medium text-gray-900">Risk Profile Impact</h3>
                      <p className="mt-2 text-gray-600">
                        Your risk band (based on credit score and history) affects your eligibility. Higher risk bands like A1-A9 may qualify for special multipliers and higher loan amounts.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 flex gap-4 flex-wrap">
                  <Button 
                    className="bg-brandblue-600 hover:bg-brandblue-700 flex items-center gap-2"
                    onClick={handleCallExpert}
                  >
                    <PhoneCall size={16} />
                    Talk to a Loan Expert
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                    onClick={handleWhatsAppChat}
                  >
                    <MessageSquare size={16} />
                    Chat on WhatsApp
                  </Button>
                  <Link to="/bank-comparison">
                    <Button variant="outline">Compare Loan Options</Button>
                  </Link>
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
                    <h4 className="text-lg font-medium text-gray-900">What are loan multipliers and how are they used?</h4>
                    <p className="mt-2 text-gray-600">
                      Loan multipliers are values used by banks to determine your maximum eligible loan amount. The multiplier is applied to your monthly income (e.g., if your income is ₹50,000 and the multiplier is 20, your eligibility would be ₹10,00,000). Different multipliers apply based on employment type, salary, and tenure.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">How does my employment type affect my loan eligibility?</h4>
                    <p className="mt-2 text-gray-600">
                      Banks categorize borrowers based on employment stability. Government employees, military personnel, and employees of large corporations (Super Cat A, Cat A) typically get higher multipliers. Medical professionals, educators, and employees of smaller firms receive lower multipliers reflecting the perceived risk.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">What are risk bands in loan eligibility?</h4>
                    <p className="mt-2 text-gray-600">
                      Risk bands (like A1-A9, A1-B6, D1) are categories based on your credit score and history. Better risk bands may qualify for higher multipliers, even within the same employment category. These are used by banks to fine-tune eligibility for borrowers with exceptional credit profiles.
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
