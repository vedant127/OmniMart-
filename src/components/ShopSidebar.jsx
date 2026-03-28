import { Star, ChevronDown, LayoutGrid } from "lucide-react";

const ShopSidebar = ({ categories = [], activeCategory, setActiveCategory }) => {
  // Ensure unique categories by name to prevent duplicates like "Electronics" appearing multiple times
  const uniqueCategories = Array.from(new Set(categories.map(c => c.name)))
    .map(name => categories.find(c => c.name === name));

  const brands = [
    { name: "Adidas", logo: "https://api.iconify.design/simple-icons:adidas.svg" },
    { name: "Columbia", logo: "https://api.iconify.design/simple-icons:columbia.svg" },
    { name: "Demix", logo: "https://api.iconify.design/simple-icons:demix.svg" },
    { name: "New Balance", logo: "https://api.iconify.design/simple-icons:newbalance.svg" },
    { name: "Nike", logo: "https://api.iconify.design/simple-icons:nike.svg" },
    { name: "Xiaomi", logo: "https://api.iconify.design/simple-icons:xiaomi.svg" },
    { name: "Asics", logo: "https://api.iconify.design/simple-icons:asics.svg" },
  ];

  return (
    <aside className="w-[300px] bg-white border-r border-gray-100 p-8 hidden lg:block overflow-y-auto max-h-[calc(100vh-80px)] sticky top-20">
      {/* Categories Selection */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <LayoutGrid className="h-5 w-5 text-gray-900" />
          <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>Categories</h3>
        </div>
        <div className="flex flex-col gap-2">
          {uniqueCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.name)}
              className={`w-full text-left px-4 py-2.5 rounded-full text-sm font-bold transition-all
                ${activeCategory === cat.name 
                  ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]" 
                  : "bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-sm font-bold text-gray-900">Price Range</h3>
          <button className="text-[10px] uppercase font-bold text-gray-400 hover:text-primary transition-colors">Reset</button>
        </div>
        <p className="text-[11px] text-gray-400 mb-6 font-medium">The average price is $300</p>
        
        {/* Mock Price Graph */}
        <div className="relative h-24 price-graph rounded-xl mb-4 overflow-hidden border border-gray-50 flex items-end px-2">
           <div className="flex-1 h-[20%] bg-primary/10 mx-0.5 rounded-t-sm" />
           <div className="flex-1 h-[40%] bg-primary/20 mx-0.5 rounded-t-sm" />
           <div className="flex-1 h-[30%] bg-primary/10 mx-0.5 rounded-t-sm" />
           <div className="flex-1 h-[60%] bg-primary/30 mx-0.5 rounded-t-sm" />
           <div className="flex-1 h-[80%] bg-primary/40 mx-0.5 rounded-t-sm" />
           <div className="flex-1 h-[90%] bg-primary/60 mx-0.5 rounded-t-sm" />
           <div className="flex-1 h-[70%] bg-primary/40 mx-0.5 rounded-t-sm" />
           <div className="flex-1 h-[50%] bg-primary/20 mx-0.5 rounded-t-sm" />
           <div className="flex-1 h-[30%] bg-primary/10 mx-0.5 rounded-t-sm" />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-gray-900 text-white rounded-full py-2 px-4 text-xs font-bold text-center">
            $20
          </div>
          <div className="w-8 h-[1px] bg-gray-200" />
          <div className="flex-1 bg-gray-900 text-white rounded-full py-2 px-4 text-xs font-bold text-center">
            $1130
          </div>
        </div>
      </div>

      {/* Star Rating */}
      <div className="mb-10">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Star Rating</h3>
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-1">
             {[1,2,3,4].map(i => <Star key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" />)}
             <Star className="h-4 w-4 text-gray-200" fill="currentColor" />
           </div>
           <span className="text-[11px] font-bold text-gray-400 italic">4 Stars & up</span>
        </div>
      </div>

      {/* Brand */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-gray-900">Brand</h3>
          <button className="text-[10px] uppercase font-bold text-gray-400 hover:text-primary transition-colors">Reset</button>
        </div>
        <div className="space-y-4">
          {brands.map((brand, i) => (
            <label key={brand.name} className="flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                  <img src={brand.logo} alt={brand.name} className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-gray-600 group-hover:text-primary transition-colors">{brand.name}</span>
              </div>
              <input 
                type="checkbox" 
                defaultChecked={i < 6}
                className="w-4 h-4 rounded border-gray-200 text-primary focus:ring-primary/20 transition-all cursor-pointer" 
              />
            </label>
          ))}
          <button className="text-[10px] font-bold text-primary mt-2 flex items-center gap-1">
            More Brand <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Delivery Options */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 mb-4">Delivery Options</h3>
        <div className="bg-gray-100 p-1 rounded-full flex">
          <button className="flex-1 py-2 px-4 bg-primary text-white text-[11px] font-bold rounded-full shadow-lg shadow-primary/20">
            Standard
          </button>
          <button className="flex-1 py-2 px-4 text-gray-500 text-[11px] font-bold rounded-full hover:text-gray-900 transition-colors">
            Pick Up
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ShopSidebar;
