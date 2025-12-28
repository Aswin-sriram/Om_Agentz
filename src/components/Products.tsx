import { Button } from "./ui/button";
import premiumWheatImage from "@/assets/premium-wheat-347.jpg";
import wholeWheatAttaImage from "@/assets/whole wheat atta.jpg";
import refinedMaidaImage from "@/assets/images.jpg";
import soojiImage from "@/assets/SoojiSemolina.jpg";
import sambaRavaImage from "@/assets/rava.jpg";
import wheatBranImage from "@/assets/wheat bran.jpg";
import wheatFlakesImage from "@/assets/wheat flakes.jpg";
import brokenWheatImage from "@/assets/Broken Wheat.jpg";

const Products = () => {
  const products = [
    {
      name: "Premium Wheat",
      description: "High-quality whole wheat grains sourced from the finest farms.",
      category: "Raw Grains",
      image: premiumWheatImage,
    },
    {
      name: "Whole Wheat Atta",
      description: "Fresh stone-ground whole wheat flour for nutritious rotis and chapatis.",
      category: "Flour",
      image: wholeWheatAttaImage,
    },
    {
      name: "Refined Maida",
      description: "Fine, smooth refined flour perfect for baking and sweets.",
      category: "Flour",
      image: refinedMaidaImage,
    },
    {
      name: "Sooji / Semolina",
      description: "Premium quality sooji for making upma, halwa, and more.",
      category: "Semolina",
      image: soojiImage,
    },
    {
      name: "Samba Rava",
      description: "Traditional South Indian rava for authentic dishes.",
      category: "Semolina",
      image: sambaRavaImage,
    },
    {
      name: "Wheat Bran",
      description: "Nutritious wheat bran rich in dietary fiber.",
      category: "By-Products",
      image: wheatBranImage,
    },
    {
      name: "Wheat Flakes",
      description: "Ready-to-eat wheat flakes for healthy breakfast options.",
      category: "Breakfast",
      image: wheatFlakesImage,
    },
    {
      name: "Broken Wheat",
      description: "Cracked wheat perfect for porridge and savory dishes.",
      category: "Raw Grains",
      image: brokenWheatImage,
    },
  ];

  return (
    <section id="products" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-widest uppercase text-sm">
            Our Products
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-3 mb-4">
            Premium Quality Range
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We offer a comprehensive range of grain products to meet all your wholesale needs. 
            Quality and freshness guaranteed with every order.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl p-6 shadow-card hover:shadow-warm transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Category Tag */}
              <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                {product.category}
              </span>

              {/* Image */}
              <div className="relative mb-4 overflow-hidden rounded-lg border border-cream/60 bg-muted/30">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <h3 className="text-lg font-display font-bold text-foreground mb-2">
                {product.name}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Looking for bulk orders or specific products? We can help!
          </p>
          <Button size="lg" asChild>
            <a href="#contact">Request Price List</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;
