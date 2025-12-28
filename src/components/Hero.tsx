import { Button } from "./ui/button";
import { ArrowRight, Wheat } from "lucide-react";
import heroImage from "@/assets/hero-wheat.jpg";
import logo from "@/assets/om-canvassing.png";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Golden wheat field"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-earth-dark/90 via-earth-brown/80 to-earth-dark/70" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-wheat-gold/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-28 md:pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-10 animate-scale-in">
            <img
              src={logo}
              alt="Om Canvassing Agentz"
              className="h-56 md:h-72 w-56 md:w-72 mx-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* Tagline */}
          <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-cream/10 border border-cream/20 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Wheat className="h-5 w-5 text-wheat-light" />
            <span className="text-wheat-light font-semibold tracking-[0.3em] uppercase text-xs">
              Since 2010 • Trichy
            </span>
            <Wheat className="h-5 w-5 text-wheat-light" />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-cream mb-6 leading-tight tracking-tight animate-fade-in" style={{ animationDelay: "0.3s" }}>
            Premium Quality
            <span className="block text-wheat-light">Grain Products</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-cream/80 mb-10 max-w-xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.4s" }}>
            High-quality wheat, atta, maida, sooji, rava, bran, and flakes in bulk.
            Serving South India with consistent supply and integrity.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <Button variant="hero" size="xl" className="shadow-gold" asChild>
              <a href="#products">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" className="border-cream/60 text-cream/90 hover:bg-cream/10" asChild>
              <a href="#contact">Contact Us</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-10 border-t border-cream/20 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div>
              <p className="text-3xl md:text-4xl font-display font-bold text-wheat-light">15+</p>
              <p className="text-cream/70 text-sm">Years Experience</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-display font-bold text-wheat-light">500+</p>
              <p className="text-cream/70 text-sm">Happy Clients</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-display font-bold text-wheat-light">10+</p>
              <p className="text-cream/70 text-sm">Product Range</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-cream/40 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-cream/60 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
