import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingDown, Wallet, CheckCircle2 } from "lucide-react";

const LoanConsolidation = () => {
  const benefits = [
    "Lower interest rates than credit cards",
    "Single monthly payment for all debts",
    "Reduce financial stress and complexity",
    "Save money on interest charges"
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-accent/10 via-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
              <span className="text-accent text-sm font-semibold">💰 Save Money Today</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Consolidate Your Loans & Save Big
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Struggling with multiple credit card bills and fintech app loans? We help you combine them into one simple personal loan at much lower interest rates.
            </p>
            
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground shadow-lg"
              asChild
            >
              <Link to="/apply">
                Consolidate Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-primary to-primary/80 border-none shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-4">
                  <TrendingDown className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                  Up to 50%
                </h3>
                <p className="text-primary-foreground/80">
                  Lower interest rates compared to credit cards
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent to-accent/80 border-none shadow-xl hover:shadow-2xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-accent-foreground/20 flex items-center justify-center mb-4">
                  <Wallet className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-accent-foreground mb-2">
                  1 Payment
                </h3>
                <p className="text-accent-foreground/80">
                  Combine all loans into one simple monthly payment
                </p>
              </CardContent>
            </Card>

            <Card className="sm:col-span-2 bg-card border-border shadow-lg">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-3">What we consolidate:</h4>
                <div className="flex flex-wrap gap-2">
                  {["Credit Card Debt", "Fintech App Loans", "Multiple Personal Loans", "High-Interest Loans"].map((item, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanConsolidation;
