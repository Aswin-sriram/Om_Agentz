import { CheckCircle, Target, Heart, Award } from "lucide-react";
import productsImage from "@/assets/products-display.jpg";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To provide the finest quality grain products to our customers while maintaining competitive prices and exceptional service.",
    },
    {
      icon: Heart,
      title: "Our Values",
      description: "Integrity, quality, and customer satisfaction are at the core of everything we do. We believe in building lasting relationships.",
    },
    {
      icon: Award,
      title: "Our Promise",
      description: "Every product that leaves our warehouse meets the highest standards of quality and freshness, guaranteed.",
    },
  ];

  const highlights = [
    "Premium quality grain products",
    "Direct sourcing from trusted farmers",
    "Competitive wholesale prices",
    "Timely delivery across South India",
    "Consistent quality assurance",
    "Customer-focused approach",
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-gradient-section">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-widest uppercase text-sm">
            About Us
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-3 mb-4">
            Trusted Grain Trading Partner
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            With over 15 years of experience in the grain trading industry, Om Canvassing Agentz 
            has established itself as a reliable name in South India.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image */}
          <div className="relative animate-slide-in-left">
            <div className="absolute -inset-4 bg-primary/10 rounded-2xl -rotate-3" />
            <img
              src={productsImage}
              alt="Premium grain products display"
              className="relative rounded-xl shadow-warm w-full object-cover aspect-[4/3]"
            />
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-gold">
              <p className="text-4xl font-display font-bold">15+</p>
              <p className="text-sm">Years of Excellence</p>
            </div>
          </div>

          {/* Content */}
          <div className="animate-slide-in-right">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
              Your Reliable Source for Quality Grains Since 2010
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Om Canvassing Agentz was founded by Mr. Saravanan J with a vision to bridge the gap 
              between quality grain producers and businesses across South India. Based in Trichy, 
              Tamil Nadu, we have grown to become a trusted name in the wholesale grain trading industry.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We specialize in a wide range of products including wheat, whole wheat flour (atta), 
              refined flour (maida), semolina (sooji & rava), wheat bran, flakes, and various other 
              grain-based products. Our commitment to quality and customer satisfaction sets us apart.
            </p>

            {/* Highlights */}
            <div className="grid sm:grid-cols-2 gap-3">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-xl shadow-card hover:shadow-warm transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <value.icon className="h-7 w-7 text-primary" />
              </div>
              <h4 className="text-xl font-display font-bold text-foreground mb-3">
                {value.title}
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
