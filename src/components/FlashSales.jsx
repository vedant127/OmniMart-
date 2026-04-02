import { useState, useEffect } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { getProducts, addToCart } from "../services/api";
import { useAuth } from "../store/AuthContext";

const FlashSales = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshCart } = useAuth();

  useEffect(() => {
    const fetchFlashSales = async () => {
      try {
        const res = await getProducts();
        // Since we don't have a specific flash sale flag, we'll take a subset of products
        // and add some mock flash sale data for the UI
        const data = (res.data || []).slice(0, 4).map(p => ({
          ...p,
          oldPrice: Math.round(p.price * 1.3),
          discount: 30,
          rating: 4.8,
          weight: "500 g"
        }));
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFlashSales();
  }, []);

const handleAddToCart = async (product) => {
    try {
      await addToCart({ productId: product.id, quantity: 1 });
      toast.success(`${product.name} added to cart! 🛒`);
      refreshCart();
    } catch {
      toast.error("Please login to add to cart");
    }
  };

  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
{/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
             Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-[2rem] h-80 animate-pulse border border-gray-100" />
            ))
          ) : products.length > 0 ? (
            products.map((product, i) => (
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
                    src={product.image_url || (() => {
                          const name = (product.name || "").toLowerCase();
                          const cat = (product.category_name || "").toLowerCase();
                          const combined = `${name} ${cat}`;
                          if (combined.includes("fruit") || combined.includes("berry") || combined.includes("apple")) 
                            return "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80&w=300";
                          if (combined.includes("veg") || combined.includes("broccoli") || combined.includes("salad")) 
                            return "https://images.unsplash.com/photo-1566385101042-1a000c1268c4?auto=format&fit=crop&q=80&w=300";
                          if (combined.includes("dairy") || combined.includes("milk") || combined.includes("egg")) 
                            return "https://images.unsplash.com/photo-1550583724-1255818c053b?auto=format&fit=crop&q=80&w=300";
                          if (combined.includes("bread") || combined.includes("bake") || combined.includes("cake")) 
                            return "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=300";
                          if (combined.includes("bev") || combined.includes("drink") || combined.includes("juice")) 
                            return "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=300";

                          return "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=300"; // Organic shelf
                    })()} 
                    alt={product.name}
                    className="w-full h-40 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
                  />
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <p className="text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
                    {product.category_name}
                  </p>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold truncate" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
                      {product.name}
                    </h3>
                    <span className="text-xs shrink-0" style={{ color: "var(--muted-foreground)" }}>{product.weight}</span>
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
            ))
          ) : (
            <div className="col-span-full py-12 text-center rounded-2xl bg-gray-50 border border-dashed border-accent/30">
               <p className="text-sm font-bold opacity-70" style={{ color: "var(--accent)" }}>
                 No products found. Please run: <code className="bg-accent/10 px-2 py-1 rounded">node src/db/migrate.js</code> to recycle your data.
               </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FlashSales;
