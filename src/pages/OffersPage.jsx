import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Percent, Clock, ArrowRight, Tag, Zap, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/api";

const banners = [
  {
    title: "Spring Fresh Sale",
    subtitle: "Up to 40% OFF on seasonal fruits",
    desc: "Enjoy the freshest organic strawberries, blueberries, and mangoes at unbeatable prices this spring.",
    badge: "Limited Time",
    emoji: "🍓",
    bgColor: "var(--primary)",
    textColor: "var(--primary-foreground)",
    btnBg: "var(--accent)",
  },
  {
    title: "Bundle & Save",
    subtitle: "Buy 3 fruit baskets, get 1 FREE",
    desc: "Mix and match from our premium fruit baskets. Perfect for families and parties.",
    badge: "Best Value",
    emoji: "🧺",
    bgColor: "var(--accent)",
    textColor: "var(--accent-foreground)",
    btnBg: "var(--primary)",
  },
];

const perks = [
  { icon: Zap, title: "Flash Deals Daily", desc: "New surprise discounts every 24 hours" },
  { icon: Gift, title: "Free Delivery", desc: "On orders above ₹499 — no code needed" },
  { icon: Tag, title: "Member Discounts", desc: "Extra 10% off for registered members" },
];

const OffersPage = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await getProducts();
        const discountItems = (res.data || [])
          .filter(p => p.discount >= 15)
          .map(p => ({
            ...p,
            sale: `₹${p.price}`,
            original: `₹${Math.round(p.price / (1 - (p.discount / 100)))}`,
            emoji: (() => {
               const name = p.name.toLowerCase();
               if (name.includes("apple")) return "🍎";
               if (name.includes("berry")) return "🫐";
               if (name.includes("mango")) return "🥭";
               if (name.includes("straw")) return "🍓";
               if (name.includes("grape")) return "🍇";
               if (name.includes("orange")) return "🍊";
               if (name.includes("veg")) return "🥦";
               if (name.includes("milk")) return "🥛";
               if (name.includes("bread")) return "🥐";
               return "📦";
            })()
          }));
        setDeals(discountItems);
      } catch (err) {
        console.error("Failed to fetch offers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16" style={{ backgroundColor: "var(--muted)" }}>
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Percent className="h-6 w-6" style={{ color: "var(--accent)" }} />
              <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: "var(--accent)", fontFamily: "'DM Sans', sans-serif" }}>
                Special Offers
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
              Today's Best <span style={{ color: "var(--primary)" }}>Deals</span>
            </h1>
            <p className="max-w-xl mx-auto" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
              Save big on premium organic produce. Limited-time offers you don't want to miss!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Promo Banners */}
      <section className="py-12">
        <div className="container mx-auto px-4 space-y-6">
          {banners.map((banner, i) => (
            <motion.div
              key={banner.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden grid md:grid-cols-2"
              style={{ backgroundColor: banner.bgColor }}
            >
              <div className="p-8 md:p-12">
                <span
                  className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)", color: banner.textColor, fontFamily: "'DM Sans', sans-serif" }}
                >
                  {banner.badge}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: banner.textColor }}>
                  {banner.title}
                </h2>
                <p className="text-xl mb-3" style={{ fontFamily: "'Playfair Display', serif", color: `${banner.textColor}E6` }}>
                  {banner.subtitle}
                </p>
                <p className="text-sm mb-6 max-w-md" style={{ color: `${banner.textColor}B3`, fontFamily: "'DM Sans', sans-serif" }}>
                  {banner.desc}
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition hover:opacity-90"
                  style={{ backgroundColor: banner.btnBg, color: "white", fontFamily: "'DM Sans', sans-serif" }}
                >
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="hidden md:flex items-center justify-center p-8">
                <span className="text-[120px]">{banner.emoji}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hot Deals Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <Clock className="h-5 w-5" style={{ color: "var(--accent)" }} />
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
              Hot Deals
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
               Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-32 rounded-xl animate-pulse bg-gray-50 border" />
              ))
            ) : deals.map((deal, i) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl p-5 flex items-center gap-4 group transition-shadow"
                style={{ backgroundColor: "var(--card)", boxShadow: "var(--shadow-card)" }}
              >
                <div
                  className="w-20 h-20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform overflow-hidden"
                  style={{ backgroundColor: "var(--muted)" }}
                >
                  {deal.image_url ? (
                    <img src={deal.image_url} alt={deal.name} className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-4xl">{deal.emoji}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--foreground)" }}>
                    {deal.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-lg" style={{ color: "var(--primary)", fontFamily: "'DM Sans', sans-serif" }}>
                      {deal.sale}
                    </span>
                    <span className="text-sm line-through" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
                      {deal.original}
                    </span>
                  </div>
                </div>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0"
                  style={{ backgroundColor: "rgba(192,57,43,0.1)", color: "var(--accent)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  -{Math.round(deal.discount)}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Perks */}
      <section className="py-14" style={{ backgroundColor: "var(--muted)" }}>
        <div className="container mx-auto px-4 grid sm:grid-cols-3 gap-6">
          {perks.map((perk, i) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: "rgba(44,95,30,0.1)" }}>
                <perk.icon className="h-7 w-7" style={{ color: "var(--primary)" }} />
              </div>
              <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
                {perk.title}
              </h3>
              <p className="text-sm" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>{perk.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OffersPage;
