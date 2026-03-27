import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Leaf, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { registerUser } from '../services/api';

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
      toast.success('Account created! Please login 🎉');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      toast.error(msg.includes('duplicate') ? 'Email already registered!' : msg);
    } finally {
      setLoading(false);
    }
  };

  const PERKS = ['Free delivery on first order', '100% organic produce', 'Exclusive member discounts', '24/7 customer support'];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#E8F5E9' }}>
      {/* Left Panel */}
      <div style={{ backgroundColor: '#2D5A27' }} className="hidden md:flex flex-col justify-center items-center w-1/2 p-12 text-white">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-extrabold mb-3">Join FreshMart!</h2>
          <p className="text-green-200 text-base max-w-sm leading-relaxed">
            Create your account and enjoy exclusive benefits — fresh produce, great deals, fast delivery!
          </p>
          <ul className="mt-8 space-y-3 text-left">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-3">
                <div style={{ backgroundColor: '#C62828' }} className="w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                  <Check size={12} />
                </div>
                <span className="text-sm text-green-100">{perk}</span>
              </li>
            ))}
          </ul>
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
            <h1 className="text-2xl font-bold text-gray-800">Create your account</h1>
            <p className="text-gray-500 text-sm mt-1">Join thousands of happy customers</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition"
              />
            </div>
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
                  placeholder="Min. 6 characters"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition bg-white"
              >
                <option value="user">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: '#2D5A27' }}
              className="w-full text-white py-3.5 rounded-full font-bold text-base hover:opacity-90 transition disabled:opacity-60 shadow-md mt-2"
            >
              {loading ? 'Creating Account...' : 'Create Account 🌱'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#C62828' }} className="font-bold hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
