import HeroSection from "../components/HeroSection";
import Categories from "../components/Categories";
import FlashSales from "../components/FlashSales";
import Testimonials from "../components/Testimonials";
import { motion } from "framer-motion";

const HomePage = () => (
  <div>
    <HeroSection />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <Categories />
    </motion.div>

    {/* Spacer to guarantee visual gap between Categories and Products */}
    <div className="h-8 md:h-12"></div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <FlashSales />
    </motion.div>

    <Testimonials />
  </div>
);

export default HomePage;
