import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  { name: "Berries", emoji: "🫐", count: 24 },
  { name: "Citrus", emoji: "🍊", count: 18 },
  { name: "Grapes", emoji: "🍇", count: 12 },
  { name: "Apples", emoji: "🍎", count: 30 },
  { name: "Tropical", emoji: "🥭", count: 15 },
  { name: "Strawberries", emoji: "🍓", count: 20 },
];

const Categories = () => (
  <section className="py-12 lg:py-16" style={{ backgroundColor: "rgba(228,238,224,0.5)" }}>
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--primary)", fontFamily: "'DM Sans', sans-serif" }}
          >
            🏷️ Top Categories
          </span>
          <h2
            className="text-2xl md:text-3xl font-bold mt-1"
            style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}
          >
            Our Specialty
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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
          >
            <Link
              to="/products"
              className="block rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer group hover:-translate-y-1 transition-all"
              style={{ backgroundColor: "var(--card)", boxShadow: "var(--shadow-card)" }}
            >
              <div
                className="h-20 w-20 rounded-full flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: "var(--organic-green-light)" }}
              >
                <span className="text-4xl group-hover:scale-110 transition-transform">
                  {cat.emoji}
                </span>
              </div>
              <h3
                className="font-semibold text-sm"
                style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}
              >
                {cat.name}
              </h3>
              <p
                className="text-xs"
                style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {cat.count} items
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Categories;
