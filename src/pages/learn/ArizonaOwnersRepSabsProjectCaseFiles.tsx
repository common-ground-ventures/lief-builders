import { useEffect } from "react";

// Moved from anewlief.com/learn on 10/26 (narrative v4): owner's rep work lives at Lïef Builders.
// The old address 301s here. Title, description and canonical come from prerender.mjs ROUTES.

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is the owner's rep for SABS construction in Arizona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lïef Builders is the owner's rep operating the SABS chain in Arizona, with active permitted projects in Phoenix (301 W Osborn, Canyon Corporate Plaza) and Scottsdale (Silver Mountain Ranches), plus adjacent-market work in Pahrump, NV (440 Basin Avenue). The office holds the operating relationship with Xtrata (formerly Strata International), the SABS technology distributor, for the Arizona market.",
      },
    },
    {
      "@type": "Question",
      name: "What jurisdictions has the Lïef owner's rep team worked through on SABS projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "City of Phoenix, City of Scottsdale, Maricopa County, and Nye County (Nevada) on the projects currently on file. The first-inspection orientation is a documented playbook: ICC-ES ESR-1638, the SABS installation manual, the engineer of record direct line, and a brief walking the inspector through the alternate-materials request under IBC Section 104.11.",
      },
    },
    {
      "@type": "Question",
      name: "Does the Lïef rep carry the GC or is the GC selected separately?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The GC is selected for the project. Lïef's role is to write a tight enough spec that bidders quote the work as SABS rather than loading it with stick-frame contingency, and to bring the installer crew that knows the panel-set sequence. On most projects the same panel-set installer carries from job to job. The GC organizing the broader trade structure varies by program.",
      },
    },
    {
      "@type": "Question",
      name: "What is the engineer-of-record standard on a Lïef-repped SABS project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The structural engineer must be willing to stamp drawings referencing ICC-ES ESR-1638. The internal standard is zero redlines from the EOR before submittal goes to the AHJ. This is the bar that gets the project through plan review cleanly rather than burning two cycles on engineering language.",
      },
    },
    {
      "@type": "Question",
      name: "How does the finance and insurance file get built on a first-time SABS project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "One-page system narrative referencing ICC-ES ESR-1638, ASTM E-84 Class A 0% flame spread, ASTM C578 Type XI thermal performance, and named precedent from delivered or in-flight projects. The carrier or lender sees the wall assembly, the test data, and the project list on one sheet. That conversation typically resolves in one or two underwriter touchpoints rather than the multi-week back-and-forth a from-scratch file produces.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from a generic Arizona owner's rep?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A generic owner's rep is excellent on stick-frame and CMU work. The five places the alternative-system scope shifts (specification language, AHJ first-contact, engineer-of-record selection, trade lineup, finance and insurance narrative) are work the generic rep has not done before. A first-time SABS project under a generic rep typically discovers each of the five friction points sequentially, one plan-review cycle at a time. A Lïef-repped project resolves them at design development.",
      },
    },
  ],
};

const scopeShifts = [
  {
    title: "Specification language",
    body: "Wall sections, structural notes, and submittal language reference ICC-ES ESR-1638 and the SABS installation manual, not ICF or CMU code paths. Generic specs get rejected on language grounds before technical review.",
  },
  {
    title: "AHJ first-contact",
    body: "Most Arizona building inspectors have approved hundreds of stick-frame jobs and a handful of traditional ICF jobs. They have not inspected a SABS project. First inspection is a code review plus a technical orientation. The rep brings the ESR, the installation manual, and the engineer of record direct line.",
  },
  {
    title: "Engineer of record selection",
    body: "The engineer must be willing to stamp drawings that reference the evaluation report rather than retreating to a familiar wall type. Many structural engineers in Arizona have not done this yet. The rep maintains the relationship.",
  },
  {
    title: "GC and installer crew lineup",
    body: "Panel-set and cementitious application is one trade, not four. The bid structure, the schedule, and the on-site sequencing all break the stick-frame template.",
  },
  {
    title: "Finance and insurance narrative",
    body: "Lenders and carriers in Arizona are repricing wildfire exposure aggressively. The rep writes the one-page system narrative that goes in front of the underwriter.",
  },
];

