import { useState, useEffect } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, isLoggedIn, logout, cartCount } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}
      style={{
        backgroundColor: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      {/* Added explicit pt-4 and inline paddingTop to guarantee it avoids browser top edge clipping */}
      <div 
        className="w-full max-w-[1440px] mx-auto flex items-center justify-between px-4 sm:px-6 pb-4" 
        style={{ paddingTop: '20px' }}
      >

        {/* Left Side: Menu + Logo */}
        <div className="flex items-center gap-4 shrink-0">
          <button className="hidden md:flex p-2 -ml-2 rounded-full hover:bg-gray-100 transition items-center justify-center">
            <Menu className="h-6 w-6" style={{ color: "#242529" }} />
          </button>
          
          <Link to="/" className="flex items-center gap-1 shrink-0 cursor-pointer">
            <span className="text-3xl">🥕</span>
            <span
              className="text-[26px] font-black hidden sm:block tracking-tight"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#108910", lineHeight: "1" }}
            >
              freshcart
            </span>
          </Link>
        </div>

        {/* Search Bar — Big Instacart-style pill */}
        <form
          onSubmit={handleSearch}
          className="flex-1 flex items-center gap-3 px-5 transition-all focus-within:ring-2 focus-within:bg-white mx-4 md:mx-8"
          style={{
            borderRadius: "32px",
            backgroundColor: "#F3F4F6",
            height: "52px",
          }}
        >
          <Search className="h-5 w-5 shrink-0" style={{ color: "#242529", strokeWidth: 2.5 }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products and stores"
            className="bg-transparent text-[15px] font-medium outline-none w-full h-full"
            style={{ color: "#242529", fontFamily: "'DM Sans', sans-serif", lineHeight: "normal" }}
          />
        </form>

        {/* Right Side */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2.5 rounded-full hover:bg-gray-100 transition">
            <ShoppingCart className="h-5 w-5" style={{ color: "#242529" }} />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center"
                style={{ backgroundColor: "#108910" }}
              >
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth Buttons */}
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-3 pl-2">
              <span
                className="text-[15px] font-bold"
                style={{ color: "#242529", fontFamily: "'DM Sans', sans-serif" }}
              >
                Hi, {user?.name?.split(" ")[0]}
              </span>
              <button
                onClick={logout}
                className="px-6 py-[10px] text-[15px] font-bold rounded-full transition hover:bg-gray-100"
                style={{ color: "#242529", fontFamily: "'DM Sans', sans-serif", backgroundColor: "#F3F4F6" }}
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2 pl-2">
              {/* Log in */}
              <Link
                to="/login"
                className="px-5 py-3 text-[15px] font-bold rounded-full transition hover:bg-gray-100"
                style={{ color: "#242529", fontFamily: "'DM Sans', sans-serif" }}
              >
                Log in
              </Link>
              {/* Sign up — solid Instacart green pill */}
              <Link
                to="/register"
                className="px-6 py-3 text-[15px] font-bold rounded-full text-white transition hover:opacity-90 min-w-[max-content]"
                style={{ backgroundColor: "#108910", fontFamily: "'DM Sans', sans-serif" }}
              >
                Sign up
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen
              ? <X size={22} style={{ color: "#242529" }} />
              : <Menu size={22} style={{ color: "#242529" }} />
            }
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-4 border-t border-gray-100 bg-white">
          <div className="flex flex-col gap-3 pt-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="px-5 py-2.5 text-sm font-bold rounded-full border text-center transition hover:bg-gray-50"
                  style={{ borderColor: "rgb(199,200,205)", color: "#242529" }}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="px-5 py-2.5 text-sm font-bold rounded-full text-white text-center"
                  style={{ backgroundColor: "#108910" }}
                >
                  Sign up
                </Link>
              </>
            ) : (
              <button
                onClick={() => { logout(); setMobileOpen(false); }}
                className="px-5 py-2.5 text-sm font-bold rounded-full border text-center"
                style={{ borderColor: "rgb(199,200,205)", color: "#242529" }}
              >
                Log out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
