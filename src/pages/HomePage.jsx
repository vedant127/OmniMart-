import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Categories from "../components/Categories";
import FlashSales from "../components/FlashSales";
import Testimonials from "../components/Testimonials";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="space-y-4 md:space-y-0">
    <HeroSection />
    
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <Features />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <Categories />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <FlashSales />
    </motion.div>

    {/* Promo Banner */}
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl overflow-hidden grid md:grid-cols-2 shadow-2xl"
          style={{ backgroundColor: "var(--primary)" }}
        >
          <div className="p-8 md:p-12">
            <span
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "var(--primary-foreground)" }}
            >
              Special Offer for New Members
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mb-2 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: "var(--primary-foreground)" }}
            >
              Get 20% Off Your First Order!
            </h2>
            <p className="text-lg mb-6" style={{ color: "rgba(255,255,255,0.9)", fontFamily: "'Playfair Display', serif" }}>
              Use code <span className="font-bold underline decoration-accent">FRESH20</span> at checkout
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm transition hover:scale-105 active:scale-95 shadow-xl"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--accent-foreground)",
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
              }}
            >
              Claim Offer <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-center p-8 bg-black/5">
            <motion.span 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-[120px]"
            >
              🎁
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
    <Testimonials />
  </div>
);

export default HomePage;
