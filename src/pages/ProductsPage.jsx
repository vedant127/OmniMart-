import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, RotateCcw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProducts, getCategories } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, cRes] = await Promise.all([getProducts(), getCategories()]);
        setProducts(pRes.data || []);
        setCategories(cRes.data || []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = products
    .filter((p) => selectedCategory === 'All' || p.category_name === selectedCategory)
    .filter((p) => !searchQuery || p.name?.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header Banner */}
      <section className="py-12 px-4" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              🍏 Our Catalog
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--foreground)' }}>
              {searchQuery ? `Search: "${searchQuery}"` : 'Shop Organic'}
            </h1>
            <p className="max-w-xl mx-auto text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Browse our collection of farm-fresh, 100% natural products delivered straight to your door.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8">
            <div className="p-6 rounded-[2rem] sticky top-24" style={{ backgroundColor: 'var(--card)', boxShadow: 'var(--shadow-card)' }}>
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal size={18} className="text-primary" />
                <h3 className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Categories</h3>
              </div>
              
              <div className="space-y-2">
                {['All', ...categories.map((c) => c.name)].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="w-full text-left text-sm px-4 py-3 rounded-xl transition-all relative group overflow-hidden"
                    style={{
                      backgroundColor: selectedCategory === cat ? 'var(--primary)' : 'transparent',
                      color: selectedCategory === cat ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    <span className="relative z-10 font-bold">{cat}</span>
                    {selectedCategory !== cat && (
                      <div className="absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>Price Range</h4>
                  <span className="text-[10px] font-bold text-primary">Reset</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-primary w-2/3" />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] font-bold text-muted-foreground">₹0</span>
                  <span className="text-[10px] font-bold text-muted-foreground">₹2000</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/50">
              <div className="text-sm font-bold text-muted-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Showing <span className="text-primary">{filtered.length}</span> results
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-xs font-bold text-muted-foreground whitespace-nowrap">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-bold border-none bg-white px-4 py-2.5 rounded-xl shadow-sm focus:ring-2 focus:ring-primary/20 cursor-pointer w-full sm:w-40"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <option value="default">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white/50 rounded-[2rem] h-80 animate-pulse border border-white/50" />
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24 bg-white rounded-[2rem] shadow-sm"
              >
                <div className="text-8xl mb-6">🌿</div>
                <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Empty Fields</h2>
                <p className="text-muted-foreground mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>No products matched your selection. Why not try something else?</p>
                <button
                  onClick={() => { setSelectedCategory('All'); setSortBy('default'); }}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm bg-primary text-primary-foreground transition hover:opacity-90"
                >
                  <RotateCcw size={16} />
                  Reset Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
