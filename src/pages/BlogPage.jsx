import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { useState } from "react";

/* ─── Data ─────────────────────────────────────────────────────────────── */
const featuredPost = {
  title: "The Ultimate Guide to Seasonal Organic Fruits",
  excerpt:
    "Discover which organic fruits are at their peak each season and how to incorporate them into your daily diet for maximum health benefits. From juicy summer berries to crisp autumn apples, seasonal eating has never tasted so good.",
  date: "Mar 15, 2026",
  readTime: "8 min read",
  category: "NUTRITION",
  image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=900&q=80&auto=format&fit=crop",
};

const posts = [
  {
    title: "5 Benefits of Going Organic This Year",
    excerpt: "Learn why switching to organic produce can transform your health and support sustainable farming practices.",
    date: "Mar 10, 2026",
    readTime: "5 min",
    category: "HEALTH",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "How to Store Fruits to Keep Them Fresh Longer",
    excerpt: "Simple storage tips that will help your organic fruits last longer and reduce food waste at home.",
    date: "Mar 5, 2026",
    readTime: "4 min",
    category: "TIPS",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80&auto=format&fit=crop&crop=center",
  },
  {
    title: "Meet Our Partner Farmers: The Johnsons",
    excerpt: "A heartfelt story about the Johnson family farm and their 30-year journey into organic farming.",
    date: "Feb 28, 2026",
    readTime: "6 min",
    category: "STORIES",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Smoothie Recipes for a Healthy Morning",
    excerpt: "Start your day right with these 5 delicious organic fruit smoothie recipes packed with nutrients.",
    date: "Feb 20, 2026",
    readTime: "3 min",
    category: "RECIPES",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Understanding Organic Certification Labels",
    excerpt: "A comprehensive guide to different organic certification labels and what they actually mean for consumers.",
    date: "Feb 15, 2026",
    readTime: "7 min",
    category: "EDUCATION",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80&auto=format&fit=crop",
  },
  {
    title: "Top 10 Superfruits You Should Be Eating",
    excerpt: "These nutrient-dense superfruits can boost immunity, improve skin health, and increase energy levels.",
    date: "Feb 10, 2026",
    readTime: "5 min",
    category: "NUTRITION",
    image: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=600&q=80&auto=format&fit=crop",
  },
];

const categories = ["All", "Nutrition", "Health", "Tips", "Recipes", "Stories", "Education"];

