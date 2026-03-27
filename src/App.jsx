import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster as HotToaster } from 'react-hot-toast';
import { AuthProvider } from './store/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import OffersPage from './pages/OffersPage';

function App() {
  return (
    <AuthProvider>
      <HotToaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: 'var(--radius)',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '14px',
            boxShadow: 'var(--shadow-card)',
            backgroundColor: 'var(--card)',
            color: 'var(--foreground)',
          },
          success: {
            iconTheme: { primary: 'var(--primary)', secondary: '#fff' },
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          {/* Auth pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Main Layout Pages */}
          <Route
            path="/*"
            element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/offers" element={<OffersPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route
                      path="*"
                      element={
                        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                          <p className="text-8xl mb-4">🫐</p>
                          <h2
                            className="text-3xl font-bold mb-2"
                            style={{ fontFamily: "'Playfair Display', serif", color: 'var(--foreground)' }}
                          >
                            Page Not Found
                          </h2>
                          <a href="/" style={{ color: 'var(--primary)' }} className="underline text-sm font-medium mt-2">
                            Go Back to Home
                          </a>
                        </div>
                      }
                    />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;