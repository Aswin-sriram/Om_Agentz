import { Shield, Truck, BadgeCheck, Users, Clock, Leaf } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: BadgeCheck,
      title: "Quality Assured",
      description: "Every product undergoes strict quality checks before dispatch.",
    },
    {
      icon: Truck,
      title: "Timely Delivery",
      description: "Reliable and prompt delivery across South India.",
    },
    {
      icon: Shield,
      title: "Trusted Since 2010",
      description: "15+ years of trust and excellent service to our customers.",
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Dedicated support and personalized service for every client.",
    },
    {
      icon: Leaf,
      title: "Fresh Products",
      description: "Direct sourcing ensures maximum freshness and shelf life.",
    },
    {
      icon: Clock,
      title: "Competitive Pricing",
      description: "Best wholesale rates without compromising on quality.",
    },
  ];

  return (
    <section id="why-us" className="py-20 md:py-28 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-wheat-light font-semibold tracking-widest uppercase text-sm">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-secondary-foreground mt-3 mb-4">
            Your Satisfaction, Our Priority
          </h2>
          <p className="text-secondary-foreground/70 max-w-2xl mx-auto text-lg">
            We go the extra mile to ensure every customer receives the best products 
            and service in the industry.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex gap-5 p-6 rounded-xl bg-secondary-foreground/5 hover:bg-secondary-foreground/10 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-wheat-gold/20 rounded-lg flex items-center justify-center">
                  <feature.icon className="h-7 w-7 text-wheat-light" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-secondary-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary-foreground/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial / Quote */}
        <div className="mt-16 text-center">
          <blockquote className="max-w-3xl mx-auto">
            <p className="text-2xl md:text-3xl font-display text-secondary-foreground/90 italic leading-relaxed">
              "Building relationships through quality and trust – that's our commitment to every customer."
            </p>
            <footer className="mt-6">
              <p className="text-wheat-light font-semibold">Mr. Saravanan J</p>
              <p className="text-secondary-foreground/60 text-sm">Founder, Om Canvassing Agentz</p>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