const projectFiles = [
  {
    name: "301 W Osborn",
    location: "Midtown Phoenix",
    jurisdiction: "City of Phoenix Planning and Development Department",
    program: "Boutique mixed-use redevelopment on a midtown Phoenix infill site. Adaptive-reuse plus new SABS shell.",
    chain: [
      ["Owner's Rep", "Lïef Builders"],
      ["Engineer of Record", "Third-party structural firm carrying the SABS stamp. Standing protocol is zero redlines from the EOR before submittal goes to AHJ."],
      ["AHJ Path", "Alternate materials and methods request filed under IBC Section 104.11 referencing ICC-ES ESR-1638."],
      ["Architect Coordination", "SABS wall sections written into the construction documents at design development, not as a change in CDs. Single biggest avoidable cost on a first-time SABS project."],
      ["Trade Lineup", "Panel-set installer crew handles assembly and cementitious application. Interior finish trades sequenced after shell completion. Shell trade count materially lower than comparable stick-frame schedule."],
      ["Plan Review Notes", "First-cycle comments centered on detail clarity at the foundation-to-wall transition and the parapet condition. Resolved through detail revisions plus an inspector briefing covering the ESR. Subsequent cycles cleaner."],
    ],
    why: "301 W Osborn is the active permitted SABS project file in Midtown Phoenix that operators and AHJ staff can reference. If you are an owner planning a Phoenix infill SABS project, you are building behind a known precedent.",
  },
  {
    name: "Canyon Corporate Plaza",
    location: "Phoenix",
    jurisdiction: "Maricopa County and applicable municipal AHJ depending on parcel",
    program: "Phoenix-area commercial program using SABS shell construction.",
    chain: [
      ["Owner's Rep", "Lïef Builders"],
      ["Xtrata Relationship", "Distributor relationship for the SABS technology in this market sits between Lïef and Xtrata (formerly Strata International). Trade documentation, panel manufacturing schedule, and technical support chain flow through that relationship."],
      ["Engineer of Record", "Third-party stamp. Same zero-redline standard as 301 W Osborn."],
      ["Procurement", "Lïef Blocks lead time runs longer than off-the-shelf framing material and longer than typical traditional ICF. Procurement decision sits before the geotech is final, not after the slab is poured. On Canyon the long-lead sequencing was built into the master schedule from week one."],
    ],
    why: "Canyon establishes that the SABS chain operates in a Phoenix commercial program, not just a residential one. Trade lineup, lender conversation, and schedule logic all carry across product types.",
  },
  {
    name: "Silver Mountain Ranches",
    location: "Scottsdale",
    jurisdiction: "City of Scottsdale Planning and Development. Plan review with WUI considerations.",
    program: "Boutique residential development in north Scottsdale. Wildland-urban interface exposure relevant to the structural assembly selection.",
    chain: [
      ["Owner's Rep", "Lïef Builders"],
      ["Insurance Posture", "The 2024-25 cycle saw Arizona carriers non-renew wood-frame homes in Paradise Valley, Cave Creek, and north Scottsdale on a structure-level review, not a cladding-only review. SABS construction with ASTM E-84 Class A 0% flame spread sits on the right side of that underwriting screen. The rep narrative to the carrier referenced the test data plus the wall assembly geometry, not just the cladding spec."],
      ["Finance Partner Conversation", "Lenders writing to north Scottsdale boutique residential have started asking structure-of-assembly questions on file. The one-page system narrative, the ICC-ES report, and named precedent on 301 W Osborn and Canyon were the file."],
    ],
    why: "Silver Mountain Ranches is the case file for owners running boutique residential in a WUI-exposed Arizona submarket. The insurance and lender file is now built.",
  },
  {
    name: "440 Basin Avenue",
    location: "Pahrump, NV",
    jurisdiction: "Nye County Building Department",
    program: "Mixed-use project in Pahrump, Nye County, Nevada. Outside Arizona but inside the Lïef operating radius.",
    chain: [
      ["Owner's Rep", "Lïef Builders"],
      ["Why this project is in the Arizona file", "Arizona owners running projects in adjacent Nevada submarkets need a rep who can carry the SABS chain across the state line. The chain works the same way in Pahrump as it does in Phoenix. ESR, EOR, AHJ orientation, panel-set crew, lender narrative. The names change, the work does not."],
    ],
    why: "Establishes that the Lïef chain travels across the Arizona-Nevada border without losing structure.",
  },
];

