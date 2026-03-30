import { useState } from "react";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { addToCart } from "../services/api";
import { useAuth } from "../store/AuthContext";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
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
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const discount = parseFloat(product.discount) || 0;
  const originalPrice = parseFloat(product.price) || 0;
  const discountedPrice = discount > 0
    ? Math.round(originalPrice * (1 - discount / 100))
    : null;

  // Category emoji map for fallback display
  const getCategoryEmoji = (cat = "") => {
    const c = cat.toLowerCase();
    if (c.includes("fruit")) return "🍎";
    if (c.includes("veg")) return "🥦";
    if (c.includes("dairy")) return "🥛";
    if (c.includes("bake") || c.includes("bakery")) return "🥖";
    if (c.includes("bev") || c.includes("drink")) return "🥤";
    return "🛒";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 flex flex-col"
      style={{ backgroundColor: "var(--card)" }}
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <div
          className="absolute top-3 left-3 z-10 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md"
          style={{ backgroundColor: "var(--accent)" }}
        >
          {Math.round(discount)}% OFF
        </div>
      )}

      {/* Wishlist */}
      <button
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 transition-all hover:scale-110"
        onClick={(e) => e.stopPropagation()}
      >
        <Heart size={15} />
      </button>

      {/* Image Container — fixed square, clean background like Amazon */}
      <div
        className="relative w-full overflow-hidden flex items-center justify-center"
        style={{ height: "200px", backgroundColor: "#f7f7f7" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {imgError ? (
          <div className="flex flex-col items-center justify-center gap-2 opacity-60">
            <span className="text-5xl">{getCategoryEmoji(product.category_name)}</span>
            <span className="text-[10px] text-gray-400 font-medium">Image unavailable</span>
          </div>
        ) : (
          <img
            src={product.image_url}
            alt={product.name}
            onError={() => setImgError(true)}
            className="transition-transform duration-500 group-hover:scale-110"
            style={{
              width: "160px",
              height: "160px",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        )}

        {/* Hover Quick-View Overlay */}
        <div
          className={`absolute inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center gap-3 transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <button className="p-2.5 rounded-full bg-white shadow-lg text-gray-600 hover:text-primary hover:scale-110 transition-all">
            <Eye size={17} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Category Tag */}
        <span
          className="text-[10px] uppercase font-bold tracking-widest"
          style={{ color: "var(--primary)", fontFamily: "'DM Sans', sans-serif" }}
        >
          {product.category_name || "Organic"}
        </span>

        {/* Product Name */}
        <h3
          className="text-sm font-bold leading-snug line-clamp-2"
          style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)", minHeight: "36px" }}
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={11}
              className={i < 4 ? "text-yellow-400" : "text-gray-200"}
              fill="currentColor"
            />
          ))}
          <span className="text-[10px] text-gray-400 ml-1 font-medium">(4.8)</span>
        </div>

        {/* Price Block */}
        <div className="flex items-baseline gap-2 mt-1">
          <span
            className="text-lg font-black"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--foreground)" }}
          >
            {formatPrice(discountedPrice ?? originalPrice)}
          </span>
          {discountedPrice && (
            <span
              className="text-xs line-through"
              style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}
            >
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* Description snippet */}
        {product.description && (
          <p
            className="text-[11px] leading-relaxed line-clamp-2"
            style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}
          >
            {product.description}
          </p>
        )}

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-xs font-bold uppercase tracking-wider transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.98]"
          style={{
            backgroundColor: "var(--primary)",
            fontFamily: "'DM Sans', sans-serif",
            marginTop: "auto",
          }}
        >
          <ShoppingCart size={14} />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
