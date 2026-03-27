import { useState, useEffect } from 'react';
import { getOrders } from '../services/api';
import { useAuth } from '../store/AuthContext';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle2, XCircle, ArrowRight, Lock, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const statusConfig = {
  pending: { label: 'Pending Harvest', color: 'var(--accent)', icon: Clock, bg: 'rgba(192,57,43,0.1)' },
  processing: { label: 'In Packing', color: '#3B82F6', icon: Package, bg: 'rgba(59,130,246,0.1)' },
  delivered: { label: 'Delivered Fresh', color: 'var(--primary)', icon: CheckCircle2, bg: 'rgba(44,95,30,0.1)' },
  cancelled: { label: 'Cancelled', color: '#6B7280', icon: XCircle, bg: 'rgba(107,114,128,0.1)' },
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) { setLoading(false); return; }
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        setOrders(res.data || []);
      } catch { setOrders([]); }
      finally { setLoading(false); }
    };
    fetchOrders();
  }, [isLoggedIn]);

  const formatPrice = (p) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p);

  if (!isLoggedIn) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4" style={{ backgroundColor: 'var(--background)' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(192,57,43,0.1)' }}>
            <Lock size={40} className="text-accent" />
          </div>
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--foreground)' }}>Access Denied</h2>
          <p className="text-muted-foreground mb-8 max-w-xs mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>Please log in to your account to track your orders.</p>
          <Link to="/login" className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white transition hover:opacity-95 shadow-lg" style={{ backgroundColor: 'var(--primary)' }}>
            Secure Login <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-10 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">📋 History</span>
          <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--foreground)' }}>My Orders</h1>
          <p className="text-muted-foreground mt-2 font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Tracking the journey of your fresh selections
          </p>
        </header>

        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => <div key={i} className="bg-white/50 rounded-[2rem] h-40 animate-pulse border border-white/50" />)}
          </div>
        ) : orders.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24 bg-white rounded-[2rem] shadow-sm border border-white/50">
            <div className="text-8xl mb-6 text-gray-200">📦</div>
            <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>No orders found</h2>
            <p className="text-muted-foreground mb-10 max-w-sm mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>Every healthy journey starts with a first step. Why not pick something fresh today?</p>
            <Link to="/products" className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold transition hover:opacity-95 shadow-lg" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
              Pick Your First Fruit <ArrowRight size={18} />
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {orders.map((order, i) => {
                const status = statusConfig[order.status] || statusConfig.pending;
                const StatusIcon = status.icon;
                return (
                  <motion.div
                    key={order.id || i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-[2rem] p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 transition-all hover:shadow-md border border-white"
                  >
                    <div className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center shrink-0" style={{ backgroundColor: status.bg }}>
                      <StatusIcon size={32} style={{ color: status.color }} />
                    </div>
                    
                    <div className="flex-1 text-center md:text-left space-y-1">
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                        <h3 className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                          Order #{order.id || String(i + 1).padStart(5, '0')}
                        </h3>
                        <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest" style={{ color: status.color, backgroundColor: status.bg }}>
                          {status.label}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        Placed on {order.created_at ? new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Harvest Season'}
                      </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-1">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">Total Amount</span>
                      <span className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--primary)' }}>
                        {formatPrice(order.total_amount || 0)}
                      </span>
                    </div>

                    <div className="shrink-0 w-full md:w-auto">
                      <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs border border-gray-100 transition hover:bg-muted hover:border-muted-foreground/20">
                        <Search size={14} />
                        View Tracker
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