/* ─── Inline Styles ─────────────────────────────────────────────────────── */
const styles = {
  /* Header */
  headerSection: {
    background: "linear-gradient(160deg, #f0f7ec 0%, #e8f5e2 50%, #f4faf1 100%)",
    padding: "80px 0 60px",
    textAlign: "center",
  },
  headerTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
    fontWeight: 800,
    color: "#1A1A1A",
    marginBottom: "12px",
    lineHeight: 1.15,
  },
  headerSubtitle: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "1.05rem",
    color: "#5A6E52",
    maxWidth: 500,
    margin: "0 auto 32px",
    lineHeight: 1.6,
  },
  /* Search */
  searchWrap: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    border: "1px solid #C8DCC0",
    borderRadius: 50,
    padding: "10px 20px",
    boxShadow: "0 4px 16px rgba(44,95,30,0.08)",
    maxWidth: 400,
    width: "100%",
  },
  searchInput: {
    border: "none",
    outline: "none",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9rem",
    color: "#1A1A1A",
    background: "transparent",
    width: "100%",
  },
  /* Category pills */
  pillsWrap: {
    display: "flex",
    gap: 10,
    overflowX: "auto",
    padding: "20px 0",
    scrollbarWidth: "none",
  },
  pill: (active) => ({
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.82rem",
    fontWeight: 600,
    padding: "7px 18px",
    borderRadius: 50,
    whiteSpace: "nowrap",
    cursor: "pointer",
    border: "1.5px solid",
    borderColor: active ? "#336B22" : "#C8DCC0",
    backgroundColor: active ? "#336B22" : "#ffffff",
    color: active ? "#ffffff" : "#4A5568",
    transition: "all 0.2s ease",
    letterSpacing: "0.02em",
  }),
  /* Featured post */
  featuredWrap: {
    borderRadius: 20,
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    boxShadow: "0 12px 40px rgba(0,0,0,0.10)",
    cursor: "pointer",
    position: "relative",
  },
  featuredImgWrap: {
    position: "relative",
    minHeight: 380,
    overflow: "hidden",
  },
  featuredImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  featuredGradient: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to right, rgba(0,0,0,0.25) 0%, transparent 100%)",
    pointerEvents: "none",
  },
  featuredContent: {
    padding: "44px 44px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  categoryTag: {
    display: "inline-block",
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    padding: "5px 12px",
    borderRadius: 50,
    backgroundColor: "rgba(51,107,34,0.1)",
    color: "#336B22",
    fontFamily: "'DM Sans', sans-serif",
    marginBottom: 16,
    width: "fit-content",
  },
  featuredTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
    fontWeight: 800,
    color: "#1A1A1A",
    lineHeight: 1.3,
    marginBottom: 14,
  },
  featuredExcerpt: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.92rem",
    color: "rgba(0,0,0,0.58)",
    lineHeight: 1.75,
    marginBottom: 24,
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: 18,
    fontSize: "0.8rem",
    color: "#7A8B72",
    fontFamily: "'DM Sans', sans-serif",
    marginBottom: 28,
  },
  readBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 26px",
    borderRadius: 50,
    backgroundColor: "#336B22",
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 700,
    fontSize: "0.85rem",
    border: "none",
    cursor: "pointer",
    width: "fit-content",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 16px rgba(51,107,34,0.3)",
  },
  /* Blog card */
  card: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
    cursor: "pointer",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    display: "flex",
    flexDirection: "column",
  },
  cardImgWrap: {
    overflow: "hidden",
    height: 210,
    flexShrink: 0,
  },
  cardImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.4s ease",
  },
  cardBody: {
    padding: "20px 22px 22px",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  cardTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "1.05rem",
    fontWeight: 700,
    color: "#1A1A1A",
    marginBottom: 8,
    lineHeight: 1.4,
    transition: "color 0.2s",
  },
  cardExcerpt: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.85rem",
    color: "rgba(0,0,0,0.58)",
    lineHeight: 1.65,
    marginBottom: 16,
    flexGrow: 1,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "0.75rem",
    color: "#8A9E82",
    fontFamily: "'DM Sans', sans-serif",
  },
  readMore: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: "0.8rem",
    fontWeight: 700,
    color: "#336B22",
    fontFamily: "'DM Sans', sans-serif",
    transition: "gap 0.2s",
  },
};

