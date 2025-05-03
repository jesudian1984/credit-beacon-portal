
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Eligibility from "./pages/Eligibility";
import Admin from "./pages/Admin";

// Create a placeholder loan type page component
import LoanTypePage from "./pages/LoanTypePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/admin" element={<Admin />} />
          
          {/* Loan type routes */}
          <Route path="/loans" element={<LoanTypePage title="All Loans" />} />
          <Route path="/loans/home" element={<LoanTypePage title="Home Loans" />} />
          <Route path="/loans/personal" element={<LoanTypePage title="Personal Loans" />} />
          <Route path="/loans/business" element={<LoanTypePage title="Business Loans" />} />
          <Route path="/loans/credit-cards" element={<LoanTypePage title="Credit Cards" />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
