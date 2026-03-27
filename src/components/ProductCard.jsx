import { ShoppingCart, Heart, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { addToCart } from '../services/api';
import { useAuth } from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { isLoggedIn, refreshCart } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) {
      toast.error('Please login to add to cart! 🛒');
      navigate('/login');
      return;
    }
    try {
      await addToCart({ productId: product.id, quantity: 1 });
      toast.success(`${product.name} added to cart! 🌿`);
      refreshCart();
    } catch {
      toast.error('Failed to add to cart');
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  // Fallback emoji based on category
  const getEmoji = (cat) => {
    const map = {
      'Fruits': '🍎',
      'Vegetables': '🥦',
      'Dairy': '🥛',
      'Bakery': '🥐',
      'Beverages': '🍹',
      'Berries': '🫐',
      'Citrus': '🍊'
    };
    return map[cat] || '🌿';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="p-4 group transition-all duration-300 rounded-[2rem]"
      style={{ backgroundColor: 'var(--card)', boxShadow: 'var(--shadow-card)' }}
    >
      {/* Image area */}
      <div className="relative rounded-2xl p-6 mb-4 flex items-center justify-center h-48 overflow-hidden" style={{ backgroundColor: 'var(--muted)' }}>
        {product.discount && (
          <span
            className="absolute top-4 left-4 text-white text-[10px] font-bold px-2 py-1 rounded-full"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            -{product.discount}%
          </span>
        )}
        <button
          className="absolute top-4 right-4 h-9 w-9 rounded-full flex items-center justify-center shadow-sm transition-all hover:scale-110 active:scale-95"
          style={{ backgroundColor: 'var(--card)' }}
        >
          <Heart className="h-4 w-4 text-gray-400 hover:text-accent transition-colors" />
        </button>
        
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-32 w-32 object-contain transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <span className="text-7xl group-hover:scale-110 transition-transform duration-500 inline-block pointer-events-none drop-shadow-lg">
            {getEmoji(product.category_name)}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="space-y-1.5 px-1">
        <p className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--muted-foreground)', fontFamily: "'DM Sans', sans-serif" }}>
          {product.category_name || 'Organic'}
        </p>
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-bold text-base line-clamp-1" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--foreground)' }}>
            {product.name}
          </h3>
          <span className="text-[10px] font-medium shrink-0" style={{ color: 'var(--muted-foreground)' }}>
            {product.unit || '500g'}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={10} 
                className={i < 4 ? "fill-organic-olive text-organic-olive" : "text-gray-200"} 
              />
            ))}
          </div>
          <span className="text-[10px] font-bold" style={{ color: 'var(--foreground)' }}>4.8</span>
        </div>

        <div className="flex items-center gap-2 pt-1 border-t border-gray-50 mt-2">
          <span className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--foreground)' }}>
            {formatPrice(product.price)}
          </span>
          {product.old_price && (
            <span className="text-xs line-through" style={{ color: 'var(--muted-foreground)' }}>
              {formatPrice(product.old_price)}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all hover:opacity-95 active:scale-[0.98] mt-2 group-hover:shadow-lg"
          style={{ 
            backgroundColor: 'var(--primary)', 
            color: 'var(--primary-foreground)', 
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: 'var(--shadow-button)'
          }}
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          Add to cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
