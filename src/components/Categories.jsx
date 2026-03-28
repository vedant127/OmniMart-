import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getCategories } from "../services/api";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        // Add default emojis since they might not be in the database
        const data = (res.data || []).map((cat) => {
          const name = cat.name.toLowerCase();
          const emoji = (() => {
            if (name.includes("tablet") || name.includes("ipad")) return "📱";
            if (name.includes("electronic") || name.includes("tech")) return "🔌";
            if (name.includes("fruit")) return "🍎";
            if (name.includes("veg")) return "🥦";
            if (name.includes("dairy")) return "🥛";
            if (name.includes("beverage")) return "🍹";
            if (name.includes("bake")) return "🥐";
            return "📦";
          })();
          
          return {
            ...cat,
            emoji: emoji,
            count: cat.product_count || Math.floor(Math.random() * 20) + 5
          };
        });
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
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
          {loading ? (
             Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 rounded-2xl animate-pulse bg-white/50 border border-white" />
            ))
          ) : categories.map((cat, i) => (
            <motion.div
              key={cat.id || cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="block rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer group hover:-translate-y-1 transition-all"
                style={{ backgroundColor: "var(--card)", boxShadow: "var(--shadow-card)" }}
              >
                <div
                  className="h-20 w-20 rounded-full flex items-center justify-center overflow-hidden bg-white/50 border border-white"
                >
                  <img
                    src={(() => {
                        const name = (cat.name || "").toLowerCase();
                        if (name.includes("fruit")) return "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80&w=150";
                        if (name.includes("veg")) return "https://images.unsplash.com/photo-1566385101042-1a000c1268c4?auto=format&fit=crop&q=80&w=150";
                        if (name.includes("dairy") || name.includes("egg")) return "https://images.unsplash.com/photo-1550583724-1255818c053b?auto=format&fit=crop&q=80&w=150";
                        if (name.includes("bread") || name.includes("bake")) return "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=150";
                        if (name.includes("bev") || name.includes("drink")) return "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=150";
                        return "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=150";
                    })()}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3
                  className="font-semibold text-sm truncate w-full text-center mt-1"
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
};

export default Categories;
