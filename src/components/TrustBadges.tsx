import { Shield, Lock, Award, Users } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "256-bit SSL encryption"
    },
    {
      icon: Lock,
      title: "Data Protected",
      description: "Your information is safe"
    },
    {
      icon: Award,
      title: "RBI Approved",
      description: "Licensed & regulated"
    },
    {
      icon: Users,
      title: "10,000+ Users",
      description: "Trusted by thousands"
    }
  ];

  const partners = [
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra",
    "Yes Bank",
    "IDFC First"
  ];

  return (
    <div className="py-12 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-3 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                <badge.icon className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">
                {badge.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {badge.description}
              </p>
            </div>
          ))}
        </div>

        {/* Partner Banks */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-6 font-medium">
            Trusted Partner Banks & NBFCs
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partners.map((partner, index) => (
              <div 
                key={index} 
                className="px-6 py-3 bg-card rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <span className="text-foreground font-semibold text-sm">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
