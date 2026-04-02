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
            count: cat.product_count ?? 0
          };
        });
        
        // Ensure there are always 6 categories for the grid layout by adding a special category if needed
        if (data.length === 5) {
          data.push({
            id: 'special-category',
            name: 'Special Offers',
            count: 15,
            emoji: '🎁'
          });
        }
        
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
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#242529" }}
            >
              Browse by category
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
          ) : categories.length > 0 ? (
            categories.map((cat, i) => (
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
                  style={{ backgroundColor: "#ffffff", border: "1px solid #E8E9EB" }}
                >
                  <div
                    className="h-20 w-20 rounded-full flex items-center justify-center overflow-hidden bg-white/50 border border-white"
                  >
                    <img
                      src={(() => {
                          const name = (cat.name || "").toLowerCase();
                          // Pexels CDN — no rate limits, no API key needed
                          if (name.includes("fruit")) return "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1";
                          if (name.includes("veg"))   return "https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1";
                          if (name.includes("dairy")) return "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1";
                          if (name.includes("bak"))   return "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1";
                          if (name.includes("bev"))   return "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1";
                          if (name.includes("special") || name.includes("offer")) return "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1";
                          return "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1";
                      })()}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3
                    className="font-bold text-sm truncate w-full text-center mt-2"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "#242529" }}
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
            ))
          ) : (
            <div className="col-span-full py-12 text-center rounded-2xl bg-white/50 border border-dashed border-primary/30">
               <p className="text-sm font-bold opacity-70" style={{ color: "var(--primary)" }}>
                 No categories in database. Please run: <code className="bg-primary/10 px-2 py-1 rounded">node src/db/migrate.js</code> to seed your products.
               </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
