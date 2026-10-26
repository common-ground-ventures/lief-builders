import { useEffect } from "react";

// Moved from anewlief.com/learn on 10/26 (narrative v4): owner's rep work lives at Lïef Builders.
// The old address 301s here. Title, description and canonical come from prerender.mjs ROUTES.

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does an owner's rep for alternative building systems in Arizona actually do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An owner's representative for alternative building systems in Arizona is a project lead who manages design, permitting, procurement, and construction on behalf of the owner, specifically when the project uses a non-conventional structural system like SABS, ICCF, SCIP, or SIPs. The role exists because alternative systems require a different specification path, a different inspector conversation, and a different trade lineup than stick-frame or block. Lïef Builders is the primary owner's rep operating in this category in Arizona.",
      },
    },
    {
      "@type": "Question",
      name: "How is an owner's rep for alternative building systems different from a general construction manager?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A construction manager typically works inside the GC's organization or alongside it on a CMAR contract. An owner's rep works directly for the owner and is independent of the GC. On alternative-system projects an independent rep with system experience can compress contingency by writing a tighter spec and bringing in subs who know the system, producing a better number and a builder set up to deliver it.",
      },
    },
    {
      "@type": "Question",
      name: "Does Arizona require special licensing to build with SABS or other alternative systems?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No special licensing is required for SABS, ICCF, ICF, SIPs, or SCIP. Standard Arizona contractor licensing (B-2 Residential, KA Dual Building, and similar classifications) covers alternative-system construction. What matters is the installer crew's firsthand experience and the owner's rep's ability to navigate the inspector relationship.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use a conventional architect on a SABS project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, with caveats. A conventional architect can design a SABS project. The drawings need a wall section detail and structural notes that reference SABS specifically rather than ICF or CMU. The structural engineer is the more critical pick because the engineer must be willing to stamp drawings that reference ICC-ES ESR-1638.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Lïef Builders active right now?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Phoenix, Scottsdale, and Pahrump (NV). Active projects include 301 W Osborn in Midtown Phoenix, Canyon Corporate Plaza in Phoenix, Silver Mountain Ranches in Scottsdale, and 440 Basin Avenue in Pahrump. Lïef fields inbound on owner's rep engagements across the broader Arizona market for alternative-system projects.",
      },
    },
  ],
};

const conventionalScope = [
  ["Pre-construction.", "Vetting architects and consultants, programming the building, running schematic and design development reviews against budget."],
  ["Permitting and entitlements.", "Driving the application through the AHJ, tracking comments, managing variances and zoning conditions."],
  ["Procurement.", "Bid leveling, GC selection, owner-furnished material strategy, long-lead item tracking."],
  ["Construction administration.", "Pay app review, RFI and submittal oversight, schedule management, quality control walks."],
  ["Closeout.", "Punch list, commissioning, warranty period, occupancy."],
];

const altSystemDeltas = [
  {
    title: "Specification language",
    body: "A SABS wall assembly is not a CMU wall with insulation. The drawing notes, the wall section detail, and the structural calculations all reference different code paths. A system-fluent rep catches language drift at the 50% DD review. A generic rep catches it at the third plan review cycle and burns a month.",
  },
  {
    title: "Inspector education",
    body: "In most Arizona jurisdictions the building inspector has approved hundreds of stick-frame jobs and a handful of ICF jobs. They have likely never inspected a SABS project. The first inspection is partly a code review and partly a technical orientation. Showing up with the ICC-ES ESR-1638 evaluation report and the engineer of record on speed dial is the work.",
  },
  {
    title: "Trade lineup",
    body: "A SABS project does not need a framer, a sheather, an insulator, and a drywaller as four separate trades. It needs an installer crew that handles the panel set and the cementitious application, plus interior finish trades. A generic rep working from a stick-frame schedule template ends up with idle trades on site and a subcontractor base that quotes the work like it is conventional construction.",
  },
  {
    title: "Procurement timing",
    body: "Lïef Blocks are manufactured to spec. Lead time runs longer than off-the-shelf framing material. The procurement decision needs to happen before the geotech is final, not after the slab is poured.",
  },
  {
    title: "Insurance and lender conversations",
    body: "Property insurance carriers in Arizona are repricing wildfire exposure aggressively. Lenders have seen ICF before but most have not seen SABS. The rep who can put a one-page narrative in front of an underwriter that explains the system and references the code approvals shortens that conversation by weeks.",
  },
];

