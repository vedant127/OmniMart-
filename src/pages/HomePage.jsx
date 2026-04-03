import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import FlashSales from "../components/FlashSales";
import Testimonials from "../components/Testimonials";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PromoBanner = () => (
  <section className="py-12 md:py-16">
    <div className="container mx-auto px-4 max-w-[1440px]">
      <div className="bg-[#eff5ec] rounded-[20px] p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-green-100">
        <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
          <h2 className="text-[22px] font-bold text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="text-2xl">🛒</span> Get 20% Off Your First Order
          </h2>
          <p className="text-[13px] text-gray-500 font-medium">
            Use code <span className="text-[#3cb065] font-bold tracking-wide">FRESH20</span> at checkout.
          </p>
        </div>
        <Link
          to="/shop"
          className="shrink-0 px-6 py-2.5 bg-[#3cb065] text-white text-[14px] font-bold rounded-full transition-all hover:bg-[#2c984f] hover:scale-105 flex items-center gap-2"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Start Shopping <span className="text-lg leading-none">→</span>
        </Link>
      </div>
    </div>
  </section>
);

const HomePage = () => (
  <div className="bg-white">
    <HeroSection />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="py-12 md:py-16"
    >
      <Categories />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="pb-12 md:pb-16 bg-[#f8fcf5]/50 border-y"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="pt-12 md:pt-16">
        <FlashSales />
      </div>
    </motion.div>

    <PromoBanner />

    <Testimonials />
  </div>
);

export default HomePage;
