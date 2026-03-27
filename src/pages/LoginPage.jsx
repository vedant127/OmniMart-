import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Leaf } from 'lucide-react';
import toast from 'react-hot-toast';
import { loginUser } from '../services/api';
import { useAuth } from '../store/AuthContext';

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
      toast.success(`Welcome back, ${user.name}! 🎉`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#E8F5E9' }}>
      {/* Left Panel */}
      <div style={{ backgroundColor: '#2D5A27' }} className="hidden md:flex flex-col justify-center items-center w-1/2 p-12 text-white">
        <div className="text-center">
          <div className="text-8xl mb-6">🌿</div>
          <h2 className="text-3xl font-extrabold mb-3">Welcome Back!</h2>
          <p className="text-green-200 text-base leading-relaxed max-w-sm">
            Your fresh, organic groceries are just one login away. Let's get you back to healthy living!
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {['🍎 Fresh Fruits', '🥦 Vegetables', '🥛 Dairy', '🍞 Bakery'].map((item) => (
              <div key={item} className="bg-white/10 rounded-xl px-4 py-2 text-sm font-medium">{item}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div style={{ backgroundColor: '#2D5A27' }} className="w-10 h-10 rounded-full flex items-center justify-center">
                <Leaf size={20} className="text-white" />
              </div>
              <span className="text-2xl font-bold">
                <span style={{ color: '#C62828' }}>Fresh</span>
                <span style={{ color: '#2D5A27' }}>Mart</span>
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Login to your account</h1>
            <p className="text-gray-500 text-sm mt-1">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:border-green-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <span className="text-sm cursor-pointer hover:underline" style={{ color: '#2D5A27' }}>
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: '#C62828' }}
              className="w-full text-white py-3.5 rounded-full font-bold text-base hover:opacity-90 transition disabled:opacity-60 shadow-md"
            >
              {loading ? 'Logging in...' : 'Login 🚀'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#2D5A27' }} className="font-bold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
