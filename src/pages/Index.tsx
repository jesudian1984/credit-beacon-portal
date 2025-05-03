
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LoanTypes from "@/components/LoanTypes";
import LoanCalculator from "@/components/LoanCalculator";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PhoneCall, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
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
    const message = encodeURIComponent("Hi, I'm interested in learning more about EasyLends loans. Can you help me?");
    
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
        <Hero />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-center gap-4 flex-wrap">
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
        </div>
        <LoanTypes />
        <LoanCalculator />
        <Features />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
