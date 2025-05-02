
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LoanTypes from "@/components/LoanTypes";
import LoanCalculator from "@/components/LoanCalculator";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
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
