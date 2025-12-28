import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const allowedOrigin = Deno.env.get("ALLOWED_ORIGIN") ?? "*";
const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InquiryEmailRequest {
  name: string;
  email?: string | null;
  phone: string | null;
  message: string;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizeSubject = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (allowedOrigin !== "*") {
      const origin = req.headers.get("origin");
      if (origin !== allowedOrigin) {
        return new Response(JSON.stringify({ error: "Origin not allowed" }), {
          status: 403,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    const { name, email, phone, message }: InquiryEmailRequest = await req.json();

    if (!isNonEmptyString(name) || name.trim().length > 100) {
      return new Response(JSON.stringify({ error: "Invalid name" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (email !== undefined && email !== null && typeof email !== "string") {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    const trimmedEmailCheck = typeof email === "string" ? email.trim() : "";
    const hasEmail = trimmedEmailCheck.length > 0;
    if (hasEmail) {
      if (
        trimmedEmailCheck.length > 255 ||
        !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(trimmedEmailCheck)
      ) {
        return new Response(JSON.stringify({ error: "Invalid email" }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }
    if (!isNonEmptyString(message) || message.trim().length > 2000) {
      return new Response(JSON.stringify({ error: "Invalid message" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (phone !== null && phone !== undefined) {
      if (typeof phone !== "string" || phone.trim().length > 20) {
        return new Response(JSON.stringify({ error: "Invalid phone" }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    const trimmedName = name.trim();
    const trimmedEmail = trimmedEmailCheck;
    const safeName = escapeHtml(trimmedName);
    const safeEmail = hasEmail ? escapeHtml(trimmedEmail) : "Not provided";
    const safePhone = phone ? escapeHtml(phone.trim()) : "Not provided";
    const safeMessage = escapeHtml(message.trim());
    const mailto = hasEmail ? `mailto:${encodeURIComponent(trimmedEmail)}` : "";
    const ownerEmailLine = hasEmail
      ? `<p><strong>Email:</strong> <a href="${mailto}">${safeEmail}</a></p>`
      : `<p><strong>Email:</strong> ${safeEmail}</p>`;

    console.log("Sending inquiry notification for:", { name: safeName, email: safeEmail });

    // Send notification to business owner
    const ownerEmailResponse = await resend.emails.send({
      from: "Om Canvassing Agentz <onboarding@resend.dev>",
      to: ["omagentz2010@gmail.com"],
      subject: sanitizeSubject(`New Inquiry from ${trimmedName}`),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #B8860B; border-bottom: 2px solid #B8860B; padding-bottom: 10px;">
            New Customer Inquiry
          </h1>
          
          <div style="background-color: #f9f6f1; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Customer Details:</h3>
            <p><strong>Name:</strong> ${safeName}</p>
            ${ownerEmailLine}
            <p><strong>Phone:</strong> ${safePhone}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #333;">Message:</h3>
            <p style="white-space: pre-wrap;">${safeMessage}</p>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px; text-align: center;">
            This notification was sent from the Om Canvassing Agentz website contact form.
          </p>
        </div>
      `,
    });

    console.log("Owner notification sent:", ownerEmailResponse);

    // Send confirmation to customer
    const customerEmailResponse = hasEmail
      ? await resend.emails.send({
          from: "Om Canvassing Agentz <onboarding@resend.dev>",
          to: [trimmedEmail],
          subject: "Thank you for contacting Om Canvassing Agentz",
          html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #B8860B; border-bottom: 2px solid #B8860B; padding-bottom: 10px;">
            Thank You, ${safeName}!
          </h1>
          
          <p>We have received your inquiry and appreciate you reaching out to us.</p>
          
          <p>Our team will review your message and get back to you as soon as possible.</p>
          
          <div style="background-color: #f9f6f1; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Your Message:</h3>
            <p style="white-space: pre-wrap;">${safeMessage}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #333;">Contact Us:</h3>
            <p><strong>Phone:</strong> 9095111011 / 8344111011</p>
            <p><strong>Email:</strong> omagentz2010@gmail.com</p>
            <p><strong>Address:</strong> No.98/c, Tanjore Road, Trichy - 620008</p>
          </div>
          
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            Best regards,<br>
            <strong>Mr. Saravanan J</strong><br>
            Om Canvassing Agentz
          </p>
        </div>
      `,
        })
      : null;

    console.log("Customer confirmation sent:", customerEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        ownerEmail: ownerEmailResponse, 
        customerEmail: customerEmailResponse 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-inquiry-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};
Deno.serve(handler);
