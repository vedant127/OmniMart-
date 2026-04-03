import { ArrowRight, Truck, ShieldCheck, Clock, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative bg-white pb-16">
      {/* Solid green hero block */}
      <section className="relative overflow-hidden w-full pb-20 pt-16 md:pt-24 bg-gradient-to-r from-[#2d6a2d] to-[#4CAF50]">
        
        {/* Background decorative circles on the right */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none">
          <div className="absolute right-[-10%] top-[-20%] w-[500px] h-[500px] rounded-full bg-white blur-3xl"></div>
          <div className="absolute right-[10%] bottom-[-20%] w-[400px] h-[400px] rounded-full bg-white blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 max-w-[1440px] relative z-10">
          <div className="flex flex-col items-start gap-6 max-w-2xl">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-sm border border-white/10">
              <Leaf className="w-3.5 h-3.5" />
              Fresh & Organic
            </div>
            
            <h1 
              className="text-4xl md:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight"
            >
              Fresh Groceries, <br />
              Delivered Fast
            </h1>
            
            <p className="text-lg md:text-[17px] text-white/90 leading-relaxed max-w-lg font-medium">
              Shop 100+ quality products across 7 categories. From farm-fresh produce to pantry staples — everything you need.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
              <Link
                to="/shop"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-[#2d6a2d] font-bold transition-all hover:bg-gray-50 hover:scale-[1.02]"
              >
                Shop Now <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link
                to="/fruits-veggies"
                className="w-full sm:w-auto flex items-center justify-center px-6 py-3 rounded-full font-bold transition-all border border-white/40 text-white hover:bg-white/10"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overlapping feature cards wrapper */}
      <div className="container mx-auto px-4 max-w-[1440px] relative z-20" style={{ marginTop: "-40px" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Free Delivery</h4>
              <p className="text-xs text-gray-500">Orders over $50</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Quality Guarantee</h4>
              <p className="text-xs text-gray-500">100% fresh</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Fast Delivery</h4>
              <p className="text-xs text-gray-500">Same day available</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Organic Options</h4>
              <p className="text-xs text-gray-500">Farm sourced</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
