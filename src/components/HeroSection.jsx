import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => (
  <section style={{ backgroundColor: "#003E29" }}>
    <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
      <div className="grid md:grid-cols-2 gap-8 items-center">

        {/* Left: Text + CTA */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65 }}
          className="flex flex-col gap-6"
        >
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Order groceries for delivery<br />
            or pickup today
          </h1>


        </motion.div>

        {/* Right: Food image */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex justify-center"
        >
          <img
            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=700&h=400&dpr=1"
            alt="Fresh Groceries"
            className="w-full object-cover"
            style={{
              borderRadius: "16px",
              maxHeight: "260px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          />
        </motion.div>

      </div>
    </div>
  </section>
);

export default HeroSection;
