import { Truck, Headphones, ShieldCheck, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Truck, title: "Fast Delivery", desc: "Minimum order ₹499" },
  { icon: Headphones, title: "24/7 Support", desc: "Contact us 24 hours" },
  { icon: ShieldCheck, title: "Pay Securely", desc: "100% Security Payment" },
  { icon: RotateCcw, title: "Easy Returns", desc: "Within 30 Days" },
];

const Features = () => (
  <section className="py-12 lg:py-16" style={{ backgroundColor: "rgba(228,238,224,0.5)" }}>
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center text-center gap-3 p-6"
          >
            <div
              className="h-14 w-14 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--organic-green-light)" }}
            >
              <f.icon className="h-6 w-6" style={{ color: "var(--primary)" }} />
            </div>
            <h3 className="font-semibold text-sm" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
              {f.title}
            </h3>
            <p className="text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
