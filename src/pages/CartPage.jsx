import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCart, createOrder } from '../services/api';
import { useAuth } from '../store/AuthContext';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) { setLoading(false); return; }
    const fetchCart = async () => {
      try {
        const res = await getCart();
        setCartItems(res.data || []);
      } catch {
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [isLoggedIn]);

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  const delivery = total > 499 ? 0 : 49;
  const formatPrice = (p) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(p);

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;
    setOrdering(true);
    try {
      await createOrder({ items: cartItems, totalAmount: total + delivery });
      toast.success('Order placed successfully! 🎉');
      setCartItems([]);
    } catch {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setOrdering(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-6xl mb-4">🔒</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Please Login First</h2>
        <p className="text-gray-500 mb-6">You need to be logged in to view your cart.</p>
        <Link to="/login" style={{ backgroundColor: '#2D5A27' }} className="text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition">
          Login Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8" style={{ color: '#2D5A27' }}>🛒 My Cart</h1>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => <div key={i} className="bg-gray-100 rounded-2xl h-24 animate-pulse" />)}
        </div>
      ) : cartItems.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag size={80} className="mx-auto text-gray-200 mb-4" />
          <h2 className="text-xl font-bold text-gray-600 mb-2">Your cart is empty!</h2>
          <p className="text-gray-400 mb-6">Looks like you haven't added anything yet.</p>
          <Link to="/products" style={{ backgroundColor: '#C62828' }} className="text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition inline-flex items-center gap-2">
            Browse Products <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items */}
          <div className="flex-1 space-y-4">
            {cartItems.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition">
                <div style={{ backgroundColor: '#E8F5E9' }} className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl shrink-0">
                  {item.emoji || '🥗'}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.name || item.product_name || 'Product'}</h3>
                  <p className="text-sm text-gray-500">{item.category || 'Fresh & Organic'}</p>
                  <p className="font-bold mt-1" style={{ color: '#2D5A27' }}>{formatPrice(item.price || 0)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => {}} className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-green-500 transition">
                    <Minus size={14} />
                  </button>
                  <span className="font-semibold w-6 text-center">{item.quantity || 1}</span>
                  <button onClick={() => {}} className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-green-500 transition">
                    <Plus size={14} />
                  </button>
                </div>
                <button className="text-red-400 hover:text-red-600 transition ml-2">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-5" style={{ color: '#2D5A27' }}>Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal ({cartItems.length} items)</span><span className="font-medium">{formatPrice(total)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Delivery</span><span className={delivery === 0 ? 'text-green-600 font-medium' : ''}>{delivery === 0 ? 'FREE 🎉' : formatPrice(delivery)}</span></div>
                {delivery > 0 && <p className="text-xs text-green-600">Add {formatPrice(499 - total)} more for free delivery!</p>}
                <hr />
                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span style={{ color: '#2D5A27' }}>{formatPrice(total + delivery)}</span>
                </div>
              </div>
              <div className="mt-5">
                <input placeholder="Promo code (FRESH20)" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm mb-3 focus:outline-none focus:border-green-500" />
                <button
                  onClick={handlePlaceOrder}
                  disabled={ordering}
                  style={{ backgroundColor: '#C62828' }}
                  className="w-full text-white py-3.5 rounded-full font-bold hover:opacity-90 transition disabled:opacity-60 shadow-md"
                >
                  {ordering ? 'Placing Order...' : 'Place Order 🚀'}
                </button>
                <Link to="/products" className="text-center text-sm text-gray-500 hover:text-gray-700 block mt-4">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
