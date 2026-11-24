import { useEffect } from "react";

// Plain privacy page (Jesse 11/24: "I do want all the pages fixed", privacy page on every Lïef site).
// True to what the site does: the contact form and Google Analytics. Content route, not a brand file.
const P = { fontSize: "1.1rem", lineHeight: 1.7, color: "var(--v2-dim)", maxWidth: "62ch", marginBottom: "1.25rem" } as const;
const H = { color: "var(--v2-white)", marginTop: "2.5rem", marginBottom: "1rem" } as const;
const A = { color: "var(--v2-white)" } as const;

const PrivacyPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <section className="relative pt-16 md:pt-20 pb-24" style={{ background: "var(--v2-deep)" }}>
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <h1 className="v2-headline mb-8" style={{ fontSize: "clamp(2.6rem, 4.6vw, 4.4rem)", lineHeight: 1.04, color: "var(--v2-white)" }}>
          PRIVACY<span className="v2-neon-period">.</span>
        </h1>
        <p style={P}>What this site collects, what we do with it, and how to reach us about it. Last updated November 24, 2026.</p>

        <h2 className="v2-label" style={H}>WHAT WE COLLECT</h2>
        <p style={P}>
          When you use the contact form, we receive what you type: your first and last name, your email and your message. It is sent to our team by email so a person can answer you. We use it to reply and to talk about your project, nothing else.
        </p>
        <p style={P}>
          The site uses Google Analytics to count visits: which pages were viewed, roughly where from, the device and browser, and how you arrived. It sets cookies to do that. We use it to see which pages help. You can block it with your browser's cookie settings or Google's opt-out add-on, and the site still works.
        </p>

        <h2 className="v2-label" style={H}>WHO ELSE SEES IT</h2>
        <p style={P}>
          We do not sell or rent your information. The services that run the site (hosting, email and analytics) handle it only to do that job. We share it beyond that only if the law requires it.
        </p>

        <h2 className="v2-label" style={H}>KEEPING IT, AND DELETING IT</h2>
        <p style={P}>
          We keep what you send for as long as we are talking with you or working on your project. Ask us to see it, correct it or delete it at any time and we will.
        </p>

        <h2 className="v2-label" style={H}>QUESTIONS</h2>
        <p style={P}>
          Email <a href="mailto:hello@commonground.ventures" style={A}>hello@commonground.ventures</a> or call <a href="tel:6024926479" style={A}>(602) 492-6479</a>. If this page changes, the date at the top changes with it.
        </p>
      </div>
    </section>
  );
};

export default PrivacyPage;
