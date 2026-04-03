import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data';

const sortOptions = [
  { value: "default", label: "Relevance" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const categoryPills = [
  "All", "Fresh Bakery", "Fresh Fruits", "Healthy Beverages", "Pure Dairy", "Vital Vegetables"
];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const qCat = searchParams.get("category") || "All";
  
  // Normalize query param to matching pills
  const activeCategory = useMemo(() => {
    if (qCat === "fruits-veggies" || qCat === "Fresh Fruits" || qCat === "Vital Vegetables") return "fruits-veggies";
    if (qCat === "pure-dairy" || qCat === "Pure Dairy") return "Pure Dairy";
    if (qCat === "healthy-beverages" || qCat === "Healthy Beverages") return "Healthy Beverages";
    if (qCat === "Fresh Bakery") return "Fresh Bakery";
    return "All";
  }, [qCat]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory !== "All") {
      if (activeCategory === "fruits-veggies") {
        result = result.filter(p => p.category === "Fresh Fruits" || p.category === "Vital Vegetables");
      } else {
        result = result.filter(p => p.category === activeCategory);
      }
    }
    
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || (p.desc && p.desc.toLowerCase().includes(q)));
    }
    
    switch (sort) {
      case "price-low": return [...result].sort((a, b) => a.price - b.price);
      case "price-high": return [...result].sort((a, b) => b.price - a.price);
      case "rating": return [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default: return result;
    }
  }, [activeCategory, search, sort]);

  const setCategory = (cat) => {
    if (cat === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  // Determine active pill logically
  const getPillState = (pill) => {
    if (pill === "All" && activeCategory === "All") return true;
    if (pill === "Fresh Fruits" || pill === "Vital Vegetables") {
      // If we are showing both, neither individual pill is active unless clicked specifically
      // But actually, clicking the pill should filter.
      if (qCat === pill) return true;
      if (qCat === "fruits-veggies" && (pill === "Fresh Fruits" || pill === "Vital Vegetables")) return true;
    }
    if (qCat === pill) return true;
    if (activeCategory === pill) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="container mx-auto px-4 py-8 max-w-[1440px]">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            {activeCategory === "All" ? "All Products" : (qCat === "fruits-veggies" ? "Fruits & Veggies" : qCat)}
          </h1>
          <p className="text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>{filtered.length} products found</p>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3cb065]/20 focus:border-[#3cb065] text-gray-900 placeholder:text-gray-400 shadow-sm"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3cb065]/20 focus:border-[#3cb065] shadow-sm cursor-pointer"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categoryPills.map(pill => {
            const isActive = getPillState(pill);
            return (
              <button
                key={pill}
                onClick={() => setCategory(pill)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive ? "bg-[#2d6a2d] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {pill}
              </button>
            )
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {filtered.length > 0 ? (
            filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-500 text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>No products found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
