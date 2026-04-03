import { useRef } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "../data";

const FlashSales = () => {
  const scrollRef = useRef(null);
  
  // Featured products from data (Kiwi, Pineapple, Grapes, Oranges)
  const featured = products.slice(0, 4);

  return (
    <section className="container mx-auto px-4 max-w-[1440px] py-12">
      <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
          Featured Products
        </h2>
        <p className="text-[15px] text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Handpicked deals and favorites
        </p>
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 md:gap-6 pb-4 snap-x hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {featured.map((product, i) => (
          <Link
            key={product.id}
            to={`/shop`}
            className="shrink-0 w-64 md:w-72 bg-white rounded-xl overflow-hidden group transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100 flex flex-col snap-start"
          >
            {/* Full-width Image area */}
            <div className="relative w-full h-48 sm:h-56 bg-gray-50 overflow-hidden">
              <span
                className="absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-0.5 rounded bg-red-500 z-10"
              >
                Sale
              </span>
              
              <img 
                src={product.image} 
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
              />
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col flex-1">
              <p className="text-xs uppercase font-bold text-gray-400 mb-1 tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {product.weight || "EACH"}
              </p>
              
              <h3 className="font-bold text-base leading-tight mb-4 flex-1 text-gray-900 group-hover:text-[#3cb065] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {product.name}
              </h3>
              
              <div className="flex items-end justify-between mt-auto">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-[#3cb065]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    ₹{product.price}
                  </span>
                  <span className="text-sm line-through text-gray-400">
                    ₹{product.originalPrice || Math.round(product.price * 1.2)}
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-bold text-gray-600 leading-none">{product.rating}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FlashSales;
