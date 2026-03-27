import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import { loginUser } from '../services/api';
import { useAuth } from '../store/AuthContext';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const res = await loginUser(form);
      const { user, accessToken } = res.data;
      login(user, accessToken);
      toast.success(`Welcome back, ${user.name}! 🌿`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

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
          <div className="text-8xl mb-6 drop-shadow-lg">🍎</div>
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Freshness Delivered
          </h2>
          <p className="text-white/80 text-lg leading-relaxed max-w-sm mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Experience the taste of nature. Log in to access your personalized organic basket.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {['100% Organic', 'Farm Fresh', 'Fast Delivery'].map((item) => (
              <div
                key={item}
                className="bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 text-sm font-medium border border-white/20"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-[2rem] p-8 sm:p-12 w-full max-w-lg"
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
            Welcome Back
          </h1>
          <p className="text-gray-500 mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Please enter your details to continue your healthy journey.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="••••••••"
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

            <div className="flex justify-end">
              <span className="text-sm font-medium cursor-pointer hover:underline text-primary">
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full font-bold text-lg transition shadow-lg hover:shadow-xl disabled:opacity-60 active:scale-[0.98]"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--accent-foreground)',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {loading ? 'Verifying...' : 'Sign In 🌿'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-600 font-medium">
              New to FreshCart?{' '}
              <Link to="/register" className="text-primary font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
