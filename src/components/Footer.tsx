import { Phone, Mail, MapPin, Wheat } from "lucide-react";
import logo from "@/assets/om-canvassing.png";

const Footer = () => {
  const currentYear = 2026;

  const quickLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About Us" },
    { href: "#products", label: "Products" },
    { href: "#why-us", label: "Why Choose Us" },
    { href: "#contact", label: "Contact" },
  ];

  const products = [
    "Premium Wheat",
    "Whole Wheat Atta",
    "Refined Maida",
    "Sooji / Semolina",
    "Samba Rava",
    "Wheat Bran",
  ];

  return (
    <footer className="bg-earth-dark text-cream/80">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Om Canvassing Agentz" className="h-24 w-24 object-contain" />
              <div>
                <h3 className="text-lg font-display font-bold text-cream">
                  Om Canvassing Agentz
                </h3>
                <p className="text-xs text-cream/60">Premium Grain Products</p>
              </div>
            </div>
            <p className="text-cream/70 leading-relaxed mb-6">
              Your trusted partner for premium quality grain products since 2010. 
              Serving businesses across South India with excellence.
            </p>
            <div className="flex items-center gap-2 text-wheat-light">
              <Wheat className="h-4 w-4" />
              <span className="text-sm font-medium">Quality • Trust • Excellence</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-bold text-cream mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-cream/70 hover:text-wheat-light transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-display font-bold text-cream mb-6">Our Products</h4>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product}>
                  <span className="text-cream/70">{product}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-display font-bold text-cream mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-wheat-light flex-shrink-0 mt-0.5" />
                <span className="text-cream/70">
                  No.98/c, Tanjore Road,<br />
                  Trichy - 620008
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-wheat-light flex-shrink-0" />
                <div>
                  <a href="tel:9095111011" className="text-cream/70 hover:text-wheat-light transition-colors block">
                    9095111011
                  </a>
                  <a href="tel:8344111011" className="text-cream/70 hover:text-wheat-light transition-colors block">
                    8344111011
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-wheat-light flex-shrink-0" />
                <a
                  href="mailto:omagentz2010@gmail.com"
                  className="text-cream/70 hover:text-wheat-light transition-colors"
                >
                  omagentz2010@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cream/60 text-sm text-center md:text-left">
              © {currentYear} Om Canvassing Agentz. All rights reserved.
            </p>
            <p className="text-cream/60 text-sm">
              Proprietor: Mr. Saravanan J
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
