import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProducts, getCategories } from '../services/api';

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#2D5A27' }}>
          {searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
        </h1>
        <p className="text-gray-500 mt-1">{filtered.length} products found</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="hidden md:block w-56 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <SlidersHorizontal size={16} />
              Filters
            </h3>
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-600 mb-3">Category</h4>
              <div className="space-y-2">
                {['All', ...categories.map((c) => c.name)].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg transition ${
                      selectedCategory === cat
                        ? 'text-white font-semibold'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    style={selectedCategory === cat ? { backgroundColor: '#2D5A27' } : {}}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-5 bg-white rounded-xl border border-gray-100 px-4 py-3">
            {/* Mobile category filter */}
            <div className="flex gap-2 overflow-x-auto md:hidden">
              {['All', 'Fruits', 'Vegetables'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition ${
                    selectedCategory === cat ? 'text-white border-transparent' : 'border-gray-200 text-gray-600'
                  }`}
                  style={selectedCategory === cat ? { backgroundColor: '#2D5A27' } : {}}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none bg-white"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(9)].map((_, i) => <div key={i} className="bg-gray-100 rounded-2xl h-64 animate-pulse" />)}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🌿</p>
              <p className="text-gray-500 text-lg font-medium">No products found</p>
              <button onClick={() => setSelectedCategory('All')} style={{ color: '#2D5A27' }} className="text-sm underline mt-2">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
