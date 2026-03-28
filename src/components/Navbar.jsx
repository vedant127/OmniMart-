import { useState, useEffect } from "react";
import { Search, ShoppingCart, Heart, User, Menu, X, Clock, MapPin, Globe, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Items", path: "/products" },
  { label: "Offers", path: "/offers" },
  { label: "Blogs", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
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
    <header className={`w-full sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg scale-[0.99] translate-y-2 rounded-2xl mx-auto max-w-[98%]" : ""}`}>
      {/* Top bar */}
      <div 
        className={`hidden md:block transition-all duration-300 overflow-hidden ${scrolled ? "h-0" : "h-10"}`}
        style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2.5 text-[10px] uppercase font-bold tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="opacity-80" />
              Open: 10:00 AM - 11:00 PM
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="opacity-80" />
              Mirpur-1 (main)
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition">
              <Globe size={12} className="opacity-80" />
              English
            </span>
            {isLoggedIn ? (
              <span className="font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Welcome, {user?.name?.split(" ")[0]}!
              </span>
            ) : (
              <Link to="/login" className="hover:text-accent transition-colors">Login / Register</Link>
            )}
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav 
        className={`transition-all duration-300 ${scrolled ? "rounded-[2rem] border border-white/50" : "border-b border-gray-100"}`}
        style={{ backgroundColor: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(10px)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2 shrink-0">
             <div className="flex flex-row items-center gap-2">
              <span className="text-3xl">🍎</span>
              <span className="text-2xl font-black" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
                FreshCart
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden xl:flex items-center gap-10 text-[13px] font-bold">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  className="transition-all relative py-2 group"
                  style={{
                    color: location.pathname === link.path ? "var(--primary)" : "var(--foreground)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-3">
             <form 
              onSubmit={handleSearch}
              className="hidden lg:flex items-center rounded-2xl px-5 py-2.5 gap-3 w-64 transition-all border border-transparent focus-within:border-primary/20 focus-within:ring-4 focus-within:ring-primary/5 group bg-gray-50"
            >
              <Search className="h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="bg-transparent text-xs font-medium outline-none w-full"
              />
            </form>

            <button className="relative p-2.5 rounded-xl hover:bg-primary/5 transition group">
              <Heart className="h-5 w-5 text-foreground group-hover:text-accent transition-colors" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent border-2 border-white" />
            </button>
            <Link to="/cart" className="relative p-2.5 rounded-xl hover:bg-primary/5 transition group">
              <ShoppingCart className="h-5 w-5 text-foreground group-hover:text-primary transition-colors" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
            
            <div className="h-8 w-[1px] bg-gray-100 mx-2 hidden lg:block" />

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={logout}
                  className="p-2.5 rounded-xl hover:bg-accent/5 transition text-muted-foreground hover:text-accent"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="p-2.5 rounded-xl bg-primary/10 transition hover:bg-primary hover:text-white">
                <User className="h-5 w-5" />
              </Link>
            )}
            
            <button
              className="xl:hidden p-2.5 rounded-xl bg-muted/50 transition hover:bg-primary/5"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} className="text-accent" /> : <Menu size={24} className="text-foreground" />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
