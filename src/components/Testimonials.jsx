import { Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Amanda Brown",
    text: "The quality of organic produce from FreshCart is absolutely outstanding. Pellentesque risus blandit, healthy and so fresh every time!",
    rating: 5,
    avatar: "AB",
  },
  {
    name: "Rahul Sharma",
    text: "I've been ordering for 6 months and never been disappointed. The flash sales are amazing and delivery is always on time.",
    rating: 5,
    avatar: "RS",
  },
];

const Testimonials = () => (
  <section className="py-12 lg:py-16 bg-white">
    <div className="container mx-auto px-4 max-w-[1440px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span
            className="text-xs font-semibold uppercase tracking-wider text-[#2d6a2d]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            🌿 Note from our clients
          </span>
          <h2
            className="text-2xl md:text-3xl font-bold mt-1 text-gray-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            How we're making a difference, naturally
          </h2>
        </div>
        <div className="flex gap-2">
          {[ChevronLeft, ChevronRight].map((Icon, i) => (
            <button
              key={i}
              className="h-9 w-9 rounded-full border flex items-center justify-center transition hover:bg-gray-50"
              style={{ borderColor: "var(--border)" }}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl p-6 bg-white shadow-[0_2px_10px_rgb(0,0,0,0.06)] border border-gray-100"
          >
            <div className="flex gap-1 mb-3">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p
              className="text-sm leading-relaxed mb-4 text-gray-500"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              "{t.text}"
            </p>
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm bg-[#2d6a2d]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {t.avatar}
              </div>
              <span
                className="font-medium text-sm text-gray-900"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {t.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm transition bg-[#2d6a2d] text-white hover:bg-[#245324] hover:shadow-md"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          View all testimonials <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default Testimonials;