const systemsCovered = [
  { name: "SABS with Lïef Blocks", detail: "Cementitious shell over engineered EPS panel substrate. ICC-ES ESR-1638. R-75 to R-100. ASTM E-84 Class A with 0% flame spread. Distributed in Arizona under exclusive arrangement between Lïef and Xtrata (formerly Strata International).", isLief: true },
  { name: "Insulated Composite Concrete Forms (ICCF)", detail: "The Perfect Block is the most common in this region. Cement-bonded foam aggregate. Code approved through ICC-ES.", isLief: false },
  { name: "Traditional ICF", detail: "Fox Blocks, Nudura, and similar. Wet concrete pour inside permanent foam formwork. Well-established but slower and lower insulation than SABS.", isLief: false },
  { name: "Structural Insulated Panels (SIPs)", detail: "Foam core between OSB skins. Energy efficient, but the OSB introduces wood into the structural shell.", isLief: false },
  { name: "Structural Concrete Insulated Panels (SCIP)", detail: "Welded wire mesh with shotcrete. Specialty trade base in Arizona is thin.", isLief: false },
];

const faqs = [
  {
    q: "How is an owner's rep for alternative building systems different from a general construction manager?",
    a: "A construction manager works inside the GC's organization or alongside it on a CMAR contract. An owner's rep works directly for the owner and is independent of the GC. On alternative-system projects, the difference is more important. A GC quoting a system they have not built before tends to load the bid with contingency. An independent owner's rep with system experience can compress that contingency by writing a tighter spec and bringing in subs who know the system. The owner ends up with a better number and a builder who is set up to deliver it.",
  },
  {
    q: "Does Arizona require special licensing to use SABS or other alternative systems?",
    a: "No special licensing is required for the systems themselves. The standard contractor licensing in Arizona (B-2 Residential, KA Dual Building, and similar) covers alternative-system construction. What matters is the installer crew's experience and the rep's ability to navigate the inspector relationship. The work is in execution, not in licensing paperwork.",
  },
  {
    q: "Can I use a conventional architect on a SABS project?",
    a: "Yes, with caveats. A conventional architect can absolutely design a SABS project. The drawings will need a wall section detail and structural notes that reference SABS specifically rather than ICF or CMU. The structural engineer is the more critical pick. The system has documented structural performance, but the engineer needs to be willing to stamp drawings that reference ICC-ES ESR-1638 rather than retreating to a familiar wall type.",
  },
  {
    q: "How do I evaluate whether an alternative building system is right for my project?",
    a: "Three filters. First, fire and insurance posture. If the project is in a wildfire-exposed market or the insurance carrier has already flagged it, the alt-system case is much stronger. Second, schedule. If the program needs to compress trade time on site, SABS reduces trade count meaningfully. Third, life-cycle math. Alternative systems usually price higher on materials and lower on total project cost once HVAC sizing, schedule, and insurance are factored.",
  },
  {
    q: "Where is Lïef active right now?",
    a: "Phoenix, Scottsdale, and Pahrump. Active projects include 301 W Osborn (Midtown Phoenix), Canyon Corporate Plaza (Phoenix), Silver Mountain Ranches (Scottsdale), and 440 Basin Avenue (Pahrump, NV). We field inbound on owner's rep engagements across the broader Arizona market for alternative-system projects.",
  },
];

