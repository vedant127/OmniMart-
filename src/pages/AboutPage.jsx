import { motion } from "framer-motion";
import { Leaf, Heart, Truck, Award, Users, Target } from "lucide-react";

const values = [
  { icon: Leaf, title: "100% Organic", desc: "Every product is certified organic, sourced from trusted farms." },
  { icon: Heart, title: "Health First", desc: "We believe nutritious food is the foundation of a happy life." },
  { icon: Truck, title: "Farm to Door", desc: "Fresh produce delivered straight from local farms to your home." },
  { icon: Award, title: "Quality Assured", desc: "Rigorous quality checks ensure only the best reaches you." },
];

const team = [
  { name: "Sarah Johnson", role: "Founder & CEO", emoji: "👩‍💼" },
  { name: "Michael Chen", role: "Head of Sourcing", emoji: "👨‍🌾" },
  { name: "Emily Davis", role: "Nutritionist", emoji: "👩‍⚕️" },
  { name: "David Wilson", role: "Operations Lead", emoji: "👨‍💻" },
];

const About = () => (
  <div className="min-h-screen">
    {/* Hero */}
    <section className="py-16 md:py-24" style={{ backgroundColor: "var(--muted)" }}>
      <div className="container mx-auto px-4 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block font-semibold text-sm px-4 py-1.5 rounded-full mb-4"
          style={{ backgroundColor: "rgba(44,95,30,0.1)", color: "var(--primary)", fontFamily: "'DM Sans', sans-serif" }}
        >
          About FreshCart
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}
        >
          Bringing Nature's Best <br className="hidden md:block" />
          <span style={{ color: "var(--primary)" }}>To Your Table</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg"
          style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}
        >
          Since 2018, FreshCart has been committed to providing the freshest organic fruits and vegetables,
          connecting local farmers with health-conscious families.
        </motion.p>
      </div>
    </section>

    {/* Story */}
    <section className="py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="rounded-2xl h-80 flex items-center justify-center" style={{ backgroundColor: "var(--muted)" }}>
            <span className="text-8xl">🌿</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-5 w-5" style={{ color: "var(--primary)" }} />
            <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: "var(--primary)", fontFamily: "'DM Sans', sans-serif" }}>
              Our Mission
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
            Making Organic Accessible For Everyone
          </h2>
          <p className="leading-relaxed mb-4" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
            We started FreshCart with a simple belief: everyone deserves access to fresh, organic, and
            affordable produce. Our journey began at a small farmers' market, and today we serve
            thousands of families across the country.
          </p>
          <p className="leading-relaxed" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
            We work directly with over 200 certified organic farms, cutting out middlemen to bring
            you the freshest produce at fair prices — while ensuring our farmers earn what they deserve.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Values */}
    <section className="py-16" style={{ backgroundColor: "var(--muted)" }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
            Our Core Values
          </h2>
          <p style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>What drives us every single day</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl p-6 text-center"
              style={{ backgroundColor: "var(--card)", boxShadow: "var(--shadow-card)" }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "rgba(44,95,30,0.1)" }}>
                <v.icon className="h-7 w-7" style={{ color: "var(--primary)" }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>{v.title}</h3>
              <p className="text-sm" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Users className="h-5 w-5" style={{ color: "var(--primary)" }} />
            <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: "var(--primary)", fontFamily: "'DM Sans', sans-serif" }}>
              Our Team
            </span>
          </div>
          <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
            Meet The People Behind FreshCart
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl p-6 text-center"
              style={{ backgroundColor: "var(--card)", boxShadow: "var(--shadow-card)" }}
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "var(--muted)" }}>
                <span className="text-4xl">{member.emoji}</span>
              </div>
              <h3 className="font-semibold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>{member.name}</h3>
              <p className="text-sm" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-14" style={{ backgroundColor: "var(--primary)" }}>
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { num: "200+", label: "Partner Farms" },
          { num: "50K+", label: "Happy Customers" },
          { num: "500+", label: "Organic Products" },
          { num: "98%", label: "Satisfaction Rate" },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--primary-foreground)" }}>
              {stat.num}
            </p>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'DM Sans', sans-serif" }}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default About;
