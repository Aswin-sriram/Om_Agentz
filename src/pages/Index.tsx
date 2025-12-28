import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedStrip from "@/components/FeaturedStrip";
import About from "@/components/About";
import Products from "@/components/Products";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <FeaturedStrip />
        <About />
        <Products />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
