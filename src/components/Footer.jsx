import { Link } from "react-router-dom";

const Footer = () => (
  <footer style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            🍎 FreshCart
          </h3>
          <p className="text-sm leading-relaxed" style={{ opacity: 0.8, fontFamily: "'DM Sans', sans-serif" }}>
            Your one-stop destination for the freshest organic produce. Farm to doorstep, every single day. 🌱
          </p>
          <div className="flex gap-3">
            {["f", "tw", "ig", "yt"].map((s, i) => (
              <a
                key={i}
                href="#"
                className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors hover:opacity-80"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                {s === "f" ? "📘" : s === "tw" ? "🐦" : s === "ig" ? "📸" : "▶️"}
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div className="space-y-4">
          <h4
            className="font-semibold text-sm uppercase tracking-wider"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Shop
          </h4>
          <ul className="space-y-2 text-sm" style={{ opacity: 0.8, fontFamily: "'DM Sans', sans-serif" }}>
            {["Fresh Fruits", "Best Sellers", "New Arrivals", "Dry Fruits", "Organic Juice"].map((link) => (
              <li key={link}>
                <Link to="/products" className="hover:opacity-100 transition-opacity">{link}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div className="space-y-4">
          <h4
            className="font-semibold text-sm uppercase tracking-wider"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Help
          </h4>
          <ul className="space-y-2 text-sm" style={{ opacity: 0.8, fontFamily: "'DM Sans', sans-serif" }}>
            {["Live Chat", "Help Center", "FAQ", "Shopping Guide", "Track Order"].map((link) => (
              <li key={link}>
                <a href="#" className="hover:opacity-100 transition-opacity">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Information */}
        <div className="space-y-4">
          <h4
            className="font-semibold text-sm uppercase tracking-wider"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Information
          </h4>
          <ul className="space-y-2 text-sm" style={{ opacity: 0.8, fontFamily: "'DM Sans', sans-serif" }}>
            {["About Us", "Contact", "Privacy Policy", "Terms & Conditions", "Return Policy"].map((link) => (
              <li key={link}>
                <Link to={link === "About Us" ? "/about" : link === "Contact" ? "/contact" : "#"} className="hover:opacity-100 transition-opacity">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div
        className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
      >
        <p className="text-xs" style={{ opacity: 0.6, fontFamily: "'DM Sans', sans-serif" }}>
          © 2026 FreshCart. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <span className="text-xs" style={{ opacity: 0.6 }}>Payment Methods:</span>
          <div className="flex gap-2 text-xs">
            {["Visa", "Mastercard", "UPI"].map((p) => (
              <span
                key={p}
                className="px-2 py-1 rounded"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", fontFamily: "'DM Sans', sans-serif" }}
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
