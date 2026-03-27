import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Categories from "../components/Categories";
import FlashSales from "../components/FlashSales";
import Testimonials from "../components/Testimonials";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div>
    <HeroSection />
    <Features />
    <Categories />
    <FlashSales />

    {/* Promo Banner */}
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden grid md:grid-cols-2"
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
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ fontFamily: "'Playfair Display', serif", color: "var(--primary-foreground)" }}
            >
              Get 20% Off Your First Order!
            </h2>
            <p className="text-lg mb-3" style={{ color: "rgba(255,255,255,0.9)", fontFamily: "'Playfair Display', serif" }}>
              Use code <span className="font-bold">FRESH20</span> at checkout
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition hover:opacity-90"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--accent-foreground)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Claim Offer <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-center p-8">
            <span className="text-[120px]">🎁</span>
          </div>
        </motion.div>
      </div>
    </section>

    <Testimonials />
  </div>
);

export default HomePage;
