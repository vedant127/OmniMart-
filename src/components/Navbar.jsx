import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Phone, MapPin, ChevronDown, Leaf } from 'lucide-react';
import { useAuth } from '../store/AuthContext';
import { useState } from 'react';

const Navbar = ({ cartCount = 0 }) => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/products?search=${searchQuery}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Top bar */}
      <div style={{ backgroundColor: '#C62828' }} className="text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone size={13} />
              <span>+91 98765 43210</span>
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={13} />
              <span>Free delivery on orders above ₹499</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <span className="font-medium">Welcome, {user?.name?.split(' ')[0]}! 👋</span>
            ) : (
              <>
                <Link to="/login" className="hover:underline">Login</Link>
                <span>|</span>
                <Link to="/register" className="hover:underline">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-white py-4 px-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div style={{ backgroundColor: '#2D5A27' }} className="w-9 h-9 rounded-full flex items-center justify-center">
              <Leaf size={20} className="text-white" />
            </div>
            <div className="leading-tight">
              <span style={{ color: '#C62828' }} className="font-bold text-xl">Fresh</span>
              <span style={{ color: '#2D5A27' }} className="font-bold text-xl">Mart</span>
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for fresh fruits, vegetables..."
                className="w-full border-2 border-gray-200 rounded-full py-2.5 pl-5 pr-12 text-sm focus:outline-none focus:border-green-500 transition-colors"
              />
              <button
                type="submit"
                style={{ backgroundColor: '#2D5A27' }}
                className="absolute right-1.5 top-1.5 text-white rounded-full p-2 hover:opacity-90 transition"
              >
                <Search size={16} />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link to="/cart" className="relative flex flex-col items-center text-gray-600 hover:text-green-700 transition">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span style={{ backgroundColor: '#C62828' }} className="absolute -top-2 -right-2 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
              <span className="text-xs mt-0.5">Cart</span>
            </Link>

            {/* User dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex flex-col items-center text-gray-600 hover:text-green-700 transition"
              >
                <div style={{ backgroundColor: isLoggedIn ? '#2D5A27' : '#e5e7eb' }} className="w-8 h-8 rounded-full flex items-center justify-center">
                  <User size={16} className={isLoggedIn ? 'text-white' : 'text-gray-500'} />
                </div>
                <span className="text-xs mt-0.5 flex items-center gap-0.5">
                  Account <ChevronDown size={10} />
                </span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-12 bg-white shadow-xl rounded-xl border border-gray-100 w-44 py-2 z-50">
                  {isLoggedIn ? (
                    <>
                      <Link to="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Profile</Link>
                      <Link to="/orders" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Orders</Link>
                      <hr className="my-1" />
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Logout</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Login</Link>
                      <Link to="/register" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Register</Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category nav */}
        <div className="max-w-7xl mx-auto mt-3 flex items-center gap-6 text-sm font-medium text-gray-600 overflow-x-auto pb-1">
          {['All Products', 'Fresh Fruits', 'Vegetables', 'Dairy & Eggs', 'Bakery', 'Beverages', 'Snacks'].map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${cat}`}
              className="whitespace-nowrap hover:text-green-700 transition-colors pb-1 border-b-2 border-transparent hover:border-green-600"
            >
              {cat}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
