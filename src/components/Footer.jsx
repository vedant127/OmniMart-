import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1e2320] text-gray-400 py-16 text-sm border-t border-gray-800 border-opacity-50">
      <div className="container mx-auto px-4 max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8">
          
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-xl">🥬</span>
              <span className="text-[17px] font-bold text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Grocery<span style={{ color: "#3cb065" }}>Mart</span>
              </span>
            </Link>
            <p className="text-gray-400 text-[13px] leading-relaxed max-w-xs">
              Fresh groceries delivered to your door. Quality products at great prices.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-[14px] mb-4 tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>Shop</h4>
            <ul className="space-y-3 text-[13px]">
              <li><Link to="/products?category=fruits-vegetables" className="hover:text-white transition-colors">Fruits & Vegetables</Link></li>
              <li><Link to="/products?category=dairy-eggs" className="hover:text-white transition-colors">Dairy & Eggs</Link></li>
              <li><Link to="/products?category=bakery" className="hover:text-white transition-colors">Bakery</Link></li>
              <li><Link to="/products?category=beverages" className="hover:text-white transition-colors">Beverages</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-[14px] mb-4 tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>More</h4>
            <ul className="space-y-3 text-[13px]">
              <li><Link to="/products?category=snacks" className="hover:text-white transition-colors">Snacks & Chips</Link></li>
              <li><Link to="/products?category=meat-seafood" className="hover:text-white transition-colors">Meat & Seafood</Link></li>
              <li><Link to="/products?category=pantry" className="hover:text-white transition-colors">Pantry Staples</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-[14px] mb-4 tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>Support</h4>
            <ul className="space-y-3 text-[13px]">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Delivery Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-[12px] text-gray-500">
          <p>© 2026 GroceryMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
