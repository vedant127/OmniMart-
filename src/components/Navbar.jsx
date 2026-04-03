import { useState, useEffect } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../store/CartContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { cartItems, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`w-full sticky top-0 z-40 transition-all duration-300 bg-white ${scrolled ? "shadow-sm border-b border-gray-100" : "border-b border-gray-100"}`}>
      <div className="container mx-auto px-4 max-w-[1440px]">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🥦</span>
            <span className="text-[22px] font-bold tracking-tight text-gray-900 font-sans">
              Grocery<span className="text-[#3cb065]">Mart</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 mx-auto font-sans">
            <Link to="/" className="text-[14px] font-medium text-gray-600 hover:text-[#3cb065]">Home</Link>
            <Link to="/shop" className="text-[14px] font-medium text-gray-600 hover:text-[#3cb065]">Shop</Link>
            <Link to="/fruits-veggies" className="text-[14px] font-medium text-gray-600 hover:text-[#3cb065]">Fruits & Veggies</Link>
            <Link to="/dairy" className="text-[14px] font-medium text-gray-600 hover:text-[#3cb065]">Dairy</Link>
            <Link to="/beverages" className="text-[14px] font-medium text-gray-600 hover:text-[#3cb065]">Beverages</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/shop')}
              className="p-2 transition-colors cursor-pointer text-gray-600 hover:text-[#3cb065]"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <button
              onClick={toggleCart}
              className="relative p-2 transition-colors cursor-pointer text-gray-600 hover:text-[#3cb065]"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute 0 top-0 right-0 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center shadow-sm bg-[#3cb065]">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              )}
            </button>

            <button className="md:hidden p-2 text-gray-600 ml-1 transition-colors hover:text-[#3cb065]" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 border-t border-gray-100 pt-2 font-sans">
            <div className="flex flex-col gap-1">
              <Link to="/" onClick={() => setMobileOpen(false)} className="text-[15px] font-medium px-3 py-2 rounded-md text-gray-600 hover:text-[#3cb065] hover:bg-green-50">Home</Link>
              <Link to="/shop" onClick={() => setMobileOpen(false)} className="text-[15px] font-medium px-3 py-2 rounded-md text-gray-600 hover:text-[#3cb065] hover:bg-green-50">Shop</Link>
              <Link to="/fruits-veggies" onClick={() => setMobileOpen(false)} className="text-[15px] font-medium px-3 py-2 rounded-md text-gray-600 hover:text-[#3cb065] hover:bg-green-50">Fruits & Veggies</Link>
              <Link to="/dairy" onClick={() => setMobileOpen(false)} className="text-[15px] font-medium px-3 py-2 rounded-md text-gray-600 hover:text-[#3cb065] hover:bg-green-50">Dairy</Link>
              <Link to="/beverages" onClick={() => setMobileOpen(false)} className="text-[15px] font-medium px-3 py-2 rounded-md text-gray-600 hover:text-[#3cb065] hover:bg-green-50">Beverages</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
