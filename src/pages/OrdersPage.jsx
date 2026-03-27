import { useState, useEffect } from 'react';
import { getOrders } from '../services/api';
import { useAuth } from '../store/AuthContext';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

const statusConfig = {
  pending: { label: 'Pending', color: '#F59E0B', icon: Clock },
  processing: { label: 'Processing', color: '#3B82F6', icon: Package },
  delivered: { label: 'Delivered', color: '#10B981', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: '#EF4444', icon: XCircle },
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

  const formatPrice = (p) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(p);

  if (!isLoggedIn) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-6xl mb-4">🔒</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Please Login First</h2>
        <Link to="/login" style={{ backgroundColor: '#2D5A27' }} className="text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition">Login Now</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8" style={{ color: '#2D5A27' }}>📦 My Orders</h1>
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => <div key={i} className="bg-gray-100 rounded-2xl h-32 animate-pulse" />)}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20">
          <Package size={80} className="mx-auto text-gray-200 mb-4" />
          <h2 className="text-xl font-bold text-gray-600 mb-2">No orders yet!</h2>
          <p className="text-gray-400 mb-6">Start shopping and your orders will appear here.</p>
          <Link to="/products" style={{ backgroundColor: '#C62828' }} className="text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition">Shop Now</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, i) => {
            const status = statusConfig[order.status] || statusConfig.pending;
            const StatusIcon = status.icon;
            return (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition">
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <p className="font-bold text-gray-800">Order #{order.id || String(i + 1).padStart(5, '0')}</p>
                    <p className="text-sm text-gray-400 mt-0.5">{order.created_at ? new Date(order.created_at).toLocaleDateString('en-IN') : 'Recent'}</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: status.color }}>
                    <StatusIcon size={14} />
                    {status.label}
                  </div>
                </div>
                <hr className="my-3" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{order.item_count || 1} item(s)</p>
                    <p className="font-bold text-lg mt-1" style={{ color: '#2D5A27' }}>{formatPrice(order.total_amount || 0)}</p>
                  </div>
                  <button style={{ borderColor: '#2D5A27', color: '#2D5A27' }} className="border-2 px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-50 transition">
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
