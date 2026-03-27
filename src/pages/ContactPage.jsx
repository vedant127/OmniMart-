import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

const contactInfo = [
  { icon: MapPin, label: "Address", value: "123 Green Lane, Mirpur-1, Mumbai" },
  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
  { icon: Mail, label: "Email", value: "hello@freshcart.com" },
  { icon: Clock, label: "Hours", value: "10:00 AM - 11:00 PM (Daily)" },
];

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message sent! We'll get back to you within 24 hours. 🌿");
    setForm({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "var(--radius)",
    border: "1px solid var(--border)",
    backgroundColor: "var(--card)",
    color: "var(--foreground)",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    outline: "none",
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16" style={{ backgroundColor: "var(--muted)" }}>
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}
          >
            Get In <span style={{ color: "var(--primary)" }}>Touch</span>
          </motion.h1>
          <p className="max-w-xl mx-auto" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
              Contact Information
            </h2>
            <p className="text-sm" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
              Reach out to us through any of these channels or fill out the form.
            </p>
            <div className="space-y-5 mt-6">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "rgba(44,95,30,0.1)" }}
                  >
                    <item.icon className="h-5 w-5" style={{ color: "var(--primary)" }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--foreground)" }}>
                      {item.label}
                    </p>
                    <p className="text-sm" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Map placeholder */}
            <div
              className="rounded-xl h-48 flex items-center justify-center mt-6"
              style={{ backgroundColor: "var(--muted)" }}
            >
              <span style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif", fontSize: "14px" }}>
                📍 Map placeholder
              </span>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl p-8" style={{ backgroundColor: "var(--card)", boxShadow: "var(--shadow-card)" }}>
              <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium block mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--foreground)" }}>
                      Full Name *
                    </label>
                    <input
                      style={inputStyle}
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--foreground)" }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      style={inputStyle}
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--foreground)" }}>
                    Subject
                  </label>
                  <input
                    style={inputStyle}
                    placeholder="How can we help?"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--foreground)" }}>
                    Message *
                  </label>
                  <textarea
                    style={{ ...inputStyle, resize: "none" }}
                    placeholder="Your message..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm transition hover:opacity-90 disabled:opacity-60"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  <Send className="h-4 w-4" />
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