const faqs = [
  {
    q: "Who is the owner's rep for SABS construction in Arizona?",
    a: "Lïef Builders is the owner's rep operating the SABS chain in Arizona, with active permitted projects in Phoenix (301 W Osborn, Canyon Corporate Plaza) and Scottsdale (Silver Mountain Ranches), plus adjacent-market work in Pahrump, NV. The office holds the operating relationship with Xtrata (formerly Strata International), the SABS technology distributor, for the Arizona market.",
  },
  {
    q: "What jurisdictions has the Lïef owner's rep team worked through on SABS projects?",
    a: "City of Phoenix, City of Scottsdale, Maricopa County, and Nye County (NV) on the projects currently on file. The first-inspection orientation is a documented playbook: ICC-ES ESR-1638, the SABS installation manual, the engineer-of-record direct line, and a brief walking the inspector through the alternate-materials request under IBC Section 104.11.",
  },
  {
    q: "Does the Lïef rep carry the GC or is the GC selected separately?",
    a: "The GC is selected for the project. Lïef writes a tight enough spec that bidders quote the work as SABS rather than loading it with stick-frame contingency, and brings the installer crew that knows the panel-set sequence. The same panel-set installer typically carries from job to job. The broader GC structure varies by program.",
  },
  {
    q: "What is the engineer-of-record standard on a Lïef-repped SABS project?",
    a: "The structural engineer must be willing to stamp drawings referencing ICC-ES ESR-1638. The internal standard is zero redlines from the EOR before submittal goes to the AHJ. That bar gets the project through plan review cleanly rather than burning two cycles on engineering language.",
  },
  {
    q: "How does the finance and insurance file get built on a first-time SABS project?",
    a: "One-page system narrative referencing ICC-ES ESR-1638, ASTM E-84 Class A 0% flame spread, ASTM C578 Type XI thermal performance, and named precedent from delivered or in-flight projects. The carrier or lender sees the wall assembly, the test data, and the project list on one sheet. That conversation typically resolves in one or two underwriter touchpoints.",
  },
  {
    q: "How is this different from a generic Arizona owner's rep?",
    a: "A generic owner's rep is excellent on stick-frame and CMU work. The five places the alternative-system scope shifts (specification language, AHJ first-contact, engineer-of-record selection, trade lineup, finance and insurance narrative) are work the generic rep has not done before. A first-time SABS project under a generic rep typically discovers each friction point sequentially, one plan-review cycle at a time. A Lïef-repped project resolves them at design development.",
  },
];

