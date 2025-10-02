
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Eligibility from "./pages/Eligibility";
import Admin from "./pages/Admin";
import Apply from "./pages/Apply";
import Contact from "./pages/Contact";
import TalkToExpert from "./pages/TalkToExpert";
import AboutPage from "./pages/AboutPage";
import Careers from "./pages/Careers";
import Auth from "./pages/Auth";

// Create a placeholder loan type page component
import LoanTypePage from "./pages/LoanTypePage";
import CompareLoans from "./pages/CompareLoans";
import BankComparison from "./pages/BankComparison";

// Import placeholder pages for new routes
import PlaceholderPage from "./pages/PlaceholderPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/compare" element={<Navigate to="/bank-comparison" />} />
          <Route path="/bank-comparison" element={<BankComparison />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/contact" element={<Navigate to="/talk-to-expert" />} />
          <Route path="/talk-to-expert" element={<TalkToExpert />} />
          
          {/* Loan type routes */}
          <Route path="/loans" element={<LoanTypePage title="All Loans" />} />
          <Route path="/loans/home" element={<LoanTypePage title="Home Loans" />} />
          <Route path="/loans/personal" element={<LoanTypePage title="Personal Loans" />} />
          <Route path="/loans/business" element={<LoanTypePage title="Business Loans" />} />
          <Route path="/loans/credit-cards" element={<LoanTypePage title="Credit Cards" />} />
          
          {/* New routes for About, Careers */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/our-team" element={<PlaceholderPage title="Our Team" />} />
          <Route path="/blog" element={<PlaceholderPage title="Blog" />} />
          <Route path="/help-center" element={<PlaceholderPage title="Help Center" />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
