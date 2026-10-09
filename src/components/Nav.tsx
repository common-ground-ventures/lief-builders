import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoConcrete from "@/assets/logos/logo-concrete.png";
import { useContactModal } from "@/contexts/ContactModalContext";

interface NavLink {
  href: string;
  label: string;
  type: "scroll" | "route";
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home", type: "route" },
  { href: "#services", label: "Services", type: "scroll" },
  { href: "/national", label: "National", type: "route" },
  { href: "/ai", label: "AI", type: "route" },
  { href: "/projects", label: "Projects", type: "route" },
  { href: "/sabs", label: "L\u00efef x SABS", type: "route" },
  { href: "/team", label: "Team", type: "route" },
  { href: "/testimonials", label: "Testimonials", type: "route" },
];

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal } = useContactModal();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [contactHovered, setContactHovered] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* IntersectionObserver — only observe scroll sections on the home page */
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const ids = navLinks
      .filter((l) => l.type === "scroll")
      .map((l) => l.href.replace("#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { threshold: 0.05, rootMargin: "-80px 0px -60% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNav = (link: NavLink) => {
    setMobileOpen(false);

    if (link.type === "route") {
      navigate(link.href);
      window.scrollTo({ top: 0 });
      return;
    }

    // Scroll link
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContact = () => {
    setMobileOpen(false);
    openModal();
  };

  const handleLogo = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isLinkActive = (link: NavLink) => {
    if (link.href === "/") {
      return location.pathname === "/" && !activeSection;
    }
    if (link.type === "route") {
      return location.pathname === link.href;
    }
    return location.pathname === "/" && activeSection === link.href;
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? "rgba(10,10,10,.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,255,136,.06)" : "1px solid transparent",
        transition: "background 0.5s, backdrop-filter 0.5s, border-bottom 0.5s",
        willChange: "background, backdrop-filter",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        <div className="flex items-center gap-6">
          <button
            className="flex items-center"
            onClick={handleLogo}
            style={{
              opacity: scrolled ? 1 : 0,
              transform: scrolled ? "translateY(0)" : "translateY(8px)",
              pointerEvents: scrolled ? "auto" : "none",
              background: "none", border: "none", cursor: "pointer",
              transition: "opacity 0.5s, transform 0.5s",
            }}
          >
            <img src={logoConcrete} alt="Lïef" className="h-6 md:h-7 w-auto block" />
          </button>
          <span
            className="v2-headline hidden xl:flex items-center"
            style={{
              fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
              color: "var(--v2-neon)",
              lineHeight: 1,
              letterSpacing: "0.02em",
              height: "28px",
              opacity: scrolled ? 1 : 0,
              transform: scrolled ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.5s, transform 0.5s",
            }}
          >
            BUILT<span className="v2-neon-period">.</span> DIFFERENT<span className="v2-neon-period">.</span>
          </span>
        </div>

        <nav className="hidden xl:flex items-center gap-7">
          {navLinks.map((l) => {
            const active = isLinkActive(l);
            const hovered = hoveredLink === l.href;
            return (
              <button
                key={l.href}
                className="whitespace-nowrap"
                onClick={() => handleNav(l)}
                onMouseEnter={() => setHoveredLink(l.href)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: active || hovered ? "#00FF88" : scrolled ? "#F5F5F3" : "#777",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "color 0.3s",
                }}
              >
                {l.label}
              </button>
            );
          })}
          <button
            onClick={handleContact}
            onMouseEnter={() => setContactHovered(true)}
            onMouseLeave={() => setContactHovered(false)}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: contactHovered ? "#0a0a0a" : "#00FF88",
              border: "1px solid #00FF88",
              padding: "8px 20px",
              cursor: "pointer",
              background: contactHovered ? "#00FF88" : "transparent",
              transition: "color 0.3s, background 0.3s",
            }}
          >
            Contact
          </button>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="xl:hidden"
          style={{ color: "#F5F5F3", background: "none", border: "none", cursor: "pointer" }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden"
            style={{ background: "rgba(10,10,10,.98)", borderTop: "1px solid rgba(0,255,136,.06)" }}
          >
            <nav className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => handleNav(l)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: isLinkActive(l) ? "#00FF88" : "#F5F5F3",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={handleContact}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "#00FF88",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                Contact
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Nav;
