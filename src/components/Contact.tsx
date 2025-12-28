import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.preprocess(
    (value) => {
      if (typeof value !== "string") return value;
      const trimmed = value.trim();
      return trimmed === "" ? undefined : trimmed;
    },
    z.string().email("Invalid email address").max(255, "Email must be less than 255 characters").optional()
  ),
  phone: z.preprocess(
    (value) => (typeof value === "string" ? value.replace(/[\s-]/g, "") : value),
    z
      .string()
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
  ),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mapQuery = "No. 98/C, Tanjore Road, Trichy 620008";
  const mapQueryUrl = encodeURIComponent(mapQuery);
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${mapQueryUrl}`;
  const mapEmbedUrl = `https://www.google.com/maps?q=${mapQueryUrl}&output=embed`;
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      toast({
        title: "Validation Error",
        description: result.error.errors[0]?.message || "Please check your input",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const normalizedEmail = result.data.email ?? null;
      const { error } = await supabase.from("contact_inquiries").insert({
        name: result.data.name,
        email: normalizedEmail,
        phone: result.data.phone || null,
        message: result.data.message,
      });

      if (error) throw error;

      // Send email notification (fire and forget - don't block on email)
      supabase.functions
        .invoke("send-inquiry-notification", {
          body: {
            name: result.data.name,
            email: normalizedEmail,
            phone: result.data.phone || null,
            message: result.data.message,
          },
        })
        .catch((emailError) => {
          console.error("Email notification failed:", emailError);
        });

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We will get back to you soon.",
      });
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["9095111011", "8344111011"],
      action: "tel:9095111011",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["omagentz2010@gmail.com"],
      action: "mailto:omagentz2010@gmail.com",
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["No.98/c, Tanjore Road", "Trichy - 620008"],
      action: mapSearchUrl,
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: Closed"],
      action: null,
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 bg-gradient-section">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold tracking-widest uppercase text-sm">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-3 mb-4">
            Contact Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Ready to place an order or have questions? Reach out to us and we will 
            be happy to assist you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-8">
              Contact Information
            </h3>
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground">
                        {item.action ? (
                          <a
                            href={item.action}
                            className="hover:text-primary transition-colors"
                            target={item.action.startsWith("http") ? "_blank" : undefined}
                            rel={item.action.startsWith("http") ? "noopener noreferrer" : undefined}
                          >
                            {detail}
                          </a>
                        ) : (
                          detail
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="mt-10">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Om Canvassing Agentz Location"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 md:p-10 rounded-2xl shadow-warm">
            <h3 className="text-2xl font-display font-bold text-foreground mb-6">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
