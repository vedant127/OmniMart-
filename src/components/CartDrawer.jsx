import { useCart } from '../store/CartContext';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { isCartOpen, closeCart, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl flex flex-col transform transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#3cb065]" />
            Your Cart ({cartItems.length})
          </h2>
          <button 
            onClick={closeCart}
            className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium mb-4">Your cart is empty.</p>
              <button 
                onClick={closeCart}
                className="bg-[#2d6a2d] text-white px-6 py-2 rounded-full font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{item.weight}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-gray-50 text-gray-600 rounded-l-md"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-gray-50 text-gray-600 rounded-r-md"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-semibold text-[#2d6a2d]">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-600">Subtotal</span>
              <span className="text-xl font-bold text-gray-900">₹{cartTotal}</span>
            </div>
            <Link 
              to="/checkout" // or wherever
              onClick={closeCart}
              className="w-full block text-center bg-[#2d6a2d] text-white font-semibold py-3 rounded-full hover:bg-[#245324] transition-colors shadow-md"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
