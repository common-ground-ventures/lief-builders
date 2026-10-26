import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { useNavigate, useLocation, Outlet, Link, Routes, Route } from "react-router-dom";
import { createContext, useContext, useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, Menu, Shield, Check, Flame, Droplets, Bug, Thermometer, Wind, Recycle, Volume2 } from "lucide-react";
const logoConcrete = "/assets/logo-concrete-BJwcKtx7.png";
const ContactModalContext = createContext({
  isOpen: false,
  openModal: () => {
  },
  closeModal: () => {
  }
});
const useContactModal = () => useContext(ContactModalContext);
const ContactModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsx(
    ContactModalContext.Provider,
    {
      value: {
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false)
      },
      children
    }
  );
};
const navLinks = [
  { href: "/", label: "Home", type: "route" },
  { href: "#services", label: "Services", type: "scroll" },
  { href: "/national", label: "National", type: "route" },
  { href: "/ai", label: "AI", type: "route" },
  { href: "/projects", label: "Projects", type: "route" },
  { href: "/sabs", label: "LÏEF x SABS", type: "route" },
  { href: "/team", label: "Team", type: "route" },
  { href: "/testimonials", label: "Testimonials", type: "route" }
];
const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal } = useContactModal();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredLink, setHoveredLink] = useState(null);
  const [contactHovered, setContactHovered] = useState(false);
  const headerRef = useRef(null);
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
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }
    const ids = navLinks.filter((l) => l.type === "scroll").map((l) => l.href.replace("#", ""));
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
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const onDown = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [mobileOpen]);
  const handleNav = (link) => {
    setMobileOpen(false);
    if (link.type === "route") {
      navigate(link.href);
      window.scrollTo({ top: 0 });
      return;
    }
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
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const isLinkActive = (link) => {
    if (link.href === "/") {
      return location.pathname === "/" && !activeSection;
    }
    if (link.type === "route") {
      return location.pathname === link.href;
    }
    return location.pathname === "/" && activeSection === link.href;
  };
  const solid = scrolled || mobileOpen;
  const ink = "var(--v2-deep)";
  return /* @__PURE__ */ jsxs(
    motion.header,
    {
      ref: headerRef,
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 1, delay: 0.3 },
      className: "fixed top-0 left-0 right-0 z-50",
      style: {
        background: solid ? "rgba(194,184,167,.97)" : "transparent",
        backdropFilter: solid ? "blur(20px)" : "none",
        borderBottom: "1px solid transparent",
        transition: "background 0.5s, backdrop-filter 0.5s, border-bottom 0.5s",
        willChange: "background, backdrop-filter"
      },
      children: [
        /* @__PURE__ */ jsxs("div", { className: `max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20 ${solid ? "v2-on-loggia" : ""}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "/",
                className: "flex items-center",
                onClick: (e) => {
                  e.preventDefault();
                  handleLogo();
                },
                style: {
                  opacity: solid ? 1 : 0,
                  transform: solid ? "translateY(0)" : "translateY(8px)",
                  pointerEvents: solid ? "auto" : "none",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "opacity 0.5s, transform 0.5s"
                },
                "aria-label": "LÏEF",
                children: /* @__PURE__ */ jsxs("span", { className: "relative block", children: [
                  /* @__PURE__ */ jsx("img", { src: logoConcrete, alt: "", "aria-hidden": "true", className: "h-6 md:h-7 w-auto block", style: { visibility: "hidden" } }),
                  /* @__PURE__ */ jsx("span", { className: "absolute inset-0", style: { background: ink, WebkitMaskImage: `url(${logoConcrete})`, maskImage: `url(${logoConcrete})`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" } })
                ] })
              }
            ),
            /* @__PURE__ */ jsxs(
              "span",
              {
                className: "v2-headline hidden xl:flex items-center",
                style: {
                  fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
                  color: ink,
                  lineHeight: 1,
                  letterSpacing: "0.02em",
                  height: "28px",
                  opacity: solid ? 1 : 0,
                  transform: solid ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity 0.5s, transform 0.5s"
                },
                children: [
                  "BUILT",
                  /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." }),
                  " DIFFERENT",
                  /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("nav", { className: "hidden xl:flex items-center gap-7", children: [
            navLinks.map((l) => {
              const active = isLinkActive(l);
              const hovered = hoveredLink === l.href;
              return /* @__PURE__ */ jsx(
                "a",
                {
                  href: l.type === "scroll" ? "/" + l.href : l.href,
                  className: "whitespace-nowrap",
                  onClick: (e) => {
                    e.preventDefault();
                    handleNav(l);
                  },
                  onMouseEnter: () => setHoveredLink(l.href),
                  onMouseLeave: () => setHoveredLink(null),
                  style: {
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
                    textDecorationColor: active || hovered ? solid ? ink : "#C2B8A7" : "transparent",
                    textUnderlineOffset: "6px",
                    transition: "color 0.3s, text-decoration-color 0.3s"
                  },
                  children: l.label
                },
                l.href
              );
            }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleContact,
                onMouseEnter: () => setContactHovered(true),
                onMouseLeave: () => setContactHovered(false),
                style: {
                  fontFamily: "'Japandi', sans-serif",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: solid ? contactHovered ? "#C2B8A7" : ink : contactHovered ? ink : "#C2B8A7",
                  border: `1px solid ${solid ? "#0F1A14" : "#C2B8A7"}`,
                  padding: "8px 20px",
                  cursor: "pointer",
                  background: contactHovered ? solid ? ink : "#C2B8A7" : "transparent",
                  transition: "color 0.3s, background 0.3s"
                },
                children: "Contact"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setMobileOpen(!mobileOpen),
              className: "xl:hidden",
              "aria-label": mobileOpen ? "Close menu" : "Open menu",
              style: { color: solid ? "#0F1A14" : "#EFECE3", background: "none", border: "none", cursor: "pointer" },
              children: mobileOpen ? /* @__PURE__ */ jsx(X, { size: 24 }) : /* @__PURE__ */ jsx(Menu, { size: 24 })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: mobileOpen && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -8 },
            transition: { duration: 0.2 },
            className: "xl:hidden absolute right-4 md:right-10 top-full mt-2 w-[260px] max-w-[calc(100vw-2rem)]",
            style: { background: "#C2B8A7", border: "1px solid rgba(15,26,20,.12)", boxShadow: "0 18px 40px rgba(0,0,0,.28)" },
            children: /* @__PURE__ */ jsx("nav", { className: "px-6 py-6 flex flex-col items-end gap-5", children: [...navLinks.map((l) => ({ l, contact: false })), { l: null, contact: true }].map(({ l, contact }) => /* @__PURE__ */ jsx(
              "a",
              {
                href: contact ? "#contact" : l.type === "scroll" ? "/" + l.href : l.href,
                onClick: (e) => {
                  e.preventDefault();
                  contact ? handleContact() : handleNav(l);
                },
                style: {
                  fontFamily: "'Japandi', sans-serif",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#0F1A14",
                  textAlign: "right",
                  textDecoration: "underline",
                  textDecorationColor: !contact && isLinkActive(l) ? "#0F1A14" : "transparent",
                  textUnderlineOffset: "6px"
                },
                className: "v2-menu-link",
                children: contact ? "Contact" : l.label
              },
              contact ? "contact" : l.href
            )) })
          }
        ) })
      ]
    }
  );
};
const Footer = () => {
  const navigate = useNavigate();
  useLocation();
  return /* @__PURE__ */ jsx("footer", { className: "relative", style: { background: "var(--v2-deep)", borderTop: "1px solid var(--v2-rule)" }, children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1400px] mx-auto px-6 md:px-12 py-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-12 mb-16", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("img", { src: logoConcrete, alt: "Lïef", className: "h-6 w-auto mb-4" }),
        /* @__PURE__ */ jsx("p", { className: "v2-headline text-sm mb-2", style: { color: "var(--v2-white)" }, children: "PROJECT ADVOCACY, OVERSIGHT, & REPRESENTATION" }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: "1.25rem", color: "var(--v2-neon)" }, children: "Built. Different." }),
        /* @__PURE__ */ jsx("p", { className: "mt-2", style: { fontSize: "1.25rem", color: "var(--v2-dim)" }, children: "Phoenix, Arizona" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h5", { className: "mb-4", style: { fontSize: "1.25rem", textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--v2-neon)" }, children: "Services" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("span", { style: { fontSize: "1.25rem", color: "var(--v2-dim)" }, children: "Project Advocacy" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("span", { style: { fontSize: "1.25rem", color: "var(--v2-dim)" }, children: "Insurance Coordination" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("span", { style: { fontSize: "1.25rem", color: "var(--v2-dim)" }, children: "Cost Control" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "/sabs",
              onClick: (e) => {
                e.preventDefault();
                navigate("/sabs");
                window.scrollTo({ top: 0 });
              },
              style: { fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none", display: "inline-block", cursor: "pointer", padding: 0 },
              className: "hover:text-[#C2B8A7] transition-colors duration-300",
              children: "SABS™ Technology"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h5", { className: "mb-4", style: { fontSize: "1.25rem", textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--v2-neon)" }, children: "Explore" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "/",
              onClick: (e) => {
                e.preventDefault();
                navigate("/");
                window.scrollTo({ top: 0 });
              },
              style: { fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none", display: "inline-block", cursor: "pointer", padding: 0 },
              className: "hover:text-[#C2B8A7] transition-colors duration-300",
              children: "Home"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "/national",
              onClick: (e) => {
                e.preventDefault();
                navigate("/national");
                window.scrollTo({ top: 0 });
              },
              style: { fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none", display: "inline-block", cursor: "pointer", padding: 0 },
              className: "hover:text-[#C2B8A7] transition-colors duration-300",
              children: "National"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "/ai",
              onClick: (e) => {
                e.preventDefault();
                navigate("/ai");
                window.scrollTo({ top: 0 });
              },
              style: { fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none", display: "inline-block", cursor: "pointer", padding: 0 },
              className: "hover:text-[#C2B8A7] transition-colors duration-300",
              children: "AI"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "/projects",
              onClick: (e) => {
                e.preventDefault();
                navigate("/projects");
                window.scrollTo({ top: 0 });
              },
              style: { fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none", display: "inline-block", cursor: "pointer", padding: 0 },
              className: "hover:text-[#C2B8A7] transition-colors duration-300",
              children: "Projects"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "/sabs",
              onClick: (e) => {
                e.preventDefault();
                navigate("/sabs");
                window.scrollTo({ top: 0 });
              },
              style: { fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none", display: "inline-block", cursor: "pointer", padding: 0 },
              className: "hover:text-[#C2B8A7] transition-colors duration-300",
              children: "Lïef x SABS"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "/team",
              onClick: (e) => {
                e.preventDefault();
                navigate("/team");
                window.scrollTo({ top: 0 });
              },
              style: { fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none", display: "inline-block", cursor: "pointer", padding: 0 },
              className: "hover:text-[#C2B8A7] transition-colors duration-300",
              children: "Team"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "/testimonials",
              onClick: (e) => {
                e.preventDefault();
                navigate("/testimonials");
                window.scrollTo({ top: 0 });
              },
              style: { fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none", display: "inline-block", cursor: "pointer", padding: 0 },
              className: "hover:text-[#C2B8A7] transition-colors duration-300",
              children: "Testimonials"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "https://anewlief.com", target: "_blank", rel: "noopener noreferrer", style: { fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none" }, className: "hover:text-[#C2B8A7] transition-colors duration-300", children: "Lïef Development" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h5", { className: "mb-4", style: { fontSize: "1.25rem", textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--v2-neon)" }, children: "Connect" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "tel:8057227598", style: { fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none" }, className: "hover:text-[#C2B8A7] transition-colors duration-300", children: "(805) 722-7598" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "mailto:hello@liefdev.com", style: { fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none" }, className: "hover:text-[#C2B8A7] transition-colors duration-300", children: "hello@liefdev.com" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "https://www.linkedin.com/", target: "_blank", rel: "noopener noreferrer", style: { fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none" }, className: "hover:text-[#C2B8A7] transition-colors duration-300", children: "LinkedIn" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mb-6 max-w-[900px]", style: { fontSize: "0.95rem", color: "var(--v2-dim)", lineHeight: 1.6, opacity: 0.8 }, children: "Jon Armstrong of Armstrong Construction Group (ACG) is a managing partner of LÏEF Development. Work is carried out by ACG and/or its trades and network." }),
    /* @__PURE__ */ jsxs("div", { className: "pt-8 flex flex-col md:flex-row justify-between items-center gap-4", style: { borderTop: "1px solid var(--v2-rule)" }, children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { style: { fontSize: "1.25rem", color: "var(--v2-dim)" }, children: "© 2026 Lïef Builders. All rights reserved." }) }),
      /* @__PURE__ */ jsxs("p", { style: { fontSize: "1.25rem", color: "var(--v2-dim)", opacity: 0.5 }, children: [
        "Created by",
        " ",
        /* @__PURE__ */ jsx("a", { href: "https://www.commonground.ventures/", target: "_blank", rel: "noopener noreferrer", style: { color: "inherit", textDecoration: "none" }, className: "hover-cg transition-colors duration-300", children: "Common Ground" }),
        " · ",
        /* @__PURE__ */ jsx("a", { href: "/wiki", style: { color: "inherit", textDecoration: "none" }, className: "hover-cg transition-colors duration-300", children: "About this build" })
      ] })
    ] })
  ] }) });
};
const LEAD_URL$1 = "/api/lead";
const ease$f = [0.16, 1, 0.3, 1];
const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  background: "#ffffff",
  border: "none",
  color: "#303030",
  fontFamily: "var(--v2-font-body)",
  fontSize: "1rem",
  outline: "none"
};
const labelStyle = {
  fontSize: "1rem",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--v2-muted)",
  marginBottom: "8px",
  display: "block"
};
const ContactModal = () => {
  const { isOpen, closeModal } = useContactModal();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [honeypot, setHoneypot] = useState("");
  const backdropRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeModal]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(LEAD_URL$1, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          message: form.message,
          page: window.location.pathname,
          website: honeypot
        })
      });
      if (!res.ok) throw new Error("lead " + res.status);
      setStatus("sent");
      setForm({ firstName: "", lastName: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };
  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setStatus("idle");
    }, 300);
  };
  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) handleClose();
  };
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
    motion.div,
    {
      ref: backdropRef,
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 },
      onClick: handleBackdropClick,
      className: "fixed inset-0 z-[100] flex items-center justify-center px-4",
      style: { background: "rgba(0,0,0,.8)", backdropFilter: "blur(8px)" },
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30, scale: 0.97 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 20, scale: 0.97 },
          transition: { duration: 0.4, ease: ease$f },
          className: "v2-form-card relative w-full max-w-[540px] p-8 md:p-10",
          style: {
            background: "#C2B8A7",
            border: "1px solid #C2B8A7",
            boxShadow: "0 40px 80px rgba(0,0,0,.45)"
          },
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleClose,
                className: "absolute top-4 right-4 transition-opacity duration-300 hover:opacity-60",
                style: { background: "none", border: "none", cursor: "pointer", color: "#0F1A14" },
                children: /* @__PURE__ */ jsx(X, { size: 20 })
              }
            ),
            status === "sent" ? /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
              /* @__PURE__ */ jsx(
                "h3",
                {
                  className: "v2-headline mb-4",
                  style: { fontSize: "1.4rem", letterSpacing: "0.1em", color: "var(--v2-white)" },
                  children: "MESSAGE SENT"
                }
              ),
              /* @__PURE__ */ jsx("p", { style: { fontSize: "1.05rem", color: "var(--v2-dim)", lineHeight: 1.6 }, children: "We'll be in touch shortly." }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleClose,
                  className: "v2-send mt-6 transition-all duration-300",
                  style: {
                    fontFamily: "var(--v2-font-body)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    background: "#0F1A14",
                    color: "#EFECE3",
                    border: "1px solid #C2B8A7",
                    padding: "10px 28px",
                    cursor: "pointer"
                  },
                  children: "Close"
                }
              )
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "h3",
                {
                  className: "v2-headline mb-6",
                  style: { fontSize: "1.4rem", letterSpacing: "0.1em", color: "var(--v2-white)" },
                  children: "START YOUR PROJECT"
                }
              ),
              /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { style: labelStyle, children: "First Name" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        required: true,
                        style: inputStyle,
                        value: form.firstName,
                        onChange: (e) => setForm({ ...form, firstName: e.target.value })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Last Name" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        required: true,
                        style: inputStyle,
                        value: form.lastName,
                        onChange: (e) => setForm({ ...form, lastName: e.target.value })
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Email" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      required: true,
                      type: "email",
                      style: inputStyle,
                      value: form.email,
                      onChange: (e) => setForm({ ...form, email: e.target.value })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Message" }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      rows: 4,
                      style: inputStyle,
                      value: form.message,
                      onChange: (e) => setForm({ ...form, message: e.target.value })
                    }
                  )
                ] }),
                status === "error" && /* @__PURE__ */ jsx("p", { style: { fontSize: "1rem", color: "#ff4444" }, children: "Something went wrong. Please try again." }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: status === "sending",
                    className: "v2-send w-full transition-all duration-300",
                    style: {
                      fontFamily: "var(--v2-font-body)",
                      fontSize: "1rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      background: "#0F1A14",
                      color: "#EFECE3",
                      border: "1px solid #C2B8A7",
                      padding: "16px 24px",
                      cursor: status === "sending" ? "wait" : "pointer",
                      opacity: status === "sending" ? 0.7 : 1
                    },
                    children: status === "sending" ? "Sending..." : "SEND MESSAGE"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    name: "website",
                    tabIndex: -1,
                    autoComplete: "off",
                    "aria-hidden": "true",
                    value: honeypot,
                    onChange: (e) => setHoneypot(e.target.value),
                    style: { position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  ) });
};
const MainLayout = () => /* @__PURE__ */ jsx(ContactModalProvider, { children: /* @__PURE__ */ jsxs("div", { className: "v2 min-h-screen overflow-x-hidden", children: [
  /* @__PURE__ */ jsx(Nav, {}),
  /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(Outlet, {}) }),
  /* @__PURE__ */ jsx(Footer, {}),
  /* @__PURE__ */ jsx(ContactModal, {})
] }) });
const logoLight = "/assets/lief-logo-light-O5v9duEF.png";
const stagger$2 = (i) => ({ delay: 0.3 + i * 0.15 });
const ease$e = [0.16, 1, 0.3, 1];
const Hero = () => {
  const { openModal } = useContactModal();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const heroLogoOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroLogoScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.4]);
  const heroLogoY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);
  const [showScroll, setShowScroll] = useState(true);
  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY < 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxs("section", { ref, className: "relative min-h-screen flex items-center overflow-x-hidden pt-24 pb-36 md:pb-40", style: { background: "var(--v2-deep)" }, children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, ...stagger$2(0), ease: ease$e },
          style: { opacity: heroLogoOpacity, scale: heroLogoScale, y: heroLogoY, transformOrigin: "left center", willChange: "transform, opacity" },
          className: "mb-5 md:mb-8",
          children: /* @__PURE__ */ jsx("img", { src: logoLight, alt: "LÏEF", className: "h-14 md:h-24 lg:h-32 w-auto" })
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, ...stagger$2(1), ease: ease$e },
          className: "mb-6 md:mb-8",
          children: [
            /* @__PURE__ */ jsx("span", { className: "v2-label hidden md:inline text-[1.25rem]", children: "Project Advocacy · Protection · Oversight · Representation" }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "md:hidden flex flex-wrap gap-x-4 gap-y-1",
                style: { fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--v2-neon)" },
                children: ["Project Advocacy", "Protection", "Oversight", "Representation"].map((w) => /* @__PURE__ */ jsx("span", { children: w }, w))
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.h1,
        {
          initial: { opacity: 0, y: 35 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, ...stagger$2(1), ease: ease$e },
          className: "v2-headline leading-[1.02] mb-6 md:mb-8",
          style: { fontSize: "clamp(2.2rem, 5.5vw, 5rem)" },
          children: [
            "YOUR PROJECT",
            /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "OUR PROTECTION" }),
            /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 35 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, ...stagger$2(2), ease: ease$e },
          style: { fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.1rem, 3vw, 1.4rem)", color: "var(--v2-muted)", lineHeight: 1.5 },
          children: "Your advocate. Your protector. Your team."
        }
      ),
      /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 35 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, ...stagger$2(3), ease: ease$e },
          className: "mt-4 md:mt-5 max-w-[560px]",
          style: { fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.6 },
          children: "Expertise across architecture, construction, insurance coordination, and legal advocacy, armed with AI-powered oversight tools. Property owners in the Palisades, Southern California, and the Southwest trust us to protect their build."
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 35 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, ...stagger$2(4), ease: ease$e },
          className: "mt-8 md:mt-12 flex flex-wrap gap-3 md:gap-4",
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: openModal,
                className: "transition-all duration-300 hover:brightness-110",
                style: {
                  fontFamily: "var(--v2-font-body)",
                  fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  fontWeight: 600,
                  background: "var(--v2-btn-bg)",
                  color: "var(--v2-btn-fg)",
                  border: "1px solid var(--v2-loggia)",
                  padding: "10px 24px",
                  cursor: "pointer"
                },
                children: "Start a Conversation"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" }),
                className: "transition-all duration-300 hover:bg-[#C2B8A7] hover:text-[#0F1A14]",
                style: {
                  fontFamily: "var(--v2-font-body)",
                  fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  fontWeight: 600,
                  background: "transparent",
                  color: "var(--v2-neon)",
                  border: "1px solid var(--v2-neon)",
                  padding: "10px 24px",
                  cursor: "pointer"
                },
                children: "Our Services"
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        animate: { opacity: showScroll ? 1 : 0 },
        transition: { duration: 0.5 },
        className: "absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
        children: [
          /* @__PURE__ */ jsx("span", { style: { fontSize: "1.25rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--v2-muted)" }, children: "Scroll" }),
          /* @__PURE__ */ jsx("div", { className: "w-px h-8 md:h-12", style: { background: "linear-gradient(to bottom, var(--v2-neon), transparent)" } })
        ]
      }
    )
  ] });
};
const items = [
  { value: "14%", label: "Average Time Savings" },
  { value: "", label: "Consultants in Every Modality" },
  { value: "", label: "Fire Damage Specialists" },
  { value: "", label: "AI-Powered Oversight & Analytics" },
  { value: "", label: "Palisades · Santa Barbara · Greensburg · Phoenix" }
];
const TickerItem = ({ value, label }) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3 whitespace-nowrap", children: [
  value && /* @__PURE__ */ jsx("span", { style: { fontFamily: "'Japandi', sans-serif", fontSize: "1.25rem", color: "var(--v2-neon)" }, children: value }),
  /* @__PURE__ */ jsx("span", { style: { fontSize: "1.25rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--v2-muted)" }, children: label }),
  /* @__PURE__ */ jsx("span", { style: { color: "rgba(194,184,167,.15)", margin: "0 24px" }, children: "◆" })
] });
const StatsTicker = () => {
  const repeated = [...items, ...items, ...items, ...items, ...items, ...items];
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "overflow-hidden",
      style: {
        padding: "0.9rem 0",
        background: "linear-gradient(to right, #1B3427, #15271D)"
      },
      children: /* @__PURE__ */ jsx("div", { className: "v2-ticker-track flex items-center", style: { width: "max-content" }, children: repeated.map((item, i) => /* @__PURE__ */ jsx(TickerItem, { ...item }, i)) })
    }
  );
};
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    observer.observe(el);
    const rect = el.getBoundingClientRect();
    const visible = (Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)) / rect.height;
    if (visible >= threshold) {
      setInView(true);
    }
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}
const ease$d = [0.16, 1, 0.3, 1];
const services = [
  {
    num: "01",
    label: "PROJECT ADVOCACY & PROTECTION",
    title: "Your shield in the build.",
    body: "You don't know what you don't know, and that's exactly what contractors count on. From Greensburg, Kansas tornado rebuilds to Santa Barbara fire damage, we've been the owner's advocate in disaster zones for over two decades. We own and design projects in the Palisades area, giving us a personal stake in the communities we serve. Every engagement is customized to the scope your project demands."
  },
  {
    num: "02",
    label: "INSURANCE & LEGAL COORDINATION",
    title: "Navigate the claim. Maximize the recovery.",
    body: "We coordinate directly with insurance adjusters, prepare detailed draw requests, negotiate claim settlements, and partner with legal counsel to protect your position. From documentation to dispute resolution, we handle it so you don't have to."
  },
  {
    num: "03",
    label: "COST CONTROL & SCHEDULE OPTIMIZATION",
    title: "Faster builds. Tighter budgets. Zero surprises.",
    body: "Change order negotiation, site walks, vendor discount verification, value engineering, and red flag identification. We catch the problems before they cost you time and money. Our job is to make your project go faster and come in cheaper than you thought possible."
  }
];
const Services = () => {
  const { ref, inView } = useInView(0.1);
  return /* @__PURE__ */ jsx("section", { id: "services", className: "relative py-20 md:py-28", style: { background: "var(--v2-deep)" }, children: /* @__PURE__ */ jsx("div", { ref, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 35 },
        animate: inView ? { opacity: 1, y: 0 } : false,
        transition: { duration: 0.75, ease: ease$d },
        className: "relative mb-16",
        children: [
          /* @__PURE__ */ jsx("div", { className: "v2-ghost-text absolute top-0 right-0 md:-right-6", style: { fontSize: "min(7vw, 120px)", lineHeight: 1, color: "rgba(194,184,167,.6)" }, children: "SERVICES" }),
          /* @__PURE__ */ jsx("div", { className: "v2-label mb-6", children: "What We Do" }),
          /* @__PURE__ */ jsxs("h2", { className: "v2-headline text-4xl md:text-6xl lg:text-7xl mb-4", style: { color: "var(--v2-white)" }, children: [
            "FULL-SCOPE",
            /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "PROTECTION" }),
            /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
          ] })
        ]
      }
    ),
    services.map((s, i) => /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 35 },
        animate: inView ? { opacity: 1, y: 0 } : false,
        transition: { duration: 0.75, delay: 0.2 + i * 0.15, ease: ease$d },
        className: "py-12",
        style: { borderTop: "1px solid var(--v2-rule)" },
        children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "v2-headline block mb-4", style: { fontSize: "clamp(4rem, 8vw, 6rem)", color: "rgba(194,184,167,.6)", lineHeight: 1 }, children: s.num }),
          /* @__PURE__ */ jsx("div", { className: "v2-label mb-3", style: { fontSize: "1rem" }, children: s.label }),
          /* @__PURE__ */ jsx("h3", { className: "mb-4", style: { fontFamily: "var(--v2-font-body)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, color: "var(--v2-white)" }, children: s.title }),
          /* @__PURE__ */ jsx("p", { className: "max-w-[600px]", style: { fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.7 }, children: s.body })
        ] })
      },
      s.num
    ))
  ] }) }) });
};
const ease$c = [0.16, 1, 0.3, 1];
const AlignmentBanner = () => {
  const { ref, inView } = useInView(0.2);
  return /* @__PURE__ */ jsx("section", { ref, className: "v2-sparse relative py-16 md:py-24", style: { background: "var(--v2-green)" }, children: /* @__PURE__ */ jsx("div", { className: "max-w-[900px] mx-auto px-6 md:px-12 text-center", children: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: inView ? { opacity: 1, y: 0 } : false,
        transition: { duration: 0.75, ease: ease$c },
        className: "flex justify-center mb-6",
        children: /* @__PURE__ */ jsx(Shield, { size: 48, strokeWidth: 1, style: { color: "var(--v2-neon)" } })
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.h2,
      {
        initial: { opacity: 0, y: 25 },
        animate: inView ? { opacity: 1, y: 0 } : false,
        transition: { duration: 0.75, delay: 0.1, ease: ease$c },
        className: "v2-headline mb-6",
        style: { fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--v2-white)" },
        children: [
          "100% ALIGNED WITH ",
          /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "YOU" }),
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.p,
      {
        initial: { opacity: 0, y: 25 },
        animate: inView ? { opacity: 1, y: 0 } : false,
        transition: { duration: 0.75, delay: 0.2, ease: ease$c },
        style: { fontSize: "1.1rem", color: "rgba(239,236,227,.85)", lineHeight: 1.7 },
        children: "In owner's representation, you pay us and nobody else. No kickbacks, vendor deals or material markups."
      }
    ),
    /* @__PURE__ */ jsx(
      motion.p,
      {
        initial: { opacity: 0, y: 20 },
        animate: inView ? { opacity: 1, y: 0 } : false,
        transition: { duration: 0.75, delay: 0.3, ease: ease$c },
        className: "v2-headline mt-6",
        style: { fontSize: "1rem", letterSpacing: "0.16em", color: "var(--v2-neon)" },
        children: "WE SUCCEED WHEN YOU SAVE."
      }
    )
  ] }) }) });
};
function useCountUp(end, duration = 2e3, start = 0, trigger = true) {
  const [value, setValue] = useState(end);
  const [animating, setAnimating] = useState(false);
  const rafRef = useRef(0);
  useLayoutEffect(() => {
    if (!trigger) return;
    setValue(start);
    setAnimating(true);
  }, [trigger, start]);
  useEffect(() => {
    if (!trigger) return;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start + (end - start) * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [end, duration, start, trigger]);
  return animating ? value : end;
}
const ease$b = [0.16, 1, 0.3, 1];
const capabilitiesLeft = [
  "Initial Project Review",
  "MEP & Structural Coordination",
  "Value Engineering During Design",
  "Site Walks & Inspections",
  "Contractor Communication",
  "Insurance Coordination",
  "Architectural Review"
];
const capabilitiesRight = [
  "Third-Party Contract Negotiation",
  "Change Order Negotiation & Review",
  "Vendor & Material Discount Verification",
  "Red Flag Identification",
  "Legal Review",
  "Budget & Schedule Management",
  "SABS™ Material Supply"
];
const CapStat = ({ end, suffix, label, inView }) => {
  const count = useCountUp(end, 2e3, 0, inView);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("span", { className: "v2-headline block", style: { fontSize: "clamp(3rem, 6vw, 5rem)", color: "var(--v2-white)" }, children: [
      count,
      suffix
    ] }),
    /* @__PURE__ */ jsx("span", { className: "v2-label", style: { fontSize: "1rem", color: "var(--v2-neon)" }, children: label })
  ] });
};
const Capabilities = () => {
  const { ref, inView } = useInView(0.1);
  return /* @__PURE__ */ jsxs("section", { className: "relative py-20 md:py-28", style: { background: "var(--v2-green)" }, children: [
    /* @__PURE__ */ jsx("div", { className: "hidden md:block overflow-hidden absolute inset-0 pointer-events-none", style: { top: "40%", transform: "translateY(-50%)" }, children: /* @__PURE__ */ jsx("div", { className: "v2-ghost-text", style: { fontSize: "min(10vw, 130px)", lineHeight: 1, color: "rgba(0,0,0,.08)", animation: "v2-ghost-scroll 55s linear infinite", position: "relative", whiteSpace: "nowrap" }, children: "ARCHITECTURE · GENERAL CONSTRUCTION · TRADE WORK · INTERIOR DESIGN · LEGAL · INSURANCE" }) }),
    /* @__PURE__ */ jsx("div", { ref, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-16 mb-16", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 35 },
            animate: inView ? { opacity: 1, y: 0 } : false,
            transition: { duration: 0.75, ease: ease$b },
            children: [
              /* @__PURE__ */ jsxs("h2", { style: { fontFamily: "var(--v2-font-body)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "var(--v2-white)", lineHeight: 1.2 }, children: [
                "One team.",
                /* @__PURE__ */ jsx("br", {}),
                "Every discipline."
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-6", style: { fontSize: "1.1rem", color: "rgba(239,236,227,.85)", lineHeight: 1.7 }, children: "Consultants in every modality. Experts across architecture, general construction, trade work, interior design, and legal. Expert advice from the first insurance call to the final walkthrough. We specialize in fire damage work. No handoffs. No compromises. No excuses." })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 35 },
            animate: inView ? { opacity: 1, y: 0 } : false,
            transition: { duration: 0.75, delay: 0.15, ease: ease$b },
            className: "grid grid-cols-1 sm:grid-cols-2 gap-x-12",
            children: [
              /* @__PURE__ */ jsx("div", { className: "space-y-0", children: capabilitiesLeft.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 py-4", style: { borderBottom: "1px solid rgba(239,236,227,.1)" }, children: [
                /* @__PURE__ */ jsx(Check, { size: 18, style: { color: "var(--v2-neon)", flexShrink: 0 } }),
                /* @__PURE__ */ jsx("span", { style: { fontSize: "1.05rem", color: "var(--v2-white)" }, children: item })
              ] }, item)) }),
              /* @__PURE__ */ jsx("div", { className: "space-y-0", children: capabilitiesRight.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 py-4", style: { borderBottom: "1px solid rgba(239,236,227,.1)" }, children: [
                /* @__PURE__ */ jsx(Check, { size: 18, style: { color: "var(--v2-neon)", flexShrink: 0 } }),
                /* @__PURE__ */ jsx("span", { style: { fontSize: "1.05rem", color: "var(--v2-white)" }, children: item })
              ] }, item)) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 35 },
          animate: inView ? { opacity: 1, y: 0 } : false,
          transition: { duration: 0.75, delay: 0.3, ease: ease$b },
          className: "text-center pt-8",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-16 md:gap-24 mb-6", children: /* @__PURE__ */ jsx(CapStat, { end: 14, suffix: "%", label: "TIME SAVINGS", inView }) }),
            /* @__PURE__ */ jsx("p", { className: "max-w-[700px] mx-auto", style: { fontSize: "1rem", color: "rgba(239,236,227,.85)", lineHeight: 1.6 }, children: "We handle it from start to finish. Every project requires a consultation because every project is different. Less stress. Less confusion. More money in your pocket." })
          ]
        }
      )
    ] }) })
  ] });
};
const ritzCarlton = "/assets/ritz-carlton-BC8_pOkW.png";
const discoveryChannel = "/assets/discovery-channel-DrwVHaPd.png";
const pgaTour = "/assets/pga-tour-B90bA1qL.png";
const architecturalDigest = "/assets/architectural-digest-DuFnHwfd.png";
const shelby = "/assets/shelby-B-8CSwXE.png";
const lacma = "/assets/lacma-Dv1b60h2.png";
const hgtv = "/assets/hgtv-CkRf6Cjw.png";
const planetGreen = "/assets/planet-green-BtPpLdiQ.png";
const diyNetwork = "/assets/diy-network-CsSScfcu.png";
const oakley = "/assets/oakley-BoGXNFOv.png";
const forbes = "/assets/forbes-DiguZep2.png";
const marucci = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAiYAAACICAYAAADTRyDxAAAKIklEQVR4nO3dW1IcSRIFUISxhdr/AlkEYzVjstYIWiKzKiOuu5/z2d3WeNx4eSUJ/Pj4+HgBAEjwursAAICfNCYAQAyNCQAQQ2MCAMR4210AAJDjdrst+6mY9/f3H7//M09MAIAYGhMAIIbGBABY/m2cf6MxAQBiaEwAgOW+evH1TmMCAMTQmAAAMTQmAMBLwouvdxoTACDi/ZI7jQkAEENjAgDE0JgAADE0JgAw3C3kxdc7jQkAEPHi653GBACIoTEBAGJoTABgsFvQ+yV3GhMAIIbGBACIePH1TmMCAMTQmAAAMTQmAEDEt3Hufnx8RL2MCwAM5okJABBDYwIAxNCYAAAxNCYAQIy33QVU+pW8332jeMevCV5dW+Vfl9w5q1X5y3D2fpo2/zJba+xP5Ty60K5aZM+6hKtugl1/s6FqXlOadGrspw7rQmb7jWtMUj99X7UZ0hd92h+PqpLbFTyh6yFlT1VaIzIb1pismPDvTOaVdTyymFZtiKQFn3IIJOSWsD/O1PDdXFbO9Zm5Sq+vw55KOnt+NT2zW/CTofbvmKwI/+fXOBL86kVx/3q7D4jkg+CZc3v0/71Tl6bkjPT6uozhyj10hszytf6pnNQFuKuunV83dS6+q3r9HefkVxMP8Grzl1BvQg2d633W/ry0MZl2EX7na+5eaCu/frfLr8tYuoxjauNUeV9NuxOm135WuycmuyfwT19/d207vr3VTbVx/X4hVquf/9dh/lZftB0y6zSOEY3Jrwdv8sSl1XZVPRO6+6rjcxnUJtPjZFYzl/KNSWLQv9eSVNuVpozzGWPd8fLzM/4/Xd7lqLRWuzb7V45JZrW1aEySJ2tKbcnjnK773HRplibO3RXjk1n9/flaPbzUSerasX9lyjirjbvzhV2JeYCBT0zYJ/1yns781DVl7jy5Pe7WfJwaE07rvjmqm/b7cjqR4XEy65OTxgQWq3AwdP6WRHr+6fVdodrL5AluBcZ89sx4nRoYjzHH/yOHvdKbpfT6IJEnJhzmMoZr2FvHyawfjQlAABfscTLrmZfGhJYLO1X3/NLHl14f8PLytrsA6th5qH/ne/UunVnvSiTWdJa1e5zMXv6bQeo+eKSupzcmFgu7Fvf9v7X+SJF6YXynzl1/nV1m3Hliwrfs2HRVDil4xK4L7U/76+e/c9n+P5mt0fYdk+RL7V5bQn0JNTy7tuQxQYKU8+cRqy9/ma3V5onJV4smqYP9U30pNXKtqnP83QM5fXzp9SXy7dHjZPa48o3Jdw7NnQulepe969PJyq9HPV3WiL11nMzyPZrZU7+Vo0s8z+KvybxRZV0k1lSpPtYp/Y5J+kJOry+RzIAU6efRe3h94xqToxOyegLTF0yX9wbIYJ0cJ7PjZDYjt7KNCVTagKl1VW+wu+f/LF3mcSWZ7cvtaY3J9I3P4xwEdFgn6fUd4Vw/TmaPK/9TOV0WS3p91L6AjtZa6bdwAr2UbEzSD8z0+rrS3H3mF9VlslaPk9mc3LxjMlDipfNoTcmbr/vv0EnOvkJ9ZJ5J6d4bZ1byiQnrVFj8Lp6a83ZG13FdSWbHyWxvbq8TLob0+jjP3H7mUN1H9vA4T0wCuFzrZeYCArhGucYk/UJIr6+63Q1JOusvnzV8fM3K7JyquZVrTJh5cVXdYFXr7jK+9PquVnW/M3teNSZEmn6hMO8wTjQx80fHPDGzZ4/7rfsFkl4f/zBXj5l6IKaQPwx8YtJx40++jKuOveM6ZI2qax5WKtWYpEu/sBLqczD3YS5ZwTqbl5vGhMtV3iCPmDruFNPzT/ggUo3MMnJ7qDGZvvH5d9bGWt0P1PTxpdcHlbR+YpJ+OabXd0bHMf3KBQRwrTKNSfqFkF7f1bo3JPAoe+Q4mc1UpjEhs3FycMzMpfv4oLJb8f2pMWHkwqe36etz+hPcM2SWk9vpvy48feNPZu6zdD9Q08eXXh9U0/aJSfrlmV5fl5qfyQUEcL3TT0xWSr8Q0ut7hulNCTzC/jlOZnNzK9GYsLdx6rDQV+qeV/r40uu72oQPSvSmMaHcIX8/eB2+M5hnVrDOsnJ763JZVaqvirQcHR6fyWQv+cPAl187bvy0Cz+9xoQ1kFADwATxjUm69AvrTH0JTUl6rlMlrI1qZHaczGbnpjEhamFXb0h25zfd9Pyr758dZNagMZm+8ck4HKzD/gdq+vjS6ztjxb7qltuqs+g9LLcr62n3UznpF1ZyfbtqS9tw1eqDSvs/+QycPJYk0Y1J+oWQXl8FMqQzF9dxMsM7Jo0dufRXHwYdG5LuB2r38bFGx72fkNmt0f6MfmLCGpoSOuh0MJ9hXx0ns8zcDjUm0zc+GazD/gdq+vjS6zvKnjpOZtdp9cQkfaGk17dCtQO9Wr0A1cU2JukXQnp9ic1Sl8zgO3wQOX4GyOyzae+XRDcmPEYTsFa3g6Ha+NLru5r9Ticak8EqHuYVa+YYlywrWGe5ub12uRDS65vOIfA8styrW/5Tf3PpI2Q28IlJx8nQONXTcR0CpItsTNKlX1hdX5aqWHMHcj9OZsfJ7Jxbw9w0JvCgjgdDJfI/T3bHyex6GhNKcBjUeFrHehXWRFqNafVUqfF9UU2vHS4F9cFM/pzCec4lUsU9Mem08VNVO5B21Gsd5qu2jqnPmhvamKRLv7DS6zvKQbBXav6pdVXJYvpvfO6S2a3pPtCYsETXDdR1XKmZ3v9deubp9UF6g/n2t//AJmMH667GJ89J898lf5/8j0uvr5u/Nibp0hdMen07svjTYZWQV5cLiDnu+8YfyOuR2bvzJ6sxSZ+Q9PqqcEDC9fvqfl7Za30zuxWp8wzvmDSicVqr88EwYXzd7Z6/I+dRytlVKbPONCYAT+RyoZv3xWv6Nbl7/Jv0+uBZXHZ7yf8YeR0ns8AnJh0nReNUT8d1CCvZQ7RpTNKlb7b0+gB4zvl9a/6hV2MCJ3Q/GOAMH5COk9lnGhOAJ5t42Tw6Zpllet9Q42vVT4Tp9SWrsBn4h/naS/5/J6PjZBb+xKTjBGmc6um4DjtLn6/0+hLJjJjGJF36Zkmvj5qS11Wl39DZXfI66ZjZbcC615gMVeEwudeYWOeEgyFZ4proUGvK/pRZjl21ftmYOHhnSN4gybVNymH3199dzzO+XlqGz3D1mGQ2W8knJumNU3p96WxgvmJdZDAPx8msWGOSPmHp9XUb3856NJS5ayShhkmP8BPGILO5Z9T2xoTHdHnUXOUQmnIw/G7n3Hz1tavOQ4U1XmH+K6hadwKNCVs3UZWGhD3vd3RcG5XGlDIHCTVUy+xRO8fw4+Pj8wePVZ9Gzg5cfdcunMT6V9T03XoS81np6vGnzMOK/BOf/KSuu5+mZ3YbcP582ZjAVYs//dBj7xqZvD52XrhVc5dZTxoTLt/8NnB/j6wR66Pn06DVZNaHxgQAiOHlVwAghsYEAIihMQEAYmhMAICXFP8BDRQ/Uz4iyFcAAAAASUVORK5CYII=";
const builderMagazine = "/assets/builder-magazine-CwJSZlui.png";
const fox = "/assets/fox-BuxMQH3m.png";
const maya = "/assets/maya-v7pnuLWg.png";
const kellerWilliams = "/assets/keller-williams-BIcORWOv.png";
const zillow = "/assets/zillow-rlV3J0xi.png";
const usNews = "/assets/us-news-DvTx6Kym.png";
const robbReport = "/assets/robb-report-Uw_NynVN.png";
const laTimes = "/assets/la-times-RTkYLatW.png";
const ease$a = [0.16, 1, 0.3, 1];
const partners = [
  { name: "The Ritz-Carlton", logo: ritzCarlton },
  { name: "Discovery Channel", logo: discoveryChannel },
  { name: "PGA Tour", logo: pgaTour },
  { name: "Architectural Digest", logo: architecturalDigest },
  { name: "Shelby", logo: shelby },
  { name: "LACMA", logo: lacma },
  { name: "HGTV", logo: hgtv },
  { name: "Planet Green", logo: planetGreen },
  { name: "DIY Network", logo: diyNetwork },
  { name: "Oakley", logo: oakley },
  { name: "Forbes", logo: forbes },
  { name: "Marucci", logo: marucci },
  { name: "Builder Magazine", logo: builderMagazine },
  { name: "Fox Racing", logo: fox },
  { name: "Maya Day + Night", logo: maya, invert: true },
  { name: "Keller Williams", logo: kellerWilliams },
  { name: "Zillow", logo: zillow },
  { name: "U.S. News", logo: usNews },
  { name: "Robb Report", logo: robbReport },
  { name: "Los Angeles Times", logo: laTimes }
];
const PartnerItem = ({ partner }) => /* @__PURE__ */ jsxs("div", { role: "img", "aria-label": partner.name, className: "v2-partner relative flex items-center justify-center w-full max-w-[200px]", children: [
  /* @__PURE__ */ jsx("img", { src: partner.logo, alt: "", "aria-hidden": "true", style: { height: "76px", maxWidth: "100%", width: "auto", objectFit: "contain", visibility: "hidden" } }),
  /* @__PURE__ */ jsx(
    "span",
    {
      className: "v2-partner-fill absolute inset-0",
      style: {
        WebkitMaskImage: `url(${partner.logo})`,
        maskImage: `url(${partner.logo})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center"
      }
    }
  )
] });
const PartnersPress = () => {
  const { ref, inView } = useInView(0.1);
  return /* @__PURE__ */ jsx("section", { ref, className: "v2-light pt-16 pb-12 md:pt-20 md:pb-10", style: { background: "var(--v2-villa)" }, children: /* @__PURE__ */ jsx("div", { className: "max-w-[1400px] mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 25 },
      animate: inView ? { opacity: 1, y: 0 } : false,
      transition: { duration: 0.75, ease: ease$a },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative mb-16 md:mb-[144px] md:flex md:justify-between md:gap-10", style: { alignItems: "last baseline" }, children: [
          /* @__PURE__ */ jsxs("h2", { className: "v2-headline v2-h2-match relative", style: { color: "var(--v2-deep)" }, children: [
            "WHO WE HAVE",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { style: { color: "#5E5345" }, children: "WORKED WITH" }),
            /* @__PURE__ */ jsx("span", { className: "v2-neon-period", style: { color: "#5E5345" }, children: "." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "v2-ghost-text text-right hidden md:block md:-mr-6", style: { position: "static", fontSize: "min(4.4vw, 78px)", lineHeight: 1, color: "rgba(15,26,20,.08)" }, children: [
            "PARTNERS",
            /* @__PURE__ */ jsx("br", {}),
            "& PRESS"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 items-center justify-items-center gap-x-8 gap-y-12 md:gap-x-16 md:gap-y-16", children: partners.map((p) => /* @__PURE__ */ jsx(PartnerItem, { partner: p }, p.name)) })
      ]
    }
  ) }) });
};
const ease$9 = [0.16, 1, 0.3, 1];
const markets = [
  { city: "Phoenix", state: "ARIZONA", desc: "Home base. 25+ years of boots on the ground." },
  { city: "Las Vegas", state: "NEVADA", desc: "Active projects. Direct SABS™ supply chain." },
  { city: "Los Angeles", state: "CALIFORNIA", desc: "Fire reconstruction. Fresh perspective, no local bias." }
];
const Markets = () => {
  const { ref, inView } = useInView(0.15);
  return /* @__PURE__ */ jsx("section", { ref, className: "relative py-20 md:py-28", style: { background: "var(--v2-green)" }, children: /* @__PURE__ */ jsx("div", { className: "max-w-[1400px] mx-auto px-6 md:px-12 text-center", children: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 35 },
        animate: inView ? { opacity: 1, y: 0 } : false,
        transition: { duration: 0.75, ease: ease$9 },
        className: "mb-12",
        children: [
          /* @__PURE__ */ jsx("div", { className: "v2-label mb-6", children: "Markets" }),
          /* @__PURE__ */ jsxs("h2", { className: "v2-headline text-4xl md:text-6xl lg:text-7xl mb-4", style: { color: "var(--v2-white)" }, children: [
            "THREE MARKETS.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "ONE STANDARD" }),
            /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "max-w-[700px] mx-auto", style: { fontSize: "1.1rem", color: "rgba(239,236,227,.85)", lineHeight: 1.7 }, children: "Same climate conditions. Same material challenges. Same level of oversight. We serve property owners across the Sun Belt with SABS™ technology and project advocacy you can trust." })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 35 },
        animate: inView ? { opacity: 1, y: 0 } : false,
        transition: { duration: 0.75, delay: 0.15, ease: ease$9 },
        className: "grid grid-cols-1 md:grid-cols-3 gap-6",
        children: markets.map((m) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "p-8 text-center transition-all duration-300 cursor-pointer",
            style: { background: "rgba(0,0,0,.15)", border: "1px solid rgba(239,236,227,.1)" },
            children: [
              /* @__PURE__ */ jsx("h3", { style: { fontFamily: "var(--v2-font-body)", fontSize: "1.5rem", fontWeight: 600, color: "var(--v2-white)" }, children: m.city }),
              /* @__PURE__ */ jsx("span", { className: "v2-label block mt-1", style: { fontSize: "1rem" }, children: m.state }),
              /* @__PURE__ */ jsx("p", { className: "mt-3", style: { fontSize: "1rem", color: "rgba(239,236,227,.85)", lineHeight: 1.5 }, children: m.desc })
            ]
          },
          m.city
        ))
      }
    )
  ] }) }) });
};
const ease$8 = [0.16, 1, 0.3, 1];
const faqs = [
  {
    question: "What is an owner's representative in construction?",
    answer: "An owner's representative is a professional who advocates exclusively for the property owner during a construction project. They oversee contractors, review budgets and change orders, coordinate insurance claims, and ensure the project stays on schedule and on budget. Unlike a general contractor who manages the build, an owner's rep protects the owner's financial and legal interests throughout the entire process."
  },
  {
    question: "Why do I need an owner's rep for my construction project?",
    answer: "Because the people building your project are not paid to protect your interests. They are paid to finish the job. An owner’s rep sits on your side of the table, reviewing bids, catching red flags, negotiating change orders, and making sure every dollar goes where it should. It is the difference between hoping the build goes well and knowing someone is watching every line item."
  },
  {
    question: "What areas does LÏEF Builders serve?",
    answer: "LÏEF Builders serves property owners in Phoenix and Greater Arizona, Las Vegas and Nevada, and Los Angeles and Southern California. The team has completed projects across these markets, ranging from luxury residential builds to large-scale commercial developments and disaster recovery rebuilds."
  },
  {
    question: "How does LÏEF Builders save clients money on construction projects?",
    answer: "Three ways. First, contract negotiation: the team reviews every scope, bid, and vendor agreement before you sign anything. Second, ongoing site oversight: regular inspections catch problems when they are cheap to fix, not after they have become six-figure change orders. Third, vendor and material verification: confirming that pricing, quantities, and specs match what was agreed to."
  },
  {
    question: "What is SABS construction technology?",
    answer: "SABS stands for Saebi Alternative Building System. Think of it as the next generation of how buildings get built. EPS foam panels, which LÏEF calls LÏEF Blocks, are coated with SABSCRETE, a high-strength cementitious composite, to form a single monolithic structure. The result: 0% flame spread, 250 MPH wind resistance, R-75 to R-100 insulation, and complete mold and termite immunity. It builds faster and costs 15-20% less than traditional methods. LÏEF is the leading SABS builder in Arizona and offers it alongside conventional framing so clients get the right system for their project."
  }
];
const FAQAccordion = ({ item, index, isOpen, onToggle }) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "py-6",
      style: { borderTop: "1px solid var(--v2-rule)" },
      children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: onToggle,
            className: "w-full flex items-start justify-between text-left gap-4 group cursor-pointer",
            children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  style: {
                    fontFamily: "var(--v2-font-body)",
                    fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                    fontWeight: 500,
                    color: "var(--v2-white)",
                    lineHeight: 1.4
                  },
                  children: item.question
                }
              ),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "shrink-0 mt-1 transition-transform duration-300",
                  style: {
                    color: "var(--v2-neon)",
                    fontSize: "1.5rem",
                    lineHeight: 1,
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)"
                  },
                  children: "+"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.35, ease: ease$8 },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsx(
              "p",
              {
                className: "pt-4",
                style: {
                  fontFamily: "var(--v2-font-body)",
                  fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                  color: "var(--v2-white)",
                  opacity: 0.7,
                  lineHeight: 1.7,
                  maxWidth: "48rem"
                },
                children: item.answer
              }
            )
          }
        ) })
      ]
    }
  );
};
const FAQ = () => {
  const { ref, inView } = useInView(0.1);
  const [openIndex, setOpenIndex] = useState(null);
  return /* @__PURE__ */ jsx("section", { id: "faq", className: "relative py-20 md:py-28", style: { background: "var(--v2-deep)" }, children: /* @__PURE__ */ jsxs("div", { ref, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 35 },
        animate: inView ? { opacity: 1, y: 0 } : false,
        transition: { duration: 0.75, ease: ease$8 },
        className: "relative mb-12",
        children: [
          /* @__PURE__ */ jsx("div", { className: "v2-ghost-text absolute top-0 right-0 md:-right-6", style: { fontSize: "min(7vw, 120px)", lineHeight: 1, color: "rgba(194,184,167,.6)" }, children: "FAQ" }),
          /* @__PURE__ */ jsx("div", { className: "v2-label mb-6", children: "Common Questions" }),
          /* @__PURE__ */ jsxs("h2", { className: "v2-headline text-4xl md:text-6xl lg:text-7xl mb-4", style: { color: "var(--v2-white)" }, children: [
            "ANSWERS",
            /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 35 },
        animate: inView ? { opacity: 1, y: 0 } : false,
        transition: { duration: 0.75, delay: 0.2, ease: ease$8 },
        children: faqs.map((faq, i) => /* @__PURE__ */ jsx(
          FAQAccordion,
          {
            item: faq,
            index: i,
            isOpen: openIndex === i,
            onToggle: () => setOpenIndex(openIndex === i ? null : i)
          },
          i
        ))
      }
    )
  ] }) });
};
const LEAD_URL = "/api/lead";
const ease$7 = [0.16, 1, 0.3, 1];
const Contact = () => {
  const { ref, inView } = useInView(0.1);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [honeypot, setHoneypot] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(LEAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          message: form.message,
          page: window.location.pathname,
          website: honeypot
        })
      });
      if (!res.ok) throw new Error("lead " + res.status);
      setStatus("sent");
      setForm({ firstName: "", lastName: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };
  const inputStyle2 = {
    width: "100%",
    padding: "12px 16px",
    background: "var(--v2-villa)",
    border: "1px solid var(--v2-villa)",
    color: "var(--v2-deep)",
    fontFamily: "var(--v2-font-body)",
    fontSize: "1rem",
    outline: "none"
  };
  const labelStyle2 = {
    fontSize: "1rem",
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: "var(--v2-muted)",
    marginBottom: "8px",
    display: "block"
  };
  return /* @__PURE__ */ jsx("section", { id: "contact", className: "relative py-20 md:py-28", style: { background: "var(--v2-deep)" }, children: /* @__PURE__ */ jsx("div", { ref, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 35 },
        animate: inView ? { opacity: 1, y: 0 } : false,
        transition: { duration: 0.75, ease: ease$7 },
        className: "text-center mb-12",
        children: [
          /* @__PURE__ */ jsxs("h2", { className: "v2-headline text-4xl md:text-6xl lg:text-7xl mb-4", style: { color: "var(--v2-white)" }, children: [
            "LET'S",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "BUILD" }),
            /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "max-w-[920px] mx-auto", style: { fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.6 }, children: "Whether you're a property owner or a developer, we'd like to hear from you. We also work closely with insurance adjusters and legal teams." })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 35 },
        animate: inView ? { opacity: 1, y: 0 } : false,
        transition: { duration: 0.75, delay: 0.15, ease: ease$7 },
        className: "grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsx("span", { style: labelStyle2, children: "VISIT US" }),
              /* @__PURE__ */ jsxs("p", { style: { fontSize: "1.1rem", color: "var(--v2-white)" }, children: [
                "8271 E Gelding Dr.",
                /* @__PURE__ */ jsx("br", {}),
                "Scottsdale, AZ 85260"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsx("span", { style: labelStyle2, children: "CALL US" }),
              /* @__PURE__ */ jsx("a", { href: "tel:8057227598", style: { fontSize: "1.1rem", color: "var(--v2-white)", textDecoration: "none" }, children: "(805) 722-7598" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsx("span", { style: labelStyle2, children: "EMAIL US" }),
              /* @__PURE__ */ jsx("a", { href: "mailto:hello@liefdev.com", style: { fontSize: "1.1rem", color: "var(--v2-white)", textDecoration: "none" }, children: "hello@liefdev.com" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-6 md:mt-auto", style: { background: "rgba(239,236,227,.05)", border: "1px solid var(--v2-rule)" }, children: [
              /* @__PURE__ */ jsx("span", { className: "v2-label block mb-4", style: { fontSize: "1rem" }, children: "MARKETS SERVED" }),
              ["Phoenix & Greater Arizona", "Las Vegas, Nevada", "Los Angeles & Southern California"].map((m) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 py-2", children: [
                /* @__PURE__ */ jsx(Check, { size: 16, style: { color: "var(--v2-neon)" } }),
                /* @__PURE__ */ jsx("span", { style: { fontSize: "1rem", color: "var(--v2-muted)" }, children: m })
              ] }, m))
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "v2-form-card p-6 md:p-8", style: { border: "1px solid var(--v2-rule)" }, children: [
            /* @__PURE__ */ jsx("h3", { className: "v2-headline mb-6", style: { fontSize: "1.1rem", letterSpacing: "0.1em" }, children: "START YOUR PROJECT" }),
            status === "sent" ? /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
              /* @__PURE__ */ jsx("h4", { className: "v2-headline mb-3", style: { fontSize: "1.2rem", letterSpacing: "0.1em", color: "var(--v2-white)" }, children: "MESSAGE SENT" }),
              /* @__PURE__ */ jsx("p", { style: { fontSize: "1rem", color: "var(--v2-dim)", lineHeight: 1.6 }, children: "We'll be in touch shortly." })
            ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { style: labelStyle2, children: "FIRST NAME" }),
                  /* @__PURE__ */ jsx("input", { required: true, style: inputStyle2, value: form.firstName, onChange: (e) => setForm({ ...form, firstName: e.target.value }) })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { style: labelStyle2, children: "LAST NAME" }),
                  /* @__PURE__ */ jsx("input", { required: true, style: inputStyle2, value: form.lastName, onChange: (e) => setForm({ ...form, lastName: e.target.value }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { style: labelStyle2, children: "EMAIL" }),
                /* @__PURE__ */ jsx("input", { required: true, type: "email", style: inputStyle2, value: form.email, onChange: (e) => setForm({ ...form, email: e.target.value }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { style: labelStyle2, children: "MESSAGE" }),
                /* @__PURE__ */ jsx("textarea", { rows: 4, style: inputStyle2, value: form.message, onChange: (e) => setForm({ ...form, message: e.target.value }) })
              ] }),
              status === "error" && /* @__PURE__ */ jsx("p", { style: { fontSize: "1rem", color: "#ff4444" }, children: "Something went wrong. Please try again." }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: status === "sending",
                  className: "v2-send w-full transition-all duration-300",
                  style: {
                    fontFamily: "var(--v2-font-body)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    background: "var(--v2-loggia)",
                    color: "var(--v2-deep)",
                    border: "1px solid var(--v2-loggia)",
                    padding: "14px 24px",
                    cursor: status === "sending" ? "wait" : "pointer",
                    opacity: status === "sending" ? 0.7 : 1
                  },
                  children: status === "sending" ? "Sending..." : "Send Message"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "website",
                  tabIndex: -1,
                  autoComplete: "off",
                  "aria-hidden": "true",
                  value: honeypot,
                  onChange: (e) => setHoneypot(e.target.value),
                  style: { position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] }) }) });
};
const Home = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx(Hero, {}),
  /* @__PURE__ */ jsx(StatsTicker, {}),
  /* @__PURE__ */ jsx(Services, {}),
  /* @__PURE__ */ jsx(AlignmentBanner, {}),
  /* @__PURE__ */ jsx(Capabilities, {}),
  /* @__PURE__ */ jsx(PartnersPress, {}),
  /* @__PURE__ */ jsx(Markets, {}),
  /* @__PURE__ */ jsx(FAQ, {}),
  /* @__PURE__ */ jsx(Contact, {})
] });
const ease$6 = [0.16, 1, 0.3, 1];
const aiCapabilities = [
  "Change Order Management & Negotiation",
  "Plan & Specification Clarification",
  "Estimating Verification & Audit",
  "Budget Tracking & Variance Analysis",
  "Schedule Optimization & Monitoring",
  "Document Analysis & Compliance Review",
  "Vendor & Material Price Verification",
  "Insurance Claim Documentation"
];
const AISection = () => {
  const { ref, inView } = useInView(0.1);
  return /* @__PURE__ */ jsx("section", { id: "technology", className: "relative py-20 md:py-28", style: { background: "var(--v2-deep)" }, children: /* @__PURE__ */ jsx("div", { ref, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 35 },
        animate: inView ? { opacity: 1, y: 0 } : false,
        transition: { duration: 0.75, ease: ease$6 },
        className: "relative mb-12",
        children: [
          /* @__PURE__ */ jsx("div", { className: "v2-ghost-text absolute top-0 right-0 md:-right-6", style: { fontSize: "min(9.6vw, 120px)", lineHeight: 1, color: "rgba(194,184,167,.6)" }, children: "TECH" }),
          /* @__PURE__ */ jsx("div", { className: "v2-label mb-6", children: "The Edge" }),
          /* @__PURE__ */ jsxs("h2", { className: "v2-headline text-4xl md:text-6xl lg:text-7xl mb-4", style: { color: "var(--v2-white)" }, children: [
            "AI-POWERED",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "OVERSIGHT" }),
            /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 25 },
            animate: inView ? { opacity: 1, y: 0 } : false,
            transition: { duration: 0.75, delay: 0.1, ease: ease$6 },
            className: "mb-4",
            style: { fontSize: "1.1rem", color: "var(--v2-muted)", lineHeight: 1.7 },
            children: "Our team is heavily trained in the latest artificial intelligence and machine learning tools. You're not just getting human expertise. You're armed with an AI agent team that accelerates every phase of your project."
          }
        ),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 25 },
            animate: inView ? { opacity: 1, y: 0 } : false,
            transition: { duration: 0.75, delay: 0.15, ease: ease$6 },
            className: "mb-8",
            style: { fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.7 },
            children: "From automated change order analysis to real-time budget tracking, our AI tools catch discrepancies that manual review misses, faster and with greater precision."
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 25 },
            animate: inView ? { opacity: 1, y: 0 } : false,
            transition: { duration: 0.75, delay: 0.2, ease: ease$6 },
            className: "grid grid-cols-1 sm:grid-cols-2 gap-x-8",
            children: aiCapabilities.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 py-3", style: { borderBottom: "1px solid var(--v2-rule)" }, children: [
              /* @__PURE__ */ jsx(Check, { size: 16, style: { color: "var(--v2-neon)", flexShrink: 0, marginTop: 4 } }),
              /* @__PURE__ */ jsx("span", { style: { fontSize: "1rem", color: "var(--v2-white)" }, children: item })
            ] }, item))
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 35 },
          animate: inView ? { opacity: 1, y: 0 } : false,
          transition: { duration: 0.75, delay: 0.25, ease: ease$6 },
          className: "flex flex-col gap-6",
          children: /* @__PURE__ */ jsxs("div", { className: "p-8 md:p-10", style: { background: "rgba(239,236,227,.05)", border: "1px solid var(--v2-rule)" }, children: [
            /* @__PURE__ */ jsx("p", { style: { fontStyle: "italic", fontSize: "1rem", color: "var(--v2-white)", lineHeight: 1.7 }, children: `"Think of it like a cop up the road with a radar gun. Are you gonna speed? The answer is no. That's what an owner's rep does. The contractors aren't going to cut corners because they know they'll get caught. That accountability alone saves you multiples of our fee."` }),
            /* @__PURE__ */ jsx("p", { className: "mt-4", style: { fontSize: "1rem", color: "var(--v2-neon)", textTransform: "uppercase", letterSpacing: "0.12em" } })
          ] })
        }
      )
    ] })
  ] }) }) });
};
const TechnologyPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "pt-16 md:pt-20", children: [
    /* @__PURE__ */ jsx("h1", { className: "sr-only", children: "Our Technology" }),
    /* @__PURE__ */ jsx(AISection, {})
  ] });
};
const logoRitzCarlton = "/assets/ritz-carlton-BC8_pOkW.png";
const logoDiscovery = "/assets/discovery-channel-DrwVHaPd.png";
const logoPgaTour = "/assets/pga-tour-B90bA1qL.png";
const logoAD = "/assets/architectural-digest-DuFnHwfd.png";
const logoCobra = "/assets/shelby-B-8CSwXE.png";
const logoLacma = "/assets/lacma-Dv1b60h2.png";
const logoHgtv = "/assets/hgtv-CkRf6Cjw.png";
const logoPlanetGreen = "/assets/planet-green-BtPpLdiQ.png";
const logoDiy = "/assets/diy-network-CsSScfcu.png";
const logoOakley = "/assets/oakley-BoGXNFOv.png";
const logoForbes = "/assets/forbes-DiguZep2.png";
const logoMarucci = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAiYAAACICAYAAADTRyDxAAAKIklEQVR4nO3dW1IcSRIFUISxhdr/AlkEYzVjstYIWiKzKiOuu5/z2d3WeNx4eSUJ/Pj4+HgBAEjwursAAICfNCYAQAyNCQAQQ2MCAMR4210AAJDjdrst+6mY9/f3H7//M09MAIAYGhMAIIbGBABY/m2cf6MxAQBiaEwAgOW+evH1TmMCAMTQmAAAMTQmAMBLwouvdxoTACDi/ZI7jQkAEENjAgDE0JgAADE0JgAw3C3kxdc7jQkAEPHi653GBACIoTEBAGJoTABgsFvQ+yV3GhMAIIbGBACIePH1TmMCAMTQmAAAMTQmAEDEt3Hufnx8RL2MCwAM5okJABBDYwIAxNCYAAAxNCYAQIy33QVU+pW8332jeMevCV5dW+Vfl9w5q1X5y3D2fpo2/zJba+xP5Ty60K5aZM+6hKtugl1/s6FqXlOadGrspw7rQmb7jWtMUj99X7UZ0hd92h+PqpLbFTyh6yFlT1VaIzIb1pismPDvTOaVdTyymFZtiKQFn3IIJOSWsD/O1PDdXFbO9Zm5Sq+vw55KOnt+NT2zW/CTofbvmKwI/+fXOBL86kVx/3q7D4jkg+CZc3v0/71Tl6bkjPT6uozhyj10hszytf6pnNQFuKuunV83dS6+q3r9HefkVxMP8Grzl1BvQg2d633W/ry0MZl2EX7na+5eaCu/frfLr8tYuoxjauNUeV9NuxOm135WuycmuyfwT19/d207vr3VTbVx/X4hVquf/9dh/lZftB0y6zSOEY3Jrwdv8sSl1XZVPRO6+6rjcxnUJtPjZFYzl/KNSWLQv9eSVNuVpozzGWPd8fLzM/4/Xd7lqLRWuzb7V45JZrW1aEySJ2tKbcnjnK773HRplibO3RXjk1n9/flaPbzUSerasX9lyjirjbvzhV2JeYCBT0zYJ/1yns781DVl7jy5Pe7WfJwaE07rvjmqm/b7cjqR4XEy65OTxgQWq3AwdP6WRHr+6fVdodrL5AluBcZ89sx4nRoYjzHH/yOHvdKbpfT6IJEnJhzmMoZr2FvHyawfjQlAABfscTLrmZfGhJYLO1X3/NLHl14f8PLytrsA6th5qH/ne/UunVnvSiTWdJa1e5zMXv6bQeo+eKSupzcmFgu7Fvf9v7X+SJF6YXynzl1/nV1m3Hliwrfs2HRVDil4xK4L7U/76+e/c9n+P5mt0fYdk+RL7V5bQn0JNTy7tuQxQYKU8+cRqy9/ma3V5onJV4smqYP9U30pNXKtqnP83QM5fXzp9SXy7dHjZPa48o3Jdw7NnQulepe969PJyq9HPV3WiL11nMzyPZrZU7+Vo0s8z+KvybxRZV0k1lSpPtYp/Y5J+kJOry+RzIAU6efRe3h94xqToxOyegLTF0yX9wbIYJ0cJ7PjZDYjt7KNCVTagKl1VW+wu+f/LF3mcSWZ7cvtaY3J9I3P4xwEdFgn6fUd4Vw/TmaPK/9TOV0WS3p91L6AjtZa6bdwAr2UbEzSD8z0+rrS3H3mF9VlslaPk9mc3LxjMlDipfNoTcmbr/vv0EnOvkJ9ZJ5J6d4bZ1byiQnrVFj8Lp6a83ZG13FdSWbHyWxvbq8TLob0+jjP3H7mUN1H9vA4T0wCuFzrZeYCArhGucYk/UJIr6+63Q1JOusvnzV8fM3K7JyquZVrTJh5cVXdYFXr7jK+9PquVnW/M3teNSZEmn6hMO8wTjQx80fHPDGzZ4/7rfsFkl4f/zBXj5l6IKaQPwx8YtJx40++jKuOveM6ZI2qax5WKtWYpEu/sBLqczD3YS5ZwTqbl5vGhMtV3iCPmDruFNPzT/ggUo3MMnJ7qDGZvvH5d9bGWt0P1PTxpdcHlbR+YpJ+OabXd0bHMf3KBQRwrTKNSfqFkF7f1bo3JPAoe+Q4mc1UpjEhs3FycMzMpfv4oLJb8f2pMWHkwqe36etz+hPcM2SWk9vpvy48feNPZu6zdD9Q08eXXh9U0/aJSfrlmV5fl5qfyQUEcL3TT0xWSr8Q0ut7hulNCTzC/jlOZnNzK9GYsLdx6rDQV+qeV/r40uu72oQPSvSmMaHcIX8/eB2+M5hnVrDOsnJ763JZVaqvirQcHR6fyWQv+cPAl187bvy0Cz+9xoQ1kFADwATxjUm69AvrTH0JTUl6rlMlrI1qZHaczGbnpjEhamFXb0h25zfd9Pyr758dZNagMZm+8ck4HKzD/gdq+vjS6ztjxb7qltuqs+g9LLcr62n3UznpF1ZyfbtqS9tw1eqDSvs/+QycPJYk0Y1J+oWQXl8FMqQzF9dxMsM7Jo0dufRXHwYdG5LuB2r38bFGx72fkNmt0f6MfmLCGpoSOuh0MJ9hXx0ns8zcDjUm0zc+GazD/gdq+vjS6zvKnjpOZtdp9cQkfaGk17dCtQO9Wr0A1cU2JukXQnp9ic1Sl8zgO3wQOX4GyOyzae+XRDcmPEYTsFa3g6Ha+NLru5r9Ticak8EqHuYVa+YYlywrWGe5ub12uRDS65vOIfA8styrW/5Tf3PpI2Q28IlJx8nQONXTcR0CpItsTNKlX1hdX5aqWHMHcj9OZsfJ7Jxbw9w0JvCgjgdDJfI/T3bHyex6GhNKcBjUeFrHehXWRFqNafVUqfF9UU2vHS4F9cFM/pzCec4lUsU9Mem08VNVO5B21Gsd5qu2jqnPmhvamKRLv7DS6zvKQbBXav6pdVXJYvpvfO6S2a3pPtCYsETXDdR1XKmZ3v9deubp9UF6g/n2t//AJmMH667GJ89J898lf5/8j0uvr5u/Nibp0hdMen07svjTYZWQV5cLiDnu+8YfyOuR2bvzJ6sxSZ+Q9PqqcEDC9fvqfl7Za30zuxWp8wzvmDSicVqr88EwYXzd7Z6/I+dRytlVKbPONCYAT+RyoZv3xWv6Nbl7/Jv0+uBZXHZ7yf8YeR0ns8AnJh0nReNUT8d1CCvZQ7RpTNKlb7b0+gB4zvl9a/6hV2MCJ3Q/GOAMH5COk9lnGhOAJ5t42Tw6Zpllet9Q42vVT4Tp9SWrsBn4h/naS/5/J6PjZBb+xKTjBGmc6um4DjtLn6/0+hLJjJjGJF36Zkmvj5qS11Wl39DZXfI66ZjZbcC615gMVeEwudeYWOeEgyFZ4proUGvK/pRZjl21ftmYOHhnSN4gybVNymH3199dzzO+XlqGz3D1mGQ2W8knJumNU3p96WxgvmJdZDAPx8msWGOSPmHp9XUb3856NJS5ayShhkmP8BPGILO5Z9T2xoTHdHnUXOUQmnIw/G7n3Hz1tavOQ4U1XmH+K6hadwKNCVs3UZWGhD3vd3RcG5XGlDIHCTVUy+xRO8fw4+Pj8wePVZ9Gzg5cfdcunMT6V9T03XoS81np6vGnzMOK/BOf/KSuu5+mZ3YbcP582ZjAVYs//dBj7xqZvD52XrhVc5dZTxoTLt/8NnB/j6wR66Pn06DVZNaHxgQAiOHlVwAghsYEAIihMQEAYmhMAICXFP8BDRQ/Uz4iyFcAAAAASUVORK5CYII=";
const logoBuilder = "/assets/builder-magazine-CwJSZlui.png";
const logoFoxRacing = "/assets/fox-BuxMQH3m.png";
const logoMaya = "/assets/maya-v7pnuLWg.png";
const logoKW = "/assets/keller-williams-BIcORWOv.png";
const logoZillow = "/assets/zillow-rlV3J0xi.png";
const logoUSNews = "/assets/us-news-Dj5fQ4Uc.png";
const logoRobbReport = "/assets/robb-report-Uw_NynVN.png";
const logoLATimes = "/assets/la-times-RTkYLatW.png";
const logoNBC = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjAwIiBmaWxsPSJ3aGl0ZSI+CiAgPCEtLSBQZWFjb2NrIGZlYXRoZXJzIC0tPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDkwLCAxMCkiPgogICAgPCEtLSBZZWxsb3cgZmVhdGhlciAtLT4KICAgIDxwYXRoIGQ9Ik01NSAxMjAgUTMwIDYwIDU1IDIwIFE2NSA2MCA1NSAxMjAiIGZpbGw9IiNGOUE4MjUiLz4KICAgIDwhLS0gT3JhbmdlIGZlYXRoZXIgLS0+CiAgICA8cGF0aCBkPSJNNTAgMTE4IFExNSA3MCAzMCAxNSBRNTAgNjUgNTAgMTE4IiBmaWxsPSIjRUY2QzAwIi8+CiAgICA8IS0tIFJlZCBmZWF0aGVyIC0tPgogICAgPHBhdGggZD0iTTQ4IDExNSBRNSA4MCAxMCAyMCBRMzggNzIgNDggMTE1IiBmaWxsPSIjQzYyODI4Ii8+CiAgICA8IS0tIFB1cnBsZSBmZWF0aGVyIC0tPgogICAgPHBhdGggZD0iTTY1IDEyMCBROTAgNjAgNjUgMjAgUTU1IDYwIDY1IDEyMCIgZmlsbD0iIzZBMUI5QSIvPgogICAgPCEtLSBCbHVlIGZlYXRoZXIgLS0+CiAgICA8cGF0aCBkPSJNNzAgMTE4IFExMDUgNzAgOTAgMTUgUTcwIDY1IDcwIDExOCIgZmlsbD0iIzE1NjVDMCIvPgogICAgPCEtLSBHcmVlbiBmZWF0aGVyIC0tPgogICAgPHBhdGggZD0iTTcyIDExNSBRMTE1IDgwIDExMCAyMCBRODIgNzIgNzIgMTE1IiBmaWxsPSIjMkU3RDMyIi8+CiAgPC9nPgogIDwhLS0gTkJDIHRleHQgLS0+CiAgPHRleHQgeD0iMjAwIiB5PSIxODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCBCbGFjaywgQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI5MDAiIGZvbnQtc2l6ZT0iNjAiIGZpbGw9IndoaXRlIiBsZXR0ZXItc3BhY2luZz0iNiI+TkJDPC90ZXh0Pgo8L3N2Zz4=";
const logoFoxNews = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMTIwIiBmaWxsPSJ3aGl0ZSI+CiAgPHRleHQgeD0iMjAwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrLCBBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjkwMCIgZm9udC1zaXplPSI1MCIgZmlsbD0id2hpdGUiIGxldHRlci1zcGFjaW5nPSIyIj5GT1ggTkVXUzwvdGV4dD4KICA8dGV4dCB4PSIyMDAiIHk9IjkwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjQwMCIgZm9udC1zaXplPSIxOCIgZmlsbD0id2hpdGUiIGxldHRlci1zcGFjaW5nPSI2IiBvcGFjaXR5PSIwLjYiPkNIQU5ORUw8L3RleHQ+Cjwvc3ZnPg==";
const logoCBS = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjAwIiBmaWxsPSJ3aGl0ZSI+CiAgPCEtLSBDQlMgRXllIC0tPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwMCw3MCkiPgogICAgPGVsbGlwc2UgY3g9IjAiIGN5PSIwIiByeD0iNTUiIHJ5PSIzMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgICA8Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iMTgiIGZpbGw9IndoaXRlIi8+CiAgICA8Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iMTAiIGZpbGw9IiMwYTBhMGEiLz4KICA8L2c+CiAgPCEtLSBDQlMgdGV4dCAtLT4KICA8dGV4dCB4PSIyMDAiIHk9IjE3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtc2l6ZT0iNTQiIGZpbGw9IndoaXRlIiBsZXR0ZXItc3BhY2luZz0iMTAiPkNCUzwvdGV4dD4KPC9zdmc+";
const logoPBS = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjAwIiBmaWxsPSJ3aGl0ZSI+CiAgPCEtLSBQQlMgSGVhZCBzaWxob3VldHRlIGluIGNpcmNsZSAtLT4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMDAsNzUpIj4KICAgIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSI0MiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzLjUiLz4KICAgIDwhLS0gU2ltcGxpZmllZCBoZWFkIHByb2ZpbGUgZmFjaW5nIHJpZ2h0IC0tPgogICAgPHBhdGggZD0iTS04LC0zMCBRNSwtMzIgMTAsLTI1IFExOCwtMTggMTYsLTggUTIwLC02IDIwLDAgUTIwLDUgMTYsOCBRMTQsMTUgOCwxOCBRMiwyMiAtNSwyMiBRLTEwLDIyIC0xNCwxOCBRLTE4LDE0IC0xOCw4IEwtMTgsLTIwIFEtMTgsLTI4IC04LC0zMFoiIGZpbGw9IndoaXRlIi8+CiAgPC9nPgogIDwhLS0gUEJTIHRleHQgLS0+CiAgPHRleHQgeD0iMjAwIiB5PSIxNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iNzAwIiBmb250LXNpemU9IjU0IiBmaWxsPSJ3aGl0ZSIgbGV0dGVyLXNwYWNpbmc9IjEyIj5QQlM8L3RleHQ+Cjwvc3ZnPg==";
const logoAZCentral = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgMTIwIiBmaWxsPSJ3aGl0ZSI+CiAgPHRleHQgeD0iMjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsICdUaW1lcyBOZXcgUm9tYW4nLCBzZXJpZiIgZm9udC13ZWlnaHQ9IjQwMCIgZm9udC1zaXplPSI0MiIgZmlsbD0id2hpdGUiIGxldHRlci1zcGFjaW5nPSIxIj5hemNlbnRyYWw8L3RleHQ+CiAgPHRleHQgeD0iMjUwIiB5PSI5NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsICdUaW1lcyBOZXcgUm9tYW4nLCBzZXJpZiIgZm9udC13ZWlnaHQ9IjQwMCIgZm9udC1zaXplPSIyMiIgZmlsbD0id2hpdGUiIGxldHRlci1zcGFjaW5nPSIzIiBvcGFjaXR5PSIwLjciPlBBUlQgT0YgVEhFIFVTQSBUT0RBWSBORVRXT1JLPC90ZXh0Pgo8L3N2Zz4=";
const logoAZFamily = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgMTIwIiBmaWxsPSJ3aGl0ZSI+CiAgPHRleHQgeD0iMjUwIiB5PSI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrLCBBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjkwMCIgZm9udC1zaXplPSI0NCIgZmlsbD0id2hpdGUiIGxldHRlci1zcGFjaW5nPSIyIj5BWiBGQU1JTFk8L3RleHQ+CiAgPHRleHQgeD0iMjUwIiB5PSI4NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI0MDAiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiBsZXR0ZXItc3BhY2luZz0iNSIgb3BhY2l0eT0iMC42Ij4zVFYgfCBDQlMgNSB8IEFSSVpPTkEnUyBGQU1JTFk8L3RleHQ+Cjwvc3ZnPg==";
const logoABC15 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMTIwIiBmaWxsPSJ3aGl0ZSI+CiAgPHRleHQgeD0iMjAwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrLCBBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjkwMCIgZm9udC1zaXplPSI1MCIgZmlsbD0id2hpdGUiIGxldHRlci1zcGFjaW5nPSIxIj5BQkMxNTwvdGV4dD4KICA8dGV4dCB4PSIyMDAiIHk9IjkwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjQwMCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIGxldHRlci1zcGFjaW5nPSI0IiBvcGFjaXR5PSIwLjYiPkFSSVpPTkE8L3RleHQ+Cjwvc3ZnPg==";
const logoFox10 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMTIwIiBmaWxsPSJ3aGl0ZSI+CiAgPHRleHQgeD0iMjAwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrLCBBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjkwMCIgZm9udC1zaXplPSI1MCIgZmlsbD0id2hpdGUiIGxldHRlci1zcGFjaW5nPSIyIj5GT1ggMTA8L3RleHQ+CiAgPHRleHQgeD0iMjAwIiB5PSI5MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI0MDAiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiBsZXR0ZXItc3BhY2luZz0iNCIgb3BhY2l0eT0iMC42Ij5QSE9FTklYPC90ZXh0Pgo8L3N2Zz4=";
const logoAZRepublic = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgMTAwIiBmaWxsPSJ3aGl0ZSI+CiAgPHRleHQgeD0iMzAwIiB5PSI0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IidUaW1lcyBOZXcgUm9tYW4nLCBHZW9yZ2lhLCBzZXJpZiIgZm9udC13ZWlnaHQ9IjQwMCIgZm9udC1zaXplPSIyMCIgZmlsbD0id2hpdGUiIGxldHRlci1zcGFjaW5nPSIxMCI+VEhFPC90ZXh0PgogIDx0ZXh0IHg9IjMwMCIgeT0iODIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSInVGltZXMgTmV3IFJvbWFuJywgR2VvcmdpYSwgc2VyaWYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtc2l6ZT0iMzgiIGZpbGw9IndoaXRlIiBsZXR0ZXItc3BhY2luZz0iNCI+QVJJWk9OQSBSRVBVQkxJQzwvdGV4dD4KPC9zdmc+";
const logoBizJournal = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgMTAwIiBmaWxsPSJ3aGl0ZSI+CiAgPHRleHQgeD0iMzAwIiB5PSI0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IidUaW1lcyBOZXcgUm9tYW4nLCBHZW9yZ2lhLCBzZXJpZiIgZm9udC13ZWlnaHQ9IjQwMCIgZm9udC1zaXplPSIxNiIgZmlsbD0id2hpdGUiIGxldHRlci1zcGFjaW5nPSI2IiBvcGFjaXR5PSIwLjciPlBIT0VOSVg8L3RleHQ+CiAgPHRleHQgeD0iMzAwIiB5PSI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IidUaW1lcyBOZXcgUm9tYW4nLCBHZW9yZ2lhLCBzZXJpZiIgZm9udC13ZWlnaHQ9IjcwMCIgZm9udC1zaXplPSIzNiIgZmlsbD0id2hpdGUiIGxldHRlci1zcGFjaW5nPSIyIj5CVVNJTkVTUyBKT1VSTkFMPC90ZXh0Pgo8L3N2Zz4=";
const ease$5 = [0.16, 1, 0.3, 1];
const accentColor$1 = "#C2B8A7";
const attributes = [
  { icon: Flame, title: "Anti-Fire", desc: "Non-combustible concrete shell with 0% flame spread. The ultimate desert safety standard." },
  { icon: Droplets, title: "Anti-Mold & Moisture", desc: "100% impermeable to Arizona's extreme monsoon elements. Zero moisture intrusion." },
  { icon: Bug, title: "Anti-Termite", desc: "Zero wood framing means zero risk from structural pests. Permanent protection." },
  { icon: Thermometer, title: "Thermal Performance", desc: "R-75 to R-100 insulation rating. Massive HVAC overhead reduction through high-density insulation." },
  { icon: Wind, title: "250 MPH Wind Rating", desc: "Exceeds Florida hurricane zone requirements. Built for extreme conditions" },
  { icon: Recycle, title: "100% Recyclable", desc: "EPS foam core is fully recyclable. Zero construction waste to landfill" }
];
const stats = [
  { value: "$13", suffix: "/sq ft", label: "Average Savings", desc: "Average residential construction cost savings" },
  { value: "14", suffix: "%", label: "Timeline Reduction", desc: "Average reduction across build types" },
  { value: "+50", suffix: "%", label: "Energy Efficiency", desc: "R-75 to R-100 insulation cuts HVAC costs by half compared to conventional construction" },
  { value: "100", suffix: "+", label: "Projects Delivered", desc: "SABS Technology has delivered 100+ projects in multiple climates and regions" }
];
const technicals = [
  { title: "ICC-ES ESR-1638", detail: "Evaluation report covering structural use in residential and commercial applications" },
  { title: "ASTM C578 Type XI", detail: "Standard specification for rigid cellular polystyrene thermal insulation" },
  { title: "ASTM E-84 Class A", detail: "Surface burning characteristics. Class A fire rating for flame spread and smoke development" },
  { title: "STC 52 Sound Rating", detail: "Sound Transmission Class rating exceeding standard wood-frame construction" },
  { title: "Category A to F Seismic", detail: "Engineered for all seismic design categories per IBC requirements" },
  { title: "100% Recyclable", detail: "EPS foam core is fully recyclable. Zero construction waste to landfill" }
];
const technicalIcons = [Shield, Shield, Flame, Volume2, Shield, Recycle];
const pressOutlets = [
  { name: "NBC", src: logoNBC },
  { name: "Fox News", src: logoFoxNews },
  { name: "CBS", src: logoCBS },
  { name: "PBS", src: logoPBS },
  { name: "AZ Central", src: logoAZCentral },
  { name: "AZ Family", src: logoAZFamily },
  { name: "ABC15", src: logoABC15 },
  { name: "Fox 10", src: logoFox10 },
  { name: "Arizona Republic", src: logoAZRepublic },
  { name: "Business Journal", src: logoBizJournal }
];
const trustLogos = [
  { name: "Ritz-Carlton", src: logoRitzCarlton },
  { name: "Discovery Channel", src: logoDiscovery },
  { name: "PGA Tour", src: logoPgaTour },
  { name: "Architectural Digest", src: logoAD },
  { name: "Cobra", src: logoCobra },
  { name: "LACMA", src: logoLacma },
  { name: "HGTV", src: logoHgtv },
  { name: "Planet Green", src: logoPlanetGreen },
  { name: "DIY Network", src: logoDiy },
  { name: "Oakley", src: logoOakley },
  { name: "Forbes", src: logoForbes },
  { name: "Marucci", src: logoMarucci },
  { name: "Builder", src: logoBuilder },
  { name: "Fox Racing", src: logoFoxRacing },
  { name: "Maya", src: logoMaya },
  { name: "Keller Williams", src: logoKW },
  { name: "Zillow", src: logoZillow },
  { name: "U.S. News", src: logoUSNews },
  { name: "Robb Report", src: logoRobbReport },
  { name: "Los Angeles Times", src: logoLATimes }
];
const projectTypes = {
  "Single Family Residential": { traditional: 185, liefBlocks: 145 },
  "Multi-Family Residential": { traditional: 165, liefBlocks: 130 },
  "Commercial Office": { traditional: 200, liefBlocks: 160 },
  "Mixed-Use Development": { traditional: 190, liefBlocks: 150 },
  "Adaptive Reuse / Conversion": { traditional: 175, liefBlocks: 140 }
};
const CORNER = { 0: " c-tl", 2: " c-tr", 9: " c-bl", 11: " c-br" };
const SabsWall = ({ active }) => {
  const [locked, setLocked] = useState(false);
  const [glow, setGlow] = useState(false);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setLocked(true), 900);
    return () => clearTimeout(t);
  }, [active]);
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: `v2-wall grid grid-cols-3 mb-5${locked ? " is-locked" : ""}`,
      initial: false,
      animate: { columnGap: locked ? 0 : 14, rowGap: locked ? 0 : 14, opacity: active ? 1 : 0 },
      transition: { type: "spring", stiffness: 180, damping: 22 },
      onAnimationComplete: () => setGlow(locked),
      onHoverStart: () => {
        setGlow(false);
        setLocked(false);
      },
      onHoverEnd: () => setLocked(true),
      "aria-label": "Twelve LÏEF Blocks locking together into one solid SABS wall",
      role: "img",
      children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ jsx(
        motion.div,
        {
          className: `v2-flush${CORNER[i] ?? ""}`,
          initial: false,
          animate: {
            borderColor: glow ? "rgba(239,236,227,.95)" : "rgba(194,184,167,.5)",
            boxShadow: glow ? "0 0 14px rgba(194,184,167,.55), inset 0 0 8px rgba(194,184,167,.3)" : "0 0 0 rgba(0,0,0,0)"
          },
          transition: { duration: 0.45 },
          style: { aspectRatio: "2/1", border: "1px solid rgba(194,184,167,.5)", background: "rgba(194,184,167,.14)" }
        },
        i
      ))
    }
  );
};
const LiefBlocks = () => {
  const { openModal } = useContactModal();
  const [projectType, setProjectType] = useState("Single Family Residential");
  const [sqft, setSqft] = useState(5e3);
  const [playingVideo, setPlayingVideo] = useState(null);
  const costs = projectTypes[projectType];
  const totalSavings = (costs.traditional - costs.liefBlocks) * sqft;
  const savingsPercent = Math.round((costs.traditional - costs.liefBlocks) / costs.traditional * 100);
  const { ref: heroRef, inView: heroInView } = useInView(0.1);
  const { ref: whatRef, inView: whatInView } = useInView(0.1);
  useInView(0.1);
  const { ref: statsRef, inView: statsInView } = useInView(0.1);
  const { ref: techRef, inView: techInView } = useInView(0.1);
  const { ref: vidRef, inView: vidInView } = useInView(0.1);
  const { ref: pressRef, inView: pressInView } = useInView(0.1);
  const { ref: calcRef, inView: calcInView } = useInView(0.1);
  const { ref: ctaRef, inView: ctaInView } = useInView(0.1);
  const { scrollY } = useScroll();
  const heroGlowY = useTransform(scrollY, [0, 600], [0, -60]);
  const ghostTextY = useTransform(scrollY, [0, 3e3], [0, -120]);
  const show = (inView, y = 35) => inView ? { opacity: 1, y: 0 } : { opacity: 0, y };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("section", { ref: heroRef, className: "relative min-h-screen flex items-center overflow-x-hidden pt-24 pb-36 md:pb-40", style: { background: "var(--v2-deep)" }, children: [
      /* @__PURE__ */ jsx(motion.div, { className: "absolute inset-0 pointer-events-none", style: { y: heroGlowY } }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: show(heroInView, 20),
            transition: { duration: 0.75, delay: 0.3, ease: ease$5 },
            className: "mb-6 md:mb-8",
            children: [
              /* @__PURE__ */ jsx("span", { className: "v2-label hidden md:inline text-[1.25rem]", children: "LÏEF x SABS" }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "md:hidden",
                  style: { fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--v2-neon)" },
                  children: "LÏEF x SABS"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.h1,
          {
            initial: { opacity: 0, y: 35 },
            animate: show(heroInView),
            transition: { duration: 0.75, delay: 0.45, ease: ease$5 },
            className: "v2-headline leading-[1.02] mb-6 md:mb-8",
            style: { fontSize: "clamp(2.2rem, 5.5vw, 5rem)", letterSpacing: "-0.02em" },
            children: [
              "SABS™ TECHNOLOGY",
              /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "YOUR STRUCTURAL EDGE" }),
              /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 35 },
            animate: show(heroInView),
            transition: { duration: 0.75, delay: 0.6, ease: ease$5 },
            style: { fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.1rem, 3vw, 1.4rem)", color: "var(--v2-muted)", lineHeight: 1.5 },
            children: "Our premier Structural Concrete Insulated Panel System. Faster. Stronger. Smarter."
          }
        ),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 35 },
            animate: show(heroInView),
            transition: { duration: 0.75, delay: 0.75, ease: ease$5 },
            className: "mt-4 md:mt-5 max-w-[560px]",
            style: { fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.6 },
            children: "Fire-proof, mold-proof, termite-proof concrete structures with built-in R-75 to R-100 insulation. We deploy it through our proprietary LÏEF Block™ components, engineered to bring this technology from blueprint to build."
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 35 },
            animate: show(heroInView),
            transition: { duration: 0.75, delay: 0.9, ease: ease$5 },
            className: "mt-8 md:mt-12 flex flex-wrap gap-3 md:gap-4",
            children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: openModal,
                  className: "transition-all duration-300 hover:brightness-110",
                  style: {
                    fontFamily: "var(--v2-font-body)",
                    fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    fontWeight: 600,
                    background: "var(--v2-btn-bg)",
                    color: "var(--v2-btn-fg)",
                    border: "1px solid var(--v2-loggia)",
                    padding: "10px 24px",
                    cursor: "pointer"
                  },
                  children: "Get a Quote"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => document.querySelector("#what-section")?.scrollIntoView({ behavior: "smooth" }),
                  className: "transition-all duration-300 hover:bg-[#C2B8A7] hover:text-[#0F1A14]",
                  style: {
                    fontFamily: "var(--v2-font-body)",
                    fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    fontWeight: 600,
                    background: "transparent",
                    color: "var(--v2-neon)",
                    border: "1px solid var(--v2-neon)",
                    padding: "10px 24px",
                    cursor: "pointer"
                  },
                  children: "Learn More"
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { style: { fontSize: "1.25rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--v2-muted)" }, children: "Scroll" }),
        /* @__PURE__ */ jsx("div", { className: "w-px h-8 md:h-12", style: { background: "linear-gradient(to bottom, var(--v2-neon), transparent)" } })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { id: "what-section", className: "relative py-12 md:py-28", style: { background: "var(--v2-deep)", borderTop: "1px solid var(--v2-rule)" }, children: /* @__PURE__ */ jsx("div", { ref: whatRef, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12 items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(whatInView), transition: { duration: 0.75, ease: ease$5 }, className: "v2-label mb-6", children: "The Technology" }),
        /* @__PURE__ */ jsxs(motion.h2, { initial: { opacity: 0, y: 35 }, animate: show(whatInView), transition: { duration: 0.75, delay: 0.08, ease: ease$5 }, className: "v2-headline text-3xl md:text-5xl lg:text-6xl mb-6", style: { color: "var(--v2-white)" }, children: [
          "WHAT IS SABS™",
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "?" })
        ] }),
        /* @__PURE__ */ jsx(motion.p, { initial: { opacity: 0, y: 35 }, animate: show(whatInView), transition: { duration: 0.75, delay: 0.16, ease: ease$5 }, className: "mb-6", style: { fontWeight: 300, fontSize: "1.25rem", color: "var(--v2-muted)", lineHeight: 1.8 }, children: "SABS (Saebi Alternative Building System) is a patented cementitious coating technology that transforms lightweight structural panels into fire-proof, mold-proof, termite-proof concrete structures. The result: a monolithic building envelope with zero flame spread, 250 MPH wind resistance, and built-in R-75 to R-100 insulation, exceeding every major structural and energy code in the industry." }),
        /* @__PURE__ */ jsx(motion.p, { initial: { opacity: 0, y: 35 }, animate: show(whatInView), transition: { duration: 0.75, delay: 0.24, ease: ease$5 }, style: { fontWeight: 300, fontSize: "1.25rem", color: "var(--v2-muted)", lineHeight: 1.8 }, children: "We deploy SABS through our proprietary LÏEF Block™ components, precision-engineered EPS panels that form the structural core of walls, floors, and roofs. Once assembled and coated with the SABS compound, the system creates a seamless, reinforced concrete structure from the ground up." }),
        /* @__PURE__ */ jsx(motion.p, { initial: { opacity: 0, y: 35 }, animate: show(whatInView), transition: { duration: 0.75, delay: 0.32, ease: ease$5 }, className: "mt-6", style: { fontWeight: 300, fontSize: "1.25rem", color: "var(--v2-muted)", lineHeight: 1.8 }, children: "We build across the full construction spectrum, from wood frame to steel to advanced modular, and we've incorporated SABS into our methods because its structural properties are simply unmatched. For our clients, that means another high-performance option and a builder equipped to match the right system to every project." })
      ] }),
      /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(whatInView), transition: { duration: 0.75, delay: 0.4, ease: ease$5 }, className: "hidden md:flex justify-center items-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[420px]", children: [
        /* @__PURE__ */ jsx(SabsWall, { active: whatInView }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", style: { letterSpacing: "0.12em", textTransform: "uppercase", color: accentColor$1 }, children: [
          /* @__PURE__ */ jsx("p", { style: { fontSize: "1.05rem", fontWeight: 600 }, children: "LÏEF EPS Core x SABS Coating" }),
          /* @__PURE__ */ jsx("p", { style: { fontSize: "1.05rem", fontWeight: 600 }, children: "= Structural Concrete" })
        ] })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "relative py-12 md:py-28", style: { background: "var(--v2-green)" }, children: /* @__PURE__ */ jsxs("div", { ref: statsRef, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: [
      /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(statsInView), transition: { duration: 0.75, ease: ease$5 }, className: "mb-6", style: { fontSize: "1.25rem", textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(194,184,167,.6)" }, children: "Performance" }),
      /* @__PURE__ */ jsxs(motion.h2, { initial: { opacity: 0, y: 35 }, animate: show(statsInView), transition: { duration: 0.75, delay: 0.08, ease: ease$5 }, className: "v2-headline text-4xl md:text-6xl lg:text-7xl mb-6", style: { color: "var(--v2-white)" }, children: [
        "WE BUILD",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsxs("span", { style: { color: "var(--v2-neon)" }, children: [
          "SMARTER",
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
        ] })
      ] }),
      /* @__PURE__ */ jsx(motion.p, { initial: { opacity: 0, y: 35 }, animate: show(statsInView), transition: { duration: 0.75, delay: 0.16, ease: ease$5 }, className: "max-w-[550px] mb-20", style: { fontWeight: 300, fontSize: "1.25rem", color: "rgba(239,236,227,.85)", lineHeight: 1.8 }, children: "Arizona's #1 SABS-trained builder. LÏEF Blocks with SABS Technology radically reduces the number of trades required on-site, allowing for total schedule control and unprecedented quality consistency." }),
      /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(statsInView), transition: { duration: 0.75, delay: 0.24, ease: ease$5 }, className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4", children: attributes.map((attr) => {
        const Icon = attr.icon;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "p-6 md:p-8 transition-all duration-500 group",
            style: { border: "1px solid rgba(239,236,227,.08)", background: "rgba(0,0,0,.15)" },
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-14 h-14 flex items-center justify-center mb-5", style: { border: `1px solid ${accentColor$1}40` }, children: /* @__PURE__ */ jsx(Icon, { size: 32, style: { color: accentColor$1 } }) }),
              /* @__PURE__ */ jsx("h4", { className: "mb-3", style: { fontSize: "1.25rem", fontWeight: 600, color: accentColor$1, textTransform: "uppercase" }, children: attr.title }),
              /* @__PURE__ */ jsx("p", { style: { fontSize: "1.25rem", color: "rgba(239,236,227,.85)", lineHeight: 1.6 }, children: attr.desc })
            ]
          },
          attr.title
        );
      }) }),
      /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(statsInView), transition: { duration: 0.75, delay: 0.32, ease: ease$5 }, className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4", children: stats.map((stat) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "p-6 md:p-8 transition-all duration-500",
          style: { border: "1px solid rgba(239,236,227,.08)", background: "rgba(0,0,0,.15)" },
          children: [
            /* @__PURE__ */ jsxs("div", { className: "v2-headline mb-1", style: { fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--v2-white)" }, children: [
              stat.value,
              /* @__PURE__ */ jsx("span", { style: { fontSize: "0.5em", fontWeight: 400 }, children: stat.suffix })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mb-2", style: { fontSize: "1rem", textTransform: "uppercase", color: "var(--v2-white)", letterSpacing: "0.1em", fontWeight: 600 }, children: stat.label }),
            /* @__PURE__ */ jsx("div", { style: { fontSize: "1rem", color: "rgba(239,236,227,.55)", lineHeight: 1.5 }, children: stat.desc })
          ]
        },
        stat.label
      )) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "relative py-12 md:py-28", style: { background: "var(--v2-deep)" }, children: [
      /* @__PURE__ */ jsx(motion.div, { className: "v2-ghost-text hidden lg:block top-28 right-8", style: { fontSize: "min(10vw, 140px)", color: "rgba(194,184,167,.04)", y: ghostTextY }, children: "CERTIFIED" }),
      /* @__PURE__ */ jsxs("div", { ref: techRef, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: [
        /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(techInView), transition: { duration: 0.75, ease: ease$5 }, className: "v2-label mb-6", children: "Certified Technicals" }),
        /* @__PURE__ */ jsxs(motion.h2, { initial: { opacity: 0, y: 35 }, animate: show(techInView), transition: { duration: 0.75, delay: 0.08, ease: ease$5 }, className: "v2-headline text-4xl md:text-6xl lg:text-7xl mb-6", style: { color: "var(--v2-white)" }, children: [
          "ICC/ES",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsxs("span", { style: { color: "var(--v2-neon)" }, children: [
            "APPROVED",
            /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
          ] })
        ] }),
        /* @__PURE__ */ jsx(motion.p, { initial: { opacity: 0, y: 35 }, animate: show(techInView), transition: { duration: 0.75, delay: 0.16, ease: ease$5 }, className: "max-w-[600px] mb-16", style: { fontWeight: 300, fontSize: "1.25rem", color: "var(--v2-muted)", lineHeight: 1.8 }, children: "Every component of the LÏEF Blocks system is tested, certified, and code-compliant. No shortcuts. No workarounds." }),
        /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(techInView), transition: { duration: 0.75, delay: 0.24, ease: ease$5 }, className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: technicals.map((tech, i) => {
          const Icon = technicalIcons[i];
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-start gap-5 p-6 md:p-8 transition-all duration-500",
              style: { border: "1px solid var(--v2-rule)", background: "rgba(194,184,167,.01)" },
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-10 h-10 flex items-center justify-center mt-1", style: { border: `1px solid ${accentColor$1}30` }, children: /* @__PURE__ */ jsx(Icon, { size: 20, style: { color: accentColor$1 } }) }),
                /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsx("h4", { className: "mb-2", style: { fontWeight: 600, fontSize: "1.1rem", color: "var(--v2-white)" }, children: tech.title }),
                  /* @__PURE__ */ jsx("p", { style: { fontSize: "1rem", color: "var(--v2-dim)", lineHeight: 1.6 }, children: tech.detail })
                ] })
              ]
            },
            tech.title
          );
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "relative py-12 md:py-28", style: { background: "var(--v2-deep)", borderTop: "1px solid var(--v2-rule)" }, children: /* @__PURE__ */ jsxs("div", { ref: vidRef, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: [
      /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(vidInView), transition: { duration: 0.75, ease: ease$5 }, className: "v2-label mb-6", children: "See It Built" }),
      /* @__PURE__ */ jsxs(motion.h2, { initial: { opacity: 0, y: 35 }, animate: show(vidInView), transition: { duration: 0.75, delay: 0.08, ease: ease$5 }, className: "v2-headline text-4xl md:text-5xl mb-12", style: { color: "var(--v2-white)" }, children: [
        "HOW IT WORKS",
        /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
      ] }),
      /* @__PURE__ */ jsx(motion.p, { initial: { opacity: 0, y: 35 }, animate: show(vidInView), transition: { duration: 0.75, delay: 0.12, ease: ease$5 }, className: "max-w-[760px] -mt-6 mb-12", style: { fontSize: "1.3rem", color: "rgba(239,236,227,.85)", lineHeight: 1.6 }, children: "SABS radically reduces the number of trades required on-site, allowing for total schedule control and unprecedented quality consistency." }),
      /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(vidInView), transition: { duration: 0.75, delay: 0.16, ease: ease$5 }, className: "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10", children: [
        { id: "aQFVqs_XrEY", title: "SABS Start to Finish Process", desc: "The completed process of the SABS Building System, start to finish.", scale: "1" },
        { id: "vXAN6usiCGg", title: "Timelapse of SABS Texas Project", desc: "A SABS project near Austin, Texas, going up in timelapse.", scale: "1.35" }
      ].map((vid) => /* @__PURE__ */ jsxs("figure", { className: "flex flex-col gap-5", children: [
        /* @__PURE__ */ jsx("div", { className: "relative w-full", style: { aspectRatio: "16/9", border: "1px solid var(--v2-rule)", overflow: "hidden" }, children: playingVideo === vid.id ? /* @__PURE__ */ jsx(
          "iframe",
          {
            src: `https://www.youtube.com/embed/${vid.id}?autoplay=1&rel=0`,
            title: vid.title,
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowFullScreen: true,
            className: "absolute inset-0 w-full h-full",
            style: { border: "none" }
          }
        ) : /* @__PURE__ */ jsxs(
          "div",
          {
            onClick: () => setPlayingVideo(vid.id),
            className: "group cursor-pointer absolute inset-0 w-full h-full",
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: `https://img.youtube.com/vi/${vid.id}/maxresdefault.jpg`,
                  alt: vid.title,
                  className: "absolute inset-0 w-full h-full object-cover transition-all duration-700",
                  style: {
                    filter: "grayscale(100%)",
                    opacity: 0.6,
                    transform: `scale(${vid.scale})`
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.filter = "grayscale(0%)";
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = `scale(${parseFloat(vid.scale) + 0.1})`;
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.filter = "grayscale(100%)";
                    e.currentTarget.style.opacity = "0.6";
                    e.currentTarget.style.transform = `scale(${vid.scale})`;
                  }
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsx(
                "svg",
                {
                  viewBox: "0 0 100 100",
                  fill: "none",
                  className: "w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-[100px] lg:h-[100px] transition-all duration-500",
                  style: { filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.7))" },
                  ref: (el) => {
                    if (!el) return;
                    const parent = el.closest(".group");
                    if (!parent) return;
                    parent.addEventListener("mouseenter", () => {
                      el.style.filter = "drop-shadow(0 0 30px rgba(194,184,167,0.6)) drop-shadow(0 6px 20px rgba(0,0,0,0.7))";
                      el.style.transform = "scale(1.15)";
                    });
                    parent.addEventListener("mouseleave", () => {
                      el.style.filter = "drop-shadow(0 6px 20px rgba(0,0,0,0.7))";
                      el.style.transform = "scale(1)";
                    });
                  },
                  children: /* @__PURE__ */ jsx("polygon", { points: "34,18 34,82 84,50", fill: "var(--v2-neon)" })
                }
              ) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs("figcaption", { children: [
          /* @__PURE__ */ jsx("h3", { className: "v2-headline mb-2", style: { fontSize: "1.5rem", color: "var(--v2-white)" }, children: vid.title }),
          /* @__PURE__ */ jsx("p", { style: { fontSize: "1.15rem", color: "rgba(239,236,227,.85)", lineHeight: 1.6 }, children: vid.desc }),
          /* @__PURE__ */ jsx("p", { className: "mt-2", style: { fontSize: "0.95rem", color: "var(--v2-dim)" }, children: "Video: Strata International Group" })
        ] })
      ] }, vid.id)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "relative py-12 md:py-28", style: { background: "var(--v2-deep)", borderTop: "1px solid var(--v2-rule)" }, children: /* @__PURE__ */ jsx("div", { ref: calcRef, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-16 items-center", children: [
      /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(calcInView), transition: { duration: 0.75, ease: ease$5 }, children: [
        /* @__PURE__ */ jsx("div", { className: "v2-label mb-6", children: "Savings Calculator" }),
        /* @__PURE__ */ jsxs("h2", { className: "v2-headline text-4xl md:text-6xl lg:text-7xl mb-6", style: { color: "var(--v2-white)" }, children: [
          "SEE THE",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "DIFFERENCE" }),
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "max-w-md", style: { fontWeight: 300, fontSize: "1.25rem", color: "var(--v2-muted)", lineHeight: 1.8 }, children: "Estimate your project savings with SABS compared to traditional construction." })
      ] }),
      /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(calcInView), transition: { duration: 0.75, delay: 0.08, ease: ease$5 }, className: "v2-calc p-8 md:p-12", style: { border: "1px solid var(--v2-rule)", background: "rgba(194,184,167,.01)" }, children: [
        /* @__PURE__ */ jsx("label", { className: "block mb-3", style: { fontSize: "1.15rem", color: "var(--v2-dim)", letterSpacing: "0.05em" }, children: "Project Type" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            value: projectType,
            onChange: (e) => setProjectType(e.target.value),
            className: "w-full mb-8 p-4 outline-none transition-colors duration-300 focus:border-[#C2B8A7]",
            style: { background: "var(--v2-deep)", border: "1px solid rgba(239,236,227,.15)", color: "var(--v2-white)", fontFamily: "var(--v2-font-body)", fontSize: "1.15rem" },
            children: Object.keys(projectTypes).map((t) => /* @__PURE__ */ jsx("option", { value: t, children: t }, t))
          }
        ),
        /* @__PURE__ */ jsxs("label", { className: "block mb-4", style: { fontSize: "1.15rem", color: "var(--v2-dim)", letterSpacing: "0.05em" }, children: [
          "Square Footage: ",
          /* @__PURE__ */ jsxs("span", { style: { color: accentColor$1, fontWeight: 600 }, children: [
            sqft.toLocaleString(),
            " sq ft"
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "range",
            min: 1e3,
            max: 1e5,
            step: 500,
            value: sqft,
            onChange: (e) => setSqft(Number(e.target.value)),
            className: "v2-range w-full mb-10",
            style: { accentColor: accentColor$1 }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6", style: { borderTop: "1px solid rgba(239,236,227,.1)" }, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "v2-headline mb-1", style: { fontSize: "clamp(2rem, 3.6vw, 3.2rem)", color: accentColor$1 }, children: [
              "$",
              totalSavings.toLocaleString()
            ] }),
            /* @__PURE__ */ jsx("div", { style: { fontSize: "1rem", color: "var(--v2-dim)" }, children: "Estimated Savings" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "v2-headline mb-1", style: { fontSize: "clamp(2rem, 3.6vw, 3.2rem)", color: accentColor$1 }, children: [
              savingsPercent,
              "%"
            ] }),
            /* @__PURE__ */ jsx("div", { style: { fontSize: "1rem", color: "var(--v2-dim)" }, children: "Cost Reduction" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4", style: { fontSize: "1rem", color: "var(--v2-dim)", fontStyle: "italic", opacity: 0.7 }, children: "*Estimates based on average project data. Actual savings vary by project scope, location, and specifications." })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "relative py-12 md:py-20", style: { background: "var(--v2-deep)", borderTop: "1px solid var(--v2-rule)" }, children: /* @__PURE__ */ jsxs("div", { ref: pressRef, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center", children: [
      /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(pressInView), transition: { duration: 0.75, ease: ease$5 }, className: "v2-label mb-12", children: "As Featured In" }),
      /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(pressInView), transition: { duration: 0.75, delay: 0.08, ease: ease$5 }, className: "flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-20", children: pressOutlets.map((outlet) => /* @__PURE__ */ jsxs("span", { role: "img", "aria-label": outlet.name, className: "v2-logo-mask relative inline-block", children: [
        /* @__PURE__ */ jsx("img", { src: outlet.src, alt: "", "aria-hidden": "true", style: { height: "48px", width: "auto", objectFit: "contain", visibility: "hidden" } }),
        /* @__PURE__ */ jsx("span", { className: "v2-logo-fill absolute inset-0", style: { WebkitMaskImage: `url(${outlet.src})`, maskImage: `url(${outlet.src})`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center" } })
      ] }, outlet.name)) }),
      /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(pressInView), transition: { duration: 0.75, delay: 0.16, ease: ease$5 }, className: "v2-label mb-10", children: "Trusted By Industry Leaders" }),
      /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(pressInView), transition: { duration: 0.75, delay: 0.24, ease: ease$5 }, className: "flex flex-wrap justify-center items-center gap-10 md:gap-14", children: trustLogos.map((logo) => /* @__PURE__ */ jsxs("span", { role: "img", "aria-label": logo.name, className: "v2-logo-mask relative inline-block", children: [
        /* @__PURE__ */ jsx("img", { src: logo.src, alt: "", "aria-hidden": "true", style: { height: "60px", width: "auto", objectFit: "contain", visibility: "hidden" } }),
        /* @__PURE__ */ jsx("span", { className: "v2-logo-fill absolute inset-0", style: { WebkitMaskImage: `url(${logo.src})`, maskImage: `url(${logo.src})`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center" } })
      ] }, logo.name)) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "relative py-16 md:py-28", style: { background: "var(--v2-black)", borderTop: "1px solid var(--v2-rule)" }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-px", style: { height: "100px", background: `linear-gradient(to bottom, ${accentColor$1}, transparent)` } }),
      /* @__PURE__ */ jsxs("div", { ref: ctaRef, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center flex flex-col items-center", children: [
        /* @__PURE__ */ jsxs(motion.h2, { initial: { opacity: 0, y: 35 }, animate: show(ctaInView), transition: { duration: 0.75, ease: ease$5 }, className: "v2-headline mb-6", style: { fontSize: "clamp(3rem, 6vw, 5rem)", color: "var(--v2-white)", lineHeight: 1.2 }, children: [
          "BUILD WITH US",
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
        ] }),
        /* @__PURE__ */ jsx(motion.p, { initial: { opacity: 0, y: 35 }, animate: show(ctaInView), transition: { duration: 0.75, delay: 0.08, ease: ease$5 }, className: "mb-10 max-w-[420px]", style: { fontWeight: 300, fontSize: "1.3rem", color: "var(--v2-muted)", lineHeight: 1.7 }, children: "Whether you're a developer, builder, or investor, let's talk about how LÏEF x SABS can transform your next project." }),
        /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 35 }, animate: show(ctaInView), transition: { duration: 0.75, delay: 0.16, ease: ease$5 }, className: "flex flex-wrap justify-center gap-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: openModal,
              className: "inline-block transition-all duration-300 hover:brightness-110",
              style: {
                fontFamily: "var(--v2-font-body)",
                fontSize: "1.1rem",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                fontWeight: 600,
                background: "var(--v2-btn-bg)",
                color: "var(--v2-btn-fg)",
                padding: "16px 40px",
                border: "1px solid var(--v2-loggia)",
                cursor: "pointer"
              },
              children: "Start a Conversation"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: openModal,
              className: "inline-block transition-all duration-300 hover:bg-[#C2B8A7] hover:text-[#0F1A14]",
              style: {
                fontFamily: "var(--v2-font-body)",
                fontSize: "1.1rem",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: accentColor$1,
                border: `1px solid ${accentColor$1}`,
                padding: "16px 40px",
                background: "transparent",
                cursor: "pointer"
              },
              children: "Contact Us"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: show(ctaInView, 20), transition: { duration: 0.75, delay: 0.24, ease: ease$5 }, className: "flex flex-wrap justify-center gap-12 mt-16", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("div", { style: { fontSize: "1rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--v2-dim)", marginBottom: "8px" }, children: "Email" }),
            /* @__PURE__ */ jsx("a", { href: "mailto:hello@liefdev.com", style: { fontSize: "1rem", color: "var(--v2-muted)", textDecoration: "none" }, className: "hover:text-[#C2B8A7] transition-colors", children: "hello@liefdev.com" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("div", { style: { fontSize: "1rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--v2-dim)", marginBottom: "8px" }, children: "Location" }),
            /* @__PURE__ */ jsx("span", { style: { fontSize: "1rem", color: "var(--v2-muted)" }, children: "Phoenix, Arizona" })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const SabsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { className: "sr-only", children: "SABS Technology" }),
    /* @__PURE__ */ jsx(LiefBlocks, {})
  ] });
};
const osbornImg = "/assets/301-osborn-CdJDg9di.png";
const canyonImg = "/assets/canyon-corporate-DyhEcC9H.jpg";
const silverImg = "/assets/silver-mountain-BVPniM1P.jpg";
const basinImg = "/assets/pahrump-basin-D0rEQl1L.jpg";
const vailImg = "/assets/the-vail-CsEKpHIO.png";
const ease$4 = [0.16, 1, 0.3, 1];
const accentColor = "#C2B8A7";
const projects = [
  {
    img: osbornImg,
    name: "301 W Osborn",
    type: "Adaptive Reuse",
    desc: "Commercial to residential conversion. 23 luxury urban units with secure parking & conditioned storage. Full SABS build.",
    location: "Midtown, Phoenix AZ",
    status: "SABS Showcase",
    featured: true
  },
  {
    img: vailImg,
    name: "The Vail",
    type: "Boutique 55+ Community",
    desc: "The Southwest’s premier boutique community where discerning adults trade square footage for more time, freedom, and the memories that matter.",
    location: "Arizona",
    status: "In Design",
    featured: false,
    zoom: 1.1
  },
  {
    img: canyonImg,
    name: "Canyon Corporate Plaza",
    type: "Office-to-Residential",
    desc: "14-story conversion from commercial office to modern residential. SABS cementitious coating system throughout.",
    location: "Phoenix, AZ",
    status: "In Development",
    featured: false
  },
  {
    img: silverImg,
    name: "Silver Mountain Ranches",
    type: "Equestrian Community",
    desc: "100+ acre equestrian community with luxury custom homes built using LÏEF Blocks with SABS Technology.",
    location: "Scottsdale, AZ",
    status: "In Development",
    featured: false
  },
  {
    img: basinImg,
    name: "440 Basin Avenue",
    type: "Multi-Family",
    desc: "204-unit multi-family development. $56M savings vs. traditional construction methods.",
    location: "Pahrump, NV",
    status: "In Development",
    featured: false
  }
];
const ProjectsPage = () => {
  const { ref: projRef, inView: projInView } = useInView(0.1);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "pt-16 md:pt-20", children: [
    /* @__PURE__ */ jsx("h1", { className: "sr-only", children: "Our Projects" }),
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden py-12 md:py-28", style: { background: "var(--v2-deep)" }, children: [
      /* @__PURE__ */ jsx("div", { className: "v2-ghost-text hidden lg:block top-8 right-8 text-right", style: { fontSize: "min(9vw, 110px)", color: "rgba(194,184,167,.6)" }, children: "PROJECTS" }),
      /* @__PURE__ */ jsxs("div", { ref: projRef, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: [
        /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: projInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }, transition: { duration: 0.75, ease: ease$4 }, className: "v2-label mb-6", children: "Current In Process" }),
        /* @__PURE__ */ jsxs(motion.h2, { initial: { opacity: 0, y: 35 }, animate: projInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }, transition: { duration: 0.75, delay: 0.08, ease: ease$4 }, className: "v2-headline text-4xl md:text-6xl lg:text-7xl mb-16", style: { color: "var(--v2-white)" }, children: [
          "THE WORK",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsxs("span", { style: { color: "var(--v2-neon)" }, children: [
            "SPEAKS",
            /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
          ] })
        ] }),
        projects.filter((p) => p.featured).map((proj) => /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 35 }, animate: projInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }, transition: { duration: 0.75, delay: 0.16, ease: ease$4 }, className: "v2-tile relative overflow-hidden group mb-px", style: { minHeight: "520px", border: `2px solid ${accentColor}` }, children: [
          /* @__PURE__ */ jsx("img", { src: proj.img, alt: proj.name, className: "absolute inset-0 w-full h-full object-cover brightness-[.5] transition-all duration-700 group-hover:brightness-[.65]" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: { background: "linear-gradient(to top, rgba(15,26,20,.95) 0%, rgba(15,26,20,.2) 50%, transparent 100%)" } }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 z-10", children: /* @__PURE__ */ jsxs("span", { className: "v2-badge inline-flex items-center gap-2 px-4 py-2", style: { background: accentColor, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#0F1A14", fontWeight: 700 }, children: [
            /* @__PURE__ */ jsx("span", { style: { width: "6px", height: "6px", borderRadius: "50%", background: "#0F1A14", display: "inline-block" } }),
            "Featured: ",
            proj.status
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 p-10 z-10", children: [
            /* @__PURE__ */ jsx("h3", { className: "v2-headline text-3xl md:text-4xl mb-2", style: { color: "var(--v2-white)" }, children: proj.name }),
            /* @__PURE__ */ jsx("p", { className: "mb-3", style: { fontSize: "1rem", color: accentColor, letterSpacing: "0.05em", fontWeight: 600 }, children: proj.type }),
            /* @__PURE__ */ jsx("p", { className: "max-w-2xl mb-4", style: { fontSize: "1.1rem", color: "var(--v2-muted)", lineHeight: 1.7 }, children: proj.desc }),
            /* @__PURE__ */ jsx("p", { style: { fontSize: "0.85rem", color: "var(--v2-dim)" }, children: proj.location })
          ] })
        ] }, proj.name)),
        /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 35 }, animate: projInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }, transition: { duration: 0.75, delay: 0.24, ease: ease$4 }, className: "grid grid-cols-1 md:grid-cols-2 gap-5 mt-5", children: projects.filter((p) => !p.featured).map((proj) => /* @__PURE__ */ jsxs("div", { className: "v2-tile relative overflow-hidden group", style: { minHeight: "380px", border: "1px solid var(--v2-rule)" }, children: [
          /* @__PURE__ */ jsx("img", { src: proj.img, alt: proj.name, className: "absolute inset-0 w-full h-full object-cover grayscale brightness-[.4] transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-[.6]", style: proj.zoom ? { transform: `scale(${proj.zoom})` } : void 0 }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: { background: "linear-gradient(to top, rgba(15,26,20,.95) 0%, rgba(15,26,20,.3) 60%, transparent 100%)" } }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 z-10", children: /* @__PURE__ */ jsxs("span", { className: "v2-badge inline-flex items-center gap-2 px-3 py-1.5", style: { background: "rgba(0,0,0,.8)", border: `1px solid ${accentColor}`, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: accentColor }, children: [
            /* @__PURE__ */ jsx("span", { style: { width: "6px", height: "6px", borderRadius: "50%", background: accentColor, display: "inline-block" } }),
            proj.status
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 p-8 z-10", children: [
            /* @__PURE__ */ jsx("h3", { className: "v2-headline text-xl md:text-2xl mb-1", style: { color: "var(--v2-white)" }, children: proj.name }),
            /* @__PURE__ */ jsx("p", { className: "mb-2", style: { fontSize: "0.9rem", color: accentColor, letterSpacing: "0.05em" }, children: proj.type }),
            /* @__PURE__ */ jsx("p", { className: "max-w-md mb-3", style: { fontSize: "0.95rem", color: "var(--v2-muted)", lineHeight: 1.6 }, children: proj.desc }),
            /* @__PURE__ */ jsx("p", { style: { fontSize: "0.8rem", color: "var(--v2-dim)" }, children: proj.location })
          ] })
        ] }, proj.name)) })
      ] })
    ] })
  ] });
};
const jesseImg = "/assets/jesse-BvmC-zU5.png";
const scottImg = "/assets/scott-CvJLIS_C.png";
const nickImg = "/assets/nick-BsE5dslA.png";
const joshImg = "/assets/josh-BInwDPDx.png";
const ease$3 = [0.16, 1, 0.3, 1];
const principals = [
  {
    name: "Jesse Fowler",
    title: "Principal and Operating Partner, LÏEF Development",
    titleLines: ["Principal and Operating Partner,", "LÏEF Development"],
    bio: "25 years in design, build and development. Featured in Architectural Digest, HGTV and Discovery Channel. Project advocacy across the Southwest.",
    img: jesseImg,
    imgStyle: { width: "185.26%", left: "-50.40%", top: "-11.29%" }
  },
  {
    name: "Josh Szvoren",
    title: "Development & Construction",
    titleLines: ["Development &", "Construction"],
    bio: "20+ years delivering complex developments, including CityCenter Las Vegas ($7.1B), One Beverly Hills ($1.3B), and flagships for Louis Vuitton and Dior.",
    img: joshImg,
    imgStyle: { width: "118.53%", left: "-15.33%", top: "-0.74%" }
    /* eye line 3pt lower per Jimmy 10/25 */
  },
  {
    name: "Scott Meiers",
    title: "Architectural Review",
    titleLines: ["Architectural", "Review"],
    bio: "40+ years of architectural design across commercial and residential sectors. Pre-submittal oversight, code compliance review, and value engineering for every engagement.",
    img: scottImg,
    imgStyle: { width: "289.61%", left: "-104.16%", top: "-7.27%" }
  },
  {
    name: "Nick Scavio",
    title: "General Counsel",
    titleLines: ["General", "Counsel"],
    bio: "15+ years of business law, real estate, and transactions. Insurance negotiation and legal consultation for complex construction disputes.",
    img: nickImg,
    imgStyle: { width: "129.95%", left: "-24.36%", top: "5.69%" }
    /* +10% zoom per Jimmy 10/25 */
  }
];
const Portrait = ({ member }) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center group", children: [
  member.img ? /* @__PURE__ */ jsx("div", { className: "relative w-28 h-28 md:w-32 md:h-32 overflow-hidden mb-3", style: { border: "1px solid var(--v2-rule)" }, children: /* @__PURE__ */ jsx("img", { src: member.img, alt: member.name, className: "absolute grayscale brightness-[.5] transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-[.85]", style: { maxWidth: "none", height: "auto", ...member.imgStyle } }) }) : /* @__PURE__ */ jsx(
    "div",
    {
      className: "w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mb-4",
      style: { border: "1px solid var(--v2-rule)", background: "rgba(239,236,227,.05)" },
      children: /* @__PURE__ */ jsx("span", { className: "v2-headline", style: { fontSize: "2rem", color: "var(--v2-neon)" }, children: member.initials })
    }
  ),
  /* @__PURE__ */ jsx("h3", { className: "v2-headline", style: { fontSize: "1rem", color: "var(--v2-white)", letterSpacing: "0.08em" }, children: member.name }),
  /* @__PURE__ */ jsx("span", { className: "v2-label v2-team-title mt-1 block", style: { fontSize: "1rem" }, children: (member.titleLines ?? [member.title]).map((line) => /* @__PURE__ */ jsx("span", { className: "block md:[&:last-child]:whitespace-nowrap", children: line }, line)) }),
  /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-[300px]", style: { fontSize: "1rem", color: "var(--v2-dim)", lineHeight: 1.6 }, children: member.bio })
] });
const Team = () => {
  const { ref, inView } = useInView(0.1);
  return /* @__PURE__ */ jsx("section", { id: "team", className: "relative pt-24 pb-10 md:pt-24 md:pb-10", style: { background: "var(--v2-deep)" }, children: /* @__PURE__ */ jsx("div", { ref, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 35 },
        animate: inView ? { opacity: 1, y: 0 } : false,
        transition: { duration: 0.75, ease: ease$3 },
        className: "relative mb-8",
        children: [
          /* @__PURE__ */ jsx("div", { className: "v2-ghost-text absolute top-0 right-0 md:-right-6", style: { fontSize: "min(9.6vw, 120px)", lineHeight: 1, color: "rgba(194,184,167,.6)" }, children: "TEAM" }),
          /* @__PURE__ */ jsx("div", { className: "v2-label mb-6", children: "The Team" }),
          /* @__PURE__ */ jsxs("h2", { className: "v2-headline text-4xl md:text-6xl lg:text-7xl mb-4", style: { color: "var(--v2-white)" }, children: [
            "CIRCLE OF",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "EXPERTISE" }),
            /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
          ] }),
          /* @__PURE__ */ jsx("p", { style: { fontStyle: "italic", fontWeight: 300, fontSize: "1.15rem", color: "var(--v2-muted)" }, children: "Third-party objectivity. Protection. Knowledge. Expertise." }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-[900px]", style: { fontSize: "1rem", color: "var(--v2-dim)", lineHeight: 1.6 }, children: "Every engagement is backed by a dedicated team of principals and specialized consultants. Each project is customized with the right people for the right scope." })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 35 },
        animate: inView ? { opacity: 1, y: 0 } : false,
        transition: { duration: 0.75, delay: 0.15, ease: ease$3 },
        className: "mb-8",
        children: [
          /* @__PURE__ */ jsx("div", { className: "v2-label mb-4 pb-3", style: { fontSize: "1rem", borderBottom: "1px solid var(--v2-neon)" }, children: "PRINCIPALS" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-10 mt-6", children: principals.map((m) => /* @__PURE__ */ jsx(Portrait, { member: m }, m.name)) })
        ]
      }
    )
  ] }) }) });
};
const TeamPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "pt-16 md:pt-20", children: [
    /* @__PURE__ */ jsx("h1", { className: "sr-only", children: "Our Team" }),
    /* @__PURE__ */ jsx(Team, {})
  ] });
};
const ease$2 = [0.16, 1, 0.3, 1];
const featured = {
  quote: "They handled our VIP event space build from start to finish. What started as a small mural project turned into a complete facility build-out. That's what trust looks like: you earn it, then you deliver.",
  name: "Gary Cummings",
  title: "VP Operations, Carroll Shelby International"
};
const testimonials = [
  {
    quote: "We hired LÏEF for a complete home remodel and they exceeded every expectation. Hands-on throughout the entire process. The attention to detail was unmatched and the project came in on time.",
    name: "Michael R.",
    title: "Homeowner, Orange County"
  },
  {
    quote: "From design through completion, the communication was flawless. They walked us through every decision and made sure we understood the budget implications before moving forward. True professionals.",
    name: "Sarah & David K.",
    title: "Homeowners, Santa Barbara"
  },
  {
    quote: "After getting burned by two previous contractors, bringing in an owner's rep was a breath of fresh air. Transparent about costs, realistic about timelines, and the quality of work speaks for itself.",
    name: "Robert T.",
    title: "Commercial Property Owner, Costa Mesa"
  },
  {
    quote: "The Keller Williams office buildout was handled with precision. The team understood our brand requirements and translated them into a workspace that our agents are proud to call home.",
    name: "Branch Manager",
    title: "Keller Williams, Los Angeles"
  },
  {
    quote: "We were overwhelmed after the fire and had no idea where to start. LÏEF came in, took over the insurance coordination, vetted every contractor, and saved us nearly 10% on the total rebuild. Worth every penny.",
    name: "Patricia & Mark D.",
    title: "Homeowners, Santa Barbara Fire Rebuild"
  },
  {
    quote: "We built from the ground up and thought we could manage it ourselves. Within two months we were drowning in change orders and missed deadlines. LÏEF stepped in, renegotiated three major contracts, and got us back on track. We would have lost six figures without them.",
    name: "Daniel & Christine W.",
    title: "Custom Home Build, Scottsdale"
  }
];
const Testimonials = () => {
  const { ref, inView } = useInView(0.1);
  return /* @__PURE__ */ jsx("section", { id: "testimonials", className: "relative py-20 md:py-28", style: { background: "var(--v2-deep)" }, children: /* @__PURE__ */ jsx("div", { ref, className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 35 },
        animate: inView ? { opacity: 1, y: 0 } : false,
        transition: { duration: 0.75, ease: ease$2 },
        className: "relative mb-12",
        children: [
          /* @__PURE__ */ jsx("div", { className: "v2-ghost-text absolute top-0 right-0 md:-right-6 hidden sm:block", style: { fontSize: "min(9.6vw, 120px)", lineHeight: 1, color: "rgba(194,184,167,.6)" }, children: "TRUSTED" }),
          /* @__PURE__ */ jsx("div", { className: "v2-label mb-6", children: "Testimonials" }),
          /* @__PURE__ */ jsxs("h2", { className: "v2-headline text-4xl md:text-6xl lg:text-7xl mb-4", style: { color: "var(--v2-white)" }, children: [
            "WHAT OUR",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "CLIENTS ARE SAYING" }),
            /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "max-w-[600px]", style: { fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.6 }, children: "25+ years of client trust across Southern California and the Southwest. Same standards, same results. Now protecting property owners across three markets." })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 35 },
        animate: inView ? { opacity: 1, y: 0 } : false,
        transition: { duration: 0.75, delay: 0.15, ease: ease$2 },
        className: "p-8 md:p-12 mb-8",
        style: { background: "rgba(239,236,227,.06)", border: "1px solid rgba(194,184,167,.35)" },
        children: [
          /* @__PURE__ */ jsx("span", { style: { fontSize: "3rem", lineHeight: 1, color: "rgba(194,184,167,.3)", fontFamily: "Georgia, serif" }, children: "“" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-2", style: { fontStyle: "italic", fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: "var(--v2-white)", lineHeight: 1.7 }, children: [
            "“",
            featured.quote,
            "”"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
            /* @__PURE__ */ jsx("span", { className: "block", style: { fontWeight: 700, fontSize: "1rem", color: "var(--v2-white)", textTransform: "uppercase", letterSpacing: "0.06em" }, children: featured.name }),
            /* @__PURE__ */ jsx("span", { className: "v2-label mt-1 block", style: { fontSize: "1rem" }, children: featured.title })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 35 },
        animate: inView ? { opacity: 1, y: 0 } : false,
        transition: { duration: 0.75, delay: 0.25, ease: ease$2 },
        className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-12",
        children: testimonials.map((t, i) => /* @__PURE__ */ jsxs("div", { className: "p-6", style: { background: "rgba(239,236,227,.05)", border: "1px solid var(--v2-rule)" }, children: [
          /* @__PURE__ */ jsx("span", { style: { fontSize: "2rem", lineHeight: 1, color: "rgba(194,184,167,.2)", fontFamily: "Georgia, serif" }, children: "“" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-2", style: { fontStyle: "italic", fontSize: "1rem", color: "var(--v2-muted)", lineHeight: 1.6 }, children: [
            "“",
            t.quote,
            "”"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-4", style: { borderTop: "1px solid var(--v2-rule)" }, children: [
            /* @__PURE__ */ jsx("span", { className: "block", style: { fontWeight: 700, fontSize: "1rem", color: "var(--v2-white)" }, children: t.name }),
            /* @__PURE__ */ jsx("span", { className: "block mt-1", style: { fontSize: "1rem", color: "var(--v2-dim)" }, children: t.title })
          ] })
        ] }, i))
      }
    )
  ] }) }) });
};
const TestimonialsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "pt-16 md:pt-20", children: [
    /* @__PURE__ */ jsx("h1", { className: "sr-only", children: "Client Testimonials" }),
    /* @__PURE__ */ jsx(Testimonials, {})
  ] });
};
const MAP_W = 975;
const MAP_H = 610;
const NATION_D = "M648,492.4L648,492.4L648,492.4ZM780.1,466.1L782.8,475.7L787,486.3L794.9,499.6L806.1,513.6L805,517.2L806.6,521.9L811.5,529.2L820,544.3L822.1,549L822.8,554.1L823.8,574.5L821.8,573.7L820.9,579.6L822.4,582.7L821.6,586.6L819.1,589.4L819.7,586.1L806.9,589.7L804.7,587.7L805.3,585L800.6,577.8L793.1,574.2L791.9,575.4L788.8,570.5L787.5,566L785.5,563.3L780.2,559.3L781.3,555.4L780.4,552L778.5,553.2L779.5,555.9L777.5,556.8L769.4,545.8L766.5,542.9L771.2,533.2L764.7,529.8L764.2,531.7L767.4,534.3L764.7,537.1L761.9,533.4L761.9,527.3L763.6,520.7L763.6,517.1L761.3,511.5L761.9,510.2L758.9,505.1L755,504.9L749.9,500L746.1,498.3L745.3,494.9L742.8,494.1L740.3,490.6L732.2,486.7L727.4,487.4L725.8,489.7L726.4,492.2L722.7,492.3L716.3,497.4L711.8,498L713.7,500.8L710,499.1L707.4,499.8L708.1,496.6L705.7,493.6L695.8,488.4L688.8,486.2L680.7,485.8L663.7,490.1L657.6,491.8L659.1,490.2L655.9,487.8L654.8,482.2L653.4,481.7L651.6,490.2L646.5,489.5L644.4,490.8L636.2,489.7L626.7,493.6L624.8,495.4L619.2,498.9L619,501.1L623.8,502.3L625.7,497.7L628.2,501.3L630,499.3L630.5,502.2L628,503L627.3,507.2L622.8,507.8L622.5,509.6L626.3,513.4L632.4,513.8L634.9,517.8L634.2,521.8L631.8,519.9L628.8,523.6L630.6,519.2L623.8,515.7L619.8,515.3L612.6,521.1L609.8,516.3L608.1,515.4L605.1,517.7L601,522.8L597.9,519.8L595.2,519.8L590.3,517.5L591.6,516L589.6,512.7L587.7,513.7L584.2,507.9L579.1,508.6L578.8,505.8L574.5,508.2L574.8,511L570.6,513.1L564.8,512.1L553.6,508.2L547.7,508.4L540.6,510.4L534.8,511.5L522.4,517.4L526.7,513.3L522.1,514.3L523.7,509.2L518.4,510.5L517.4,513.8L519.6,515.1L519.9,519.4L523.1,518.8L517.3,523.1L510.3,529.5L492,539.2L480.2,548.4L475,555.4L470.5,566.2L470.2,574.1L473.5,587.2L469.7,576L469.6,568.9L471.7,560.1L480.4,546.2L486,542.5L489.2,541.4L489,539.7L484.3,542L482.5,539.9L482,544L479.3,546.3L477.2,544.8L473.6,547L477.4,546.5L474.1,553L468.7,551.8L472.7,555.8L469.4,564.3L467.3,563.3L465,566L469.2,565.7L467.9,575.9L469.1,583.2L471.8,588L471.5,591.7L474.3,592.7L474.4,595.1L466.7,596.6L464.1,593.5L461,592.5L451.8,592.1L447.4,588.6L443.2,588.2L440.1,585.1L434.3,583.6L431.4,574.1L427.9,569.9L428.5,566.5L427.1,564.3L427.6,559.5L425.3,555.9L423.3,555.5L419.9,552.1L419,548L416.1,544.1L412,540.8L410.2,533.9L405.9,526.5L405.1,521.7L403,518.5L399,515.5L398.1,513.5L394.2,511.5L393.3,508.7L390.3,505.7L385.8,505.8L377.8,504.7L373.4,502.6L372.4,504.9L366.4,505.5L363.7,509.9L361,517.2L359.4,517.5L356.8,521.6L353.5,521.4L348.3,517L337.2,510.9L330,503.6L327.7,497.8L328.1,492L325.2,486.9L324.8,482.8L323,479.9L315.8,475.4L312.3,469.8L309.2,467.6L306.2,462.7L301.7,459.9L299,453.5L296.3,452.1L264.2,448.2L262.9,458.4L246.8,456.3L208.2,450.5L171.7,429.5L142.3,411.7L145.1,407L99.5,401.7L97.9,398.1L98.9,393.6L98.7,387.7L96.5,382.3L92.5,376.4L86.4,369.8L82.1,369.3L83,367.2L81.7,362.5L76.4,361.8L69.7,356.7L69.3,354.1L65,349.3L59.3,347.9L54.9,345.2L48.8,344.3L46.5,340.5L48.6,334.9L47.9,333.2L49.8,328.1L45.9,324.6L47.3,321.2L45.3,319.3L43.4,314.7L41.6,313.3L37.2,299.7L34.8,296.1L36.3,289L38.1,289L39.7,285.9L38.3,281.4L35.1,281L31.4,274.3L32.5,270.7L31.6,266.5L33.3,260.8L35.3,260.7L34.7,265.7L38.5,270.1L38.6,265L36.4,261.7L37.3,259L35.8,257.2L39.2,256.3L37.6,253.4L35.7,253.7L35.7,256.7L33.2,259.9L29.4,254.6L26.2,253.5L28.3,250.3L27.1,243.1L24.4,239.5L20.1,229L21.6,226.9L21.4,219.4L23.6,215.7L24,209.2L21.6,201.9L18.5,197.2L18.9,193.1L26.6,183.8L27.7,178.9L31.3,172.9L31.6,165.8L30.4,164.4L32.6,160L31.1,156.7L32,149.2L33.6,146.5L32.8,139.9L38.4,131.4L42.7,125.8L45.4,120.7L52.7,102.7L53.7,98.9L57.2,92.5L61.1,81.4L62.2,75L63.6,73.9L63.8,68.9L65,70.6L71,70.2L68.6,68.5L65.9,69.2L64.1,65.2L65.5,59.8L69.7,59L65.9,57.2L66.8,54.6L70.7,53.9L66.9,51L67.4,44.9L66.6,43L67.6,34.1L65.7,30.2L66.5,23.5L69.7,20.2L76.9,27.1L81,28.3L90.2,33L94.6,32.9L94.7,38.5L92.2,41.5L88.1,44.1L91.8,43.1L96.6,39L95.1,46L92.4,52.4L96.1,51.9L96.1,46.6L98,41.7L101.7,37.6L101.2,31.4L98,25.3L100.9,27L102.4,20.9L99.4,19.2L98.8,15.5L100,14.4L114.6,18.6L140.1,25.4L166.5,31.9L183.6,35.9L198.1,39L232.9,46.1L265.4,51.9L302.8,57.5L340.4,62.1L376.9,65.7L404.4,67.8L420.8,68.8L444.9,69.8L479.5,70.7L510.8,70.8L510.7,62.2L515.6,64.1L517.9,73.3L517.8,75.7L520.2,77.3L530.7,78.8L531.5,81.3L536.5,80.5L540.3,78.2L547.7,80.3L551.1,82.2L553.4,87.3L554.9,84.2L558.1,84L558.9,86L563.4,87.3L565.8,90.7L570.6,89.6L576.7,85.8L578.1,88.9L587.6,88L591.8,90.6L596.2,90.7L590.4,94.2L582,97.5L579,99.5L572.7,105.7L569.9,109.4L558.9,119.4L560.2,121.1L563.3,121.4L568,119.6L576.2,115.1L579.7,116.1L577,122.8L580.2,120.5L585.3,123.1L591.3,120.2L593.9,117.3L600.5,115.8L612.9,105.8L615.1,102.8L618.6,100.5L624.4,99.7L625.9,101.1L622.2,101.8L615.4,111.8L615.6,116.6L618.6,112.5L624,112.5L628.3,114.3L633.1,120.8L643.6,121.4L651.8,115.2L662,114L665.3,111.9L670,111L669,112.8L669.8,117.6L676.5,118.3L679,116.1L683.4,114.8L684.4,121.5L682.5,123L686.1,123.6L687,125.7L690.2,126.2L690.2,124L693.2,123.6L695.2,125.8L694,127.6L685.2,127.2L681.2,128.8L676.5,126.6L674.2,131L671.2,128.3L665.8,126.9L662.9,127.3L660.9,130.3L657,131.8L652.6,131.3L650.3,135.5L645.2,139.2L647.6,134.3L643.6,134.5L643,137.7L637.9,139.6L632.4,153L632,155.7L629,156.6L626.2,165.6L628.1,166.1L630.6,163.3L632.6,158.9L635.7,157.1L637.9,150.9L641.6,147.6L641,152.4L639.1,155.3L635.5,165.1L634.7,170.5L635.4,173.6L633.5,175.5L632.5,180.8L633.4,185.3L630.8,195.3L631.7,200.9L634.1,205.7L634.2,212.4L634,216.8L637.2,222.1L640.3,229.8L642.2,231.2L647.2,230.6L651.9,227.6L655.1,224.2L658.6,215.5L659.8,210.2L660,204.7L658.9,198L652.4,184.3L653.8,180.1L651.9,174.9L655.2,168L654.9,159.7L657.1,158.7L657.1,154.9L661.1,153.5L663.6,147.8L664.7,150.6L663.9,155.9L665,157.2L666.3,152L666.1,157.6L667.8,153.2L667.3,145.5L669.6,143.3L674.2,141.9L670.5,138.3L672.9,134.4L675.4,132.7L680.6,135.2L684.6,135.1L686.6,137.8L689.8,137.9L695.1,140.2L696.7,139.9L701.3,147L699.1,146.2L698.8,148.9L700.9,150.3L702.2,153.9L702.4,162.5L699.2,165.5L699.2,169.4L695.4,171.5L694.1,177.1L699,180.2L704.6,170.6L709.9,167.7L713,169.1L715.2,172.4L718.9,185.8L721.5,191.2L720.9,199.8L718.5,202.2L719.1,198.7L716.3,199.4L715.1,206.5L712.1,209.5L712.5,212.9L709.8,217.1L708.3,221.7L717.6,225.5L719,223.6L725.6,227.4L733,223.3L737.5,223.2L741.9,218.3L748.5,213L756.1,209L767.5,200.3L776.4,192.1L777.5,188.8L780.3,186.1L776.9,182L774.8,176L783.8,171.7L792.1,170.3L795.8,170.3L799.8,171.9L801.9,170.5L809,169.2L812.8,166.7L816.6,161.8L819.3,161.1L819.4,158.3L816.9,154.4L819.3,152.5L814.7,150.3L815,146.4L820.5,141.3L822.1,137.5L828.6,127.9L832.3,124.4L857.6,117.8L873.7,114L886.1,110.5L886.7,105.2L890.9,102.4L891.8,101.2L894.8,103.1L894.3,99.3L897.3,98.8L895.2,96.3L898.2,88.9L900,86.1L898.2,82.6L898.1,76.3L899.9,73.8L899.1,67.5L905.9,47.6L908.8,47.5L910,51.5L912.5,52.3L916.6,48.5L922.6,45.8L929.7,49.8L937.3,74L938.7,79.9L944.6,79.9L946.3,84.3L946.1,87L949.5,89.7L952,88.1L957.1,94.8L955,99.4L952.8,98.6L950.2,105.6L946.8,104.3L946.3,107.5L943.8,110.3L941.4,109.7L941.5,112.5L938.9,113.7L937.3,109.7L935.4,111.3L937.1,114.9L935.7,117.6L934.5,114.7L931.9,114.3L931,110.1L929.7,113.9L929.3,120.5L930.2,122.9L921.4,128.9L919.7,132.2L918.1,130.9L915.1,134.1L915.1,136.8L912.8,138.3L912.9,142.3L911.2,143.3L910.2,150.1L909.5,154.8L911.2,158.5L914.3,158.5L909.5,165.8L910,168.6L911.8,167.4L917,171.2L917.5,174.2L919.4,174.4L921.7,177.7L924.8,177.5L928.8,175.1L928.4,171.4L931,176.8L924.7,179.9L920,183.3L917.9,179.4L915.4,182.8L915.4,185.3L912.8,186.4L909.1,188.3L910.5,182.8L909.8,182.1L906.7,181.2L908.1,188.2L907.6,190.7L901.7,193.5L900.2,193.5L893.5,197L884.7,198.4L881.9,202.6L878.1,204.5L874.1,208.3L873.7,211.1L877.1,208.5L881.6,208.4L882.7,206.7L890.9,204.2L894.7,199.6L899.5,201.8L895.5,205.8L885.7,213L871.7,219.3L869.2,216.4L868.9,217.2L868.5,220.3L866.6,221.4L871.4,222.4L872.4,224.8L873.2,237.3L869.9,247.5L867.1,250.9L865.4,257.2L862.6,259L862.9,253.8L858.6,254.3L851.7,249.8L849.4,246.4L849.2,245.8L849.7,244.4L848.5,246.7L849.3,249.3L852.8,252.5L854.8,258L859.5,262.9L861.3,262.7L863.7,270.3L862.5,280.5L861.3,284.3L858.4,288.2L858.5,292.2L856.6,301.3L854.5,303.5L852.6,300.7L852.9,292.1L855.6,285.9L855.5,283.8L851.6,285.3L851.2,281.8L847.7,275.6L847.6,278.7L845.5,279.1L841.4,274.1L841.8,271.3L846.4,271.3L840.1,267.9L842.3,266.1L841.1,263.7L839,266.3L839.4,261.7L841.4,262.9L841.8,260L839.3,259.3L841.6,251.7L839.2,254.5L836.8,254L837.6,257L836.3,258.8L838,262.7L836.2,268.8L838.1,274L841,276.7L840.3,279L843.8,284.2L838.3,281.3L834.6,281.5L829.9,277.6L827,280.2L825.3,277.7L827.1,273.8L824.5,278.6L825.8,280.9L829.6,278.7L831.9,282.6L838.2,282.9L840.5,285.2L845.9,287.3L845.1,289.3L846.2,293.2L842.2,294.6L846.4,294.9L848,300.4L845.1,298.9L846.3,302.8L849.2,305.5L847.3,308.7L840.1,304.8L846.3,310.5L848.8,308.5L854.9,308.3L858.8,315.9L860.6,320.1L865.6,328.4L864,327.6L859.7,318.9L855.9,317.5L862.1,325.5L859.3,323L857.3,325.6L850.8,329.9L846.8,330.3L847.4,332.7L856,329.6L859,329.8L858.7,332.3L860.4,336.2L860.2,329.5L863.3,329.4L865.7,334.5L865.1,337.3L863,337.9L859.7,344.3L851.6,344.7L843.1,343.4L854.2,347.1L852.7,351.9L849.6,355L850.5,355.8L854.8,352.9L859.2,353.5L857.1,355.8L855.9,360.3L862.3,349.7L862.9,350L855.6,361.2L851.4,360.8L843.8,364.5L838,370.5L834.5,376.7L833.4,384.1L829.2,383.5L822.8,386.1L819.8,387.9L816.3,392.2L813.5,398.8L813.6,403.6L811,407.9L807.9,407.8L807.4,410.8L802.9,415.1L800.6,419L794.9,422.9L792.1,423.7L793,426.9L790,428.8L786.1,434.6L786.8,436L782.6,442.3L782.4,447.1L781,450.8L781.3,454.4L778.3,460.2L780.2,461.5ZM104.2,551.6L104.2,551.6L104.2,551.6ZM99.1,569.9L103.4,565.2L104.7,569.1ZM95.1,582L95.1,582L95.1,582ZM93.3,575.4L99,570.7L103.1,570.6L104.5,573.3L99.2,577.7L97.5,577.1L95.4,579.6ZM93.1,582.8L93.1,582.8L93.1,582.8ZM88.9,587.6L88.9,587.6L88.9,587.6ZM71.8,593.7L71.8,593.7L71.8,593.7ZM71,591.7L71,591.7L71,591.7ZM68.2,593.5L68.2,593.5L68.2,593.5ZM65.8,590.1L65.8,590.1L65.8,590.1ZM67.5,564.2L67.5,564.2L67.5,564.2ZM60.9,591.2L60.9,591.2L60.9,591.2ZM58.3,592.4L58.3,592.4L58.3,592.4ZM66.1,523.9L66.1,523.9L66.1,523.9ZM56,595.9L56,595.9L56,595.9ZM44.6,597L44.6,597L44.6,597ZM42.7,595.5L42.7,595.5L42.7,595.5ZM40.6,595.9L40.6,595.9L40.6,595.9ZM44.2,547.5L49.5,546.7L51,551.2L48.4,552ZM31.3,600.8L33.8,600.4L37.9,596.5L40.1,598.2L36.6,600.9ZM50.7,504.5L59.1,500.7L65.7,499.7L65.2,503.9L71.4,505.1L74.3,503.7L71.2,500.1L73.2,497.6L66.5,495.6L66.2,492.3L59.4,484.4L61.5,480.8L67.2,481.3L70.5,478.8L71.7,475L75.3,471.4L78.2,471.3L81.6,468.4L86.7,468.1L89.3,465.1L94,466.3L95.1,468.8L101.4,468.7L100.9,470.4L104.4,472.1L108.9,470.8L113.9,472.8L118.9,472.6L122.5,473.6L126,471.7L132.9,474.4L147.3,547.1L151.4,547.2L154.5,545.1L154.6,547.3L162.3,552.4L163.6,554.8L166.5,551.9L166.5,548.3L169.4,545.9L176.3,551.6L180.8,553.8L192.6,565.1L200.1,566.6L202.9,572.6L201.4,577.9L198.4,575L192.8,573.7L192,570.8L189.2,570.5L190.2,568.2L188.2,565.4L183.2,563.5L182.3,560.4L178.3,556.5L176.2,556.8L171.4,551.2L174.7,557.7L172.7,556.5L168,559.3L160,554.5L153,552.1L153.3,549.3L151,551.3L140.6,550L135.3,551.6L125.7,547.4L124.5,545.3L119.2,547.1L121.1,552.9L119.4,554L113.5,554.3L111,558.8L108.8,560.4L104.8,560.3L106.7,557.2L105.2,556.2L106.9,552.5L106.7,548.5L111.9,544.1L109.4,543.8L106.3,546.2L101.7,553L100.5,556.9L96.2,559.5L96,562.3L99.6,563.5L96.4,566.5L95.8,569.3L89.9,572.1L85.8,575.8L85.6,578.3L82,579.1L76.7,585.8L70.6,586.4L67.3,589.1L62.9,589.5L60.6,591.3L55.6,591.9L52.7,594.2L46.7,594.8L48.6,591.6L56.5,590.1L62,585.2L66.5,584.6L75.2,578.8L80.9,573.4L82.4,566L83.9,563.2L79.6,565L78.1,563.5L75.7,566.2L73.3,562L71,560.7L64.7,564.1L64.2,558.3L65.8,556.7L63.8,551.1L63.1,552.3L58.4,553.3L52.6,546.7L54.4,545.2L51.1,538.2L53.7,533.6L60.7,525.7L64.3,527.9L67.5,524.9L71.5,525.2L73,523.2L71.5,517L73.7,515.7L72.5,514L67.6,516.5L61.3,515.5L59.1,516L55.2,514.1L53.9,509.4L55.9,508.7ZM24.9,603L29.3,599.1L31.4,600.2ZM28.5,573.3L28.5,573.3L28.5,573.3ZM20.4,602.1L20.4,602.1L20.4,602.1ZM26.8,568.3L26.8,568.3L26.8,568.3ZM16,603L16,603L16,603ZM34.4,517.8L39.4,517.9L42,521.2L44.8,522.4L40.8,524.5L39,521.1ZM7,603L7,603L7,603ZM23.4,539.9L23.4,539.9L23.4,539.9ZM-0,602.3L-0,602.3L-0,602.3ZM-6.2,601.2L-1,601.3L-2,602.5ZM-10.2,599.4L-10.2,599.4L-10.2,599.4ZM-11,601.2L-11,601.2L-11,601.2ZM-15,601.4L-13.1,599.3L-11.1,600.8ZM-18.1,599.6L-18.1,599.6L-18.1,599.6ZM-20.1,597.5L-20.1,597.5L-20.1,597.5ZM-30.2,592.5L-30.2,592.5L-30.2,592.5ZM-35.2,593.3L-35.2,593.3L-35.2,593.3ZM-40.8,588.6L-40.8,588.6L-40.8,588.6ZM-55.8,576.6L-55.8,576.6L-55.8,576.6ZM-57.6,570.9L-57.6,570.9L-57.6,570.9ZM197.4,577.4L197.4,577.4L197.4,577.4ZM196.5,577L196.5,577L196.5,577ZM194.7,574.9L194.7,574.9L194.7,574.9ZM187.6,570L187.6,570L187.6,570ZM187.1,569.1L187.1,569.1L187.1,569.1ZM186.2,576.9L186.2,576.9L186.2,576.9ZM184.9,573.1L185,569.8L186.8,569.5L194.4,575.9L195.7,580.1L189.6,577.5ZM182.7,574.2L182.7,574.2L182.7,574.2ZM180.3,567.2L181.9,564.6L185.4,564.3L188.7,566.7L183.9,568.5L182.7,572.5ZM174.6,555.9L178.2,556.9L181.4,562.6L179.6,565.9L178.9,563.1ZM173.9,564.8L177.2,563.4L180.8,572.7L176.1,568.4ZM173.5,565.9L173.5,565.9L173.5,565.9ZM169.1,561.4L171.5,557.8L175.3,558.7L177.1,562.7L173.7,562.2L173.8,564.8ZM120.8,555.1L123.6,550L124.3,550.9ZM120.4,551.4L120.4,551.4L120.4,551.4ZM814.6,594.5L814.6,594.5L814.6,594.5ZM812.7,596L812.7,596L812.7,596ZM807.4,599L807.4,599L807.4,599ZM793.7,604.2L794.8,602L800.5,597.7L805.1,600.1L796.4,604.1ZM789.6,605.4L789.6,605.4L789.6,605.4ZM786.4,605.5L786.4,605.5L786.4,605.5ZM777.4,558.3L777.4,558.3L777.4,558.3ZM770.3,606.2L770.3,606.2L770.3,606.2ZM720.4,495.2L720.4,495.2L720.4,495.2ZM939.8,114.8L939.8,114.8L939.8,114.8ZM938,116.1L938,116.1L938,116.1ZM936.3,112.2L936.3,112.2L936.3,112.2ZM932.2,116L932.2,116L932.2,116ZM933.5,124.7L933.5,124.7L933.5,124.7ZM931.4,119.2L932.7,117.1L934.3,119.4ZM930.1,116.3L930.1,116.3L930.1,116.3ZM927.7,186.8L933,186L930.7,187.6ZM918.3,188.3L921.3,184.4L924.6,186.7ZM864.3,329.1L864.3,329.1L864.3,329.1ZM863.3,349.7L863.6,348.4L870.9,343.2ZM77.2,374.3L81.1,376.9L81.3,379.5L78.9,378.3ZM74.7,384.2L78.3,390L75.8,388.7ZM65.2,358.4L65.2,358.4L65.2,358.4ZM58.3,374.3L58.3,374.3L58.3,374.3ZM56.6,355.1L62.6,358.5L56.9,357.4ZM50.3,355.2L54.1,355.4L54.9,357.8L51.9,358.1ZM46.8,353.4L46.8,353.4L46.8,353.4ZM305.4,584.5L308.2,581.9L310.3,577.9L308.8,575.4L309.7,572.5L315.2,575.8L322.2,578.3L326.3,582L326.1,584.5L332.1,589.1L328.6,593.3L321.8,595.2L317.3,598.1L313.8,603.1L309.3,600.5L308.4,598.6L309.1,593.7ZM291.6,557.9L293.9,555.4L296.4,558.5L299.6,557.2L306.5,560.7L305.4,563.9L298.5,565.6L296.7,561.1L293.1,560.2ZM291.6,566.7L294.3,565L294.8,567ZM283.9,558.3L287.4,558L289.3,560.4L285.9,562.1ZM278.6,553.8L279.6,551.2L291.4,552.6L287.8,555L283.2,553.8ZM258.1,543L261.3,542.9L264.7,540L267.3,545.8L271.4,549.4L261.5,549.3ZM226.1,532.6L227.3,530.2L231,528.3L235.4,528.6L236.6,530.2L235.8,534.3L233.3,536.3L230,535.8ZM216.3,536.6L220,533.2L219.9,535.6L217.1,538.2ZM848.9,285.2L849.9,285L848.9,285.2ZM847.3,281.5L847.3,281.5L847.3,281.5ZM677.1,130.8L682,132.3L679.8,133.4ZM663.5,133.2L663.5,133.2L663.5,133.2ZM662.4,138.6L663,134.8L664.5,138.1ZM660.9,135.6L660.9,135.6L660.9,135.6ZM658.8,142.5L658.8,142.5L658.8,142.5ZM656.6,149.6L656.6,149.6L656.6,149.6ZM655.4,152.7L655.4,152.7L655.4,152.7ZM645.5,139.9L645.5,139.9L645.5,139.9ZM601.4,92.4L610.1,85.8L613.6,84.4L610.1,88.7L603.5,93.3ZM644.5,493.1L644.5,493.1L644.5,493.1ZM639.3,492.9L639.3,492.9L639.3,492.9ZM635.2,493.9L635.2,493.9L635.2,493.9ZM631.8,493.6L631.8,493.6L631.8,493.6ZM899.3,195.7L899.3,195.7L899.3,195.7ZM896.7,198L896.7,198L896.7,198ZM815.5,153.8L815.5,153.8L815.5,153.8ZM814.2,153.7L814.2,153.7L814.2,153.7ZM720.6,223L720.6,223L720.6,223ZM718.7,222.3L718.7,222.3L718.7,222.3ZM93.2,50.9L93.2,50.9L93.2,50.9ZM98.7,24.6L98.7,24.6L98.7,24.6ZM98.9,20.3L98.9,20.3L98.9,20.3ZM97.7,23.5L97.7,23.5L97.7,23.5ZM95,31L98.5,27.7L99.3,30.6L95.8,31.6L97.4,32.7L97.1,36.6L99.6,36.9L98.1,39.2L96.2,36L96.8,33.1ZM95.5,17.9L95.5,17.9L95.5,17.9ZM93.6,19.6L93.6,19.6L93.6,19.6ZM95.2,13L95.2,13L95.2,13ZM91,21.2L95.9,19.9L98.1,21.8L95.6,26.6L91.6,23.8ZM91.1,19.1L91.1,19.1L91.1,19.1ZM641.9,146.3L641.9,146.3L641.9,146.3ZM635.6,150.4L635.6,150.4L635.6,150.4ZM584,113.3L584,113.3L584,113.3ZM583.2,116.2L583.2,116.2L583.2,116.2ZM581.2,115.2L581.2,115.2L581.2,115.2ZM579.6,117.2L579.6,117.2L579.6,117.2ZM579.8,114.4L579.8,114.4L579.8,114.4ZM579.1,113L579.1,113L579.1,113ZM579.2,118.5L579.2,118.5L579.2,118.5ZM576,114.1L576,114.1L576,114.1ZM637.5,497.4L637.5,497.4L637.5,497.4ZM628.5,497.9L631.3,495.4L631.8,498ZM623.7,510.2L623.7,510.2L623.7,510.2ZM609.5,520.8L609.5,520.8L609.5,520.8ZM606,521.3L606,521.3L606,521.3ZM602.2,522.4L602.2,522.4L602.2,522.4ZM576.6,511.5L579.9,510.5L582.6,512L580,513.9ZM908.4,188.4L908.4,188.4L908.4,188.4ZM906.7,196L906.7,196L906.7,196Z";
const STATES = [{ "id": "01", "usps": null, "name": "Alabama", "d": "M648,492.4L648,492.4L648,492.4ZM641.6,384L641.5,383.7L666.5,381.9L689.2,379.7L702.5,427L704.5,431.8L707.8,436.5L707.3,438.8L709.6,439.9L706.7,443.2L705.9,450.1L708.6,457.1L708.3,464.8L710.8,468.8L693.6,470.8L660.7,474L660.3,477L665.1,480.9L664.6,484.7L666.3,486.4L663.7,490.1L657.6,491.8L659.1,490.2L655.9,487.8L654.8,482.2L653.4,481.7L651.6,490.2L646.5,489.5L642.2,455L643.7,386.2Z", "active": false }, { "id": "02", "usps": null, "name": "Alaska", "d": "M104.2,551.6L104.2,551.6L104.2,551.6ZM99.1,569.9L103.4,565.2L104.7,569.1ZM95.1,582L95.1,582L95.1,582ZM93.3,575.4L99,570.7L103.1,570.6L104.5,573.3L99.2,577.7L97.5,577.1L95.4,579.6ZM93.1,582.8L93.1,582.8L93.1,582.8ZM88.9,587.6L88.9,587.6L88.9,587.6ZM71.8,593.7L71.8,593.7L71.8,593.7ZM71,591.7L71,591.7L71,591.7ZM68.2,593.5L68.2,593.5L68.2,593.5ZM65.8,590.1L65.8,590.1L65.8,590.1ZM67.5,564.2L67.5,564.2L67.5,564.2ZM60.9,591.2L60.9,591.2L60.9,591.2ZM58.3,592.4L58.3,592.4L58.3,592.4ZM66.1,523.9L66.1,523.9L66.1,523.9ZM56,595.9L56,595.9L56,595.9ZM44.6,597L44.6,597L44.6,597ZM42.7,595.5L42.7,595.5L42.7,595.5ZM40.6,595.9L40.6,595.9L40.6,595.9ZM44.2,547.5L49.5,546.7L51,551.2L48.4,552ZM31.3,600.8L33.8,600.4L37.9,596.5L40.1,598.2L36.6,600.9ZM50.7,504.5L59.1,500.7L65.7,499.7L65.2,503.9L71.4,505.1L74.3,503.7L71.2,500.1L73.2,497.6L66.5,495.6L66.2,492.3L59.4,484.4L61.5,480.8L67.2,481.3L70.5,478.8L71.7,475L75.3,471.4L78.2,471.3L81.6,468.4L86.7,468.1L89.3,465.1L94,466.3L95.1,468.8L101.4,468.7L100.9,470.4L104.4,472.1L108.9,470.8L113.9,472.8L118.9,472.6L122.5,473.6L126,471.7L132.9,474.4L147.3,547.1L151.4,547.2L154.5,545.1L154.6,547.3L162.3,552.4L163.6,554.8L166.5,551.9L166.5,548.3L169.4,545.9L176.3,551.6L180.8,553.8L192.6,565.1L200.1,566.6L202.9,572.6L201.4,577.9L198.4,575L192.8,573.7L192,570.8L189.2,570.5L190.2,568.2L188.2,565.4L183.2,563.5L182.3,560.4L178.3,556.5L176.2,556.8L171.4,551.2L174.7,557.7L172.7,556.5L168,559.3L160,554.5L153,552.1L153.3,549.3L151,551.3L140.6,550L135.3,551.6L125.7,547.4L124.5,545.3L119.2,547.1L121.1,552.9L119.4,554L113.5,554.3L111,558.8L108.8,560.4L104.8,560.3L106.7,557.2L105.2,556.2L106.9,552.5L106.7,548.5L111.9,544.1L109.4,543.8L106.3,546.2L101.7,553L100.5,556.9L96.2,559.5L96,562.3L99.6,563.5L96.4,566.5L95.8,569.3L89.9,572.1L85.8,575.8L85.6,578.3L82,579.1L76.7,585.8L70.6,586.4L67.3,589.1L62.9,589.5L60.6,591.3L55.6,591.9L52.7,594.2L46.7,594.8L48.6,591.6L56.5,590.1L62,585.2L66.5,584.6L75.2,578.8L80.9,573.4L82.4,566L83.9,563.2L79.6,565L78.1,563.5L75.7,566.2L73.3,562L71,560.7L64.7,564.1L64.2,558.3L65.8,556.7L63.8,551.1L63.1,552.3L58.4,553.3L52.6,546.7L54.4,545.2L51.1,538.2L53.7,533.6L60.7,525.7L64.3,527.9L67.5,524.9L71.5,525.2L73,523.2L71.5,517L73.7,515.7L72.5,514L67.6,516.5L61.3,515.5L59.1,516L55.2,514.1L53.9,509.4L55.9,508.7ZM24.9,603L29.3,599.1L31.4,600.2ZM28.5,573.3L28.5,573.3L28.5,573.3ZM20.4,602.1L20.4,602.1L20.4,602.1ZM26.8,568.3L26.8,568.3L26.8,568.3ZM16,603L16,603L16,603ZM34.4,517.8L39.4,517.9L42,521.2L44.8,522.4L40.8,524.5L39,521.1ZM7,603L7,603L7,603ZM23.4,539.9L23.4,539.9L23.4,539.9ZM-0,602.3L-0,602.3L-0,602.3ZM-6.2,601.2L-1,601.3L-2,602.5ZM-10.2,599.4L-10.2,599.4L-10.2,599.4ZM-11,601.2L-11,601.2L-11,601.2ZM-15,601.4L-13.1,599.3L-11.1,600.8ZM-18.1,599.6L-18.1,599.6L-18.1,599.6ZM-20.1,597.5L-20.1,597.5L-20.1,597.5ZM-30.2,592.5L-30.2,592.5L-30.2,592.5ZM-35.2,593.3L-35.2,593.3L-35.2,593.3ZM-40.8,588.6L-40.8,588.6L-40.8,588.6ZM-55.8,576.6L-55.8,576.6L-55.8,576.6ZM-57.6,570.9L-57.6,570.9L-57.6,570.9ZM197.4,577.4L197.4,577.4L197.4,577.4ZM196.5,577L196.5,577L196.5,577ZM194.7,574.9L194.7,574.9L194.7,574.9ZM187.6,570L187.6,570L187.6,570ZM187.1,569.1L187.1,569.1L187.1,569.1ZM186.2,576.9L186.2,576.9L186.2,576.9ZM184.9,573.1L185,569.8L186.8,569.5L194.4,575.9L195.7,580.1L189.6,577.5ZM182.7,574.2L182.7,574.2L182.7,574.2ZM180.3,567.2L181.9,564.6L185.4,564.3L188.7,566.7L183.9,568.5L182.7,572.5ZM174.6,555.9L178.2,556.9L181.4,562.6L179.6,565.9L178.9,563.1ZM173.9,564.8L177.2,563.4L180.8,572.7L176.1,568.4ZM173.5,565.9L173.5,565.9L173.5,565.9ZM169.1,561.4L171.5,557.8L175.3,558.7L177.1,562.7L173.7,562.2L173.8,564.8ZM120.8,555.1L123.6,550L124.3,550.9ZM120.4,551.4L120.4,551.4L120.4,551.4Z", "active": false }, { "id": "04", "usps": "AZ", "name": "Arizona", "d": "M145.1,407L148.8,406.9L150.7,403.8L150.2,400.8L147.4,400.1L148,391.7L152.4,389.1L153.9,380.5L156.8,377L160.1,376.1L162.8,373.6L159.8,369.6L158.5,363.2L156.2,359.1L156.8,356.2L158.7,352.8L158.2,345.1L159.9,331.1L166.6,331.5L170,334.9L172.6,331.5L176,313.3L202.7,318.2L239.3,324.3L264.6,328L246.8,456.3L208.2,450.5L171.7,429.5L142.3,411.7Z", "active": true }, { "id": "05", "usps": null, "name": "Arkansas", "d": "M523,355.3L549.9,354.7L586,353.2L603.6,352.2L605.2,357.3L600.2,364L611.9,363.1L613.7,365.2L612.7,367.3L608.4,369.4L610.2,371.6L607,373.8L604.7,377.7L606.6,377.6L605.4,380.6L607.1,383.2L602.8,386.7L604,388.7L598.4,393L600.4,394.3L598.2,395.7L598.6,400.4L595.3,401.6L593.4,409.4L589.7,410.8L591.8,415.1L588.9,415.5L590,418.1L587.6,420.4L587.6,423.2L589.5,425.1L590.7,429.8L588.6,430.7L589.4,433.1L569.4,433.9L535,434.7L534.8,422.5L532.1,421.6L528.8,422.8L526.4,420.7L526.8,380.5Z", "active": false }, { "id": "06", "usps": "CA", "name": "California", "d": "M77.2,374.3L81.1,376.9L81.3,379.5L78.9,378.3ZM74.7,384.2L78.3,390L75.8,388.7ZM65.2,358.4L65.2,358.4L65.2,358.4ZM58.3,374.3L58.3,374.3L58.3,374.3ZM56.6,355.1L62.6,358.5L56.9,357.4ZM50.3,355.2L54.1,355.4L54.9,357.8L51.9,358.1ZM46.8,353.4L46.8,353.4L46.8,353.4ZM32.6,160L46.5,164.1L62.1,168.4L83.7,174.8L100.5,179.2L83.3,245.5L156.8,356.2L156.2,359.1L158.5,363.2L159.8,369.6L162.8,373.6L160.1,376.1L156.8,377L153.9,380.5L152.4,389.1L148,391.7L147.4,400.1L150.2,400.8L150.7,403.8L148.8,406.9L145.1,407L99.5,401.7L97.9,398.1L98.9,393.6L98.7,387.7L96.5,382.3L92.5,376.4L86.4,369.8L82.1,369.3L83,367.2L81.7,362.5L76.4,361.8L69.7,356.7L69.3,354.1L65,349.3L59.3,347.9L54.9,345.2L48.8,344.3L46.5,340.5L48.6,334.9L47.9,333.2L49.8,328.1L45.9,324.6L47.3,321.2L45.3,319.3L43.4,314.7L41.6,313.3L37.2,299.7L34.8,296.1L36.3,289L38.1,289L39.7,285.9L38.3,281.4L35.1,281L31.4,274.3L32.5,270.7L31.6,266.5L33.3,260.8L35.3,260.7L34.7,265.7L38.5,270.1L38.6,265L36.4,261.7L37.3,259L35.8,257.2L39.2,256.3L37.6,253.4L35.7,253.7L35.7,256.7L33.2,259.9L29.4,254.6L26.2,253.5L28.3,250.3L27.1,243.1L24.4,239.5L20.1,229L21.6,226.9L21.4,219.4L23.6,215.7L24,209.2L21.6,201.9L18.5,197.2L18.9,193.1L26.6,183.8L27.7,178.9L31.3,172.9L31.6,165.8L30.4,164.4Z", "active": true }, { "id": "08", "usps": "CO", "name": "Colorado", "d": "M277.1,237.2L301.1,240.3L333.1,244L361.4,246.5L395.3,249L393.9,271.9L389.7,340.7L372.5,339.4L348.5,337.6L315.3,334.3L278.8,329.9L264.6,328L268.4,301.5L268.4,299L271.2,279.7Z", "active": true }, { "id": "09", "usps": null, "name": "Connecticut", "d": "M871.2,184L898.7,177.7L898.8,178L902.2,191.1L901.7,193.5L900.2,193.5L893.5,197L884.7,198.4L881.9,202.6L878.1,204.5L874.1,208.3L872.3,206L875.7,202.6L874.1,201Z", "active": false }, { "id": "10", "usps": null, "name": "Delaware", "d": "M849.2,245.8L849.4,246.4L849.2,245.8ZM844.9,244.6L846.5,241.9L850.8,241.4L849.7,244.4L848.5,246.7L849.3,249.3L852.8,252.5L854.8,258L859.5,262.9L861.3,262.7L863.7,270.3L852.6,272.5Z", "active": false }, { "id": "11", "usps": null, "name": "District of Columbia", "d": "M825.9,267L827,265.3L829.7,267.2L827.9,269.9Z", "active": false }, { "id": "12", "usps": "FL", "name": "Florida", "d": "M814.6,594.5L814.6,594.5L814.6,594.5ZM812.7,596L812.7,596L812.7,596ZM807.4,599L807.4,599L807.4,599ZM793.7,604.2L794.8,602L800.5,597.7L805.1,600.1L796.4,604.1ZM789.6,605.4L789.6,605.4L789.6,605.4ZM786.4,605.5L786.4,605.5L786.4,605.5ZM777.4,558.3L777.4,558.3L777.4,558.3ZM770.3,606.2L770.3,606.2L770.3,606.2ZM720.4,495.2L720.4,495.2L720.4,495.2ZM710.8,468.8L714.2,475L765.8,471.5L767.3,476L769.7,475.6L769.8,471L768.7,466L770,464.9L774.7,466.1L780.1,466.1L782.8,475.7L787,486.3L794.9,499.6L806.1,513.6L805,517.2L806.6,521.9L811.5,529.2L820,544.3L822.1,549L822.8,554.1L823.8,574.5L821.8,573.7L820.9,579.6L822.4,582.7L821.6,586.6L819.1,589.4L819.7,586.1L806.9,589.7L804.7,587.7L805.3,585L800.6,577.8L793.1,574.2L791.9,575.4L788.8,570.5L787.5,566L785.5,563.3L780.2,559.3L781.3,555.4L780.4,552L778.5,553.2L779.5,555.9L777.5,556.8L769.4,545.8L766.5,542.9L771.2,533.2L764.7,529.8L764.2,531.7L767.4,534.3L764.7,537.1L761.9,533.4L761.9,527.3L763.6,520.7L763.6,517.1L761.3,511.5L761.9,510.2L758.9,505.1L755,504.9L749.9,500L746.1,498.3L745.3,494.9L742.8,494.1L740.3,490.6L732.2,486.7L727.4,487.4L725.8,489.7L726.4,492.2L722.7,492.3L716.3,497.4L711.8,498L713.7,500.8L710,499.1L707.4,499.8L708.1,496.6L705.7,493.6L695.8,488.4L688.8,486.2L680.7,485.8L663.7,490.1L666.3,486.4L664.6,484.7L665.1,480.9L660.3,477L660.7,474L693.6,470.8Z", "active": true }, { "id": "13", "usps": null, "name": "Georgia", "d": "M689.2,379.7L712.7,376.8L734.9,373.7L731.6,379L731.7,381.5L738.4,385.4L741.1,385.4L744.4,391.4L748.3,396.2L754.5,399.6L756,402.3L761.9,405.8L765.7,411.8L771.3,414.4L773.2,418.1L774,422.8L776.8,424L780.8,429.6L781.4,433.4L786.1,434.6L786.8,436L782.6,442.3L782.4,447.1L781,450.8L781.3,454.4L778.3,460.2L780.2,461.5L780.1,466.1L774.7,466.1L770,464.9L768.7,466L769.8,471L769.7,475.6L767.3,476L765.8,471.5L714.2,475L710.8,468.8L708.3,464.8L708.6,457.1L705.9,450.1L706.7,443.2L709.6,439.9L707.3,438.8L707.8,436.5L704.5,431.8L702.5,427Z", "active": false }, { "id": "15", "usps": null, "name": "Hawaii", "d": "M305.4,584.5L308.2,581.9L310.3,577.9L308.8,575.4L309.7,572.5L315.2,575.8L322.2,578.3L326.3,582L326.1,584.5L332.1,589.1L328.6,593.3L321.8,595.2L317.3,598.1L313.8,603.1L309.3,600.5L308.4,598.6L309.1,593.7ZM291.6,557.9L293.9,555.4L296.4,558.5L299.6,557.2L306.5,560.7L305.4,563.9L298.5,565.6L296.7,561.1L293.1,560.2ZM291.6,566.7L294.3,565L294.8,567ZM283.9,558.3L287.4,558L289.3,560.4L285.9,562.1ZM278.6,553.8L279.6,551.2L291.4,552.6L287.8,555L283.2,553.8ZM258.1,543L261.3,542.9L264.7,540L267.3,545.8L271.4,549.4L261.5,549.3ZM226.1,532.6L227.3,530.2L231,528.3L235.4,528.6L236.6,530.2L235.8,534.3L233.3,536.3L230,535.8ZM216.3,536.6L220,533.2L219.9,535.6L217.1,538.2Z", "active": false }, { "id": "16", "usps": "ID", "name": "Idaho", "d": "M170.5,102.4L171.3,98.5L170.8,92.4L178.3,58.7L183.6,35.9L198.1,39L193.3,61.5L196.8,68.7L195.3,74.3L198,78L200.8,79.7L205.3,88.4L204.8,89.7L208.9,95.6L213.4,96.3L210.8,101.7L208.2,109.1L208.6,113.7L205.8,114.9L205.2,119.7L208.1,122.7L214.6,118.2L216.9,121L216.1,122.8L218.6,132.3L220.2,134.2L219.4,138.5L220.8,140.7L224.1,141.5L224.8,149.1L227,151.6L228.5,149L234.6,150.9L236.7,148.5L239.3,150.1L243.3,149.7L249.6,151.1L249.9,147.5L252.6,147.6L253.6,151L256,153.9L247.2,209.6L200.2,201.7L197.7,201.1L159.6,193.2L148.9,190.7L157.9,150.5L161.7,143.3L160.9,141.2L157.9,139.9L157.4,136.6L161.9,129.9L164.2,129.1L166.8,124.1L175.7,112.3L175,109L172,106.8Z", "active": true }, { "id": "17", "usps": null, "name": "Illinois", "d": "M576.5,264.7L577.4,259.4L581.2,257.8L581.5,254.5L583.6,251.8L583.7,247.9L580.7,244.7L581.6,240.8L588.1,239.3L593.2,236.1L593.5,232.7L595.5,231L595.5,223.8L591.6,221.6L590,218.2L587,215.4L617.8,213.7L634.2,212.4L634,216.8L637.2,222.1L640.3,229.8L645,283.6L643.5,287.9L646.2,292.6L646.5,298.5L641.5,308.6L638,317.4L639.4,319.7L637.3,323.1L639,327.3L632.2,329.8L631.7,332.2L633.6,335.1L631.5,337.1L624.4,334.1L620.6,337.5L621.2,339.9L618.6,340L613.8,333.4L615.2,332L614.1,326.4L607.1,319.7L606.1,320.6L597.6,313.2L597.6,309.3L600.1,303.2L601,298.4L594.9,296.1L593.4,298.3L591.3,297.3L589.7,289.9L584.1,285.6L578.1,279.5L575.5,272.6L575.1,268Z", "active": false }, { "id": "18", "usps": null, "name": "Indiana", "d": "M640.3,229.8L642.2,231.2L647.2,230.6L651.9,227.6L685.6,223.9L685.8,225.4L688.5,247.4L692.5,284.3L691.3,285.7L693.5,291.6L690.7,292L687.5,294.5L685.1,293.5L682.6,295L683.6,298.2L680.6,301L680,303.7L677.1,305.1L675.6,311.5L674.1,312.8L669.8,310.7L668.6,308.8L665.5,311.7L666,314.3L662.3,315.5L660.8,313.4L656.7,315.7L655.3,318.7L650.6,315.6L646.7,315L645.3,316.8L639.4,319.7L638,317.4L641.5,308.6L646.5,298.5L646.2,292.6L643.5,287.9L645,283.6Z", "active": false }, { "id": "19", "usps": null, "name": "Iowa", "d": "M490.6,195.2L515.8,195.2L549.3,194.4L576.3,193.3L576.5,196.3L579.2,198.7L577.4,201.6L578.2,206.8L579.9,210.5L585.6,212.4L587,215.4L590,218.2L591.6,221.6L595.5,223.8L595.5,231L593.5,232.7L593.2,236.1L588.1,239.3L581.6,240.8L580.7,244.7L583.7,247.9L583.6,251.8L581.5,254.5L581.2,257.8L577.4,259.4L576.5,264.7L570.9,259.6L544.8,261.3L521.4,262L502,261.9L499.9,258.5L501.2,255.1L498.9,244.7L499.3,241.9L496.4,239.9L496.9,234L494.2,229.6L490.6,218.3L487.5,211.9L489,210L490.8,203.9L488.5,199.8L488.2,195.2Z", "active": false }, { "id": "20", "usps": "KS", "name": "Kansas", "d": "M393.9,271.9L422.4,273.5L443.4,274.3L464.8,274.9L495.4,275.2L509.9,275.2L511.7,277.3L516.5,277.7L516.1,281L513.5,285.8L516.5,289.2L518.5,293.2L522.3,295.2L522.8,343.8L489,344L458.9,343.6L432.6,342.7L389.7,340.7Z", "active": true }, { "id": "21", "usps": null, "name": "Kentucky", "d": "M621.2,339.9L620.6,337.5L624.4,334.1L631.5,337.1L633.6,335.1L631.7,332.2L632.2,329.8L639,327.3L637.3,323.1L639.4,319.7L645.3,316.8L646.7,315L650.6,315.6L655.3,318.7L656.7,315.7L660.8,313.4L662.3,315.5L666,314.3L665.5,311.7L668.6,308.8L669.8,310.7L674.1,312.8L675.6,311.5L677.1,305.1L680,303.7L680.6,301L683.6,298.2L682.6,295L685.1,293.5L687.5,294.5L690.7,292L693.5,291.6L691.3,285.7L692.5,284.3L696.4,284.6L698.5,283.2L700.9,284.9L703.9,289.8L710.2,290.2L713.9,292.7L716.2,290.6L720.6,292.4L727,287.9L728.4,291.7L733.2,294.8L733.8,301.7L740.9,311.1L747.1,313.2L741.2,320.4L735.2,324.6L733.1,330.3L729.8,331.5L729,334.2L719.8,338.7L719.6,339.2L704.2,340.8L692.5,341.5L681.1,342.8L672,343.2L644.8,346.1L640.8,345.4L641.4,349.5L616.9,351.3L617.4,348.6L620.2,349.5L621.8,340.3ZM615.6,351.5L614.7,351.5L615.6,351.5Z", "active": false }, { "id": "22", "usps": null, "name": "Louisiana", "d": "M637.5,497.4L637.5,497.4L637.5,497.4ZM628.5,497.9L631.3,495.4L631.8,498ZM623.7,510.2L623.7,510.2L623.7,510.2ZM609.5,520.8L609.5,520.8L609.5,520.8ZM606,521.3L606,521.3L606,521.3ZM602.2,522.4L602.2,522.4L602.2,522.4ZM576.6,511.5L579.9,510.5L582.6,512L580,513.9ZM535,434.7L569.4,433.9L589.4,433.1L591.3,435.6L590.1,441.4L592.9,441.6L590.9,444.9L595.4,448.2L590.4,451.5L592.6,453L587,461.4L586.4,466L584.4,467L585.4,470L583.3,470L584.6,472.8L582.2,473.1L584,478.2L582.6,479.2L619.1,477.1L617.6,484.9L621.2,489.5L622.3,493.1L624.8,495.4L619.2,498.9L619,501.1L623.8,502.3L625.7,497.7L628.2,501.3L630,499.3L630.5,502.2L628,503L627.3,507.2L622.8,507.8L622.5,509.6L626.3,513.4L632.4,513.8L634.9,517.8L634.2,521.8L631.8,519.9L628.8,523.6L630.6,519.2L623.8,515.7L619.8,515.3L612.6,521.1L609.8,516.3L608.1,515.4L605.1,517.7L601,522.8L597.9,519.8L595.2,519.8L590.3,517.5L591.6,516L589.6,512.7L587.7,513.7L584.2,507.9L579.1,508.6L578.8,505.8L574.5,508.2L574.8,511L570.6,513.1L564.8,512.1L553.6,508.2L547.7,508.4L540.6,510.4L538.9,507.5L543.1,502.1L543,493.3L542.3,490.3L545.5,484.5L546.1,479.9L545.4,476.2L541.8,469.1L539.6,467L539.8,463L535.5,457.9Z", "active": false }, { "id": "23", "usps": null, "name": "Maine", "d": "M939.8,114.8L939.8,114.8L939.8,114.8ZM938,116.1L938,116.1L938,116.1ZM936.3,112.2L936.3,112.2L936.3,112.2ZM932.2,116L932.2,116L932.2,116ZM933.5,124.7L933.5,124.7L933.5,124.7ZM931.4,119.2L932.7,117.1L934.3,119.4ZM930.1,116.3L930.1,116.3L930.1,116.3ZM910.2,150.1L904.5,145.2L894.8,114.3L890.9,102.4L891.8,101.2L894.8,103.1L894.3,99.3L897.3,98.8L895.2,96.3L898.2,88.9L900,86.1L898.2,82.6L898.1,76.3L899.9,73.8L899.1,67.5L905.9,47.6L908.8,47.5L910,51.5L912.5,52.3L916.6,48.5L922.6,45.8L929.7,49.8L937.3,74L938.7,79.9L944.6,79.9L946.3,84.3L946.1,87L949.5,89.7L952,88.1L957.1,94.8L955,99.4L952.8,98.6L950.2,105.6L946.8,104.3L946.3,107.5L943.8,110.3L941.4,109.7L941.5,112.5L938.9,113.7L937.3,109.7L935.4,111.3L937.1,114.9L935.7,117.6L934.5,114.7L931.9,114.3L931,110.1L929.7,113.9L929.3,120.5L930.2,122.9L921.4,128.9L919.7,132.2L918.1,130.9L915.1,134.1L915.1,136.8L912.8,138.3L912.9,142.3L911.2,143.3Z", "active": false }, { "id": "24", "usps": null, "name": "Maryland", "d": "M849.9,285L848.9,285.2L849.9,285ZM847.3,281.5L847.3,281.5L847.3,281.5ZM782.3,256.9L816.4,250.5L844.9,244.6L852.6,272.5L863.7,270.3L862.5,280.5L856.1,282.7L855.5,283.8L851.6,285.3L851.2,281.8L847.7,275.6L847.6,278.7L845.5,279.1L841.4,274.1L841.8,271.3L846.4,271.3L840.1,267.9L842.3,266.1L841.1,263.7L839,266.3L839.4,261.7L841.4,262.9L841.8,260L839.3,259.3L841.6,251.7L839.2,254.5L836.8,254L837.6,257L836.3,258.8L838,262.7L836.2,268.8L838.1,274L841,276.7L840.3,279L843.8,284.2L838.3,281.3L834.6,281.5L829.9,277.6L827,280.2L825.3,277.7L827.1,273.8L827.9,269.9L829.7,267.2L827,265.3L825.9,267L818.2,264.2L818.7,261.5L813.9,260.3L810.6,256.4L810.8,254.4L807.7,255L804.5,253.4L801.8,255.2L800.4,258.3L794.3,257.4L792.3,261.6L789.7,261.4L787.1,265.8L784.1,268.5Z", "active": false }, { "id": "25", "usps": null, "name": "Massachusetts", "d": "M927.7,186.8L933,186L930.7,187.6ZM918.3,188.3L921.3,184.4L924.6,186.7ZM871,167.6L884.1,164.8L902.9,160.7L906.2,156L909.5,154.8L911.2,158.5L914.3,158.5L909.5,165.8L910,168.6L911.8,167.4L917,171.2L917.5,174.2L919.4,174.4L921.7,177.7L924.8,177.5L928.8,175.1L928.4,171.4L931,176.8L924.7,179.9L920,183.3L917.9,179.4L915.4,182.8L915.4,185.3L912.8,186.4L910.5,182.8L909.8,182.1L907.7,181L905.5,176L898.8,178L898.7,177.7L871.2,184L870.6,183.2Z", "active": false }, { "id": "26", "usps": null, "name": "Michigan", "d": "M677.1,130.8L682,132.3L679.8,133.4ZM663.5,133.2L663.5,133.2L663.5,133.2ZM662.4,138.6L663,134.8L664.5,138.1ZM660.9,135.6L660.9,135.6L660.9,135.6ZM658.8,142.5L658.8,142.5L658.8,142.5ZM656.6,149.6L656.6,149.6L656.6,149.6ZM655.4,152.7L655.4,152.7L655.4,152.7ZM645.5,139.9L645.5,139.9L645.5,139.9ZM651.9,227.6L655.1,224.2L658.6,215.5L659.8,210.2L660,204.7L658.9,198L652.4,184.3L653.8,180.1L651.9,174.9L655.2,168L654.9,159.7L657.1,158.7L657.1,154.9L661.1,153.5L663.6,147.8L664.7,150.6L663.9,155.9L665,157.2L666.3,152L666.1,157.6L667.8,153.2L667.3,145.5L669.6,143.3L674.2,141.9L670.5,138.3L672.9,134.4L675.4,132.7L680.6,135.2L684.6,135.1L686.6,137.8L689.8,137.9L695.1,140.2L696.7,139.9L701.3,147L699.1,146.2L698.8,148.9L700.9,150.3L702.2,153.9L702.4,162.5L699.2,165.5L699.2,169.4L695.4,171.5L694.1,177.1L699,180.2L704.6,170.6L709.9,167.7L713,169.1L715.2,172.4L718.9,185.8L721.5,191.2L720.9,199.8L718.5,202.2L719.1,198.7L716.3,199.4L715.1,206.5L712.1,209.5L712.5,212.9L709.8,217.1L708.3,221.7L685.8,225.4L685.6,223.9ZM601.4,92.4L610.1,85.8L613.6,84.4L610.1,88.7L603.5,93.3ZM585.3,123.1L591.3,120.2L593.9,117.3L600.5,115.8L612.9,105.8L615.1,102.8L618.6,100.5L624.4,99.7L625.9,101.1L622.2,101.8L615.4,111.8L615.6,116.6L618.6,112.5L624,112.5L628.3,114.3L633.1,120.8L643.6,121.4L651.8,115.2L662,114L665.3,111.9L670,111L669,112.8L669.8,117.6L676.5,118.3L679,116.1L683.4,114.8L684.4,121.5L682.5,123L686.1,123.6L687,125.7L690.2,126.2L690.2,124L693.2,123.6L695.2,125.8L694,127.6L685.2,127.2L681.2,128.8L676.5,126.6L674.2,131L671.2,128.3L665.8,126.9L662.9,127.3L660.9,130.3L657,131.8L652.6,131.3L650.3,135.5L645.2,139.2L647.6,134.3L643.6,134.5L643,137.7L637.9,139.6L632.4,153L629.9,151.5L631,147.6L627.3,147L628.2,140.2L622.3,137.4L622.7,135L611.9,133.8L606.7,131.4L590.3,128L588.3,124.2Z", "active": false }, { "id": "27", "usps": null, "name": "Minnesota", "d": "M479.5,70.7L510.8,70.8L510.7,62.2L515.6,64.1L517.9,73.3L517.8,75.7L520.2,77.3L530.7,78.8L531.5,81.3L536.5,80.5L540.3,78.2L547.7,80.3L551.1,82.2L553.4,87.3L554.9,84.2L558.1,84L558.9,86L563.4,87.3L565.8,90.7L570.6,89.6L576.7,85.8L578.1,88.9L587.6,88L591.8,90.6L596.2,90.7L590.4,94.2L582,97.5L579,99.5L572.7,105.7L569.9,109.4L558.9,119.4L560.2,121.1L555.9,122.3L556.4,135.6L551.1,139L547.6,144L547.5,147.3L551.3,149.9L549.7,153.6L550.1,161.7L549.3,165.9L553.6,169.9L556.9,170.1L559.2,172.7L563.9,174.9L564.9,177.8L569.8,181.6L572.3,182.2L575.6,187.1L576.3,193.3L549.3,194.4L515.8,195.2L490.6,195.2L490.8,154.3L487.1,151.7L484.4,147.3L488.8,142.5L489.1,139.9L488.6,130.9L486.5,127.6L485.5,123.3L484.9,102.5L480.5,89.4L480.5,80.8L481.4,77.7Z", "active": false }, { "id": "28", "usps": null, "name": "Mississippi", "d": "M644.5,493.1L644.5,493.1L644.5,493.1ZM639.3,492.9L639.3,492.9L639.3,492.9ZM635.2,493.9L635.2,493.9L635.2,493.9ZM631.8,493.6L631.8,493.6L631.8,493.6ZM589.4,433.1L588.6,430.7L590.7,429.8L589.5,425.1L587.6,423.2L587.6,420.4L590,418.1L588.9,415.5L591.8,415.1L589.7,410.8L593.4,409.4L595.3,401.6L598.6,400.4L598.2,395.7L600.4,394.3L598.4,393L604,388.7L602.8,386.7L618.9,385.7L641.6,384L643.7,386.2L642.2,455L646.5,489.5L644.4,490.8L636.2,489.7L626.7,493.6L624.8,495.4L622.3,493.1L621.2,489.5L617.6,484.9L619.1,477.1L582.6,479.2L584,478.2L582.2,473.1L584.6,472.8L583.3,470L585.4,470L584.4,467L586.4,466L587,461.4L592.6,453L590.4,451.5L595.4,448.2L590.9,444.9L592.9,441.6L590.1,441.4L591.3,435.6Z", "active": false }, { "id": "29", "usps": null, "name": "Missouri", "d": "M502,261.9L521.4,262L544.8,261.3L570.9,259.6L576.5,264.7L575.1,268L575.5,272.6L578.1,279.5L584.1,285.6L589.7,289.9L591.3,297.3L593.4,298.3L594.9,296.1L601,298.4L600.1,303.2L597.6,309.3L597.6,313.2L606.1,320.6L607.1,319.7L614.1,326.4L615.2,332L613.8,333.4L618.6,340L621.2,339.9L621.8,340.3L620.2,349.5L617.4,348.6L616.9,351.3L615.6,351.5L614.7,351.5L615.4,354.2L612.1,357.7L614.2,360.1L611.9,363.1L600.2,364L605.2,357.3L603.6,352.2L586,353.2L549.9,354.7L523,355.3L522.8,343.8L522.3,295.2L518.5,293.2L516.5,289.2L513.5,285.8L516.1,281L516.5,277.7L511.7,277.3L509.9,275.2L508,273.9L507.1,270L504.7,268.1Z", "active": false }, { "id": "30", "usps": "MT", "name": "Montana", "d": "M198.1,39L232.9,46.1L265.4,51.9L302.8,57.5L340.4,62.1L376.9,65.7L371.1,134.3L369.4,155.7L369.1,155.7L339.2,153L298.3,148L263.3,143.1L257.8,142L256,153.9L253.6,151L252.6,147.6L249.9,147.5L249.6,151.1L243.3,149.7L239.3,150.1L236.7,148.5L234.6,150.9L228.5,149L227,151.6L224.8,149.1L224.1,141.5L220.8,140.7L219.4,138.5L220.2,134.2L218.6,132.3L216.1,122.8L216.9,121L214.6,118.2L208.1,122.7L205.2,119.7L205.8,114.9L208.6,113.7L208.2,109.1L210.8,101.7L213.4,96.3L208.9,95.6L204.8,89.7L205.3,88.4L200.8,79.7L198,78L195.3,74.3L196.8,68.7L193.3,61.5Z", "active": true }, { "id": "31", "usps": null, "name": "Nebraska", "d": "M365.3,201L403.8,203.9L434.2,205.4L456.8,206.2L457.3,207.3L465.7,211.6L467,209.6L476.4,209.5L486.6,214.7L488,217.9L490.6,218.3L494.2,229.6L496.9,234L496.4,239.9L499.3,241.9L498.9,244.7L501.2,255.1L499.9,258.5L502,261.9L504.7,268.1L507.1,270L508,273.9L509.9,275.2L495.4,275.2L464.8,274.9L443.4,274.3L422.4,273.5L393.9,271.9L395.3,249L361.4,246.5Z", "active": false }, { "id": "32", "usps": "NV", "name": "Nevada", "d": "M100.5,179.2L121.6,184.5L148.9,190.7L159.6,193.2L197.7,201.1L176,313.3L172.6,331.5L170,334.9L166.6,331.5L159.9,331.1L158.2,345.1L158.7,352.8L156.8,356.2L83.3,245.5Z", "active": true }, { "id": "33", "usps": null, "name": "New Hampshire", "d": "M886.1,110.5L886.7,105.2L890.9,102.4L894.8,114.3L904.5,145.2L910.2,150.1L909.5,154.8L906.2,156L902.9,160.7L884.1,164.8L882.3,163.4L882.1,157.6L880.6,145.8L883.1,133L881.8,127.9L885.1,126.3L887.9,122.1L885.6,116.8L886.9,112.7Z", "active": false }, { "id": "34", "usps": null, "name": "New Jersey", "d": "M849.2,245.8L849.7,244.4L850.8,241.4L854.8,238.7L854.8,236.9L860.6,230.8L853.8,226.4L852.9,223.6L850.7,223.4L849.9,220.8L851.5,216.1L849.6,213.8L855,204L870.1,209L869.2,216.4L868.9,217.2L866.9,218.3L866.6,221.4L871.4,222.4L872.4,224.8L873.2,237.3L869.9,247.5L867.1,250.9L865.4,257.2L862.6,259L862.9,253.8L858.6,254.3L851.7,249.8L849.4,246.4Z", "active": false }, { "id": "35", "usps": null, "name": "New Mexico", "d": "M264.6,328L278.8,329.9L315.3,334.3L348.5,337.6L372.5,339.4L371.6,350.8L370.9,350.7L366.7,407.5L364.6,429.6L362.9,453.3L338.7,451.3L317.8,449.4L295.1,447L294.3,449.3L296.3,452.1L264.2,448.2L262.9,458.4L246.8,456.3Z", "active": false }, { "id": "36", "usps": null, "name": "New York", "d": "M899.3,195.7L899.3,195.7L899.3,195.7ZM896.7,198L896.7,198L896.7,198ZM868.9,217.2L868.5,220.3L866.6,221.4L866.9,218.3ZM815.5,153.8L815.5,153.8L815.5,153.8ZM814.2,153.7L814.2,153.7L814.2,153.7ZM767.5,200.3L776.4,192.1L777.5,188.8L780.3,186.1L776.9,182L774.8,176L783.8,171.7L792.1,170.3L795.8,170.3L799.8,171.9L801.9,170.5L809,169.2L812.8,166.7L816.6,161.8L819.3,161.1L819.4,158.3L816.9,154.4L819.3,152.5L814.7,150.3L815,146.4L820.5,141.3L822.1,137.5L828.6,127.9L832.3,124.4L857.6,117.8L859.2,127.3L860.9,129L862,134L861.3,139.5L864.1,145.3L863.6,148.6L867.1,150.3L871,167.6L870.6,183.2L871.2,184L874.1,201L875.7,202.6L872.3,206L874.1,208.3L873.7,211.1L877.1,208.5L881.6,208.4L882.7,206.7L890.9,204.2L894.7,199.6L899.5,201.8L895.5,205.8L885.7,213L871.7,219.3L869.2,216.4L870.1,209L855,204L853.9,202.5L849.7,202.4L847.1,196.5L843.2,194.8L840.9,192.1L824.8,195.6L800.4,200.6L768.6,206.4Z", "active": false }, { "id": "37", "usps": null, "name": "North Carolina", "d": "M864.3,329.1L864.3,329.1L864.3,329.1ZM863.3,349.7L863.6,348.4L870.9,343.2ZM755.5,334L780.3,331.1L812.1,325.5L840.3,320L858.8,315.9L860.6,320.1L865.6,328.4L864,327.6L859.7,318.9L855.9,317.5L862.1,325.5L859.3,323L857.3,325.6L850.8,329.9L846.8,330.3L847.4,332.7L856,329.6L859,329.8L858.7,332.3L860.4,336.2L860.2,329.5L863.3,329.4L865.7,334.5L865.1,337.3L863,337.9L859.7,344.3L851.6,344.7L843.1,343.4L854.2,347.1L852.7,351.9L849.6,355L850.5,355.8L854.8,352.9L859.2,353.5L857.1,355.8L855.9,360.3L862.3,349.7L862.9,350L855.6,361.2L851.4,360.8L843.8,364.5L838,370.5L834.5,376.7L833.4,384.1L829.2,383.5L822.8,386.1L798.1,368.4L777.6,371.5L777.5,368.8L772,364.7L749.4,367L745.6,368.2L734.9,373.7L712.7,376.8L712.6,371.4L717.3,369.2L717.4,365.9L721.1,362.5L726.3,361.7L733,355.7L734.6,355.9L737.8,350.2L740.1,348.3L740.8,350.5L747.2,345.2L750.7,345.5L752.4,341.1L755,338.2Z", "active": false }, { "id": "38", "usps": null, "name": "North Dakota", "d": "M376.9,65.7L404.4,67.8L420.8,68.8L444.9,69.8L479.5,70.7L481.4,77.7L480.5,80.8L480.5,89.4L484.9,102.5L485.5,123.3L486.5,127.6L488.6,130.9L489.1,139.9L459.9,139.4L442.8,138.8L412.5,137.3L392.2,136L371.1,134.3Z", "active": false }, { "id": "39", "usps": null, "name": "Ohio", "d": "M720.6,223L720.6,223L720.6,223ZM718.7,222.3L718.7,222.3L718.7,222.3ZM685.8,225.4L708.3,221.7L717.6,225.5L719,223.6L725.6,227.4L733,223.3L737.5,223.2L741.9,218.3L748.5,213L756.1,209L761.1,239.2L758.9,241L760.9,246.6L759.5,252.5L759.8,256.2L757.8,263.4L753.7,269.4L749.8,269.4L748.1,273L746.4,273.1L744.6,277.8L746,281.3L744,282.7L741.4,279.5L738.6,285.4L739.7,289.8L737.9,293.5L733.2,294.8L728.4,291.7L727,287.9L720.6,292.4L716.2,290.6L713.9,292.7L710.2,290.2L703.9,289.8L700.9,284.9L698.5,283.2L696.4,284.6L692.5,284.3L688.5,247.4Z", "active": false }, { "id": "40", "usps": null, "name": "Oklahoma", "d": "M372.5,339.4L389.7,340.7L432.6,342.7L458.9,343.6L489,344L522.8,343.8L523,355.3L526.8,380.5L526.4,420.7L519.6,418.5L517.3,415.7L512.4,413.5L511.4,415.4L506.5,415.4L506.2,414.2L500.9,416.3L499.2,415.2L492.8,417.9L491.6,419.8L485.4,414.7L483.8,416.6L481.1,413.8L476.1,418.5L475.4,414.4L472.3,416.6L466.5,412.7L463.1,415.8L460.9,414.6L461.7,412.5L459,412.1L457.6,409.6L454,408.5L451.7,410.6L450,408.6L446.6,409.1L442.5,406.8L438.7,406.8L438.4,404L435.3,401.1L434.9,402.9L429.4,402.6L425.9,398.5L423.9,398.3L425.8,353.9L396.5,352.4L371.6,350.8Z", "active": false }, { "id": "41", "usps": "OR", "name": "Oregon", "d": "M71,70.2L74.3,73.9L77,73.8L79.5,76.9L80.1,80L79,86.8L86.2,91.5L93.8,89.9L98.2,90.6L102.7,93.1L102.8,94.7L112,93.9L113.8,95.4L118.4,96L122.8,94.9L130.5,94.9L136.2,95.7L138.7,94.8L170.5,102.4L172,106.8L175,109L175.7,112.3L166.8,124.1L164.2,129.1L161.9,129.9L157.4,136.6L157.9,139.9L160.9,141.2L161.7,143.3L157.9,150.5L148.9,190.7L121.6,184.5L100.5,179.2L83.7,174.8L62.1,168.4L46.5,164.1L32.6,160L31.1,156.7L32,149.2L33.6,146.5L32.8,139.9L38.4,131.4L42.7,125.8L45.4,120.7L52.7,102.7L53.7,98.9L57.2,92.5L61.1,81.4L62.2,75L63.6,73.9L63.8,68.9L65,70.6Z", "active": true }, { "id": "42", "usps": null, "name": "Pennsylvania", "d": "M756.1,209L767.5,200.3L768.6,206.4L800.4,200.6L824.8,195.6L840.9,192.1L843.2,194.8L847.1,196.5L849.7,202.4L853.9,202.5L855,204L849.6,213.8L851.5,216.1L849.9,220.8L850.7,223.4L852.9,223.6L853.8,226.4L860.6,230.8L854.8,236.9L854.8,238.7L850.8,241.4L846.5,241.9L844.9,244.6L816.4,250.5L782.3,256.9L764.5,259.9L761.1,239.2Z", "active": false }, { "id": "44", "usps": null, "name": "Rhode Island", "d": "M910.5,182.8L912.8,186.4L909.1,188.3ZM908.4,188.4L908.4,188.4L908.4,188.4ZM906.7,196L906.7,196L906.7,196ZM901.7,193.5L902.2,191.1L898.8,178L905.5,176L907.7,181L909.8,182.1L906.7,181.2L908.1,188.2L907.6,190.7Z", "active": false }, { "id": "45", "usps": null, "name": "South Carolina", "d": "M734.9,373.7L745.6,368.2L749.4,367L772,364.7L777.5,368.8L777.6,371.5L798.1,368.4L822.8,386.1L819.8,387.9L816.3,392.2L813.5,398.8L813.6,403.6L811,407.9L807.9,407.8L807.4,410.8L802.9,415.1L800.6,419L794.9,422.9L792.1,423.7L793,426.9L790,428.8L786.1,434.6L781.4,433.4L780.8,429.6L776.8,424L774,422.8L773.2,418.1L771.3,414.4L765.7,411.8L761.9,405.8L756,402.3L754.5,399.6L748.3,396.2L744.4,391.4L741.1,385.4L738.4,385.4L731.7,381.5L731.6,379Z", "active": false }, { "id": "46", "usps": null, "name": "South Dakota", "d": "M369.1,155.7L369.4,155.7L371.1,134.3L392.2,136L412.5,137.3L442.8,138.8L459.9,139.4L489.1,139.9L488.8,142.5L484.4,147.3L487.1,151.7L490.8,154.3L490.6,195.2L488.2,195.2L488.5,199.8L490.8,203.9L489,210L487.5,211.9L490.6,218.3L488,217.9L486.6,214.7L476.4,209.5L467,209.6L465.7,211.6L457.3,207.3L456.8,206.2L434.2,205.4L403.8,203.9L365.3,201Z", "active": false }, { "id": "47", "usps": null, "name": "Tennessee", "d": "M611.9,363.1L614.2,360.1L612.1,357.7L615.4,354.2L614.7,351.5L615.6,351.5L616.9,351.3L641.4,349.5L640.8,345.4L644.8,346.1L672,343.2L681.1,342.8L692.5,341.5L704.2,340.8L719.6,339.2L719.8,338.7L727.2,337.9L755.5,334L755,338.2L752.4,341.1L750.7,345.5L747.2,345.2L740.8,350.5L740.1,348.3L737.8,350.2L734.6,355.9L733,355.7L726.3,361.7L721.1,362.5L717.4,365.9L717.3,369.2L712.6,371.4L712.7,376.8L689.2,379.7L666.5,381.9L641.5,383.7L641.6,384L618.9,385.7L602.8,386.7L607.1,383.2L605.4,380.6L606.6,377.6L604.7,377.7L607,373.8L610.2,371.6L608.4,369.4L612.7,367.3L613.7,365.2Z", "active": false }, { "id": "48", "usps": "TX", "name": "Texas", "d": "M371.6,350.8L396.5,352.4L425.8,353.9L423.9,398.3L425.9,398.5L429.4,402.6L434.9,402.9L435.3,401.1L438.4,404L438.7,406.8L442.5,406.8L446.6,409.1L450,408.6L451.7,410.6L454,408.5L457.6,409.6L459,412.1L461.7,412.5L460.9,414.6L463.1,415.8L466.5,412.7L472.3,416.6L475.4,414.4L476.1,418.5L481.1,413.8L483.8,416.6L485.4,414.7L491.6,419.8L492.8,417.9L499.2,415.2L500.9,416.3L506.2,414.2L506.5,415.4L511.4,415.4L512.4,413.5L517.3,415.7L519.6,418.5L526.4,420.7L528.8,422.8L532.1,421.6L534.8,422.5L535,434.7L535.5,457.9L539.8,463L539.6,467L541.8,469.1L545.4,476.2L546.1,479.9L545.5,484.5L542.3,490.3L543,493.3L543.1,502.1L538.9,507.5L540.6,510.4L534.8,511.5L522.4,517.4L526.7,513.3L522.1,514.3L523.7,509.2L518.4,510.5L517.4,513.8L519.6,515.1L519.9,519.4L523.1,518.8L517.3,523.1L510.3,529.5L492,539.2L480.2,548.4L475,555.4L470.5,566.2L470.2,574.1L473.5,587.2L469.7,576L469.6,568.9L471.7,560.1L480.4,546.2L486,542.5L489.2,541.4L489,539.7L484.3,542L482.5,539.9L482,544L479.3,546.3L477.2,544.8L473.6,547L477.4,546.5L474.1,553L468.7,551.8L472.7,555.8L469.4,564.3L467.3,563.3L465,566L469.2,565.7L467.9,575.9L469.1,583.2L471.8,588L471.5,591.7L474.3,592.7L474.4,595.1L466.7,596.6L464.1,593.5L461,592.5L451.8,592.1L447.4,588.6L443.2,588.2L440.1,585.1L434.3,583.6L431.4,574.1L427.9,569.9L428.5,566.5L427.1,564.3L427.6,559.5L425.3,555.9L423.3,555.5L419.9,552.1L419,548L416.1,544.1L412,540.8L410.2,533.9L405.9,526.5L405.1,521.7L403,518.5L399,515.5L398.1,513.5L394.2,511.5L393.3,508.7L390.3,505.7L385.8,505.8L377.8,504.7L373.4,502.6L372.4,504.9L366.4,505.5L363.7,509.9L361,517.2L359.4,517.5L356.8,521.6L353.5,521.4L348.3,517L337.2,510.9L330,503.6L327.7,497.8L328.1,492L325.2,486.9L324.8,482.8L323,479.9L315.8,475.4L312.3,469.8L309.2,467.6L306.2,462.7L301.7,459.9L299,453.5L296.3,452.1L294.3,449.3L295.1,447L317.8,449.4L338.7,451.3L362.9,453.3L364.6,429.6L366.7,407.5L370.9,350.7Z", "active": true }, { "id": "49", "usps": "UT", "name": "Utah", "d": "M197.7,201.1L200.2,201.7L247.2,209.6L243.5,232.2L252.7,233.7L277.1,237.2L271.2,279.7L268.4,299L268.4,301.5L264.6,328L239.3,324.3L202.7,318.2L176,313.3Z", "active": true }, { "id": "50", "usps": null, "name": "Vermont", "d": "M857.6,117.8L873.7,114L886.1,110.5L886.9,112.7L885.6,116.8L887.9,122.1L885.1,126.3L881.8,127.9L883.1,133L880.6,145.8L882.1,157.6L882.3,163.4L884.1,164.8L871,167.6L867.1,150.3L863.6,148.6L864.1,145.3L861.3,139.5L862,134L860.9,129L859.2,127.3Z", "active": false }, { "id": "51", "usps": null, "name": "Virginia", "d": "M855.5,283.8L856.1,282.7L862.5,280.5L861.3,284.3L858.4,288.2L858.5,292.2L856.6,301.3L854.5,303.5L852.6,300.7L852.9,292.1L855.6,285.9ZM849.9,285L848.9,285.2L849.9,285ZM747.1,313.2L746.8,314.7L750,318.6L755.4,319.7L758.5,316.2L761.3,318.1L766.7,315.4L773,310.5L773.8,311.7L776.6,309.3L777.5,306.3L776,305.1L780,297.5L780.4,294.1L783.7,286.6L783.8,282.9L787.3,285.4L790.3,285.9L794,275L796.6,276.6L802.9,266L802.6,259.1L812.9,264.9L813.9,260.3L818.7,261.5L818.2,264.2L825.9,267L827.9,269.9L827.1,273.8L824.5,278.6L825.8,280.9L829.6,278.7L831.9,282.6L838.2,282.9L840.5,285.2L845.9,287.3L845.1,289.3L846.2,293.2L842.2,294.6L846.4,294.9L848,300.4L845.1,298.9L846.3,302.8L849.2,305.5L847.3,308.7L840.1,304.8L846.3,310.5L848.8,308.5L854.9,308.3L858.8,315.9L840.3,320L812.1,325.5L780.3,331.1L755.5,334L727.2,337.9L719.8,338.7L729,334.2L729.8,331.5L733.1,330.3L735.2,324.6L741.2,320.4Z", "active": false }, { "id": "53", "usps": "WA", "name": "Washington", "d": "M93.2,50.9L93.2,50.9L93.2,50.9ZM98.7,24.6L98.7,24.6L98.7,24.6ZM98.9,20.3L98.9,20.3L98.9,20.3ZM97.7,23.5L97.7,23.5L97.7,23.5ZM95,31L98.5,27.7L99.3,30.6L95.8,31.6L97.4,32.7L97.1,36.6L99.6,36.9L98.1,39.2L96.2,36L96.8,33.1ZM95.5,17.9L95.5,17.9L95.5,17.9ZM93.6,19.6L93.6,19.6L93.6,19.6ZM95.2,13L95.2,13L95.2,13ZM91,21.2L95.9,19.9L98.1,21.8L95.6,26.6L91.6,23.8ZM91.1,19.1L91.1,19.1L91.1,19.1ZM183.6,35.9L178.3,58.7L170.8,92.4L171.3,98.5L170.5,102.4L138.7,94.8L136.2,95.7L130.5,94.9L122.8,94.9L118.4,96L113.8,95.4L112,93.9L102.8,94.7L102.7,93.1L98.2,90.6L93.8,89.9L86.2,91.5L79,86.8L80.1,80L79.5,76.9L77,73.8L74.3,73.9L71,70.2L68.6,68.5L65.9,69.2L64.1,65.2L65.5,59.8L69.7,59L65.9,57.2L66.8,54.6L70.7,53.9L66.9,51L67.4,44.9L66.6,43L67.6,34.1L65.7,30.2L66.5,23.5L69.7,20.2L76.9,27.1L81,28.3L90.2,33L94.6,32.9L94.7,38.5L92.2,41.5L88.1,44.1L91.8,43.1L96.6,39L95.1,46L92.4,52.4L96.1,51.9L96.1,46.6L98,41.7L101.7,37.6L101.2,31.4L98,25.3L100.9,27L102.4,20.9L99.4,19.2L98.8,15.5L100,14.4L114.6,18.6L140.1,25.4L166.5,31.9Z", "active": true }, { "id": "54", "usps": null, "name": "West Virginia", "d": "M733.2,294.8L737.9,293.5L739.7,289.8L738.6,285.4L741.4,279.5L744,282.7L746,281.3L744.6,277.8L746.4,273.1L748.1,273L749.8,269.4L753.7,269.4L757.8,263.4L759.8,256.2L759.5,252.5L760.9,246.6L758.9,241L761.1,239.2L764.5,259.9L782.3,256.9L784.1,268.5L787.1,265.8L789.7,261.4L792.3,261.6L794.3,257.4L800.4,258.3L801.8,255.2L804.5,253.4L807.7,255L810.8,254.4L810.6,256.4L813.9,260.3L812.9,264.9L802.6,259.1L802.9,266L796.6,276.6L794,275L790.3,285.9L787.3,285.4L783.8,282.9L783.7,286.6L780.4,294.1L780,297.5L776,305.1L777.5,306.3L776.6,309.3L773.8,311.7L773,310.5L766.7,315.4L761.3,318.1L758.5,316.2L755.4,319.7L750,318.6L746.8,314.7L747.1,313.2L740.9,311.1L733.8,301.7Z", "active": false }, { "id": "55", "usps": null, "name": "Wisconsin", "d": "M641.9,146.3L641.9,146.3L641.9,146.3ZM635.6,150.4L635.6,150.4L635.6,150.4ZM584,113.3L584,113.3L584,113.3ZM583.2,116.2L583.2,116.2L583.2,116.2ZM581.2,115.2L581.2,115.2L581.2,115.2ZM579.6,117.2L579.6,117.2L579.6,117.2ZM579.8,114.4L579.8,114.4L579.8,114.4ZM579.1,113L579.1,113L579.1,113ZM579.2,118.5L579.2,118.5L579.2,118.5ZM576,114.1L576,114.1L576,114.1ZM560.2,121.1L563.3,121.4L568,119.6L576.2,115.1L579.7,116.1L577,122.8L580.2,120.5L585.3,123.1L588.3,124.2L590.3,128L606.7,131.4L611.9,133.8L622.7,135L622.3,137.4L628.2,140.2L627.3,147L631,147.6L629.9,151.5L632.4,153L632,155.7L629,156.6L626.2,165.6L628.1,166.1L630.6,163.3L632.6,158.9L635.7,157.1L637.9,150.9L641.6,147.6L641,152.4L639.1,155.3L635.5,165.1L634.7,170.5L635.4,173.6L633.5,175.5L632.5,180.8L633.4,185.3L630.8,195.3L631.7,200.9L634.1,205.7L634.2,212.4L617.8,213.7L587,215.4L585.6,212.4L579.9,210.5L578.2,206.8L577.4,201.6L579.2,198.7L576.5,196.3L576.3,193.3L575.6,187.1L572.3,182.2L569.8,181.6L564.9,177.8L563.9,174.9L559.2,172.7L556.9,170.1L553.6,169.9L549.3,165.9L550.1,161.7L549.7,153.6L551.3,149.9L547.5,147.3L547.6,144L551.1,139L556.4,135.6L555.9,122.3Z", "active": false }, { "id": "56", "usps": null, "name": "Wyoming", "d": "M369.1,155.7L365.3,201L361.4,246.5L333.1,244L301.1,240.3L277.1,237.2L252.7,233.7L243.5,232.2L247.2,209.6L256,153.9L257.8,142L263.3,143.1L298.3,148L339.2,153Z", "active": false }];
const PINS = [
  {
    "label": "Phoenix",
    "state": "AZ",
    "kind": "city",
    "x": 197.2,
    "y": 399.8
  },
  {
    "label": "Los Angeles",
    "state": "CA",
    "kind": "city",
    "x": 86.8,
    "y": 363.1
  },
  {
    "label": "Santa Barbara",
    "state": "CA",
    "kind": "city",
    "x": 62.5,
    "y": 348.5
  },
  {
    "label": "Las Vegas",
    "state": "NV",
    "kind": "city",
    "x": 153.1,
    "y": 328.1
  },
  {
    "label": "Park City",
    "state": "UT",
    "kind": "city",
    "x": 234.7,
    "y": 239
  },
  {
    "label": "Georgetown",
    "state": "TX",
    "kind": "city",
    "x": 465.4,
    "y": 489.2
  },
  {
    "label": "Greensburg",
    "state": "KS",
    "kind": "city",
    "x": 439.4,
    "y": 329.2
  },
  {
    "label": "Colorado",
    "state": "CO",
    "kind": "state",
    "x": 331.5,
    "y": 289.9
  },
  {
    "label": "Oregon",
    "state": "OR",
    "kind": "state",
    "x": 102.6,
    "y": 134
  },
  {
    "label": "Idaho",
    "state": "ID",
    "kind": "state",
    "x": 198.7,
    "y": 146.6
  },
  {
    "label": "Washington",
    "state": "WA",
    "kind": "state",
    "x": 124.2,
    "y": 58.9
  },
  {
    "label": "Montana",
    "state": "MT",
    "kind": "state",
    "x": 286.9,
    "y": 99.7
  },
  {
    "label": "Florida",
    "state": "FL",
    "kind": "state",
    "x": 767.5,
    "y": 515.9
  }
];
const LOGGIA = "#C2B8A7";
const VILLA = "#EFECE3";
const labelFor = (p) => {
  if (p.label === "Santa Barbara") return { x: p.x, y: p.y - 12, anchor: "middle" };
  return { x: p.x + 11, y: p.y + 4, anchor: "start" };
};
const NationalMap = ({ hovered, onHover }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    viewBox: `0 0 ${MAP_W} ${MAP_H}`,
    role: "img",
    "aria-label": "Map of the United States with a pin on every state where LÏEF has a project on record",
    className: "nm w-full h-auto block",
    onMouseLeave: () => onHover(null),
    children: [
      /* @__PURE__ */ jsxs("defs", { children: [
        /* @__PURE__ */ jsx("filter", { id: "nm-lift", x: "-10%", y: "-10%", width: "120%", height: "130%", children: /* @__PURE__ */ jsx("feDropShadow", { dx: "0", dy: "2.5", stdDeviation: "2.5", floodColor: "#000", floodOpacity: ".45" }) }),
        /* @__PURE__ */ jsx("filter", { id: "nm-text", x: "-10%", y: "-40%", width: "120%", height: "180%", children: /* @__PURE__ */ jsx("feDropShadow", { dx: "0", dy: "1", stdDeviation: "1.6", floodColor: "#0F1A14", floodOpacity: ".9" }) }),
        /* @__PURE__ */ jsxs("filter", { id: "nm-glow", x: "-30%", y: "-30%", width: "160%", height: "160%", children: [
          /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "5", result: "b" }),
          /* @__PURE__ */ jsxs("feMerge", { children: [
            /* @__PURE__ */ jsx("feMergeNode", { in: "b" }),
            /* @__PURE__ */ jsx("feMergeNode", { in: "SourceGraphic" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("g", { children: [
        STATES.map((s) => {
          const on = s.active && hovered !== null && s.usps === hovered;
          return /* @__PURE__ */ jsx(
            "path",
            {
              d: s.d,
              fill: s.active ? on ? "rgba(194,184,167,.62)" : "rgba(194,184,167,.35)" : "rgba(239,236,227,.06)",
              stroke: s.active ? on ? VILLA : "rgba(194,184,167,.75)" : "rgba(194,184,167,.18)",
              strokeWidth: s.active ? on ? 1.4 : 0.9 : 0.6,
              strokeLinejoin: "round",
              filter: on ? "url(#nm-glow)" : s.active ? "url(#nm-lift)" : void 0,
              style: { transition: "fill .3s, stroke .3s", cursor: s.active ? "pointer" : "default" },
              onMouseEnter: () => onHover(s.active ? s.usps : null),
              children: /* @__PURE__ */ jsx("title", { children: s.name })
            },
            s.id
          );
        }),
        /* @__PURE__ */ jsx("path", { d: NATION_D, fill: "none", stroke: "rgba(194,184,167,.28)", strokeWidth: 0.8, strokeLinejoin: "round", pointerEvents: "none" })
      ] }),
      /* @__PURE__ */ jsx("g", { children: PINS.map((p) => {
        const l = labelFor(p);
        const on = hovered === p.state;
        return /* @__PURE__ */ jsxs(
          "g",
          {
            "aria-label": `${p.label}, ${p.state}`,
            style: { cursor: "pointer" },
            onMouseEnter: () => onHover(p.state),
            children: [
              /* @__PURE__ */ jsx("circle", { cx: p.x, cy: p.y, r: on ? 12 : 8, fill: "none", stroke: on ? VILLA : LOGGIA, strokeWidth: 0.8, opacity: on ? 0.9 : 0.45, style: { transition: "r .3s, opacity .3s" } }),
              /* @__PURE__ */ jsx("circle", { cx: p.x, cy: p.y, r: on ? 5.6 : 4.2, fill: on ? VILLA : LOGGIA, filter: on ? "url(#nm-glow)" : void 0, style: { transition: "r .3s" } }),
              /* @__PURE__ */ jsx(
                "text",
                {
                  className: "nm-label",
                  x: l.x + (on && l.anchor === "start" ? 3 : 0),
                  y: l.y,
                  textAnchor: l.anchor,
                  style: { fontFamily: "'Japandi', sans-serif", fontSize: on ? 14.5 : 12, fontWeight: 500, letterSpacing: "0.06em", fill: on ? VILLA : LOGGIA, filter: "url(#nm-text)", transition: "font-size .3s, fill .3s" },
                  children: p.label
                }
              )
            ]
          },
          p.label
        );
      }) })
    ]
  }
);
const ease$1 = [0.16, 1, 0.3, 1];
const stagger$1 = (i) => ({ delay: 0.3 + i * 0.15 });
const lanes = [
  {
    num: "01",
    title: "Pre-construction",
    kicker: "Everything before the first shovel.",
    body: "Architectural design and production, structural, mechanical, electrical and plumbing engineering, estimating, value engineering and permitting, sealed by licensed professionals registered in your state. Our own rendering and estimating software runs beside the drawings from the first sketch, so the design never drifts away from what it costs to build."
  },
  {
    num: "02",
    title: "General Construction",
    kicker: "Contracts placed in your market.",
    body: "We run the bid, hold every number against our own takeoff, and place the contract with a general contractor from our network that we would hire for our own projects. Our fee sits on the contractor's side. Your price is the contractor's price."
  },
  {
    num: "03",
    title: "Owner Representation",
    kicker: "On top, wherever you build.",
    body: "Site walks, change order review, draw requests, insurance and legal coordination, vendor and material verification. Someone on your side of the table for the whole build."
  }
];
const steps$1 = [
  {
    num: "1",
    title: "Send the site and the idea",
    body: "We come back with a measured takeoff and a budget built in our own estimating software, before you have spent anything on drawings."
  },
  {
    num: "2",
    title: "We build the pre-construction team",
    body: "Design, engineering and permitting, produced under LÏEF's direction and sealed by professionals licensed where you are building."
  },
  {
    num: "3",
    title: "We place the contract and stay",
    body: "We bid the work to general contractors in your market, place the contract, and remain your owner's representative until the last draw."
  }
];
const coordinated = [
  { name: "301 W Osborn", type: "Adaptive Reuse", location: "Midtown, Phoenix AZ" },
  { name: "The Vail", type: "Boutique 55+ Community", location: "Arizona" },
  { name: "Canyon Corporate Plaza", type: "Office-to-Residential", location: "Phoenix, AZ" },
  { name: "Silver Mountain Ranches", type: "Equestrian Community", location: "Scottsdale, AZ" },
  { name: "440 Basin Avenue", type: "Multi-Family", location: "Pahrump, NV" }
];
const statesOnRecord = Array.from(new Set(PINS.map((p) => p.state)));
const stateNames = {
  AZ: "Arizona",
  CA: "California",
  NV: "Nevada",
  UT: "Utah",
  CO: "Colorado",
  TX: "Texas",
  KS: "Kansas",
  OR: "Oregon",
  ID: "Idaho",
  WA: "Washington",
  MT: "Montana",
  FL: "Florida"
};
const Section$1 = ({ id, children, bg = "var(--v2-deep)", full = false }) => /* @__PURE__ */ jsx(
  "section",
  {
    id,
    className: `relative ${full ? "lg:min-h-[100svh] lg:flex lg:items-center py-20 md:py-24" : "py-20 md:py-28"}`,
    style: { background: bg, borderTop: "1px solid var(--v2-rule)" },
    children: /* @__PURE__ */ jsx("div", { className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full", children })
  }
);
const Reveal$1 = ({ children, delay = 0, className }) => {
  const { ref, inView } = useInView(0.1);
  return /* @__PURE__ */ jsx(motion.div, { ref, initial: { opacity: 0, y: 35 }, animate: inView ? { opacity: 1, y: 0 } : false, transition: { duration: 0.75, delay, ease: ease$1 }, className, children });
};
const NationalPage = () => {
  const { openModal } = useContactModal();
  const navigate = useNavigate();
  const [hoveredState, setHoveredState] = useState(null);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  const eyebrow = "Pre-construction · General Construction · Owner Representation · Nationwide";
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative min-h-[100svh] flex items-center overflow-x-hidden pt-28 pb-28", style: { background: "var(--v2-deep)" }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full", children: [
        /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, ...stagger$1(0), ease: ease$1 }, className: "mb-6 md:mb-8", children: [
          /* @__PURE__ */ jsx("span", { className: "v2-label hidden md:inline text-[1.25rem]", children: eyebrow }),
          /* @__PURE__ */ jsx("span", { className: "md:hidden flex flex-wrap gap-x-4 gap-y-1", style: { fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--v2-neon)" }, children: eyebrow.split(" · ").map((w) => /* @__PURE__ */ jsx("span", { children: w }, w)) })
        ] }),
        /* @__PURE__ */ jsxs(motion.h1, { initial: { opacity: 0, y: 35 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, ...stagger$1(1), ease: ease$1 }, className: "v2-headline leading-[1.02] mb-6 md:mb-8", style: { fontSize: "clamp(2.2rem, 5.5vw, 5rem)" }, children: [
          "YOUR PROJECT",
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "ANY STATE" }),
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
        ] }),
        /* @__PURE__ */ jsx(motion.p, { initial: { opacity: 0, y: 35 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, ...stagger$1(2), ease: ease$1 }, className: "max-w-[680px]", style: { fontSize: "clamp(1.1rem, 2.2vw, 1.3rem)", color: "var(--v2-muted)", lineHeight: 1.6 }, children: "LÏEF runs the pre-construction, places the general construction contract, and stays on your project as the owner's representative, across the country. One team from the first sketch to the last draw. We have relationships with architecture and engineering firms licensed in every state." }),
        /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 35 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, ...stagger$1(3), ease: ease$1 }, className: "mt-8 md:mt-12 flex flex-wrap gap-3 md:gap-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: openModal,
              className: "transition-all duration-300 hover:brightness-110",
              style: { fontFamily: "var(--v2-font-body)", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600, background: "var(--v2-btn-bg)", color: "var(--v2-btn-fg)", border: "1px solid var(--v2-loggia)", padding: "10px 24px", cursor: "pointer" },
              children: "Start a Conversation"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => document.querySelector("#lanes")?.scrollIntoView({ behavior: "smooth" }),
              className: "transition-all duration-300 hover:bg-[#C2B8A7] hover:text-[#0F1A14]",
              style: { fontFamily: "var(--v2-font-body)", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600, background: "transparent", color: "var(--v2-neon)", border: "1px solid var(--v2-neon)", padding: "10px 24px", cursor: "pointer" },
              children: "How it works"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Section$1, { id: "fee", children: [
      /* @__PURE__ */ jsx("div", { className: "v2-label mb-6", children: "The fee" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-24 items-start", children: [
        /* @__PURE__ */ jsx(Reveal$1, { className: "lg:sticky lg:top-32", children: /* @__PURE__ */ jsxs("h2", { className: "v2-headline text-4xl md:text-5xl lg:text-6xl", style: { color: "var(--v2-white)" }, children: [
          "THE CONTRACTOR",
          /* @__PURE__ */ jsx("br", {}),
          "PAYS US",
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "NOT YOU" }),
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
        ] }) }),
        /* @__PURE__ */ jsxs(Reveal$1, { delay: 0.1, children: [
          /* @__PURE__ */ jsx("p", { className: "mb-5", style: { fontSize: "1.25rem", color: "var(--v2-white)", lineHeight: 1.6 }, children: "Hiring an owner's representative has always meant a second fee on top of the contractor's price. We built the national offering to remove that trade-off." }),
          /* @__PURE__ */ jsx("p", { className: "mb-5", style: { fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.7 }, children: "When LÏEF places your general construction contract, our fee comes out of the general contractor's side of the deal. You pay what you would pay a traditional contractor. On top of that price you get an owner's representative who reads every bid, every change order and every draw request before you sign it." }),
          /* @__PURE__ */ jsx("p", { style: { fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.7 }, children: "The oversight most owners have to buy separately comes with the contract. That is the whole idea." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Section$1, { id: "lanes", children: [
      /* @__PURE__ */ jsxs(Reveal$1, { className: "relative mb-12 md:mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "v2-ghost-text absolute top-0 right-0 md:-right-6", style: { fontSize: "min(7vw, 120px)", lineHeight: 1, color: "rgba(194,184,167,.6)" }, children: "NATIONAL" }),
        /* @__PURE__ */ jsx("div", { className: "v2-label mb-6", children: "Three lanes" }),
        /* @__PURE__ */ jsxs("h2", { className: "v2-headline text-4xl md:text-6xl lg:text-7xl", style: { color: "var(--v2-white)" }, children: [
          "THREE LANES",
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "ONE TEAM" }),
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-px", style: { background: "var(--v2-rule)", border: "1px solid var(--v2-rule)" }, children: lanes.map((l, i) => /* @__PURE__ */ jsxs(Reveal$1, { delay: 0.1 + i * 0.12, className: "p-8 md:p-10 relative v2-hover-line", children: [
        /* @__PURE__ */ jsx("div", { style: { background: "var(--v2-deep)", position: "absolute", inset: 0, zIndex: -1 } }),
        /* @__PURE__ */ jsx("span", { className: "v2-headline block mb-4", style: { fontSize: "clamp(3rem, 6vw, 4.5rem)", color: "rgba(194,184,167,.6)", lineHeight: 1 }, children: l.num }),
        /* @__PURE__ */ jsx("h3", { className: "v2-headline mb-2", style: { fontSize: "1.35rem", color: "var(--v2-white)" }, children: l.title }),
        /* @__PURE__ */ jsx("p", { className: "mb-4", style: { fontFamily: "var(--v2-font-body)", fontSize: "1.15rem", fontWeight: 600, color: "var(--v2-neon)" }, children: l.kicker }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: "1.05rem", color: "var(--v2-dim)", lineHeight: 1.7 }, children: l.body })
      ] }, l.num)) })
    ] }),
    /* @__PURE__ */ jsxs(Section$1, { id: "land", bg: "var(--v2-black)", children: [
      /* @__PURE__ */ jsxs(Reveal$1, { className: "mb-12 md:mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "v2-label mb-6", children: "How we land in your state" }),
        /* @__PURE__ */ jsxs("h2", { className: "v2-headline text-4xl md:text-5xl lg:text-6xl", style: { color: "var(--v2-white)" }, children: [
          "A NEW MARKET",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "IN THREE MOVES" }),
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12", children: steps$1.map((s, i) => /* @__PURE__ */ jsx(Reveal$1, { delay: 0.1 + i * 0.12, children: /* @__PURE__ */ jsxs("div", { className: "pt-6", style: { borderTop: "1px solid rgba(194,184,167,.25)" }, children: [
        /* @__PURE__ */ jsx("span", { className: "v2-headline block mb-4", style: { fontSize: "2.5rem", color: "var(--v2-neon)", lineHeight: 1 }, children: s.num }),
        /* @__PURE__ */ jsx("h3", { className: "mb-3", style: { fontFamily: "var(--v2-font-body)", fontSize: "1.35rem", fontWeight: 600, color: "var(--v2-white)", lineHeight: 1.3 }, children: s.title }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: "1.05rem", color: "var(--v2-muted)", lineHeight: 1.7 }, children: s.body })
      ] }) }, s.num)) })
    ] }),
    /* @__PURE__ */ jsx(Section$1, { id: "map", full: true, children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[minmax(260px,0.75fr)_2fr] gap-10 lg:gap-14 items-center", children: [
      /* @__PURE__ */ jsxs(Reveal$1, { children: [
        /* @__PURE__ */ jsx("div", { className: "v2-label mb-6", children: "Projects on record" }),
        /* @__PURE__ */ jsxs("h2", { className: "v2-headline text-4xl md:text-6xl lg:text-6xl mb-5", style: { color: "var(--v2-white)" }, children: [
          "ACROSS",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "THE COUNTRY" }),
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "max-w-[720px]", style: { fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.7 }, children: "Every pin is a state where LÏEF has a project on record, from a tornado rebuild in Kansas to a hotel in Texas and a custom residence in the Utah mountains." })
      ] }),
      /* @__PURE__ */ jsxs(Reveal$1, { delay: 0.1, children: [
        /* @__PURE__ */ jsx("div", { className: "v2-chips grid gap-2 mb-4", style: { gridTemplateColumns: `repeat(${Math.ceil(statesOnRecord.length / 2)}, minmax(0, 1fr))` }, onMouseLeave: () => setHoveredState(null), children: statesOnRecord.map((s) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: `v2-chip${hoveredState === s ? " is-on" : ""}`,
            onMouseEnter: () => setHoveredState(s),
            onFocus: () => setHoveredState(s),
            onBlur: () => setHoveredState(null),
            "aria-pressed": hoveredState === s,
            children: stateNames[s] ?? s
          },
          s
        )) }),
        /* @__PURE__ */ jsx("div", { className: "v2-map-frame p-3 md:p-6", style: { background: "rgba(239,236,227,.04)", border: "1px solid rgba(194,184,167,.18)" }, children: /* @__PURE__ */ jsx("div", { className: "mx-auto", style: { maxWidth: "min(100%, calc((100svh - 300px) * 1.6))" }, children: /* @__PURE__ */ jsx(NationalMap, { hovered: hoveredState, onHover: setHoveredState }) }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(Section$1, { id: "tools", bg: "var(--v2-green)", full: true, children: [
      /* @__PURE__ */ jsx("div", { className: "v2-label mb-6", children: "Our own tools" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-24 items-start", children: [
        /* @__PURE__ */ jsx(Reveal$1, { className: "lg:sticky lg:top-32", children: /* @__PURE__ */ jsxs("h2", { className: "v2-headline text-3xl md:text-4xl lg:text-5xl", style: { color: "var(--v2-white)" }, children: [
          "RENDERING AND ESTIMATING SOFTWARE",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "WE BUILT OURSELVES" }),
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
        ] }) }),
        /* @__PURE__ */ jsxs(Reveal$1, { delay: 0.1, children: [
          /* @__PURE__ */ jsx("p", { className: "mb-5", style: { fontSize: "1.25rem", color: "var(--v2-white)", lineHeight: 1.6 }, children: "This is how we bid a project in a state we have never set foot in and hold the number." }),
          /* @__PURE__ */ jsx("p", { className: "mb-5", style: { fontSize: "1.1rem", color: "rgba(239,236,227,.85)", lineHeight: 1.7 }, children: "Every plan set we touch runs through our own estimating engine. It measures the drawings, prices every trade from our own record of bids, and keeps the estimate tied to the model as the design changes. Renderings come from the same model, so what you see is what was priced." }),
          /* @__PURE__ */ jsx("p", { style: { fontSize: "1.1rem", color: "rgba(239,236,227,.85)", lineHeight: 1.7 }, children: "Send us a plan set from anywhere in the country. We return a measured takeoff and a bid built on quantities, not a guess." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Section$1, { id: "projects", children: [
      /* @__PURE__ */ jsxs(Reveal$1, { className: "mb-10 md:mb-12", children: [
        /* @__PURE__ */ jsx("div", { className: "v2-label mb-6", children: "Coordinated Projects" }),
        /* @__PURE__ */ jsxs("h2", { className: "v2-headline text-4xl md:text-6xl lg:text-7xl mb-5", style: { color: "var(--v2-white)" }, children: [
          "WORK WE HAVE",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "CARRIED" }),
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "max-w-[720px]", style: { fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.7 }, children: "Projects LÏEF has completed or coordinated." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px overflow-hidden", style: { background: "var(--v2-rule)", border: "1px solid var(--v2-rule)" }, children: [
        coordinated.map((p, i) => /* @__PURE__ */ jsxs(Reveal$1, { delay: 0.05 + i * 0.08, className: "relative p-7 md:p-8 v2-hover-line", children: [
          /* @__PURE__ */ jsx("div", { style: { background: "var(--v2-deep)", position: "absolute", inset: 0, zIndex: -1 } }),
          /* @__PURE__ */ jsx("p", { className: "mb-2", style: { fontSize: "0.85rem", color: "var(--v2-neon)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500 }, children: p.type }),
          /* @__PURE__ */ jsx("h3", { className: "v2-headline mb-1", style: { fontSize: "1.2rem", color: "var(--v2-white)" }, children: p.name }),
          /* @__PURE__ */ jsx("p", { style: { fontSize: "0.95rem", color: "var(--v2-dim)" }, children: p.location })
        ] }, p.name)),
        Array.from({ length: (3 - coordinated.length % 3) % 3 }).map((_, i) => /* @__PURE__ */ jsxs("div", { className: "relative hidden md:flex items-center justify-center p-7 md:p-8", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("div", { style: { background: "var(--v2-deep)", position: "absolute", inset: 0, zIndex: -1 } }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3", children: [
            /* @__PURE__ */ jsxs("span", { className: "relative block", children: [
              /* @__PURE__ */ jsx("img", { src: logoConcrete, alt: "", className: "h-14 w-auto block", style: { visibility: "hidden" } }),
              /* @__PURE__ */ jsx("span", { className: "absolute inset-0", style: { background: "var(--v2-loggia)", WebkitMaskImage: `url(${logoConcrete})`, maskImage: `url(${logoConcrete})`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center" } })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "v2-headline", style: { fontSize: "1.05rem", letterSpacing: "0.18em", color: "var(--v2-loggia)" }, children: [
              "BUILT",
              /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." }),
              " DIFFERENT",
              /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
            ] })
          ] })
        ] }, `fill-${i}`))
      ] }),
      /* @__PURE__ */ jsx(Reveal$1, { delay: 0.2, className: "mt-8", children: /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            navigate("/projects");
            window.scrollTo({ top: 0 });
          },
          className: "transition-all duration-300 hover:bg-[#C2B8A7] hover:text-[#0F1A14]",
          style: { fontFamily: "var(--v2-font-body)", fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600, background: "transparent", color: "var(--v2-neon)", border: "1px solid var(--v2-neon)", padding: "10px 24px", cursor: "pointer" },
          children: "See the projects"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(Section$1, { id: "national-contact", bg: "var(--v2-black)", children: /* @__PURE__ */ jsxs(Reveal$1, { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "v2-label mb-6", children: "Anywhere in the country" }),
      /* @__PURE__ */ jsxs("h2", { className: "v2-headline text-4xl md:text-6xl lg:text-7xl mb-6", style: { color: "var(--v2-white)" }, children: [
        "TELL US WHERE",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "THE PROJECT IS" }),
        /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "max-w-[640px] mx-auto mb-8", style: { fontSize: "1.15rem", color: "var(--v2-muted)", lineHeight: 1.6 }, children: "We will tell you what it should cost, who should build it, and how we will protect it." }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: openModal,
          className: "transition-all duration-300 hover:brightness-110",
          style: { fontFamily: "var(--v2-font-body)", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600, background: "var(--v2-btn-bg)", color: "var(--v2-btn-fg)", border: "1px solid var(--v2-loggia)", padding: "10px 24px", cursor: "pointer" },
          children: "Start a Conversation"
        }
      )
    ] }) })
  ] });
};
const ease = [0.16, 1, 0.3, 1];
const stagger = (i) => ({ delay: 0.3 + i * 0.15 });
const watch = [
  {
    num: "01",
    title: "Contractors",
    kicker: "Every bid and change order, read before you sign.",
    body: "Someone on your side of the table reviews the bids, holds the contractor to the scope, and negotiates change orders and third-party contracts for you. Red flags get named early."
  },
  {
    num: "02",
    title: "Insurance",
    kicker: "Coordinated, not left to you alone.",
    body: "We coordinate with your insurer so the rebuild and the claim move together."
  },
  {
    num: "03",
    title: "The build",
    kicker: "Eyes on the site, hands on the draws.",
    body: "Site walks and inspections, draw request review, vendor and material verification, and coordination of the mechanical, electrical, plumbing and structural work as the house goes back up."
  }
];
const steps = [
  {
    num: "1",
    title: "Tell us where you are",
    body: "Where the lot stands, what the insurer has said, and whether you have a contractor yet."
  },
  {
    num: "2",
    title: "We review what you have",
    body: "The plans, the bids, the claim and the contract in front of you. We tell you what is fair, what is missing and what to ask for."
  },
  {
    num: "3",
    title: "We stay on your side",
    body: "From the first review to the last draw, LÏEF is the owner's representative. We advocate for you, not for the contractor and not for the insurer."
  }
];
const Section = ({ id, children, bg = "var(--v2-deep)" }) => /* @__PURE__ */ jsx("section", { id, className: "relative py-20 md:py-28", style: { background: bg, borderTop: "1px solid var(--v2-rule)" }, children: /* @__PURE__ */ jsx("div", { className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children }) });
const Reveal = ({ children, delay = 0, className }) => {
  const { ref, inView } = useInView(0.1);
  return /* @__PURE__ */ jsx(motion.div, { ref, initial: { opacity: 0, y: 35 }, animate: inView ? { opacity: 1, y: 0 } : false, transition: { duration: 0.75, delay, ease }, className, children });
};
const PalisadesPage = () => {
  const { openModal } = useContactModal();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  const eyebrow = "Owner's Representation · Palisades Fire Rebuild · Southern California";
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative min-h-[100svh] flex items-center overflow-x-hidden pt-28 pb-28", style: { background: "var(--v2-deep)" }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full", children: [
        /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, ...stagger(0), ease }, className: "mb-6 md:mb-8", children: [
          /* @__PURE__ */ jsx("span", { className: "v2-label hidden md:inline text-[1.25rem]", children: eyebrow }),
          /* @__PURE__ */ jsxs("span", { className: "md:hidden", style: { fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--v2-neon)" }, children: [
            /* @__PURE__ */ jsx("span", { className: "inline-block w-4 h-px mr-2 align-middle", style: { background: "var(--v2-neon)" } }),
            eyebrow
          ] })
        ] }),
        /* @__PURE__ */ jsxs(motion.h1, { initial: { opacity: 0, y: 35 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, ...stagger(1), ease }, className: "v2-headline leading-[1.02] mb-6 md:mb-8", style: { fontSize: "clamp(2.2rem, 5.5vw, 5rem)" }, children: [
          "REBUILDING AFTER THE PALISADES FIRE",
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "?" }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "HAVE SOMEONE ON YOUR SIDE" }),
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
        ] }),
        /* @__PURE__ */ jsx(motion.p, { initial: { opacity: 0, y: 35 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, ...stagger(2), ease }, className: "max-w-[680px]", style: { fontSize: "clamp(1.1rem, 2.2vw, 1.3rem)", color: "var(--v2-muted)", lineHeight: 1.6 }, children: "LÏEF Builders provides owner's representation for homeowners rebuilding in Southern California. We advocate for the owner through the contractor, the insurer and the build, from the first review to the last draw." }),
        /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 35 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, ...stagger(3), ease }, className: "mt-8 md:mt-12 flex flex-wrap gap-3 md:gap-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: openModal,
              className: "transition-all duration-300 hover:brightness-110",
              style: { fontFamily: "var(--v2-font-body)", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600, background: "var(--v2-btn-bg)", color: "var(--v2-btn-fg)", border: "1px solid var(--v2-loggia)", padding: "10px 24px", cursor: "pointer" },
              children: "Start a Conversation"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => document.querySelector("#watch")?.scrollIntoView({ behavior: "smooth" }),
              className: "transition-all duration-300 hover:bg-[#C2B8A7] hover:text-[#0F1A14]",
              style: { fontFamily: "var(--v2-font-body)", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600, background: "transparent", color: "var(--v2-neon)", border: "1px solid var(--v2-neon)", padding: "10px 24px", cursor: "pointer" },
              children: "What we cover"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Section, { id: "why", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-20", children: [
      /* @__PURE__ */ jsxs(Reveal, { children: [
        /* @__PURE__ */ jsx("div", { className: "v2-label mb-6", children: "Why an owner's representative" }),
        /* @__PURE__ */ jsxs("h2", { className: "v2-headline text-4xl md:text-5xl lg:text-6xl", style: { color: "var(--v2-white)" }, children: [
          "THE OTHER SIDES",
          /* @__PURE__ */ jsx("br", {}),
          "KNOW THE PROCESS",
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "DO YOU" }),
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "?" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Reveal, { delay: 0.1, children: [
        /* @__PURE__ */ jsx("p", { className: "mb-5", style: { fontSize: "1.25rem", color: "var(--v2-white)", lineHeight: 1.6 }, children: "An owner's representative is a professional who advocates exclusively for the property owner during a construction project, protecting their financial and legal interests from start to finish." }),
        /* @__PURE__ */ jsx("p", { className: "mb-5", style: { fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.7 }, children: "Contractors and insurers do this every day. Most homeowners do it once. LÏEF puts experienced people on the owner's side so that contractors and insurers cannot take advantage of what an owner does not know." }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.7 }, children: "Our experience includes disaster recovery rebuilds, including the Greensburg, Kansas tornado and Santa Barbara fire damage." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(Section, { id: "watch", children: [
      /* @__PURE__ */ jsxs(Reveal, { className: "relative mb-12 md:mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "v2-label mb-6", children: "What we cover" }),
        /* @__PURE__ */ jsxs("h2", { className: "v2-headline text-4xl md:text-6xl lg:text-7xl", style: { color: "var(--v2-white)" }, children: [
          "THREE PLACES",
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "ONE ADVOCATE" }),
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-px overflow-hidden", style: { background: "var(--v2-rule)", border: "1px solid var(--v2-rule)" }, children: watch.map((l, i) => /* @__PURE__ */ jsxs(Reveal, { delay: 0.1 + i * 0.12, className: "p-8 md:p-10 relative v2-hover-line", children: [
        /* @__PURE__ */ jsx("div", { style: { background: "var(--v2-deep)", position: "absolute", inset: 0, zIndex: -1 } }),
        /* @__PURE__ */ jsx("span", { className: "v2-headline block mb-4", style: { fontSize: "clamp(3rem, 6vw, 4.5rem)", color: "rgba(194,184,167,.6)", lineHeight: 1 }, children: l.num }),
        /* @__PURE__ */ jsx("h3", { className: "v2-headline mb-2", style: { fontSize: "1.35rem", color: "var(--v2-white)" }, children: l.title }),
        /* @__PURE__ */ jsx("p", { className: "mb-4", style: { fontFamily: "var(--v2-font-body)", fontSize: "1.15rem", fontWeight: 600, color: "var(--v2-neon)" }, children: l.kicker }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: "1.05rem", color: "var(--v2-dim)", lineHeight: 1.7 }, children: l.body })
      ] }, l.num)) })
    ] }),
    /* @__PURE__ */ jsxs(Section, { id: "start", bg: "var(--v2-black)", children: [
      /* @__PURE__ */ jsxs(Reveal, { className: "mb-12 md:mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "v2-label mb-6", children: "How it starts" }),
        /* @__PURE__ */ jsxs("h2", { className: "v2-headline text-4xl md:text-5xl lg:text-6xl", style: { color: "var(--v2-white)" }, children: [
          "THREE STEPS",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "FROM FIRST CALL" }),
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12", children: steps.map((s, i) => /* @__PURE__ */ jsx(Reveal, { delay: 0.1 + i * 0.12, children: /* @__PURE__ */ jsxs("div", { className: "pt-6", style: { borderTop: "1px solid rgba(194,184,167,.25)" }, children: [
        /* @__PURE__ */ jsx("span", { className: "v2-headline block mb-4", style: { fontSize: "2.5rem", color: "var(--v2-neon)", lineHeight: 1 }, children: s.num }),
        /* @__PURE__ */ jsx("h3", { className: "mb-3", style: { fontFamily: "var(--v2-font-body)", fontSize: "1.35rem", fontWeight: 600, color: "var(--v2-white)", lineHeight: 1.3 }, children: s.title }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: "1.05rem", color: "var(--v2-muted)", lineHeight: 1.7 }, children: s.body })
      ] }) }, s.num)) })
    ] }),
    /* @__PURE__ */ jsx(Section, { id: "fire-rated", bg: "var(--v2-green)", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-20", children: [
      /* @__PURE__ */ jsxs(Reveal, { children: [
        /* @__PURE__ */ jsx("div", { className: "v2-label mb-6", children: "A fire-rated way to rebuild" }),
        /* @__PURE__ */ jsxs("h2", { className: "v2-headline text-3xl md:text-4xl lg:text-5xl", style: { color: "var(--v2-white)" }, children: [
          "ASK ABOUT",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "SABS CONSTRUCTION" }),
          /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Reveal, { delay: 0.1, children: [
        /* @__PURE__ */ jsx("p", { className: "mb-5", style: { fontSize: "1.25rem", color: "var(--v2-white)", lineHeight: 1.6 }, children: "For owners who want the new house built to resist the next fire, we can bring in the Saebi Alternative Building System." }),
        /* @__PURE__ */ jsx("p", { className: "mb-8", style: { fontSize: "1.1rem", color: "rgba(239,236,227,.85)", lineHeight: 1.7 }, children: "SABS has 0% flame spread. It is one option to discuss, not a requirement of working with us." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              navigate("/sabs");
              window.scrollTo({ top: 0 });
            },
            className: "transition-all duration-300 hover:bg-[#C2B8A7] hover:text-[#0F1A14]",
            style: { fontFamily: "var(--v2-font-body)", fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600, background: "transparent", color: "var(--v2-neon)", border: "1px solid var(--v2-neon)", padding: "10px 24px", cursor: "pointer" },
            children: "About SABS"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Section, { id: "palisades-contact", bg: "var(--v2-black)", children: /* @__PURE__ */ jsxs(Reveal, { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "v2-label mb-6", children: "Southern California" }),
      /* @__PURE__ */ jsxs("h2", { className: "v2-headline text-4xl md:text-6xl lg:text-7xl mb-6", style: { color: "var(--v2-white)" }, children: [
        "TELL US WHERE",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { style: { color: "var(--v2-neon)" }, children: "YOU ARE IN THE REBUILD" }),
        /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "max-w-[640px] mx-auto mb-8", style: { fontSize: "1.15rem", color: "var(--v2-muted)", lineHeight: 1.6 }, children: "We will tell you what to ask, what to check and who should be in the room." }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: openModal,
          className: "transition-all duration-300 hover:brightness-110",
          style: { fontFamily: "var(--v2-font-body)", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600, background: "var(--v2-btn-bg)", color: "var(--v2-btn-fg)", border: "1px solid var(--v2-loggia)", padding: "10px 24px", cursor: "pointer" },
          children: "Start a Conversation"
        }
      )
    ] }) })
  ] });
};
const NotFoundPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return /* @__PURE__ */ jsxs("section", { className: "relative pt-16 md:pt-20", style: { background: "var(--v2-deep)" }, children: [
    /* @__PURE__ */ jsx("div", { className: "v2-ghost-text hidden lg:block top-32 right-8", style: { fontSize: "min(14vw, 220px)", lineHeight: 1 }, children: "404" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-[1400px] mx-auto px-6 md:px-12", children: [
      /* @__PURE__ */ jsx("div", { className: "v2-label mb-6", children: "404" }),
      /* @__PURE__ */ jsxs("h1", { className: "v2-headline mb-8", style: { fontSize: "clamp(2.6rem, 4.6vw, 4.4rem)", lineHeight: 1.04, color: "var(--v2-white)" }, children: [
        "PAGE NOT FOUND",
        /* @__PURE__ */ jsx("span", { className: "v2-neon-period", children: "." })
      ] }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "inline-block transition-all duration-300 hover:brightness-110",
          style: {
            fontFamily: "var(--v2-font-body)",
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            fontWeight: 600,
            background: "var(--v2-btn-bg)",
            color: "var(--v2-btn-fg)",
            border: "1px solid var(--v2-loggia)",
            padding: "10px 24px",
            textDecoration: "none"
          },
          children: "Return to Home"
        }
      )
    ] })
  ] });
};
const AppInner = () => /* @__PURE__ */ jsx(Routes, { children: /* @__PURE__ */ jsxs(Route, { element: /* @__PURE__ */ jsx(MainLayout, {}), children: [
  /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/national", element: /* @__PURE__ */ jsx(NationalPage, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/palisades-fire-rebuild-owners-rep", element: /* @__PURE__ */ jsx(PalisadesPage, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/ai", element: /* @__PURE__ */ jsx(TechnologyPage, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/sabs", element: /* @__PURE__ */ jsx(SabsPage, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/projects", element: /* @__PURE__ */ jsx(ProjectsPage, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/team", element: /* @__PURE__ */ jsx(TeamPage, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/testimonials", element: /* @__PURE__ */ jsx(TestimonialsPage, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFoundPage, {}) })
] }) });
function render(url) {
  return renderToString(
    /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(AppInner, {}) })
  );
}
export {
  render
};
