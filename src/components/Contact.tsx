import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/LzgGOj1j1b3NFY8j9A9I/webhook-trigger/9510cfac-442e-43ee-b261-b3679c7cd3dc";

const ease = [0.16, 1, 0.3, 1] as const;

const Contact = () => {
  const { ref, inView } = useInView(0.1);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          message: form.message,
        }),
      });
      setStatus("sent");
      setForm({ firstName: "", lastName: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    background: "transparent",
    border: "1px solid var(--v2-rule)",
    color: "var(--v2-white)",
    fontFamily: "var(--v2-font-body)",
    fontSize: "1rem",
    outline: "none",
  };

  const labelStyle = {
    fontSize: "1rem",
    textTransform: "uppercase" as const,
    letterSpacing: "0.14em",
    color: "var(--v2-muted)",
    marginBottom: "8px",
    display: "block",
  };

  return (
    <section id="contact" className="relative py-20 md:py-28" style={{ background: "var(--v2-deep)" }}>
      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <>
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.75, ease }}
              className="text-center mb-12"
            >
              <h2 className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-4" style={{ color: "var(--v2-white)" }}>
                LET'S<br /><span style={{ color: "var(--v2-neon)" }}>BUILD</span><span className="v2-neon-period">.</span>
              </h2>
              <p className="max-w-[600px] mx-auto" style={{ fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.6 }}>
                Whether you're a property owner or a developer, we'd like to hear from you. We also work closely with insurance adjusters and legal teams.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.75, delay: 0.15, ease }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16"
            >
              {/* Left - Contact info */}
              <div>
                <div className="mb-8">
                  <span style={labelStyle}>VISIT US</span>
                  <p style={{ fontSize: "1.1rem", color: "var(--v2-white)" }}>8271 E Gelding Dr.<br />Scottsdale, AZ 85260</p>
                </div>
                <div className="mb-8">
                  <span style={labelStyle}>CALL US</span>
                  <a href="tel:8057227598" style={{ fontSize: "1.1rem", color: "var(--v2-white)", textDecoration: "none" }}>(805) 722-7598</a>
                </div>
                <div className="mb-8">
                  <span style={labelStyle}>EMAIL US</span>
                  <a href="mailto:hello@liefdev.com" style={{ fontSize: "1.1rem", color: "var(--v2-white)", textDecoration: "none" }}>hello@liefdev.com</a>
                </div>

                <div className="p-6" style={{ background: "rgba(0,107,63,.06)", border: "1px solid var(--v2-rule)" }}>
                  <span className="v2-label block mb-4" style={{ fontSize: "1rem" }}>MARKETS SERVED</span>
                  {["Phoenix & Greater Arizona", "Las Vegas, Nevada", "Los Angeles & Southern California"].map((m) => (
                    <div key={m} className="flex items-center gap-3 py-2">
                      <Check size={16} style={{ color: "var(--v2-neon)" }} />
                      <span style={{ fontSize: "1rem", color: "var(--v2-muted)" }}>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Form */}
              <div className="p-6 md:p-8" style={{ border: "1px solid var(--v2-rule)" }}>
                <h3 className="v2-headline mb-6" style={{ fontSize: "1.1rem", letterSpacing: "0.1em" }}>START YOUR PROJECT</h3>
                {status === "sent" ? (
                  <div className="text-center py-8">
                    <h4 className="v2-headline mb-3" style={{ fontSize: "1.2rem", letterSpacing: "0.1em", color: "var(--v2-white)" }}>
                      MESSAGE SENT
                    </h4>
                    <p style={{ fontSize: "1rem", color: "var(--v2-dim)", lineHeight: 1.6 }}>
                      We'll be in touch shortly.
                    </p>
                  </div>
                ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label style={labelStyle}>FIRST NAME</label>
                      <input required style={inputStyle} value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                    </div>
                    <div>
                      <label style={labelStyle}>LAST NAME</label>
                      <input required style={inputStyle} value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>EMAIL</label>
                    <input required type="email" style={inputStyle} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>MESSAGE</label>
                    <textarea rows={4} style={inputStyle} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </div>
                  {status === "error" && (
                    <p style={{ fontSize: "1rem", color: "#ff4444" }}>Something went wrong. Please try again.</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full transition-all duration-300 hover:brightness-110"
                    style={{
                      fontFamily: "var(--v2-font-body)", fontSize: "1rem", fontWeight: 600,
                      textTransform: "uppercase", letterSpacing: "0.14em",
                      background: "var(--v2-neon)", color: "var(--v2-deep)",
                      border: "none", padding: "14px 24px",
                      cursor: status === "sending" ? "wait" : "pointer",
                      opacity: status === "sending" ? 0.7 : 1,
                    }}
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </form>
                )}
              </div>
            </motion.div>
          </>
      </div>
    </section>
  );
};

export default Contact;
