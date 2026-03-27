import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, MapPin, Share2, Heart, Globe } from 'lucide-react';

const Footer = () => (
  <footer style={{ backgroundColor: '#2D5A27' }} className="text-white mt-16 pt-12 pb-6">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-white w-9 h-9 rounded-full flex items-center justify-center">
              <Leaf size={20} style={{ color: '#2D5A27' }} />
            </div>
            <span className="text-xl font-bold">
              <span style={{ color: '#ff8a80' }}>Fresh</span>Mart
            </span>
          </div>
          <p className="text-green-200 text-sm leading-relaxed">
            Your one-stop destination for the freshest organic produce. Farm to doorstep, every single day. 🌱
          </p>
          <div className="flex gap-3 mt-4">
            {[Share2, Heart, Globe].map((Icon, i) => (
              <div key={i} className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition">
                <Icon size={16} />
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-bold text-base mb-4">Categories</h4>
          <ul className="space-y-2 text-sm text-green-200">
            {['Fresh Fruits', 'Vegetables', 'Dairy & Eggs', 'Bakery Items', 'Beverages', 'Snacks & Munchies'].map((item) => (
              <li key={item}>
                <Link to="/products" className="hover:text-white transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* My Account */}
        <div>
          <h4 className="font-bold text-base mb-4">My Account</h4>
          <ul className="space-y-2 text-sm text-green-200">
            {[['My Profile', '/profile'], ['My Orders', '/orders'], ['Cart', '/cart'], ['Login', '/login'], ['Register', '/register']].map(([label, path]) => (
              <li key={label}>
                <Link to={path} className="hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Newsletter */}
        <div>
          <h4 className="font-bold text-base mb-4">Contact Us</h4>
          <div className="space-y-2 text-sm text-green-200 mb-5">
            <div className="flex items-center gap-2"><Phone size={14} /><span>+91 98765 43210</span></div>
            <div className="flex items-center gap-2"><Mail size={14} /><span>hello@freshmart.in</span></div>
            <div className="flex items-center gap-2"><MapPin size={14} /><span>Mumbai, Maharashtra</span></div>
          </div>
          <h4 className="font-bold text-sm mb-2">Newsletter</h4>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email..."
              className="flex-1 text-sm bg-white/10 border border-white/20 rounded-l-full px-4 py-2 placeholder-green-300 focus:outline-none focus:bg-white/15"
            />
            <button style={{ backgroundColor: '#C62828' }} className="px-4 py-2 rounded-r-full text-sm font-semibold hover:opacity-90 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <hr className="border-white/20 mb-5" />
      <div className="flex flex-col md:flex-row items-center justify-between text-xs text-green-300 gap-2">
        <p>© 2024 FreshMart. All rights reserved.</p>
        <div className="flex gap-4">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
