import { useState, useEffect } from "react";
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { addToCart } from "../services/api";

const products = [
  { id: 1, name: "Blueberry", category: "Fresh Fruits", weight: "100 g", kcal: 300, rating: 4.9, price: 860, oldPrice: 1200, discount: 28, image: "/images/blueberry.png" },
  { id: 2, name: "Strawberry", category: "Fresh Fruits", weight: "150 g", kcal: 250, rating: 4.8, price: 999, oldPrice: 1400, discount: 29, image: "/images/strawberry.png" },
  { id: 3, name: "Green Grapes", category: "Fresh Fruits", weight: "200 g", kcal: 350, rating: 4.7, price: 749, oldPrice: 1100, discount: 32, image: "/images/grapes.png" },
  { id: 4, name: "Orange", category: "Fresh Fruits", weight: "120 g", kcal: 200, rating: 5.0, price: 549, oldPrice: 800, discount: 31, image: "/images/orange.png" },
];

const FlashSales = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 11, mins: 26, secs: 3 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, mins, secs } = prev;
        secs--;
        if (secs < 0) { secs = 59; mins--; }
        if (mins < 0) { mins = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => n.toString().padStart(2, "0");

  const handleAddToCart = async (product) => {
    try {
      await addToCart({ productId: product.id, quantity: 1 });
      toast.success(`${product.name} added to cart! 🛒`);
    } catch {
      toast.error("Please login to add to cart");
    }
  };

  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
              Flash sales
            </h2>
            <div className="flex items-center gap-3 text-sm font-semibold">
              {[
                { val: pad(timeLeft.hours), label: "Hours" },
                { val: pad(timeLeft.mins), label: "Mins" },
                { val: pad(timeLeft.secs), label: "Secs" },
                { val: pad("57"), label: "Millis" }, // Just to match the screenshot [02:11:25:57]
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center text-sm text-white font-bold"
                    style={{ backgroundColor: "#2C5F1E" }}
                  >
                    {t.val}
                  </div>
                  {i < 3 && <span className="font-bold text-lg" style={{ color: "#1A1A1A" }}>:</span>}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {[ChevronLeft, ChevronRight].map((Icon, i) => (
              <button
                key={i}
                className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-400 hover:bg-primary/10 hover:text-primary transition-all"
                style={{ backgroundColor: "#F5F5F5" }}
              >
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-4 group transition-shadow"
              style={{ backgroundColor: "var(--card)", boxShadow: "var(--shadow-card)" }}
            >
              {/* Image area */}
              <div className="relative rounded-xl p-6 mb-4 flex items-center justify-center h-48" style={{ backgroundColor: "var(--muted)" }}>
                <span
                  className="absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-1 rounded-full"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  {product.discount}% off
                </span>
                <button
                  className="absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center shadow-sm transition-colors"
                  style={{ backgroundColor: "var(--card)" }}
                >
                  <Heart className="h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
                </button>
                <img 
                   src={product.image} 
                   alt={product.name}
                   className="w-40 h-40 object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="space-y-2">
                <p className="text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
                  {product.category}
                </p>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
                    {product.name}
                  </h3>
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{product.weight}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3" fill="var(--organic-olive)" style={{ color: "var(--organic-olive)" }} />
                  <span className="text-xs font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{product.rating}</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
                    ₹{product.price}
                  </span>
                  <span className="text-xs line-through" style={{ color: "var(--muted-foreground)" }}>
                    ₹{product.oldPrice}
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-full text-sm font-semibold transition hover:opacity-90 mt-2"
                  style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Add to cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashSales;
