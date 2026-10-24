import { useNavigate, useLocation } from "react-router-dom";
import logoConcrete from "@/assets/logos/logo-concrete.png";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative" style={{ background: "var(--v2-deep)", borderTop: "1px solid var(--v2-rule)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <img src={logoConcrete} alt="LÏEF" className="h-6 w-auto mb-4" />
            <p className="v2-headline text-sm mb-2" style={{ color: "var(--v2-white)" }}>
              PROJECT ADVOCACY, OVERSIGHT, & REPRESENTATION
            </p>
            <p style={{ fontSize: "1.25rem", color: "var(--v2-neon)" }}>Built. Different.</p>
            <p className="mt-2" style={{ fontSize: "1.25rem", color: "var(--v2-dim)" }}>Phoenix, Arizona</p>
          </div>

          {/* Services */}
          <div>
            <h5 className="mb-4" style={{ fontSize: "1.25rem", textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--v2-neon)" }}>Services</h5>
            <ul className="space-y-3">
              <li><span style={{ fontSize: "1.25rem", color: "var(--v2-dim)" }}>Project Advocacy</span></li>
              <li><span style={{ fontSize: "1.25rem", color: "var(--v2-dim)" }}>Insurance Coordination</span></li>
              <li><span style={{ fontSize: "1.25rem", color: "var(--v2-dim)" }}>Cost Control</span></li>
              <li>
                <a
                  href="/sabs"
                  onClick={(e) => { e.preventDefault(); navigate("/sabs"); window.scrollTo({ top: 0 }); }}
                  style={{ fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none", display: "inline-block", cursor: "pointer", padding: 0 }}
                  className="hover:text-[#00FF88] transition-colors duration-300"
                >
                  SABS&#8482; Technology
                </a>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h5 className="mb-4" style={{ fontSize: "1.25rem", textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--v2-neon)" }}>Explore</h5>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); navigate("/"); window.scrollTo({ top: 0 }); }}
                  style={{ fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none", display: "inline-block", cursor: "pointer", padding: 0 }}
                  className="hover:text-[#00FF88] transition-colors duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/national"
                  onClick={(e) => { e.preventDefault(); navigate("/national"); window.scrollTo({ top: 0 }); }}
                  style={{ fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none", display: "inline-block", cursor: "pointer", padding: 0 }}
                  className="hover:text-[#00FF88] transition-colors duration-300"
                >
                  National
                </a>
              </li>
              <li>
                <a
                  href="/ai"
                  onClick={(e) => { e.preventDefault(); navigate("/ai"); window.scrollTo({ top: 0 }); }}
                  style={{ fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none", display: "inline-block", cursor: "pointer", padding: 0 }}
                  className="hover:text-[#00FF88] transition-colors duration-300"
                >
                  AI
                </a>
              </li>
              <li>
                <a
                  href="/projects"
                  onClick={(e) => { e.preventDefault(); navigate("/projects"); window.scrollTo({ top: 0 }); }}
                  style={{ fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none", display: "inline-block", cursor: "pointer", padding: 0 }}
                  className="hover:text-[#00FF88] transition-colors duration-300"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="/sabs"
                  onClick={(e) => { e.preventDefault(); navigate("/sabs"); window.scrollTo({ top: 0 }); }}
                  style={{ fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none", display: "inline-block", cursor: "pointer", padding: 0 }}
                  className="hover:text-[#00FF88] transition-colors duration-300"
                >
                  L&Iuml;EF x SABS
                </a>
              </li>
              <li>
                <a
                  href="/team"
                  onClick={(e) => { e.preventDefault(); navigate("/team"); window.scrollTo({ top: 0 }); }}
                  style={{ fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none", display: "inline-block", cursor: "pointer", padding: 0 }}
                  className="hover:text-[#00FF88] transition-colors duration-300"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="/testimonials"
                  onClick={(e) => { e.preventDefault(); navigate("/testimonials"); window.scrollTo({ top: 0 }); }}
                  style={{ fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none", display: "inline-block", cursor: "pointer", padding: 0 }}
                  className="hover:text-[#00FF88] transition-colors duration-300"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a href="https://anewlief.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none" }} className="hover:text-[#00FF88] transition-colors duration-300">
                  L&Iuml;EF Development
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h5 className="mb-4" style={{ fontSize: "1.25rem", textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--v2-neon)" }}>Connect</h5>
            <ul className="space-y-3">
              <li>
                <a href="tel:8057227598" style={{ fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none" }} className="hover:text-[#00FF88] transition-colors duration-300">
                  (805) 722-7598
                </a>
              </li>
              <li>
                <a href="mailto:hello@liefdev.com" style={{ fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none" }} className="hover:text-[#00FF88] transition-colors duration-300">
                  hello@liefdev.com
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none" }} className="hover:text-[#00FF88] transition-colors duration-300">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid var(--v2-rule)" }}>
          <div>
            <p style={{ fontSize: "1.25rem", color: "var(--v2-dim)" }}>&copy; 2026 L&Iuml;EF Builders. All rights reserved.</p>
          </div>
          <p style={{ fontSize: "1.25rem", color: "var(--v2-dim)", opacity: 0.5 }}>
            Created by{" "}
            <a href="https://www.commonground.ventures/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }} className="hover-cg transition-colors duration-300">
              Common Ground
            </a>
            {" · "}
            <a href="/wiki" style={{ color: "inherit", textDecoration: "none" }} className="hover-cg transition-colors duration-300">
              About this build
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
