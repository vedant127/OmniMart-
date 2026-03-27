import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Lock, Ticket, Truck } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCart, createOrder, deleteCartItem, updateCartQuantity } from '../services/api';
import { useAuth } from '../store/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);
  const { isLoggedIn, refreshCart } = useAuth();
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const res = await getCart();
      setCartItems(res.data || []);
      refreshCart();
    } catch {
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) { setLoading(false); return; }
    fetchCartItems();
  }, [isLoggedIn]);

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  const delivery = total > 499 || total === 0 ? 0 : 49;
  const formatPrice = (p) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p);

  const handleUpdateQuantity = async (id, newQty) => {
    if (newQty < 1) return;
    try {
      await updateCartQuantity(id, newQty);
      fetchCartItems();
    } catch {
      toast.error('Failed to update quantity');
    }
  };

  const handleRemove = async (id) => {
    try {
      await deleteCartItem(id);
      toast.success('Item removed 🌿');
      fetchCartItems();
    } catch {
      toast.error('Failed to remove item');
    }
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;
    setOrdering(true);
    try {
      await createOrder({ items: cartItems, totalAmount: total + delivery });
      toast.success('Order placed successfully! 🎁');
      setCartItems([]);
      navigate('/orders');
    } catch {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setOrdering(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4" style={{ backgroundColor: 'var(--background)' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(192,57,43,0.1)' }}>
            <Lock size={40} className="text-accent" />
          </div>
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--foreground)' }}>Access Denied</h2>
          <p className="text-muted-foreground mb-8 max-w-xs mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>Please log in to your account to view and manage your organic basket.</p>
          <Link to="/login" className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white transition hover:opacity-95 shadow-lg" style={{ backgroundColor: 'var(--primary)' }}>
            Secure Login <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">🌿 Checkout</span>
            <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--foreground)' }}>Your Basket</h1>
          </div>
          <p className="text-muted-foreground font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} ready to harvest
          </p>
        </header>

        {loading ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[...Array(3)].map((_, i) => <div key={i} className="bg-white/50 rounded-[2rem] h-32 animate-pulse border border-white/50" />)}
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24 bg-white rounded-[2rem] shadow-sm border border-white/50">
            <div className="text-8xl mb-6">🧺</div>
            <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Your basket is empty</h2>
            <p className="text-muted-foreground mb-10 max-w-sm mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>Looks like you haven't picked anything fresh today. Let's find some delicious organic produce!</p>
            <Link to="/products" className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold transition hover:opacity-95 shadow-lg" style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}>
              Start Shopping <ArrowRight size={18} />
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* List */}
            <div className="flex-1 w-full space-y-4">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group bg-white rounded-[2rem] p-5 flex flex-col sm:flex-row items-center gap-6 transition-all hover:shadow-md border border-white"
                  >
                    <div className="w-24 h-24 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden relative" style={{ backgroundColor: 'var(--muted)' }}>
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.name} className="w-16 h-16 object-contain" />
                      ) : (
                        <span className="text-5xl">{item.emoji || '🥗'}</span>
                      )}
                    </div>
                    
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--foreground)' }}>
                        {item.name || 'Unnamed Product'}
                      </h3>
                      <div className="flex items-center justify-center sm:justify-start gap-4 mt-2">
                         <p className="text-primary font-bold text-lg">{formatPrice(item.price || 0)}</p>
                         <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">In Stock 🥬</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center sm:items-end gap-4">
                      <div className="flex items-center bg-muted rounded-2xl p-1 gap-2 border border-black/5 shadow-inner">
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                          className="w-10 h-10 rounded-xl flex items-center justify-center bg-white hover:bg-red-50 hover:text-red-500 transition shadow-sm"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-black text-lg">{item.quantity}</span>
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="w-10 h-10 rounded-xl flex items-center justify-center bg-white hover:bg-green-50 hover:text-primary transition shadow-sm"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => handleRemove(item.id)}
                        className="text-muted-foreground hover:text-accent transition flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>

                    <div className="flex flex-col items-center sm:items-end gap-1 min-w-[100px]">
                      <span className="text-xs font-bold text-muted-foreground">Subtotal</span>
                      <span className="font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {formatPrice((item.price || 0) * (item.quantity || 1))}
                      </span>
                    </div>

                    <button 
                      onClick={() => handleRemove(item.product_id)}
                      className="p-3 text-muted-foreground hover:text-accent transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary Card */}
            <aside className="w-full lg:w-[400px] shrink-0 sticky top-24">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-white" style={{ boxShadow: 'var(--shadow-card)' }}>
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Order Summary
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center group">
                    <span className="text-muted-foreground font-medium">Subtotal</span>
                    <span className="font-bold text-lg">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground font-medium">Delivery</span>
                      {delivery > 0 && <Truck size={14} className="text-primary" />}
                    </div>
                    <span className={`font-bold text-lg ${delivery === 0 ? 'text-primary' : ''}`}>
                      {delivery === 0 ? 'FREE' : formatPrice(delivery)}
                    </span>
                  </div>
                  {delivery > 0 && (
                    <div className="bg-primary/5 p-4 rounded-2xl flex items-start gap-3 border border-primary/10">
                      <Truck size={18} className="text-primary shrink-0 mt-0.5" />
                      <p className="text-xs font-medium text-primary leading-relaxed">
                        Add <span className="font-bold">{formatPrice(500 - total)}</span> more to your basket to enjoy <span className="font-bold text-primary">FREE Delivery!</span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-8 pt-8 border-t border-gray-100">
                  <div className="relative">
                    <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input 
                      placeholder="Promo Code (FRESH20)" 
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-muted border-none text-sm font-bold focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/60 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="bg-muted p-6 rounded-[2rem] border border-white space-y-3 mb-8">
                  <div className="flex justify-between items-center text-muted-foreground text-sm font-bold">
                    <span>Payable Amount</span>
                    <span className="line-through opacity-50">{formatPrice(total + delivery + 50)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Final Total</span>
                    <span className="text-3xl font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {formatPrice(total + delivery)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={ordering || cartItems.length === 0}
                  className="w-full py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition shadow-lg hover:shadow-xl disabled:opacity-60 active:scale-[0.98]"
                  style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', boxShadow: 'var(--shadow-button)' }}
                >
                  {ordering ? (
                    'Processing Order...'
                  ) : (
                    <>
                      Place Order <ArrowRight size={20} />
                    </>
                  )}
                </button>
                
                <p className="text-center text-[10px] uppercase font-bold tracking-widest text-muted-foreground mt-6">
                  🔒 100% Secure Checkout Guaranteed
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