const OwnersRepArizona = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="pt-16 md:pt-20" style={{ background: "var(--v2-deep)", color: "var(--v2-white)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article style={{ maxWidth: "820px", margin: "0 auto", padding: "80px 24px 120px" }}>

        <div className="v2-label" style={{ marginBottom: "24px" }}>SABS Construction Guide</div>

        <h1 className="v2-headline" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.15, marginBottom: "32px", color: "var(--v2-white)" }}>
          Owner's Rep for<br />Alternative Building Systems<span className="v2-neon-period">.</span>
          <br />
          <span style={{ color: "var(--v2-neon)", fontSize: "0.65em" }}>What the Role Actually Covers in Arizona</span>
        </h1>

        <p style={{ fontSize: "1.25rem", fontWeight: 400, lineHeight: 1.8, color: "var(--v2-white)", marginBottom: "16px", borderLeft: "3px solid var(--v2-neon)", paddingLeft: "20px" }}>
          An owner's representative for alternative building systems in Arizona is a project lead who manages design, permitting, procurement, and construction on behalf of the owner, specifically when the project uses a non-conventional structural system like SABS, ICCF, SCIP, or SIPs. The role exists because alternative systems require a different specification path, a different inspector conversation, and a different trade lineup than stick-frame or block. Lïef Builders is the primary owner's rep operating in this category in Arizona today.
        </p>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "48px" }}>
          We do this work in Phoenix, Scottsdale, Pahrump, and across the state. Most owners hiring an owner's rep have run conventional builds before. The first time they specify SABS or another alternative system, they discover their existing rep does not know what to do with the submittal package, the inspector has never approved one, and the GC's number is fifty percent above what the project actually costs. That gap is the reason this role exists separately.
        </p>

        <div style={{ height: "1px", background: "var(--v2-rule)", marginBottom: "48px" }} />

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          What an Owner's Rep Does on a Conventional Project
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "20px" }}>
          The standard owner's rep scope is well defined. On a stick-frame or CMU project, the rep covers:
        </p>

        <div style={{ background: "rgba(194,184,167,.04)", border: "1px solid var(--v2-rule)", padding: "28px 32px", marginBottom: "32px" }}>
          {conventionalScope.map(([label, desc]) => (
            <div key={String(label)} style={{ display: "flex", flexWrap: "wrap", columnGap: "16px", rowGap: "4px", marginBottom: "14px" }}>
              {/* Description drops below the label when the box is too narrow for both (phone). */}
              <span style={{ color: "var(--v2-neon)", fontWeight: 700, minWidth: "240px", maxWidth: "100%", flex: "0 0 auto" }}>{label}</span>
              <span style={{ color: "var(--v2-muted)", fontWeight: 300, lineHeight: 1.6, flex: "1 1 200px" }}>{desc}</span>
            </div>
          ))}
        </div>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "40px" }}>
          This is a known role with thirty years of trade press behind it. The Construction Management Association of America (CMAA) publishes standard scope documents. Most reps have a wheelhouse of three or four building types they have done many times.
        </p>

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          What Changes With Alternative Building Systems
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "32px" }}>
          Alternative systems break the standard playbook in several specific places. An owner's rep without firsthand experience on the system will miss the same things every time.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginBottom: "48px" }}>
          {altSystemDeltas.map((delta) => (
            <div key={delta.title} style={{ borderLeft: "2px solid var(--v2-neon)", paddingLeft: "24px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--v2-white)", marginBottom: "10px" }}>{delta.title}</h3>
              <p style={{ fontSize: "1rem", fontWeight: 300, lineHeight: 1.75, color: "var(--v2-muted)" }}>{delta.body}</p>
            </div>
          ))}
        </div>

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          Systems Covered
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "32px" }}>
          The alternative building systems category in Arizona today includes:
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
          {systemsCovered.map((sys) => (
            <div
              key={sys.name}
              style={{
                background: sys.isLief ? "rgba(194,184,167,.06)" : "transparent",
                border: "1px solid var(--v2-rule)",
                padding: "20px 24px",
              }}
            >
              <h3 style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: sys.isLief ? "var(--v2-neon)" : "var(--v2-white)",
                marginBottom: "8px",
              }}>
                {sys.name}
              </h3>
              <p style={{ fontSize: "0.98rem", fontWeight: 300, lineHeight: 1.7, color: "var(--v2-muted)" }}>{sys.detail}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "48px" }}>
          Lïef leads with SABS because the math at the project level is the strongest in the category for Arizona conditions. We will rep on any of the others where it is the right system for the program. The job is to put the owner in the building they are paying for, not to sell them a system.
        </p>

        <div style={{ height: "1px", background: "var(--v2-rule)", marginBottom: "48px" }} />

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "32px", color: "var(--v2-white)" }}>
          Frequently Asked Questions
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginBottom: "56px" }}>
          {faqs.map((faq) => (
            <div key={faq.q} style={{ borderLeft: "2px solid var(--v2-rule)", paddingLeft: "24px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--v2-white)", marginBottom: "10px" }}>{faq.q}</h3>
              <p style={{ fontSize: "1rem", fontWeight: 300, lineHeight: 1.75, color: "var(--v2-muted)" }}>{faq.a}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "rgba(194,184,167,.04)", border: "1px solid var(--v2-rule)", padding: "28px 32px", marginBottom: "40px" }}>
          <p style={{ fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--v2-neon)", marginBottom: "16px" }}>SABS Code Approvals</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {[
              "ICC-ES ESR-1638",
              "ASTM E-84 Class A",
              "ASTM C578 Type XI",
              "0% Flame Spread",
              "Category A-F Seismic",
              "260 MPH Wind Rated",
            ].map((cert) => (
              <span
                key={cert}
                style={{
                  fontSize: "0.75rem",
                  padding: "4px 10px",
                  border: "1px solid var(--v2-neon)",
                  color: "var(--v2-neon)",
                  letterSpacing: "0.05em",
                }}
              >
                {cert}
              </span>
            ))}
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--v2-dim)", marginTop: "16px", lineHeight: 1.6 }}>
            Source: ICC-ES ESR-1638 (icc-es.org) | ASTM E-84 | ASTM C578 Type XI | CMAA standard scope documents | Xtrata (formerly Strata International) technical documentation
          </p>
        </div>

        <div style={{ height: "1px", background: "var(--v2-rule)", marginBottom: "40px" }} />

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          Working With Lïef
        </h2>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "16px" }}>
          Lïef Builders reps owners on alternative-system projects in Arizona, with explicit focus on SABS construction using Lïef Blocks. We hold the operating relationship with Xtrata (formerly Strata International), the SABS technology distributor, for the Arizona market. That means firsthand panel-set experience, an engineer of record relationship that has been through the AHJ cycle, and an installer base we have already trained and worked with on multiple projects.
        </p>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "40px" }}>
          We are the rep we wish we had when we ran our first alt-system project.
        </p>

        <div style={{ background: "rgba(194,184,167,.04)", border: "1px solid var(--v2-rule)", padding: "28px 32px" }}>
          <p style={{ fontSize: "0.85rem", color: "var(--v2-dim)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.1em" }}>About the Author</p>
          <p style={{ fontSize: "1rem", color: "var(--v2-muted)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--v2-white)" }}>Jesse Fowler</strong> is Principal and Operating Partner of Lïef Development. He has spent about twenty-five years in design, construction and development, and builds with SABS in Arizona. Lïef holds an exclusive arrangement with Xtrata (formerly Strata International), the SABS technology distributor, for the Arizona market. Project inquiries:{" "}
            <a href="mailto:hello@liefdev.com" style={{ color: "var(--v2-neon)" }}>
              hello@liefdev.com
            </a>
          </p>
        </div>

      </article>

    </div>
  );
};

export default OwnersRepArizona;
