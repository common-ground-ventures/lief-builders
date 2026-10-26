import { useState, useEffect, useRef } from "react";
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
  { href: "/sabs", label: "LÏEF x SABS", type: "route" },
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
  const headerRef = useRef<HTMLElement>(null);

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

  /* Escape, or a tap anywhere outside the bar and card, closes the phone menu. */
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    const onDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => { window.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onDown); };
  }, [mobileOpen]);

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

  /* The logo always lands at the very top of the home page. Navigating alone kept the
     previous scroll position, which dropped visitors at Services. */
  const handleLogo = () => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
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

  /* Solid bar = Loggia with hunter-green type, whenever scrolled or the menu is open. */
  const solid = scrolled || mobileOpen;
  const ink = "var(--v2-deep)";

  return (
    <motion.header
      ref={headerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: solid ? "rgba(194,184,167,.97)" : "transparent",
        backdropFilter: solid ? "blur(20px)" : "none",
        borderBottom: "1px solid transparent",
        transition: "background 0.5s, backdrop-filter 0.5s, border-bottom 0.5s",
        willChange: "background, backdrop-filter",
      }}
    >
      <div className={`max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20 ${solid ? "v2-on-loggia" : ""}`}>
        <div className="flex items-center gap-6">
          <a
            href="/"
            className="flex items-center"
            onClick={(e) => { e.preventDefault(); handleLogo(); }}
            style={{
              opacity: solid ? 1 : 0,
              transform: solid ? "translateY(0)" : "translateY(8px)",
              pointerEvents: solid ? "auto" : "none",
              background: "none", border: "none", cursor: "pointer",
              transition: "opacity 0.5s, transform 0.5s",
            }}
            aria-label="LÏEF"
          >
            {/* logo shape filled with the hunter green so it reads on the Loggia bar */}
            <span className="relative block">
              <img src={logoConcrete} alt="" aria-hidden="true" className="h-6 md:h-7 w-auto block" style={{ visibility: "hidden" }} />
              <span className="absolute inset-0" style={{ background: ink, WebkitMaskImage: `url(${logoConcrete})`, maskImage: `url(${logoConcrete})`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" }} />
            </span>
          </a>
          <span
            className="v2-headline hidden xl:flex items-center"
            style={{
              fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
              color: ink,
              lineHeight: 1,
              letterSpacing: "0.02em",
              height: "28px",
              opacity: solid ? 1 : 0,
              transform: solid ? "translateY(0)" : "translateY(8px)",
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
              <a
                key={l.href}
                href={l.type === "scroll" ? "/" + l.href : l.href}
                className="whitespace-nowrap"
                onClick={(e) => { e.preventDefault(); handleNav(l); }}
                onMouseEnter={() => setHoveredLink(l.href)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                  fontFamily: "'Japandi', sans-serif",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: solid ? ink : active || hovered ? "#C2B8A7" : "#EFECE3",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                  textDecorationColor: active || hovered ? (solid ? ink : "#C2B8A7") : "transparent",
                  textUnderlineOffset: "6px",
                  transition: "color 0.3s, text-decoration-color 0.3s",
                }}
              >
                {l.label}
              </a>
            );
          })}
          <button
            onClick={handleContact}
            onMouseEnter={() => setContactHovered(true)}
            onMouseLeave={() => setContactHovered(false)}
            style={{
              fontFamily: "'Japandi', sans-serif",
              fontSize: "0.95rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: solid ? (contactHovered ? "#C2B8A7" : ink) : (contactHovered ? ink : "#C2B8A7"),
              border: `1px solid ${solid ? "#0F1A14" : "#C2B8A7"}`,
              padding: "8px 20px",
              cursor: "pointer",
              background: contactHovered ? (solid ? ink : "#C2B8A7") : "transparent",
              transition: "color 0.3s, background 0.3s",
            }}
          >
            Contact
          </button>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="xl:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          style={{ color: solid ? "#0F1A14" : "#EFECE3", background: "none", border: "none", cursor: "pointer" }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden absolute right-4 md:right-10 top-full mt-2 w-[260px] max-w-[calc(100vw-2rem)]"
            style={{ background: "#C2B8A7", border: "1px solid rgba(15,26,20,.12)", boxShadow: "0 18px 40px rgba(0,0,0,.28)" }}
          >
            <nav className="px-6 py-6 flex flex-col items-end gap-5">
              {[...navLinks.map((l) => ({ l, contact: false })), { l: null as NavLink | null, contact: true }].map(({ l, contact }) => (
                <a
                  key={contact ? "contact" : l!.href}
                  href={contact ? "#contact" : l!.type === "scroll" ? "/" + l!.href : l!.href}
                  onClick={(e) => { e.preventDefault(); contact ? handleContact() : handleNav(l!); }}
                  style={{
                    fontFamily: "'Japandi', sans-serif",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#0F1A14",
                    textAlign: "right",
                    textDecoration: "underline",
                    textDecorationColor: !contact && isLinkActive(l!) ? "#0F1A14" : "transparent",
                    textUnderlineOffset: "6px",
                  }}
                  className="v2-menu-link"
                >
                  {contact ? "Contact" : l!.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Nav;
