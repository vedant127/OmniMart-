import { Heart, Star } from "lucide-react";
import { useCart } from "../store/CartContext";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 flex flex-col shadow-sm hover:shadow-lg transition-all duration-300">
      
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[11px] font-bold px-2 py-1 rounded shadow-sm">
          {product.discount}% OFF
        </div>
      )}

      {/* Wishlist */}
      <button className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 lg:opacity-0 group-hover:opacity-100 transition-all">
        <Heart size={16} />
      </button>

      {/* Image Container */}
      <div className="relative w-full h-48 bg-gray-50 overflow-hidden flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#3cb065]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {product.category}
          </span>
          <span className="text-[10px] font-bold text-gray-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {product.weight}
          </span>
        </div>

        <h3 className="text-[15px] font-bold leading-tight mb-2 text-gray-900 group-hover:text-[#2d6a2d] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-[12px] font-bold text-gray-700">{product.rating}</span>
          <span className="text-[11px] text-gray-400 font-medium">({product.reviews})</span>
        </div>

        {/* Description snippet */}
        {product.desc && (
          <p className="text-[12px] leading-snug line-clamp-2 text-gray-500 mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {product.desc}
          </p>
        )}

        {/* Price & Add block */}
        <div className="mt-auto">
          <div className="flex items-end gap-2 mb-3">
            <span className="text-xl font-bold text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm line-through text-gray-400 pb-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center py-2.5 rounded-lg bg-[#2d6a2d] text-white text-[13px] font-bold transition-all hover:bg-[#245324] hover:shadow-md"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            🛒 ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
