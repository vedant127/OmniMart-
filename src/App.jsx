import React, { useState, useRef, useEffect, useMemo } from 'react';

// --- DATA ---
const categoriesData = [
  { id: "fresh-bakery", name: "Fresh Bakery", count: 8, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80" },
  { id: "fresh-fruits", name: "Fresh Fruits", count: 9, image: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=400&q=80" },
  { id: "healthy-beverages", name: "Healthy Beverages", count: 8, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80" },
  { id: "pure-dairy", name: "Pure Dairy", count: 8, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80" },
  { id: "vital-vegetables", name: "Vital Vegetables", count: 9, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80" },
  { id: "special-offers", name: "Special Offers", count: 15, image: "https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=400&q=80" },
  { id: "pantry-staples", name: "Pantry Staples", count: 7, image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400&q=80" }
];

const productsData = [
  // Fresh Fruits
  { id: 1, name: "Kiwi Fruit (6pc)", category: "fresh-fruits", catLabel: "Fresh Fruits", price: 199, originalPrice: 220, rating: 4.8, unit: "6 PC", desc: "Fresh sweet kiwis", img: "https://images.unsplash.com/photo-1618897996318-5a901fa46e22?w=400&q=80" },
  { id: 2, name: "Fresh Pineapple", category: "fresh-fruits", catLabel: "Fresh Fruits", price: 150, originalPrice: 180, rating: 4.7, unit: "1 PC", desc: "Tropical sweet pineapple", img: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&q=80" },
  { id: 3, name: "Fresh Grapes", category: "fresh-fruits", catLabel: "Fresh Fruits", price: 140, originalPrice: 175, rating: 4.9, unit: "500G", desc: "Seedless green grapes", img: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&q=80" },
  { id: 4, name: "Navel Oranges", category: "fresh-fruits", catLabel: "Fresh Fruits", price: 90, originalPrice: 108, rating: 4.6, unit: "1 KG", desc: "Juicy premium oranges", img: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400&q=80" },
  { id: 5, name: "Blueberry Pack 250g", category: "fresh-fruits", catLabel: "Fresh Fruits", price: 320, originalPrice: 360, rating: 4.8, unit: "250G", desc: "Fresh organic blueberries", img: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&q=80" },
  { id: 6, name: "Alphonso Mangoes", category: "fresh-fruits", catLabel: "Fresh Fruits", price: 280, originalPrice: 320, discount: 10, rating: 4.9, unit: "500G", desc: "Premium sweet mangoes", img: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&q=80" },
  { id: 7, name: "Strawberry Pack", category: "fresh-fruits", catLabel: "Fresh Fruits", price: 180, originalPrice: 210, rating: 4.7, unit: "250G", desc: "Farm fresh strawberries", img: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&q=80" },
  { id: 8, name: "Banana Dozen", category: "fresh-fruits", catLabel: "Fresh Fruits", price: 60, originalPrice: 70, discount: 10, rating: 4.5, unit: "12 PC", desc: "Ripe yellow bananas", img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80" },
  { id: 9, name: "Dragon Fruit", category: "fresh-fruits", catLabel: "Fresh Fruits", price: 350, originalPrice: 400, rating: 4.8, unit: "1 PC", desc: "Exotic pink dragon fruit", img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80" },
  // Vital Vegetables
  { id: 10, name: "Mixed Greens", category: "vital-vegetables", catLabel: "Vital Vegetables", price: 120, originalPrice: 140, rating: 4.6, unit: "200G", desc: "Fresh salad mixed greens", img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80" },
  { id: 11, name: "Broccoli Head", category: "vital-vegetables", catLabel: "Vital Vegetables", price: 95, originalPrice: 110, rating: 4.7, unit: "1 PC", desc: "Organic green broccoli", img: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&q=80" },
  { id: 12, name: "Purple Cabbage", category: "vital-vegetables", catLabel: "Vital Vegetables", price: 75, originalPrice: 90, discount: 14, rating: 4.5, unit: "1 PC", desc: "Fresh purple cabbage", img: "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=400&q=80" },
  { id: 13, name: "Baby Spinach", category: "vital-vegetables", catLabel: "Vital Vegetables", price: 110, originalPrice: 130, rating: 4.8, unit: "150G", desc: "Washed baby spinach", img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80" },
  { id: 14, name: "Cherry Tomatoes", category: "vital-vegetables", catLabel: "Vital Vegetables", price: 130, originalPrice: 150, rating: 4.7, unit: "250G", desc: "Sweet red cherry tomatoes", img: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&q=80" },
  { id: 15, name: "Bell Peppers Mix", category: "vital-vegetables", catLabel: "Vital Vegetables", price: 160, originalPrice: 190, rating: 4.6, unit: "3 PC", desc: "Red, yellow, green peppers", img: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&q=80" },
  { id: 16, name: "Zucchini 2pc", category: "vital-vegetables", catLabel: "Vital Vegetables", price: 85, originalPrice: 100, rating: 4.4, unit: "2 PC", desc: "Fresh green zucchini", img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&q=80" },
  { id: 17, name: "Carrot Bundle", category: "vital-vegetables", catLabel: "Vital Vegetables", price: 55, originalPrice: 65, rating: 4.6, unit: "500G", desc: "Crunchy orange carrots", img: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&q=80" },
  { id: 18, name: "Sweet Corn 4pc", category: "vital-vegetables", catLabel: "Vital Vegetables", price: 70, originalPrice: 85, rating: 4.5, unit: "4 PC", desc: "Fresh sweet corn cobs", img: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&q=80" },
  // Pure Dairy
  { id: 19, name: "Full Cream Milk 1L", category: "pure-dairy", catLabel: "Pure Dairy", price: 65, originalPrice: 75, rating: 4.7, unit: "1 L", desc: "Farm fresh whole milk", img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80" },
  { id: 20, name: "Greek Yogurt 400g", category: "pure-dairy", catLabel: "Pure Dairy", price: 120, originalPrice: 140, rating: 4.8, unit: "400G", desc: "Thick plain greek yogurt", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80" },
  { id: 21, name: "Salted Butter 100g", category: "pure-dairy", catLabel: "Pure Dairy", price: 55, originalPrice: 65, rating: 4.6, unit: "100G", desc: "Classic salted butter", img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80" },
  { id: 22, name: "Paneer 200g", category: "pure-dairy", catLabel: "Pure Dairy", price: 95, originalPrice: 110, rating: 4.9, unit: "200G", desc: "Soft cottage cheese blocks", img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80" },
  { id: 23, name: "Cheddar Cheese 200g", category: "pure-dairy", catLabel: "Pure Dairy", price: 180, originalPrice: 210, rating: 4.7, unit: "200G", desc: "Aged sharp cheddar", img: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=80" },
  { id: 24, name: "Cream Cheese 150g", category: "pure-dairy", catLabel: "Pure Dairy", price: 145, originalPrice: 170, rating: 4.6, unit: "150G", desc: "Smooth cream cheese", img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80" },
  { id: 25, name: "Amul Dahi 400g", category: "pure-dairy", catLabel: "Pure Dairy", price: 48, originalPrice: 55, rating: 4.8, unit: "400G", desc: "Fresh set curd dahi", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80" },
  { id: 26, name: "Fresh Cream 200ml", category: "pure-dairy", catLabel: "Pure Dairy", price: 75, originalPrice: 90, rating: 4.5, unit: "200ML", desc: "Rich low fat cream", img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80" },
  // Healthy Beverages
  { id: 27, name: "Cold Brew Coffee", category: "healthy-beverages", catLabel: "Healthy Beverages", price: 220, originalPrice: 260, rating: 4.8, unit: "300ML", desc: "Steeped cold brew coffee", img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80" },
  { id: 28, name: "Fresh Orange Juice 1L", category: "healthy-beverages", catLabel: "Healthy Beverages", price: 140, originalPrice: 165, rating: 4.7, unit: "1 L", desc: "100% natural orange juice", img: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80" },
  { id: 29, name: "Green Smoothie", category: "healthy-beverages", catLabel: "Healthy Beverages", price: 180, originalPrice: 210, rating: 4.6, unit: "300ML", desc: "Kiwi apple spinach smoothie", img: "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&q=80" },
  { id: 30, name: "Coconut Water 500ml", category: "healthy-beverages", catLabel: "Healthy Beverages", price: 85, originalPrice: 100, rating: 4.9, unit: "500ML", desc: "Natural tender coconut water", img: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&q=80" },
  { id: 31, name: "Almond Milk 1L", category: "healthy-beverages", catLabel: "Healthy Beverages", price: 195, originalPrice: 230, rating: 4.7, unit: "1 L", desc: "Unsweetened pure almond milk", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" },
  { id: 32, name: "Kombucha Ginger", category: "healthy-beverages", catLabel: "Healthy Beverages", price: 165, originalPrice: 195, rating: 4.5, unit: "330ML", desc: "Probiotic ginger kombucha", img: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80" },
  { id: 33, name: "Mango Lassi 300ml", category: "healthy-beverages", catLabel: "Healthy Beverages", price: 75, originalPrice: 90, rating: 4.8, unit: "300ML", desc: "Sweet authentic mango lassi", img: "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&q=80" },
  { id: 34, name: "Herbal Green Tea", category: "healthy-beverages", catLabel: "Healthy Beverages", price: 120, originalPrice: 145, rating: 4.6, unit: "25 BAGS", desc: "Organic detox green tea", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" },
  // Fresh Bakery
  { id: 35, name: "Sourdough Loaf", category: "fresh-bakery", catLabel: "Fresh Bakery", price: 180, originalPrice: 210, rating: 4.9, unit: "400G", desc: "Artisan baked sourdough", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80" },
  { id: 36, name: "Multigrain Bread", category: "fresh-bakery", catLabel: "Fresh Bakery", price: 95, originalPrice: 110, rating: 4.7, unit: "400G", desc: "Healthy whole multigrain", img: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=400&q=80" },
  { id: 37, name: "Butter Croissant", category: "fresh-bakery", catLabel: "Fresh Bakery", price: 65, originalPrice: 80, rating: 4.8, unit: "1 PC", desc: "Flaky french butter croissant", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80" },
  { id: 38, name: "Cinnamon Rolls 4pc", category: "fresh-bakery", catLabel: "Fresh Bakery", price: 145, originalPrice: 175, discount: 14, rating: 4.9, unit: "4 PC", desc: "Sweet glazed cinnamon rolls", img: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400&q=80" },
  { id: 39, name: "Whole Wheat Pita", category: "fresh-bakery", catLabel: "Fresh Bakery", price: 75, originalPrice: 90, rating: 4.5, unit: "4 PC", desc: "Soft whole wheat pita bread", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80" },
  { id: 40, name: "Bagel Pack 4pc", category: "fresh-bakery", catLabel: "Fresh Bakery", price: 120, originalPrice: 145, rating: 4.6, unit: "4 PC", desc: "Classic plain baked bagels", img: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=400&q=80" },
  { id: 41, name: "Banana Bread", category: "fresh-bakery", catLabel: "Fresh Bakery", price: 160, originalPrice: 190, rating: 4.8, unit: "350G", desc: "Soft homemade banana bread", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80" },
  { id: 42, name: "Focaccia Herb", category: "fresh-bakery", catLabel: "Fresh Bakery", price: 195, originalPrice: 230, rating: 4.7, unit: "300G", desc: "Italian herb focaccia bread", img: "https://images.unsplash.com/photo-1509509965178-a06b50a5038e?w=400&q=80" }
];

const testimonialsData = [
  { name: "Amanda Brown", initials: "AB", quote: "The quality of organic produce from FreshCart is absolutely outstanding. Pellentesque risus blandit, healthy and so fresh every time!", stars: 5 },
  { name: "Rahul Sharma", initials: "RS", quote: "I've been ordering for 6 months and never been disappointed. The flash sales are amazing and delivery is always on time.", stars: 5 }
];

// --- ICONS (SVG inline) ---
const SearchIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const CartIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>;
const HeartIcon = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
const StarIcon = ({ filled }) => <svg width="12" height="12" fill={filled ? "#f59e0b" : "currentColor"} className={filled ? "text-amber-500" : "text-gray-300"} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
const ChevronLeft = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>;
const ChevronRight = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>;
const XIcon = () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>;

// --- MAIN APP ---
export default function App() {
  const [currentPage, setCurrentPage] = useState("home"); // home, shop, product, payment, success
  const [currentCategory, setCurrentCategory] = useState("all");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const navigate = (page, params = {}) => {
    setCurrentPage(page);
    if (params.category) setCurrentCategory(params.category);
    if (params.product) setSelectedProduct(params.product);
  };

  const addToCart = (product) => {
    setCartItems(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id, newQty) => {
    if (newQty < 1) setCartItems(prev => prev.filter(i => i.id !== id));
    else setCartItems(prev => prev.map(i => i.id === id ? { ...i, qty: newQty } : i));
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="min-h-screen text-gray-800 font-sans" style={{ scrollBehavior: 'smooth' }}>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">
          <button onClick={() => navigate("home")} className="flex items-center gap-2 text-2xl font-bold">
            <span>🥦</span>
            <span className="text-gray-900 tracking-tight">Grocery<span className="text-[#2d6a2d]">Mart</span></span>
          </button>
          
          <nav className="hidden md:flex items-center gap-6 font-medium text-sm text-gray-600">
            <button onClick={() => navigate("home")} className="hover:text-[#2d6a2d] transition-colors">Home</button>
            <button onClick={() => navigate("shop", { category: "all" })} className="hover:text-[#2d6a2d] transition-colors">Shop</button>
            <button onClick={() => navigate("shop", { category: "fresh-fruits" })} className="hover:text-[#2d6a2d] transition-colors">Fruits & Veggies</button>
            <button onClick={() => navigate("shop", { category: "pure-dairy" })} className="hover:text-[#2d6a2d] transition-colors">Dairy</button>
            <button onClick={() => navigate("shop", { category: "healthy-beverages" })} className="hover:text-[#2d6a2d] transition-colors">Beverages</button>
          </nav>
          
          <div className="flex items-center gap-4 text-gray-600">
            <button onClick={() => navigate("shop", { category: "all" })} className="hover:text-[#2d6a2d]"><SearchIcon /></button>
            <button onClick={() => setIsCartOpen(true)} className="relative hover:text-[#2d6a2d]">
              <CartIcon />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#2d6a2d] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* VIEWS */}
      <main>
        {currentPage === "home" && <HomePage navigate={navigate} />}
        {currentPage === "shop" && <ShopPage currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} navigate={navigate} addToCart={addToCart} />}
        {currentPage === "product" && <ProductDetailPage product={selectedProduct} navigate={navigate} addToCart={addToCart} />}
        {currentPage === "payment" && <PaymentPage total={cartTotal} navigate={navigate} setCartItems={setCartItems} />}
        {currentPage === "success" && <SuccessPage navigate={navigate} addToCart={addToCart} />}
      </main>

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="font-bold text-lg text-gray-900">Your Cart ({cartCount})</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-600"><XIcon /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col flex-1 items-center justify-center text-gray-400">
                  <div className="text-5xl mb-3">🛒</div>
                  <p className="font-medium">Your cart is empty</p>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                    <img src={item.img} className="w-16 h-16 rounded-lg object-cover" alt={item.name} />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm text-gray-900 leading-tight">{item.name}</h4>
                        <button onClick={() => updateQty(item.id, 0)} className="text-gray-400 hover:text-red-500 text-xs">✕</button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-200 rounded-md bg-white">
                          <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-2 py-0.5 hover:bg-gray-50 text-gray-600">−</button>
                          <span className="text-xs font-bold w-6 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-2 py-0.5 hover:bg-gray-50 text-gray-600">+</button>
                        </div>
                        <span className="font-bold text-[#2d6a2d]">₹{item.price * item.qty}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="text-xl font-bold text-gray-900">₹{cartTotal}</span>
                </div>
                <button 
                  onClick={() => { setIsCartOpen(false); navigate("payment"); }}
                  className="w-full bg-[#2d6a2d] text-white font-bold py-3.5 rounded-xl hover:bg-[#205120] transition-colors"
                >
                  Proceed to Checkout →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html:`
        @keyframes slide-in-right { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-slide-in-right { animation: slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
}

// --- FULL PAGES COMPONENTS ---
function HomePage({ navigate }) {
  const scrollRef = useRef(null);
  
  return (
    <>
      <section className="bg-gradient-to-r from-[#1e5c1e] to-[#4CAF50] py-16 text-center text-white p-4">
        <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm mb-6 border border-white/30">🌿 Fresh & Organic</div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Fresh Groceries, Delivered Fast</h1>
        <p className="max-w-2xl mx-auto text-green-50 font-medium md:text-lg mb-8 leading-relaxed">Shop 100+ quality products across 7 categories. From farm-fresh produce to pantry staples — everything you need.</p>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {["🚚 Free Delivery (Orders over $50)", "✅ Quality Guarantee (100% fresh)", "⏱ Fast Delivery (Same day available)", "🌱 Organic Options (Farm sourced)"].map((pill, i) => (
            <div key={i} className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-bold shadow-md">{pill}</div>
          ))}
        </div>
      </section>

      <section className="py-12 bg-white container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
            <p className="text-gray-500 font-medium">Browse our 7 curated categories</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scrollRef.current.scrollBy({ left: -250, behavior: 'smooth' })} className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-50"><ChevronLeft/></button>
            <button onClick={() => scrollRef.current.scrollBy({ left: 250, behavior: 'smooth' })} className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-50"><ChevronRight/></button>
          </div>
        </div>
        <div ref={scrollRef} className="flex overflow-x-auto gap-4 hide-scrollbar snap-x pb-4">
          {categoriesData.map(c => (
            <div key={c.id} onClick={() => navigate("shop", { category: c.id })} className="relative shrink-0 w-[220px] h-[170px] rounded-xl overflow-hidden group cursor-pointer snap-start shadow-sm">
              <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                <span className="text-white font-bold tracking-wide">{c.name}</span>
                <span className="text-white/80 text-xs font-medium">{c.count} products</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Featured Products</h2>
          <p className="text-gray-500 font-medium mb-6">Handpicked deals and favorites</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {productsData.slice(0, 4).map(p => <ProductCard key={p.id} product={p} navigate={navigate} addToCart={() => {}} />)}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white container mx-auto px-4 max-w-7xl">
        <div className="bg-[#f0faf0] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#d2eed2]">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">🛒 Get 20% Off Your First Order</h3>
            <p className="text-gray-600 font-medium">Use code <span className="text-[#2d6a2d] font-bold">FRESH20</span> at checkout.</p>
          </div>
          <button onClick={() => navigate("shop", { category: "all" })} className="bg-[#2d6a2d] text-white px-6 py-3 rounded-full font-bold hover:bg-[#205120] transition whitespace-nowrap">
            Start Shopping →
          </button>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <span className="text-xs font-bold text-[#2d6a2d] tracking-wide uppercase mb-2 block">🌿 NOTE FROM OUR CLIENTS</span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">How we're making a difference, naturally</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {testimonialsData.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-3">{[...Array(5)].map((_,j)=><StarIcon key={j} filled />)}</div>
                <p className="text-gray-600 font-medium italic mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2d6a2d] text-white font-bold flex items-center justify-center text-sm">{t.initials}</div>
                  <span className="font-bold text-gray-900">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 bg-green-100 text-[#2d6a2d] px-6 py-2.5 rounded-full font-bold hover:bg-green-200 transition">
            View all testimonials →
          </button>
        </div>
      </section>
    </>
  );
}

function ShopPage({ currentCategory, setCurrentCategory, navigate, addToCart }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let res = productsData;
    if (currentCategory !== "all") {
      if (currentCategory === "fresh-fruits") {
        res = res.filter(p => p.category === "fresh-fruits" || p.category === "vital-vegetables");
      } else {
        res = res.filter(p => p.category === currentCategory);
      }
    }
    if (search) {
      res = res.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (sort === "low") res.sort((a,b) => a.price - b.price);
    if (sort === "high") res.sort((a,b) => b.price - a.price);
    if (sort === "rating") res.sort((a,b) => b.rating - a.rating);
    return res;
  }, [currentCategory, search, sort]);

  const pills = [
    { id: "all", label: "All" },
    { id: "fresh-bakery", label: "Fresh Bakery" },
    { id: "fresh-fruits", label: "Fresh Fruits" },
    { id: "healthy-beverages", label: "Healthy Beverages" },
    { id: "pure-dairy", label: "Pure Dairy" },
    { id: "vital-vegetables", label: "Vital Vegetables" }
  ];

  return (
    <div className="bg-white pb-16">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">All Products</h1>
        <p className="text-gray-500 font-medium mb-6">{filtered.length} products found</p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <span className="absolute left-3 top-2.5 text-gray-400"><SearchIcon/></span>
            <input type="text" placeholder="Search products..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-[#2d6a2d] text-sm font-medium" />
          </div>
          <select value={sort} onChange={e=>setSort(e.target.value)} className="px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:border-[#2d6a2d] text-sm font-medium bg-white">
            <option value="default">Relevance</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {pills.map(p => (
            <button 
              key={p.id} 
              onClick={() => setCurrentCategory(p.id)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${currentCategory === p.id ? 'bg-[#2d6a2d] text-white' : 'bg-[#f3f4f6] text-[#374151] hover:bg-gray-200'}`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400 font-medium border-2 border-dashed border-gray-200 rounded-xl">
            No products found. Try a different search or category.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map(p => <ProductCard key={p.id} product={p} navigate={navigate} addToCart={addToCart} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product, navigate, addToCart }) {
  return (
    <div 
      onClick={() => navigate("product", { product })}
      className="group bg-white border border-[#f0f0f0] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer flex flex-col"
    >
      <div className="relative h-[180px] bg-gray-50 flex items-center justify-center overflow-hidden">
        {product.discount > 0 && <span className="absolute top-2 left-2 bg-[#ef4444] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm z-10">{product.discount}% OFF</span>}
        <button className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm z-10 hover:scale-105"><HeartIcon/></button>
        <img src={product.img} alt={product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-3.5 flex flex-col flex-1">
        <span className="text-[10px] uppercase font-bold text-[#2d6a2d] tracking-widest leading-none mb-1.5">{product.catLabel}</span>
        <h3 className="font-bold text-sm text-gray-900 mb-1 leading-tight group-hover:text-[#2d6a2d] transition-colors">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          <StarIcon filled /><span className="text-xs font-bold text-gray-600 leading-none mt-0.5">{product.rating}</span>
        </div>
        <div className="flex items-end gap-1.5 mb-3 mt-auto">
          <span className="text-lg font-bold text-gray-900 leading-none">₹{product.price}</span>
          {product.originalPrice && <span className="text-xs line-through text-gray-400 leading-none mb-0.5">₹{product.originalPrice}</span>}
        </div>
        <p className="text-[11px] text-gray-500 line-clamp-1 mb-3">{product.desc}</p>
        <button 
          onClick={e => { e.stopPropagation(); addToCart(product); }}
          className="w-full bg-[#2d6a2d] text-white py-2 rounded-lg text-xs font-bold hover:bg-[#205120] transition"
        >
          🛒 ADD TO CART
        </button>
      </div>
    </div>
  );
}

function ProductDetailPage({ product, navigate, addToCart }) {
  if (!product) return null;
  const similar = useMemo(() => productsData.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4), [product]);

  return (
    <div className="bg-white pb-16">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <button onClick={() => navigate("shop")} className="text-sm font-bold text-[#2d6a2d] mb-6 hover:underline">← Back to Shop</button>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start mb-16">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex items-center justify-center relative">
            {product.discount > 0 && <span className="absolute top-4 left-4 bg-[#ef4444] text-white text-xs font-bold px-2 py-1 rounded shadow-sm">{product.discount}% OFF</span>}
            <img src={product.img} alt={product.name} className="w-[80%] aspect-square object-cover mix-blend-multiply" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs uppercase font-bold text-[#2d6a2d] tracking-widest mb-2">{product.catLabel}</span>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
            <div className="flex items-center gap-1 mb-4"><StarIcon filled /><span className="text-sm font-bold text-gray-600 ml-1">{product.rating} Rating</span></div>
            <div className="flex items-end gap-3 mb-6">
              <span className="text-4xl font-black text-gray-900 leading-none">₹{product.price}</span>
              {product.originalPrice && <span className="text-lg line-through text-gray-400 leading-none pb-1">₹{product.originalPrice}</span>}
            </div>
            <p className="text-gray-600 mb-6">{product.desc}. Perfectly sourced and kept fresh for your daily needs.</p>
            <div className="bg-[#f0faf0] text-[#2d6a2d] px-4 py-3 rounded-lg text-sm font-bold flex items-center gap-2 mb-8 border border-[#d2eed2]">
              ✅ Free delivery on orders over ₹500 | 🌿 100% Fresh
            </div>
            <div className="flex gap-4">
              <button onClick={() => addToCart(product)} className="flex-1 border-2 border-[#2d6a2d] text-[#2d6a2d] py-3.5 rounded-xl font-bold hover:bg-green-50 transition">Add to Cart</button>
              <button onClick={() => { addToCart(product); navigate("payment"); }} className="flex-1 bg-[#2d6a2d] text-white py-3.5 rounded-xl font-bold hover:bg-[#205120] transition shadow-md">Buy Now →</button>
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Similar Products</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {similar.map(p => (
                <div key={p.id} onClick={() => navigate("product", { product: p })} className="group cursor-pointer border border-[#f0f0f0] rounded-xl overflow-hidden hover:shadow-md bg-white">
                  <div className="h-[120px] bg-gray-50 flex items-center justify-center"><img src={p.img} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition" /></div>
                  <div className="p-3">
                    <h4 className="font-bold text-sm truncate mb-1">{p.name}</h4>
                    <div className="flex justify-between items-center"><span className="font-bold text-[#2d6a2d]">₹{p.price}</span><button onClick={e=>{e.stopPropagation();addToCart(p)}} className="text-[10px] bg-[#2d6a2d] text-white px-2 py-1 rounded font-bold">ADD</button></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PaymentPage({ total, navigate, setCartItems }) {
  const [method, setMethod] = useState("card"); // card, upi, cod
  if (total === 0) return <div className="p-20 text-center text-red-500 font-bold">Cart is empty! <button onClick={()=>navigate("shop")}>Go back</button></div>;

  return (
    <div className="bg-gray-50 min-h-[80vh] py-12">
      <div className="container mx-auto px-4 max-w-xl">
        <button onClick={() => navigate("shop")} className="text-sm font-bold text-gray-500 mb-6 hover:text-gray-900">← Back</button>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Complete Payment</h1>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100"><span className="font-bold text-gray-600">Total to pay</span><span className="text-2xl font-black text-[#2d6a2d]">₹{total}</span></div>
          <div className="flex gap-2 mb-6">
            {[{id:"card", l:"💳 Card"},{id:"upi", l:"📱 UPI"},{id:"cod", l:"📦 COD"}].map(m => (
              <button key={m.id} onClick={()=>setMethod(m.id)} className={`flex-1 py-2.5 rounded-lg border font-bold text-sm transition ${method === m.id ? 'bg-[#f0faf0] border-[#2d6a2d] text-[#2d6a2d]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{m.l}</button>
            ))}
          </div>

          {method === "card" && (
            <div className="space-y-4">
              <input type="text" placeholder="Cardholder Name" className="w-full p-3 border rounded-lg outline-none focus:border-[#2d6a2d]" />
              <input type="text" maxLength="16" placeholder="Card Number" className="w-full p-3 border rounded-lg outline-none focus:border-[#2d6a2d]" />
              <div className="flex gap-4"><input type="text" placeholder="MM/YY" className="w-1/2 p-3 border rounded-lg outline-none focus:border-[#2d6a2d]" /><input type="password" maxLength="3" placeholder="CVV" className="w-1/2 p-3 border rounded-lg outline-none focus:border-[#2d6a2d]" /></div>
            </div>
          )}
          {method === "upi" && <input type="text" placeholder="Enter UPI ID (e.g. name@upi)" className="w-full p-3 border rounded-lg outline-none focus:border-[#2d6a2d]" />}
          {method === "cod" && <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg text-sm font-medium border border-yellow-200">Pay ₹{total} in cash when your order arrives. No extra charges.</div>}
        </div>

        <button 
          onClick={() => { setCartItems([]); navigate("success"); }}
          className="w-full bg-[#2d6a2d] text-white py-4 rounded-xl font-bold hover:bg-[#205120] transition shadow-md"
        >
          {method === 'cod' ? 'Confirm Order' : `Pay ₹${total} →`}
        </button>
      </div>
    </div>
  );
}

function SuccessPage({ navigate, addToCart }) {
  const suggestions = useMemo(() => productsData.sort(()=>Math.random()-0.5).slice(0, 4), []);

  return (
    <div className="bg-white min-h-[80vh] py-16 flex flex-col items-center">
      <div className="text-6xl mb-4">✅</div>
      <h1 className="text-3xl font-bold text-[#2d6a2d] mb-2">Order Placed Successfully!</h1>
      <p className="text-gray-600 font-medium mb-8">Estimated delivery: Today, 2–4 hours.</p>
      <button onClick={() => navigate("shop")} className="bg-[#2d6a2d] text-white px-8 py-3 rounded-full font-bold hover:bg-[#205120] transition mb-16">Continue Shopping</button>
      
      <div className="container mx-auto px-4 max-w-2xl w-full">
        <h3 className="text-xl font-bold text-gray-900 mb-4">You Might Also Like</h3>
        <div className="grid grid-cols-2 gap-4">
          {suggestions.map(p => (
            <div key={p.id} onClick={() => navigate("product", { product: p })} className="border border-gray-100 rounded-xl overflow-hidden flex flex-col bg-white shadow-sm hover:shadow-md cursor-pointer group">
              <div className="h-[120px] bg-gray-50"><img src={p.img} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition" /></div>
              <div className="p-3">
                <h4 className="font-bold text-sm truncate">{p.name}</h4>
                <div className="flex justify-between items-center mt-2"><span className="font-bold text-gray-900">₹{p.price}</span><button onClick={e=>{e.stopPropagation();addToCart(p)}} className="text-[10px] bg-[#2d6a2d] text-white px-2 py-1 rounded font-bold">Add to Cart</button></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}