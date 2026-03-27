import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShoppingBag, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { registerUser } from '../services/api';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill in all fields');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await registerUser(form);
      toast.success('Account created! Welcome to the family 🌿');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      toast.error(msg.includes('duplicate') ? 'Email already registered!' : msg);
    } finally {
      setLoading(false);
    }
  };

  const PERKS = [
    'Direct from organic farms',
    'Customized fresh bundles',
    'Exclusive early-bird deals',
    'Eco-friendly packaging',
  ];

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 'var(--radius)',
    border: '1px solid var(--border)',
    backgroundColor: '#fff',
    fontSize: '14px',
    fontFamily: "'DM Sans', sans-serif",
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--background)' }}>
      {/* Left Panel */}
      <div
        className="hidden md:flex flex-col justify-center items-center w-1/2 p-12 text-white relative overflow-hidden"
        style={{ backgroundColor: 'var(--primary)' }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid grid-cols-4 gap-8 p-8">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} className="text-6xl">☘️</span>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative z-10"
        >
          <div className="text-8xl mb-6 drop-shadow-lg">🌱</div>
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Join the Green Side
          </h2>
          <p className="text-white/80 text-lg leading-relaxed max-w-sm mx-auto mb-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Create an account and start your journey towards a healthier, more sustainable lifestyle.
          </p>
          <div className="space-y-4 max-w-xs mx-auto">
            {PERKS.map((perk, i) => (
              <motion.div
                key={perk}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20"
              >
                <CheckCircle2 size={20} style={{ color: 'var(--organic-olive)' }} />
                <span className="text-sm font-medium">{perk}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-[2rem] p-8 sm:p-12 w-full max-w-xl my-8"
          style={{ boxShadow: 'var(--shadow-hover)' }}
        >
          <Link to="/" className="flex items-center gap-2 mb-8 justify-center sm:justify-start">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <ShoppingBag size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              🍎 FreshCart
            </span>
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Create Account
          </h1>
          <p className="text-gray-500 mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Thousands of families trust us for their daily organic needs.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  style={inputStyle}
                  className="focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Account Type</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  style={inputStyle}
                  className="focus:border-primary bg-white cursor-pointer"
                >
                  <option value="user">Customer</option>
                  <option value="admin">Store Admin</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="hello@freshcart.com"
                style={inputStyle}
                className="focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  style={inputStyle}
                  className="pr-12 focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full font-bold text-lg transition shadow-lg hover:shadow-xl disabled:opacity-60 active:scale-[0.98] mt-4"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {loading ? 'Creating Account...' : 'Get Started 🌱'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-600 font-medium">
              Already a member?{' '}
              <Link to="/login" className="text-accent font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
