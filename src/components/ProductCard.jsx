import { ShoppingCart, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { addToCart } from '../services/api';
import { useAuth } from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onCartUpdate }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      toast.error('Please login to add to cart!');
      navigate('/login');
      return;
    }
    try {
      await addToCart({ productId: product.id, quantity: 1 });
      toast.success(`${product.name} added to cart! 🛒`);
      if (onCartUpdate) onCartUpdate();
    } catch {
      toast.error('Failed to add to cart');
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
      {/* Image area */}
      <div style={{ backgroundColor: '#E8F5E9' }} className="relative h-48 flex items-center justify-center p-4 overflow-hidden">
        {product.is_new && (
          <span style={{ backgroundColor: '#2D5A27' }} className="absolute top-3 left-3 text-white text-xs px-2.5 py-1 rounded-full font-semibold">
            New
          </span>
        )}
        {product.discount && (
          <span style={{ backgroundColor: '#C62828' }} className="absolute top-3 right-3 text-white text-xs px-2.5 py-1 rounded-full font-semibold">
            {product.discount}% Off
          </span>
        )}
        {/* Product Image or Placeholder */}
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-36 w-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="text-6xl select-none transition-transform duration-300 group-hover:scale-110">
            🌿
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-gray-400 mb-1">{product.category_name || 'Organic'}</p>
        <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">{product.name}</h3>
        {product.description && (
          <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</p>
        )}
        <div className="flex items-center justify-between mt-2">
          <div>
            <span style={{ color: '#2D5A27' }} className="font-bold text-base">
              {formatPrice(product.price)}
            </span>
            {product.unit && (
              <span className="text-gray-400 text-xs ml-1">/ {product.unit}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            style={{ backgroundColor: '#2D5A27' }}
            className="text-white w-9 h-9 rounded-full flex items-center justify-center hover:opacity-90 hover:scale-110 transition-all shadow-md"
            title="Add to Cart"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
