import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    loanType: "Personal Loan",
    loanAmount: "500000"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please login to submit an application");
      navigate('/auth');
      return;
    }
    
    // Simple validation
    if (!formData.name || !formData.phone) {
      toast.error("Please fill all required fields");
      return;
    }

    // Phone validation
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      const { error } = await supabase
        .from('loan_applications')
        .insert({
          user_id: user.id,
          full_name: formData.name,
          email: user.email || '',
          phone: formData.phone,
          loan_type: formData.loanType,
          loan_amount: parseFloat(formData.loanAmount),
        });

      if (error) throw error;

      toast.success(`Application submitted successfully! We'll call you at ${formData.phone} shortly.`);

      // Clear form
      setFormData({
        name: "",
        phone: "",
        loanType: formData.loanType,
        loanAmount: formData.loanAmount
      });

      // Close the dialog by simulating an escape key press
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    } catch (error: any) {
      toast.error(error.message || "Failed to submit application");
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-brandblue-50 to-brandblue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Find the Perfect</span>
                <span className="block gradient-text">Loan for You</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
                Compare loans from multiple lenders, check your eligibility, and get the best rates. Our advanced calculator helps you find the perfect financial solution.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button className="bg-brandblue-600 hover:bg-brandblue-700 text-white px-8 py-3 rounded-md font-medium text-lg">
                  <Link to="/eligibility">Check Eligibility</Link>
                </Button>
                <Button variant="outline" className="border-brandblue-600 text-brandblue-600 hover:bg-brandblue-50 px-8 py-3 rounded-md font-medium text-lg">
                  <Link to="/bank-comparison">Compare Loans</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block relative h-96">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transform rotate-2 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-brandblue-100 flex items-center justify-center">
                      <svg className="h-6 w-6 text-brandblue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h2 className="font-medium text-gray-800">Personal Loan</h2>
                      <p className="text-sm text-gray-500">Starting at 10.35% p.a.</p>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-gray-200 rounded-full mb-4">
                    <div className="h-1 rounded-full bg-brandgreen-500 w-2/3"></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mb-8">
                    <span>₹25,000</span>
                    <span>Up to ₹1 Crore</span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-brandgreen-500 hover:bg-brandgreen-600">Apply Now</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Apply for Personal Loan</DialogTitle>
                        <DialogDescription>
                          Fill in your details below to get started with your loan application.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="10-digit mobile number"
                          />
                        </div>
                        <input type="hidden" name="loanType" value="Personal Loan" />
                        <input type="hidden" name="loanAmount" value="500000" />
                        <DialogFooter>
                          <Button type="submit" className="w-full mt-2 bg-brandgreen-500 hover:bg-brandgreen-600">
                            Submit Application
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center transform -rotate-3 -translate-x-4 translate-y-6">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-brandblue-100 flex items-center justify-center">
                      <svg className="h-6 w-6 text-brandblue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h2 className="font-medium text-gray-800">Personal Loan</h2>
                      <p className="text-sm text-gray-500">Starting at 10.35% p.a.</p>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-gray-200 rounded-full mb-4">
                    <div className="h-1 rounded-full bg-brandblue-600 w-3/4"></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mb-8">
                    <span>₹25,000</span>
                    <span>Up to ₹1 Crore</span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-brandblue-600 hover:bg-brandblue-700">Apply Now</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Apply for Personal Loan</DialogTitle>
                        <DialogDescription>
                          Fill in your details below to get started with your loan application.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name-blue">Full Name</Label>
                          <Input
                            id="name-blue"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="phone-blue">Phone Number</Label>
                          <Input
                            id="phone-blue"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="10-digit mobile number"
                          />
                        </div>
                        <input type="hidden" name="loanType" value="Personal Loan" />
                        <input type="hidden" name="loanAmount" value="500000" />
                        <DialogFooter>
                          <Button type="submit" className="w-full mt-2 bg-brandblue-600 hover:bg-brandblue-700">
                            Submit Application
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