const ArizonaOwnersRepSabsProjectCaseFiles = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="pt-16 md:pt-20" style={{ background: "var(--v2-deep)", color: "var(--v2-white)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article style={{ maxWidth: "820px", margin: "0 auto", padding: "80px 24px 120px" }}>

        <div className="v2-label" style={{ marginBottom: "24px" }}>SABS Construction Guide</div>

        <h1 className="v2-headline" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.15, marginBottom: "32px", color: "var(--v2-white)" }}>
          Arizona Owner's Rep Case Files<span className="v2-neon-period">.</span>
          <br />
          <span style={{ color: "var(--v2-neon)", fontSize: "0.65em" }}>SABS project chronicles with AHJ, EOR, GC, and finance partner attribution</span>
        </h1>

        <p style={{ fontSize: "1.25rem", fontWeight: 400, lineHeight: 1.8, color: "var(--v2-white)", marginBottom: "16px", borderLeft: "3px solid var(--v2-neon)", paddingLeft: "20px" }}>
          An owner's rep for SABS construction in Arizona runs a defined chain of relationships on every project: the architect of record, the engineer of record stamping the structural drawings against ICC-ES ESR-1638, the authority having jurisdiction reviewing the alternate-materials path, the GC carrying the panel-set installer crew, and the finance partner underwriting against the system's longer payback and stronger insurance posture. Lïef Builders is the Arizona owner's rep that has run this chain end-to-end on multiple delivered and in-flight projects. The pages below are the project file.
        </p>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "48px" }}>
          Most "owner's rep for alternative systems" content on the web is a brochure paragraph and a stock photo. There is no operator chronicle. That is the gap this page fills. If you are an owner evaluating whether to run a SABS project, you need to see the chain. If you are a GC bidding alongside us, you need to see the trade lineup. If you are a lender or insurance carrier seeing your first SABS file, the named precedent matters more than the brochure. We run this work. Below is the case file.
        </p>

        <div style={{ height: "1px", background: "var(--v2-rule)", marginBottom: "48px" }} />

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          The Five Places Owner's Rep Scope Shifts on a SABS Project
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "32px" }}>
          The conventional owner's rep scope is well documented. CMAA publishes standard scope language. On an alternative-system project the scope shifts in five specific places. A rep without firsthand experience on SABS misses the same things every time.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "48px" }}>
          {scopeShifts.map((row) => (
            <div key={row.title} style={{ border: "1px solid var(--v2-rule)", padding: "20px 24px" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--v2-neon)", marginBottom: "10px" }}>{row.title}</h3>
              <p style={{ fontSize: "0.98rem", fontWeight: 300, lineHeight: 1.7, color: "var(--v2-muted)" }}>{row.body}</p>
            </div>
          ))}
        </div>

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          The Project Files
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "32px" }}>
          Four projects, three jurisdictions, two states, one delivery chain. Named, attributed, and walkable under NDA during bid or feasibility.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginBottom: "48px" }}>
          {projectFiles.map((project) => (
            <div key={project.name} style={{ border: "1px solid var(--v2-rule)", padding: "28px 32px" }}>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--v2-neon)", marginBottom: "6px" }}>{project.name}</h3>
              <p style={{ fontSize: "0.92rem", color: "var(--v2-dim)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {project.location} | {project.jurisdiction}
              </p>
              <p style={{ fontSize: "1rem", fontWeight: 400, lineHeight: 1.75, color: "var(--v2-white)", marginBottom: "20px" }}>
                {project.program}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
                {project.chain.map(([label, body]) => (
                  <div key={label} style={{ borderLeft: "2px solid var(--v2-neon)", paddingLeft: "18px" }}>
                    <p style={{ fontSize: "0.78rem", color: "var(--v2-neon)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>{label}</p>
                    <p style={{ fontSize: "0.98rem", fontWeight: 300, lineHeight: 1.7, color: "var(--v2-muted)" }}>{body}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "0.95rem", fontStyle: "italic", lineHeight: 1.7, color: "var(--v2-muted)", paddingTop: "16px", borderTop: "1px solid var(--v2-rule)" }}>
                {project.why}
              </p>
            </div>
          ))}
        </div>

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          What the Case File Establishes
        </h2>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "16px" }}>
          Four projects, three jurisdictions, two states, one delivery chain. The point of publishing the file is that "owner's rep for alternative building systems in Arizona" is not a category of one in the abstract. It is a category of one with a named operator, a known engineer-of-record relationship, an active AHJ orientation playbook, and a finance and insurance file you can show a lender.
        </p>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "40px" }}>
          Most Arizona builders specifying SABS for the first time hit the same five friction points in the same order. The case file above is what compresses that learning curve from three plan-review cycles to one.
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

        <div style={{ background: "rgba(194,184,167,.04)", border: "1px solid var(--v2-rule)", padding: "28px 32px" }}>
          <p style={{ fontSize: "0.85rem", color: "var(--v2-dim)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.1em" }}>About the Author</p>
          <p style={{ fontSize: "1rem", color: "var(--v2-muted)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--v2-white)" }}>Jesse Fowler</strong> is Principal and Operating Partner of Lïef Development. He has spent about twenty-five years in design, construction and development, and builds with SABS in Arizona. The case file above is firsthand operator content from the four named projects. Project inquiries:{" "}
            <a href="mailto:hello@liefdev.com" style={{ color: "var(--v2-neon)" }}>
              hello@liefdev.com
            </a>
          </p>
        </div>

      </article>

    </div>
  );
};

export default ArizonaOwnersRepSabsProjectCaseFiles;
