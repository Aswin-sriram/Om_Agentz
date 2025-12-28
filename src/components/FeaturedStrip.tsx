import { Package, Scale, Sparkles, Wheat } from "lucide-react";

const FeaturedStrip = () => {
  const featured = [
    {
      title: "Premium Wheat",
      description: "Cleaned, graded, bulk-ready grain for consistent quality.",
      icon: Wheat,
    },
    {
      title: "Atta & Maida",
      description: "Reliable milling for bakeries, hotels, and daily retail supply.",
      icon: Package,
    },
    {
      title: "Sooji & Rava",
      description: "Even texture and freshness for steady kitchen performance.",
      icon: Sparkles,
    },
    {
      title: "Bran & By-products",
      description: "Steady availability for feed, food, and industrial use.",
      icon: Scale,
    },
  ];

  return (
    <section aria-label="Featured products" className="relative overflow-hidden bg-gradient-section">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 right-10 h-64 w-64 rounded-full bg-wheat-gold/15 blur-3xl" />
        <div className="absolute -bottom-24 left-8 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 py-10 sm:py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-primary font-semibold tracking-[0.3em] uppercase text-xs">
              Featured
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-3">
              Core Grains, Ready for Wholesale
            </h2>
          </div>
          <p className="text-foreground/70 max-w-xl">
            We maintain clean storage, consistent milling, and dependable dispatch for
            long-term partners.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group rounded-2xl bg-card/80 border border-cream/70 p-5 shadow-card backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-wheat-gold/15 text-wheat-gold">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Bulk
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-display font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-foreground/70">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStrip;
