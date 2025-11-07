import { CheckCircle2, FileText, CreditCard } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      title: "Fill Application",
      description: "Complete our simple online form in just 5 minutes with basic details"
    },
    {
      icon: CheckCircle2,
      title: "Get Approved",
      description: "Receive instant approval decision from our partner banks within 24 hours"
    },
    {
      icon: CreditCard,
      title: "Receive Funds",
      description: "Get your loan amount disbursed directly to your bank account"
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get your loan in 3 simple steps. Fast, secure, and hassle-free process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection line for desktop */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-20" 
               style={{ width: 'calc(100% - 200px)', marginLeft: '100px' }} />
          
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center group">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-12 w-12 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm shadow-md">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
