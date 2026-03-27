import { motion } from "framer-motion";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { useState } from "react";

const featuredPost = {
  title: "The Ultimate Guide to Seasonal Organic Fruits",
  excerpt: "Discover which organic fruits are at their peak each season and how to incorporate them into your daily diet for maximum health benefits.",
  date: "Mar 15, 2026",
  readTime: "8 min read",
  category: "Nutrition",
  emoji: "🍊",
};

const posts = [
  { title: "5 Benefits of Going Organic This Year", excerpt: "Learn why switching to organic produce can transform your health and support sustainable farming practices.", date: "Mar 10, 2026", readTime: "5 min", category: "Health", emoji: "🥦" },
  { title: "How to Store Fruits to Keep Them Fresh Longer", excerpt: "Simple storage tips that will help your organic fruits last longer and reduce food waste at home.", date: "Mar 5, 2026", readTime: "4 min", category: "Tips", emoji: "🍎" },
  { title: "Meet Our Partner Farmers: The Johnsons", excerpt: "A heartfelt story about the Johnson family farm and their 30-year journey into organic farming.", date: "Feb 28, 2026", readTime: "6 min", category: "Stories", emoji: "👨‍🌾" },
  { title: "Smoothie Recipes for a Healthy Morning", excerpt: "Start your day right with these 5 delicious organic fruit smoothie recipes packed with nutrients.", date: "Feb 20, 2026", readTime: "3 min", category: "Recipes", emoji: "🥤" },
  { title: "Understanding Organic Certification Labels", excerpt: "A comprehensive guide to different organic certification labels and what they actually mean for consumers.", date: "Feb 15, 2026", readTime: "7 min", category: "Education", emoji: "📋" },
  { title: "Top 10 Superfruits You Should Be Eating", excerpt: "These nutrient-dense superfruits can boost immunity, improve skin health, and increase energy levels.", date: "Feb 10, 2026", readTime: "5 min", category: "Nutrition", emoji: "🫐" },
];

const categories = ["All", "Nutrition", "Health", "Tips", "Recipes", "Stories", "Education"];

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16" style={{ backgroundColor: "var(--muted)" }}>
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}
          >
            Our <span style={{ color: "var(--primary)" }}>Blog</span>
          </motion.h1>
          <p className="max-w-xl mx-auto" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
            Tips, recipes, and stories from the world of organic living.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="container mx-auto px-4 py-4 flex items-center gap-3 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="text-sm px-4 py-2 rounded-full whitespace-nowrap transition-colors"
              style={{
                backgroundColor: activeCategory === cat ? "var(--primary)" : "var(--muted)",
                color: activeCategory === cat ? "var(--primary-foreground)" : "var(--muted-foreground)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden grid md:grid-cols-2"
            style={{ backgroundColor: "var(--card)", boxShadow: "var(--shadow-card)" }}
          >
            <div className="flex items-center justify-center min-h-[280px]" style={{ backgroundColor: "var(--muted)" }}>
              <span className="text-8xl">{featuredPost.emoji}</span>
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <span
                className="inline-block text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4"
                style={{ backgroundColor: "rgba(44,95,30,0.1)", color: "var(--primary)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {featuredPost.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
                {featuredPost.title}
              </h2>
              <p className="mb-5" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm mb-5" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{featuredPost.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{featuredPost.readTime}</span>
              </div>
              <button
                className="w-fit inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition hover:opacity-90"
                style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "'DM Sans', sans-serif" }}
              >
                Read Article <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl overflow-hidden group cursor-pointer transition-shadow"
                style={{ backgroundColor: "var(--card)", boxShadow: "var(--shadow-card)" }}
              >
                <div className="h-48 flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundColor: "var(--muted)" }}>
                  <span className="text-6xl">{post.emoji}</span>
                </div>
                <div className="p-5">
                  <span
                    className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3"
                    style={{ backgroundColor: "rgba(44,95,30,0.1)", color: "var(--primary)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {post.category}
                  </span>
                  <h3
                    className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="text-sm mb-4 line-clamp-2"
                    style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
