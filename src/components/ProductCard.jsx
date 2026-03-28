import { useState } from "react";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { addToCart } from "../services/api";
import { useAuth } from "../store/AuthContext";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { refreshCart } = useAuth();

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    try {
      await addToCart({ productId: product.id, quantity: 1 });
      toast.success(`${product.name} added to cart! 🛒`);
      refreshCart();
    } catch {
      toast.error("Please login to add to cart");
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  // High-quality organic image fallback helper
  const getAccurateImage = (name = "", cat = "") => {
    const combined = `${name} ${cat}`.toLowerCase();
    
    // Fruits & Healthy
    if (combined.includes("fruit") || combined.includes("berry") || combined.includes("strawberry")) 
      return "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80&w=300";
    if (combined.includes("apple") || combined.includes("pear")) 
      return "https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?auto=format&fit=crop&q=80&w=300";
    if (combined.includes("banana") || combined.includes("tropical")) 
      return "https://images.unsplash.com/photo-1571771894821-ad99026107b8?auto=format&fit=crop&q=80&w=300";
    if (combined.includes("citrus") || combined.includes("orange") || combined.includes("lemon")) 
      return "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&q=80&w=300";
    
    // Vegetables & Greens
    if (combined.includes("vege") || combined.includes("broccoli") || combined.includes("green")) 
      return "https://images.unsplash.com/photo-1566385101042-1a000c1268c4?auto=format&fit=crop&q=80&w=300";
    if (combined.includes("tomato") || combined.includes("red")) 
      return "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=300";
    if (combined.includes("grain") || combined.includes("nut") || combined.includes("seed")) 
      return "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=300";
    
    // Dairy & Bakery
    if (combined.includes("dairy") || combined.includes("milk") || combined.includes("cheese") || combined.includes("egg")) 
      return "https://images.unsplash.com/photo-1550583724-1255818c053b?auto=format&fit=crop&q=80&w=300";
    if (combined.includes("bake") || combined.includes("bread") || combined.includes("cake")) 
      return "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=300";
    if (combined.includes("beverage") || combined.includes("juice") || combined.includes("drink")) 
      return "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=300";

    return `https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=300`; // Default grocery shelf
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative rounded-[2rem] p-4 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100"
      style={{ backgroundColor: "var(--card)", boxShadow: "var(--shadow-card)" }}
    >
      {/* Image with hover actions */}
      <div 
        className="relative overflow-hidden rounded-3xl mb-4 bg-muted/30 aspect-square flex items-center justify-center p-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={product.image_url || getAccurateImage(product.name, product.category_name)}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className={`absolute inset-0 bg-black/5 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-3 ${isHovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
           <button className="p-3 rounded-full bg-white text-primary shadow-xl hover:bg-primary hover:text-white transition-all transform hover:scale-110 active:scale-95">
            <Eye size={20} />
          </button>
          <button className="p-3 rounded-full bg-white text-accent shadow-xl hover:bg-accent hover:text-white transition-all transform hover:scale-110 active:scale-95">
            <Heart size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-2 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {product.category_name || 'Organic'}
          </span>
          <div className="flex items-center gap-1">
            <Star size={10} className="text-yellow-400" fill="currentColor" />
            <span className="text-[10px] font-bold">4.8</span>
          </div>
        </div>

        <h3 className="text-sm font-bold truncate leading-tight" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2">
          <span className="text-lg font-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {formatPrice(product.price)}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-primary text-white text-xs font-bold uppercase tracking-widest transition-all hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] mt-2 group-hover:bg-primary/90"
        >
          <ShoppingCart size={14} />
          Purchase
        </button>
      </div>

      {/* Modern glass shine effect */}
      <div className="absolute inset-0 rounded-[2rem] border border-white/40 pointer-events-none" />
    </motion.div>
  );
};

export default ProductCard;
