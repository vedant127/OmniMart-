import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, RefreshCcw, Headphones } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProducts, getCategories } from '../services/api';

const CATEGORIES = [
  { name: 'Fresh Fruits', emoji: '🍎', color: '#FEE2E2' },
  { name: 'Vegetables', emoji: '🥦', color: '#D1FAE5' },
  { name: 'Dairy & Eggs', emoji: '🥛', color: '#FEF3C7' },
  { name: 'Bakery', emoji: '🍞', color: '#F3E8FF' },
  { name: 'Beverages', emoji: '🧃', color: '#DBEAFE' },
  { name: 'Snacks', emoji: '🍿', color: '#FFE4E6' },
];

const FEATURES = [
  { icon: Truck, title: 'Free Delivery', desc: 'On orders above ₹499' },
  { icon: Shield, title: '100% Organic', desc: 'Certified fresh produce' },
  { icon: RefreshCcw, title: 'Easy Returns', desc: 'No questions asked' },
  { icon: Headphones, title: '24/7 Support', desc: 'Always here for you' },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', rating: 5, text: 'Amazing quality! The fruits are so fresh and delivered on time. Best online grocery store!', avatar: '👩' },
  { name: 'Rahul Verma', rating: 5, text: 'I love the variety. The vegetables are always crisp and organic. Highly recommended!', avatar: '👨' },
  { name: 'Ananya Patel', rating: 4, text: 'Great prices and super fast delivery. The packaging is eco-friendly too!', avatar: '👩‍💼' },
];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState({ h: 5, m: 32, s: 47 });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data || []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{ backgroundColor: '#E8F5E9' }} className="rounded-b-3xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 items-center gap-10">
          <div>
            <span style={{ backgroundColor: '#C62828', color: 'white' }} className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              🌿 100% Organic
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight" style={{ color: '#2D5A27' }}>
              Fresh From <br />
              <span style={{ color: '#C62828' }}>Farm</span> to Your <br />
              Doorstep
            </h1>
            <p className="mt-4 text-gray-600 text-lg max-w-md">
              Get the freshest organic fruits, vegetables, and groceries delivered in under 2 hours. Farm-fresh every day!
            </p>
            <div className="mt-8 flex gap-4 flex-wrap">
              <Link
                to="/products"
                style={{ backgroundColor: '#C62828' }}
                className="text-white px-8 py-3.5 rounded-full font-semibold flex items-center gap-2 hover:opacity-90 transition shadow-lg"
              >
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link
                to="/products"
                style={{ borderColor: '#2D5A27', color: '#2D5A27' }}
                className="border-2 px-8 py-3.5 rounded-full font-semibold hover:bg-green-50 transition"
              >
                Browse All
              </Link>
            </div>
            <div className="mt-8 flex gap-6 text-sm text-gray-600">
              <div className="text-center">
                <p className="font-bold text-2xl" style={{ color: '#2D5A27' }}>500+</p>
                <p>Products</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-2xl" style={{ color: '#2D5A27' }}>10K+</p>
                <p>Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-2xl" style={{ color: '#2D5A27' }}>2hr</p>
                <p>Fast Delivery</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="text-[180px] md:text-[220px] select-none drop-shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                🥗
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🍎</span>
                  <div>
                    <p className="font-bold text-xs" style={{ color: '#2D5A27' }}>Fresh Apples</p>
                    <p className="text-xs text-gray-500">₹89 / kg</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-3">
                <div className="flex items-center gap-1">
                  <Star size={12} fill="#FFC107" className="text-yellow-400" />
                  <span className="text-xs font-bold">4.9 • 2k+ reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div style={{ backgroundColor: '#E8F5E9' }} className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
              <Icon size={20} style={{ color: '#2D5A27' }} />
            </div>
            <div>
              <p className="font-semibold text-sm">{title}</p>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── CATEGORIES ── */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#C62828' }}>Browse</p>
            <h2 className="text-2xl font-bold" style={{ color: '#2D5A27' }}>Popular Categories</h2>
          </div>
          <Link to="/products" style={{ color: '#2D5A27' }} className="text-sm font-semibold flex items-center gap-1 hover:opacity-70">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 text-center"
              style={{ backgroundColor: cat.color }}
            >
              <span className="text-4xl">{cat.emoji}</span>
              <span className="text-xs font-semibold text-gray-700">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FLASH SALE ── */}
      <section style={{ backgroundColor: '#FFF3E0' }} className="mx-4 md:mx-auto max-w-7xl rounded-3xl p-6 my-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#C62828' }}>Limited Time</p>
            <h2 className="text-2xl font-bold" style={{ color: '#2D5A27' }}>⚡ Flash Sale</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Ends in:</span>
            {[pad(countdown.h), pad(countdown.m), pad(countdown.s)].map((val, i) => (
              <div key={i} className="flex items-center">
                <div style={{ backgroundColor: '#C62828' }} className="text-white font-bold text-lg w-12 h-12 rounded-xl flex items-center justify-center">
                  {val}
                </div>
                {i < 2 && <span className="mx-1 font-bold text-gray-500">:</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Organic Mango', price: 149, emoji: '🥭', discount: 30 },
            { name: 'Fresh Strawberries', price: 199, emoji: '🍓', discount: 25 },
            { name: 'Green Avocado', price: 89, emoji: '🥑', discount: 20 },
            { name: 'Blueberries', price: 249, emoji: '🫐', discount: 35 },
          ].map((item) => (
            <div key={item.name} className="bg-white rounded-2xl p-4 text-center hover:shadow-md transition">
              <span style={{ backgroundColor: '#C62828' }} className="text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                {item.discount}% Off
              </span>
              <div className="text-5xl my-3">{item.emoji}</div>
              <p className="font-semibold text-sm text-gray-800">{item.name}</p>
              <p className="font-bold" style={{ color: '#2D5A27' }}>₹{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#C62828' }}>Our Picks</p>
            <h2 className="text-2xl font-bold" style={{ color: '#2D5A27' }}>Featured Products</h2>
          </div>
          <Link to="/products" style={{ color: '#2D5A27' }} className="text-sm font-semibold flex items-center gap-1 hover:opacity-70">
            See All <ArrowRight size={14} />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-64 animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-6xl mb-4">🌱</p>
            <p className="text-gray-500 text-lg">No products yet. Add some via the API!</p>
            <Link to="/products" style={{ color: '#2D5A27' }} className="text-sm underline mt-2 inline-block">Browse All</Link>
          </div>
        )}
      </section>

      {/* ── BANNER ── */}
      <section style={{ background: 'linear-gradient(135deg, #2D5A27, #4CAF50)' }} className="max-w-7xl mx-auto px-4 my-10 rounded-3xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-6">
          <div>
            <p className="text-green-200 text-sm font-semibold mb-2">Special Offer for New Members</p>
            <h2 className="text-white text-3xl md:text-4xl font-extrabold">Get 20% Off <br />Your First Order!</h2>
            <p className="text-green-200 mt-2">Use code <span className="bg-white/20 px-2 py-0.5 rounded font-bold text-white">FRESH20</span> at checkout</p>
          </div>
          <div className="text-[80px] select-none">🎁</div>
          <Link
            to="/register"
            style={{ backgroundColor: '#C62828' }}
            className="text-white px-8 py-3.5 rounded-full font-bold whitespace-nowrap hover:opacity-90 transition shadow-lg"
          >
            Claim Offer
          </Link>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#C62828' }}>Reviews</p>
          <h2 className="text-2xl font-bold" style={{ color: '#2D5A27' }}>Making a Difference 💚</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition">
              <div className="flex gap-1 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="#FFC107" className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="text-2xl">{t.avatar}</div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">Verified Customer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
