import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "./ui/button";
import logo from "@/assets/om-canvassing.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About Us" },
    { href: "#products", label: "Products" },
    { href: "#why-us", label: "Why Choose Us" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg shadow-warm py-2"
          : "bg-background/30 backdrop-blur-md border-b border-cream/40 py-3"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Om Canvassing Agentz Logo"
              className="h-14 w-14 md:h-20 md:w-20 object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-display font-bold text-foreground leading-tight">
                Om Canvassing Agentz
              </h1>
              <p className="text-xs text-foreground/60">Premium Grain Products</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:9095111011"
              className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="font-medium">9095111011</span>
            </a>
            <Button size="lg" asChild>
              <a href="#contact">Get Quote</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md shadow-warm border-t border-border animate-fade-in">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground/80 hover:text-primary font-medium py-2 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:9095111011"
                className="flex items-center gap-2 text-primary font-medium py-2"
              >
                <Phone className="h-4 w-4" />
                <span>9095111011</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
