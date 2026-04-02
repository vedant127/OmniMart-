import { Link } from "react-router-dom";

const Footer = () => (
  <footer style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>
    <div className="container mx-auto px-4 py-16">
      {/* ── 4 columns with generous gap ── Step 5 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand */}
        <div className="space-y-5">
          <h3
            className="text-xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: "var(--footer-heading)" }}
          >
            🍎 FreshCart
          </h3>
          {/* Step 2 — soft body text */}
          <p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.72)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Your one-stop destination for the freshest organic produce. Farm to doorstep, every single day. 🌱
          </p>

          {/* Step 4 — icon circles with border only, no filled background */}
          <div className="flex gap-3 pt-1">
            {[
              { key: "f",  icon: "📘" },
              { key: "tw", icon: "🐦" },
              { key: "ig", icon: "📸" },
              { key: "yt", icon: "▶️" },
            ].map(({ key, icon }) => (
              <a
                key={key}
                href="#"
                className="h-9 w-9 rounded-full flex items-center justify-center text-sm transition-all hover:bg-white/10"
                style={{
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div className="space-y-5">
          {/* Step 6 — small, letter-spaced uppercase heading */}
          <h4
            className="text-xs font-semibold uppercase"
            style={{
              letterSpacing: "0.12em",
              fontFamily: "'DM Sans', sans-serif",
              color: "var(--footer-heading)",
            }}
          >
            Quick Links
          </h4>
          {/* Step 3 — soft grey link text, Step 5 — more gap between items */}
          <ul className="space-y-3 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {["Fresh Fruits", "Best Sellers", "New Arrivals", "Dry Fruits", "Organic Juice"].map((link) => (
              <li key={link}>
                <Link
                  to="/products"
                  className="transition-colors hover:text-white"
                  style={{ color: "var(--footer-link)" }}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div className="space-y-5">
          <h4
            className="text-xs font-semibold uppercase"
            style={{
              letterSpacing: "0.12em",
              fontFamily: "'DM Sans', sans-serif",
              color: "var(--footer-heading)",
            }}
          >
            Customer Help
          </h4>
          <ul className="space-y-3 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {["Live Chat", "Help Center", "FAQ", "Shopping Guide", "Track Order"].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="transition-colors hover:text-white"
                  style={{ color: "var(--footer-link)" }}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Information */}
        <div className="space-y-5">
          <h4
            className="text-xs font-semibold uppercase"
            style={{
              letterSpacing: "0.12em",
              fontFamily: "'DM Sans', sans-serif",
              color: "var(--footer-heading)",
            }}
          >
            Information
          </h4>
          <ul className="space-y-3 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {["Contact", "Privacy Policy", "Terms & Conditions", "Return Policy"].map((link) => (
              <li key={link}>
                <Link
                  to={link === "Contact" ? "/contact" : "#"}
                  className="transition-colors hover:text-white"
                  style={{ color: "var(--footer-link)" }}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
      >
        <p
          className="text-xs"
          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}
        >
          © 2026 FreshCart. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            Payment Methods:
          </span>
          <div className="flex gap-2 text-xs">
            {["Visa", "Mastercard", "UPI"].map((p) => (
              <span
                key={p}
                className="px-2 py-1 rounded"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.65)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
