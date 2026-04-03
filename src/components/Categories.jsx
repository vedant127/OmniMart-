import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "../data";

const Categories = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-[1440px]">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              Shop by Category
            </h2>
            <p className="text-[15px] text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Browse our 7 curated categories
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={scrollLeft}
              className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:text-[#3cb065] transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollRight}
              className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:text-[#3cb065] transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Row */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 md:gap-6 pb-4 snap-x hide-scrollbar" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat, i) => (
            <Link
              key={cat.id || i}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="relative shrink-0 w-40 sm:w-48 lg:w-56 h-48 sm:h-56 lg:h-64 rounded-2xl overflow-hidden group snap-start block shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-bold text-white text-lg leading-tight mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {cat.name}
                </h3>
                <p className="text-[13px] text-white/90 font-medium tracking-wide">
                  {cat.count} products
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
