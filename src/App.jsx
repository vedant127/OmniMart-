import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './store/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { borderRadius: '12px', fontFamily: 'Outfit, sans-serif', fontSize: '14px' },
            success: { iconTheme: { primary: '#2D5A27', secondary: '#fff' } },
          }}
        />
        <Routes>
          {/* Auth pages - no navbar/footer */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Main layout */}
          <Route path="/*" element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="*" element={
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                      <p className="text-8xl mb-4">🥲</p>
                      <h2 className="text-3xl font-bold text-gray-700 mb-2">Page Not Found</h2>
                      <a href="/" style={{ color: '#2D5A27' }} className="underline text-sm mt-2">Go to Home</a>
                    </div>
                  } />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;