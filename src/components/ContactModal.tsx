import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useContactModal } from "@/contexts/ContactModalContext";

const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/LzgGOj1j1b3NFY8j9A9I/webhook-trigger/9510cfac-442e-43ee-b261-b3679c7cd3dc";

const ease = [0.16, 1, 0.3, 1] as const;

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  background: "#ffffff",
  border: "none",
  color: "#303030",
  fontFamily: "var(--v2-font-body)",
  fontSize: "1rem",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  fontSize: "1rem",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--v2-muted)",
  marginBottom: "8px",
  display: "block",
};

const ContactModal = () => {
  const { isOpen, closeModal } = useContactModal();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const backdropRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeModal]);

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

  const handleClose = () => {
    closeModal();
    // Reset state after animation completes
    setTimeout(() => {
      setStatus("idle");
    }, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={backdropRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,.8)", backdropFilter: "blur(8px)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease }}
            className="v2-form-card relative w-full max-w-[540px] p-8 md:p-10"
            style={{
              background: "#C2B8A7",
              border: "1px solid #C2B8A7",
              boxShadow: "0 40px 80px rgba(0,0,0,.45)",
            }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 transition-opacity duration-300 hover:opacity-60"
              style={{ background: "none", border: "none", cursor: "pointer", color: "#0F1A14" }}
            >
              <X size={20} />
            </button>

            {status === "sent" ? (
              <div className="text-center py-8">
                <h3
                  className="v2-headline mb-4"
                  style={{ fontSize: "1.4rem", letterSpacing: "0.1em", color: "var(--v2-white)" }}
                >
                  MESSAGE SENT
                </h3>
                <p style={{ fontSize: "1.05rem", color: "var(--v2-dim)", lineHeight: 1.6 }}>
                  We'll be in touch shortly.
                </p>
                <button
                  onClick={handleClose}
                  className="v2-send mt-6 transition-all duration-300"
                  style={{
                    fontFamily: "var(--v2-font-body)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    background: "#0F1A14",
                    color: "#EFECE3",
                    border: "1px solid #C2B8A7",
                    padding: "10px 28px",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3
                  className="v2-headline mb-6"
                  style={{ fontSize: "1.4rem", letterSpacing: "0.1em", color: "var(--v2-white)" }}
                >
                  START YOUR PROJECT
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label style={labelStyle}>First Name</label>
                      <input
                        required
                        style={inputStyle}
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Last Name</label>
                      <input
                        required
                        style={inputStyle}
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      required
                      type="email"
                      style={inputStyle}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Message</label>
                    <textarea
                      rows={4}
                      style={inputStyle}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  {status === "error" && (
                    <p style={{ fontSize: "1rem", color: "#ff4444" }}>
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="v2-send w-full transition-all duration-300"
                    style={{
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
                      opacity: status === "sending" ? 0.7 : 1,
                    }}
                  >
                    {status === "sending" ? "Sending..." : "SEND MESSAGE"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
