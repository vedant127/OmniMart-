import { Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Amanda Brown",
    text: "The quality of organic produce from FreshCart is absolutely outstanding. Pellentesque risus blandit, healthy and so fresh every time!",
    rating: 5,
    avatar: "AB",
  },
  {
    name: "Rahul Sharma",
    text: "I've been ordering for 6 months and never been disappointed. The flash sales are amazing and delivery is always on time.",
    rating: 5,
    avatar: "RS",
  },
];

const Testimonials = () => (
  <section className="py-12 lg:py-16">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--primary)", fontFamily: "'DM Sans', sans-serif" }}
          >
            🌿 Note from our clients
          </span>
          <h2
            className="text-2xl md:text-3xl font-bold mt-1"
            style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}
          >
            How we're making a difference, naturally
          </h2>
        </div>
        <div className="flex gap-2">
          {[ChevronLeft, ChevronRight].map((Icon, i) => (
            <button
              key={i}
              className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-gray-50 transition"
              style={{ borderColor: "var(--border)" }}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl p-6"
            style={{ backgroundColor: "var(--card)", boxShadow: "var(--shadow-card)" }}
          >
            <div className="flex gap-1 mb-3">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4" fill="var(--organic-olive)" style={{ color: "var(--organic-olive)" }} />
              ))}
            </div>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}
            >
              "{t.text}"
            </p>
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: "var(--primary)", fontFamily: "'Playfair Display', serif" }}
              >
                {t.avatar}
              </div>
              <span
                className="font-medium text-sm"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--foreground)" }}
              >
                {t.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm transition hover:opacity-90"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          View all testimonials <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default Testimonials;
