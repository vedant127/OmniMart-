import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => (
  <section style={{ backgroundColor: "#EAF2E9", overflow: "hidden" }}>
    <div className="container mx-auto px-4 py-12 lg:py-20">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{ backgroundColor: "var(--card)", boxShadow: "var(--shadow-card)" }}
          >
            <span className="text-xs font-medium" style={{ color: "var(--primary)", fontFamily: "'DM Sans', sans-serif" }}>
              🌿 Your Trusted Source for Natural Living
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight uppercase"
            style={{ fontFamily: "'Playfair Display', serif", color: "#1A1A1A" }}
          >
            EMBRACE WELLNESS <br />
            WITH EVERY <span style={{ color: "#8B9A2E", fontStyle: "italic", fontFamily: "serif" }}>NATURAL</span> <br />
            PRODUCT
          </h1>

          <p
            className="text-sm max-w-sm leading-relaxed"
            style={{ color: "#666", fontFamily: "'DM Sans', sans-serif" }}
          >
            Lorem ipsum dolor sit amet consectetur. Vitae cras ornare <br />
            lorem orci nisi accumsan ultricies. Consectetur.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-sm transition hover:opacity-90"
              style={{
                backgroundColor: "#A43321",
                color: "#FFFFFF",
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: "0 4px 14px rgba(164,51,33,0.3)",
              }}
            >
              Shop now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-sm transition hover:bg-white/50"
              style={{
                border: "1px solid #2C5F1E",
                color: "#2C5F1E",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              View All Products
            </Link>
          </div>

          {/* Dots */}
          <div className="flex gap-2 mt-12">
            <span className="h-2 w-6 rounded-full" style={{ backgroundColor: "#2C5F1E" }} />
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#D1D1D1" }} />
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#D1D1D1" }} />
          </div>
        </motion.div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center relative"
        >
          <div className="relative z-10">
            <img 
              src="/images/hero_man.png" 
              alt="Fresh Produce" 
              className="w-full h-auto max-w-2xl transform scale-110 translate-y-8"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