/* ─── Blog Card Component ───────────────────────────────────────────────── */
const BlogCard = ({ post, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      style={{
        ...styles.card,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 16px 40px rgba(0,0,0,0.13)"
          : "0 4px 20px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={styles.cardImgWrap}>
        <img
          src={post.image}
          alt={post.title}
          style={{
            ...styles.cardImg,
            transform: hovered ? "scale(1.07)" : "scale(1)",
          }}
          loading="lazy"
        />
      </div>

      {/* Body */}
      <div style={styles.cardBody}>
        {/* Category tag */}
        <span style={styles.categoryTag}>{post.category}</span>

        {/* Title */}
        <h3
          style={{
            ...styles.cardTitle,
            color: hovered ? "#336B22" : "#1A1A1A",
          }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p style={styles.cardExcerpt}>{post.excerpt}</p>

        {/* Footer row */}
        <div style={styles.cardFooter}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Calendar size={12} /> {post.date}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Clock size={12} /> {post.readTime}
            </span>
          </div>
          <span
            style={{
              ...styles.readMore,
              gap: hovered ? 8 : 4,
            }}
          >
            Read <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </motion.article>
  );
};

/* ─── Featured Post Component ───────────────────────────────────────────── */
const FeaturedPost = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        ...styles.featuredWrap,
        gridTemplateColumns: "55% 45%",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left – full-bleed image */}
      <div style={styles.featuredImgWrap}>
        <img
          src={featuredPost.image}
          alt={featuredPost.title}
          style={{
            ...styles.featuredImg,
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
        <div style={styles.featuredGradient} />
        {/* Editorial badge on image */}
        <span
          style={{
            position: "absolute",
            top: 22,
            left: 22,
            backgroundColor: "rgba(0,0,0,0.55)",
            color: "#fff",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            padding: "5px 12px",
            borderRadius: 50,
            fontFamily: "'DM Sans', sans-serif",
            backdropFilter: "blur(6px)",
          }}
        >
          ⭐ FEATURED
        </span>
      </div>

      {/* Right – content */}
      <div style={styles.featuredContent}>
        <span style={styles.categoryTag}>{featuredPost.category}</span>
        <h2 style={styles.featuredTitle}>{featuredPost.title}</h2>
        <p style={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
        <div style={styles.metaRow}>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Calendar size={14} /> {featuredPost.date}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Clock size={14} /> {featuredPost.readTime}
          </span>
        </div>
        <button
          style={{
            ...styles.readBtn,
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        >
          Read Article <ArrowRight size={15} />
        </button>
      </div>
    </motion.div>
  );
};

/* ─── Page ──────────────────────────────────────────────────────────────── */
const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = posts.filter((p) => {
    const matchCat =
      activeCategory === "All" ||
      p.category.toLowerCase() === activeCategory.toLowerCase();
    const matchQ =
      !query ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAFAF8" }}>

      {/* ── HEADER ───────────────────────────────────────────────────── */}
      <section style={styles.headerSection}>
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={styles.headerTitle}
          >
            Our{" "}
            <span style={{ color: "#336B22", fontStyle: "italic" }}>Blog</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            style={styles.headerSubtitle}
          >
            Tips, recipes, and stories from the world of organic living.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div style={styles.searchWrap}>
              <Search size={16} color="#7A8B72" />
              <input
                style={styles.searchInput}
                placeholder="Search articles…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORY PILLS ───────────────────────────────────────────── */}
      <section style={{ borderBottom: "1px solid #E4EEE0", backgroundColor: "#fff" }}>
        <div className="container mx-auto px-4">
          <div style={styles.pillsWrap}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={styles.pill(activeCategory === cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED POST ────────────────────────────────────────────── */}
      <section style={{ padding: "52px 0 36px" }}>
        <div className="container mx-auto px-4">
          <FeaturedPost />
        </div>
      </section>

      {/* ── POSTS GRID ───────────────────────────────────────────────── */}
      <section style={{ paddingBottom: 80 }}>
        <div className="container mx-auto px-4">
          {/* Section label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 28,
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "#336B22",
                textTransform: "uppercase",
              }}
            >
              Latest Articles
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                backgroundColor: "#E4EEE0",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.78rem",
                color: "#8A9E82",
              }}
            >
              {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          <AnimatePresence mode="sync">
            {filtered.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: 28,
                }}
              >
                {filtered.map((post, i) => (
                  <BlogCard key={post.title} post={post} index={i} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  textAlign: "center",
                  padding: "60px 0",
                  color: "#8A9E82",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <p style={{ fontSize: "2rem", marginBottom: 12 }}>🌿</p>
                <p style={{ fontSize: "1rem", fontWeight: 600 }}>No articles found</p>
                <p style={{ fontSize: "0.85rem", marginTop: 6 }}>
                  Try a different category or search term.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Responsive fix: featured card stacks on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .blog-featured > * {
            grid-template-columns: 1fr !important;
          }
          .blog-featured > * > div:first-child {
            min-height: 240px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BlogPage;
