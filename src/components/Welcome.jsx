import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Theme palettes (Dawn / Island / Sanctuary)                          */
/* ------------------------------------------------------------------ */
const THEMES = {
  dawn: {
    "--bg": "#faf6ee", "--surface": "#ffffff", "--surface2": "#f3ead9",
    "--ink": "#2c2218", "--muted": "#6f6353", "--line": "#e8dcc5",
    "--accent": "#bd8a3c", "--accent-deep": "#8a571c", "--accent-soft": "#f4e8cf",
    "--accent2": "#2f7d72", "--accent2-deep": "#1d544b", "--accent2-soft": "#dcebe6",
    "--accent3": "#c4663f", "--accent3-deep": "#9a4527", "--accent3-soft": "#f3ddd0",
    "--cta": "#1f8a78", "--cta-deep": "#14655a",
    "--dark1": "#3f2c18", "--dark2": "#2a1c10",
    "--font-display": "'Cormorant Garamond',Georgia,serif",
    "--font-body": "'Mulish',system-ui,sans-serif",
  },
  island: {
    "--bg": "#e7e1d5", "--surface": "#f6f1e9", "--surface2": "#efe7da",
    "--ink": "#3a342d", "--muted": "#5c544b", "--line": "#e4dbcc",
    "--accent": "#c2774b", "--accent-deep": "#9a5733", "--accent-soft": "#f3ddca",
    "--accent2": "#2f5e4a", "--accent2-deep": "#1f3f31", "--accent2-soft": "#d7e6dd",
    "--accent3": "#8aa593", "--accent3-deep": "#5b7666", "--accent3-soft": "#dce6dd",
    "--cta": "#d97a2e", "--cta-deep": "#b25e1a",
    "--dark1": "#2c4d3e", "--dark2": "#1e352a",
    "--font-display": "'Spectral',Georgia,serif",
    "--font-body": "'Hanken Grotesk',system-ui,sans-serif",
  },
  sanctuary: {
    "--bg": "#f1f3f0", "--surface": "#ffffff", "--surface2": "#e5eae6",
    "--ink": "#26302e", "--muted": "#5e6a66", "--line": "#dce2dd",
    "--accent": "#5f8a7a", "--accent-deep": "#3c5a4e", "--accent-soft": "#dde9e3",
    "--accent2": "#c69a44", "--accent2-deep": "#8f6c25", "--accent2-soft": "#f0e6cf",
    "--accent3": "#4a6b8a", "--accent3-deep": "#324b66", "--accent3-soft": "#dde6ee",
    "--cta": "#d98a3c", "--cta-deep": "#b56d24",
    "--dark1": "#284841", "--dark2": "#1a302b",
    "--font-display": "'Newsreader',Georgia,serif",
    "--font-body": "'Karla',system-ui,sans-serif",
  },
};

/* ------------------------------------------------------------------ */
/* Content data                                                        */
/* ------------------------------------------------------------------ */
const MISSION = [
  { n: 1, title: "Relationship", text: "We take time to understand each leader’s vision, values, and gifts before anything is built.", soft: "--accent-soft", deep: "--accent-deep" },
  { n: 2, title: "Partnership", text: "We establish partnerships tailored to local needs — service in unity, not service imposed.", soft: "--accent2-soft", deep: "--accent2-deep" },
  { n: 3, title: "Empowerment", text: "We support those needs through lasting empowerment, so the work belongs to the community.", soft: "--accent3-soft", deep: "--accent3-deep" },
];

const WORK = [
  { title: "Rescue & Restoration", text: "Freedom for women trapped in sexual slavery — with safe housing, counseling, and the dignity of a fresh start.", color: "--accent" },
  { title: "Widows & Orphans", text: "Care for those a karma-based culture casts aside — housing, provision, and a community that refuses to look away.", color: "--accent2" },
  { title: "Education & Schools", text: "Classrooms so a child can go to school instead of being sold — thousands educated, and counting.", color: "--accent3" },
  { title: "Sustainable Trades", text: "Skills, tools, and microenterprise so a widow can feed her children with dignity and lasting independence.", color: "--accent" },
  { title: "Disaster Relief", text: "First responders in flood, war, and famine — the same listening posture that began after the 2004 tsunami.", color: "--accent2" },
  { title: "Local Leadership", text: "Every program runs through trusted local Christian leaders we know by name — help that arrives without waste.", color: "--accent3" },
];

const NATIONS = [
  { name: "Sri Lanka", text: "Where it began — widows, orphans, and rescue from trafficking.", c1: "--accent", c2: "--accent3" },
  { name: "Cambodia", text: "Shelter, schooling, and protection for vulnerable children.", c1: "--accent3", c2: "--accent2" },
  { name: "Southeast Asia", text: "Partnering with leaders meeting needs across the region.", c1: "--accent2", c2: "--accent" },
  { name: "Zimbabwe", text: "Holistic ministry alongside established local churches.", c1: "--accent", c2: "--accent2" },
];

const STATS = [
  { value: "20+", label: "Years of service", color: "--accent-deep", border: false },
  { value: "4", label: "Nations served", color: "--accent2-deep", border: true },
  { value: "1000s", label: "Children educated", color: "--accent3-deep", border: true },
  { value: "100s", label: "Women set free", color: "--accent-deep", border: true },
  { value: "Dozens", label: "Schools, churches & shelters", color: "--accent2-deep", border: true },
];

const STORIES = [
  { title: "Her story isn’t over", text: "Widowed and blamed by her community, she was given housing, counseling, and a trade — and discovered her story had only begun.", photo: "widow at her new trade", c1: "--accent3", c2: "--accent" },
  { title: "A desk, not a price", text: "A little girl who gets to go to school instead of being sold — learning to read, to dream, and to hope for tomorrow.", photo: "girl in a classroom", c1: "--accent", c2: "--accent2" },
  { title: "Fed with dignity", text: "A mother who can now feed her children by her own hands — the quiet, daily miracle of restored dignity.", photo: "mother and children", c1: "--accent2", c2: "--accent3" },
];

const FUND_STEPS = [
  { n: 1, title: "Listen", text: "We hit the ground listening to identify gifted leaders and real local needs." },
  { n: 2, title: "Partner", text: "We build a partnership tailored to each community’s vision and assets." },
  { n: 3, title: "Empower", text: "We fund and support the work so it becomes lasting and locally owned." },
];

const AMOUNTS = [
  { amt: 30, note: "School supplies and hot meals for a child for a month." },
  { amt: 75, note: "Trauma-informed counseling for a rescued woman." },
  { amt: 150, note: "Tools and training to launch a widow’s trade." },
  { amt: 500, note: "Sponsor a family’s path to safety and stability." },
];

const NAV_LINKS = [
  { href: "#mission", label: "Our Mission" },
  { href: "#story", label: "Our Story" },
  { href: "#work", label: "Our Work" },
  { href: "#serve", label: "Where We Serve" },
  { href: "#stories", label: "Stories" },
];

/* photo-placeholder gradient helper */
const photoBg = (c1, c2) =>
  `radial-gradient(125% 110% at 24% 20%, color-mix(in srgb,var(${c1}) 42%,var(--surface)) 0%, transparent 60%), ` +
  `radial-gradient(115% 115% at 80% 84%, color-mix(in srgb,var(${c2}) 34%,transparent) 0%, transparent 62%), ` +
  `linear-gradient(150deg, var(--surface) 0%, var(--bg) 100%)`;

/* shared style snippets */
const mono = { fontFamily: "ui-monospace,Menlo,monospace" };
const eyebrow = (color) => ({
  margin: "0 0 16px", ...mono, fontSize: "12px", letterSpacing: ".3em",
  textTransform: "uppercase", color: `var(${color})`,
});
const sectionTitle = (size) => ({
  margin: 0, fontFamily: "var(--font-display)", fontWeight: 500,
  fontSize: size, lineHeight: 1.04, letterSpacing: "-.01em", textWrap: "balance",
});
const card = {
  background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "6px",
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function Welcome() {
  const theme = "dawn";
  const [amount, setAmount] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef(null);

  /* lock body scroll + close drawer on Escape while the off-canvas menu is open */
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const year = new Date().getFullYear();
  const activeNote = AMOUNTS.find((a) => a.amt === amount)?.note ?? "A gift of any size opens a door.";

  /* scroll-reveal — progressive enhancement */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll("[data-reveal]"));
    const reveal = (el) => { el.style.opacity = "1"; el.style.transform = "none"; };
    const hide = (el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(22px)";
      el.style.transition = "opacity .7s ease, transform .8s cubic-bezier(.22,1,.36,1)";
      el.style.willChange = "opacity, transform";
    };
    const inView = (el) => {
      const r = el.getBoundingClientRect();
      return r.top < (window.innerHeight || document.documentElement.clientHeight) && r.bottom > 0;
    };

    if (typeof IntersectionObserver !== "function") {
      items.forEach(reveal);
      return;
    }
    items.forEach((el) => (inView(el) ? reveal(el) : hide(el)));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    items.forEach((el) => { if (el.style.opacity === "0") io.observe(el); });
    const t = setTimeout(() => items.forEach((el) => { if (el.style.opacity === "0") reveal(el); }), 1200);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);

  const rootStyle = {
    ...THEMES[theme],
    background: "var(--bg)", color: "var(--ink)", fontFamily: "var(--font-body)",
    fontWeight: 400, lineHeight: 1.6, WebkitFontSmoothing: "antialiased", overflowX: "hidden",
  };

  return (
    <div ref={rootRef} data-screen-label="Resplendent Hope home" style={rootStyle}>
      <style>{GLOBAL_CSS}</style>

      {/* NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "color-mix(in srgb,var(--bg) 86%,transparent)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--line)" }}>
        <nav style={{ maxWidth: "1240px", margin: "0 auto", padding: "18px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: "13px", textDecoration: "none", color: "var(--ink)" }}>
            <Logo size={34} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "23px", fontWeight: 600, letterSpacing: ".01em", lineHeight: 1 }}>Resplendent Hope</span>
          </a>
          <div className="rh-nav-desktop" style={{ display: "flex", alignItems: "center", gap: "30px", fontSize: "14.5px" }}>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="rh-navlink" style={{ color: "var(--muted)", textDecoration: "none" }}>{l.label}</a>
            ))}
            <a href="#give" className="rh-cta" style={{ display: "inline-flex", alignItems: "center", padding: "11px 22px", background: "var(--cta)", color: "#fff", borderRadius: "999px", textDecoration: "none", fontWeight: 600, letterSpacing: ".02em", boxShadow: "0 6px 18px -8px var(--cta)" }}>Donate</a>
          </div>

          {/* hamburger — mobile only */}
          <button
            type="button"
            className="rh-nav-toggle"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="rh-mobile-drawer"
            onClick={() => setMenuOpen(true)}
            style={{ display: "none", flexDirection: "column", justifyContent: "center", gap: "5px", width: "44px", height: "44px", padding: "0 10px", background: "transparent", border: "none", cursor: "pointer" }}
          >
            <span style={{ display: "block", height: "2px", borderRadius: "2px", background: "var(--ink)" }} />
            <span style={{ display: "block", height: "2px", borderRadius: "2px", background: "var(--ink)" }} />
            <span style={{ display: "block", height: "2px", borderRadius: "2px", background: "var(--ink)" }} />
          </button>
        </nav>
      </header>

      {/* OFF-CANVAS MOBILE NAV */}
      <div
        className="rh-nav-backdrop"
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, zIndex: 90, background: "rgba(16,20,17,.5)", backdropFilter: "blur(2px)", opacity: menuOpen ? 1 : 0, visibility: menuOpen ? "visible" : "hidden", transition: "opacity .3s ease, visibility .3s ease" }}
      />
      <aside
        id="rh-mobile-drawer"
        className="rh-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        style={{ position: "fixed", top: 0, right: 0, zIndex: 95, height: "100%", width: "min(86vw,340px)", display: "flex", flexDirection: "column", padding: "24px", background: "var(--bg)", borderLeft: "1px solid var(--line)", boxShadow: "-24px 0 60px -24px rgba(0,0,0,.45)", transform: menuOpen ? "translateX(0)" : "translateX(100%)", transition: "transform .34s cubic-bezier(.4,0,.2,1)", overflowY: "auto" }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "11px" }}>
            <Logo size={30} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 600, lineHeight: 1 }}>Resplendent Hope</span>
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", lineHeight: 1, color: "var(--ink)", background: "transparent", border: "1px solid var(--line)", borderRadius: "50%", cursor: "pointer" }}
          >×</button>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="rh-navlink" style={{ padding: "14px 6px", fontSize: "18px", color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--line)" }}>{l.label}</a>
          ))}
        </nav>
        <a href="#give" onClick={() => setMenuOpen(false)} className="rh-cta" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", marginTop: "28px", padding: "15px 22px", background: "var(--cta)", color: "#fff", borderRadius: "999px", textDecoration: "none", fontWeight: 600, fontSize: "16px", boxShadow: "0 10px 26px -10px var(--cta)" }}>Donate</a>
      </aside>

      {/* HERO */}
      <section id="top" data-screen-label="Hero" style={{ position: "relative", minHeight: "88vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 120% at 18% 16%, color-mix(in srgb,var(--accent) 62%,var(--dark1)) 0%, transparent 56%), radial-gradient(120% 120% at 88% 24%, color-mix(in srgb,var(--accent2) 50%,transparent) 0%, transparent 52%), radial-gradient(130% 130% at 84% 92%, var(--accent-deep) 0%, transparent 58%), linear-gradient(150deg, var(--dark1) 0%, var(--dark2) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(1100px 700px at 80% 10%,color-mix(in srgb,var(--accent) 32%,transparent) 0%,transparent 60%),linear-gradient(100deg,rgba(16,20,17,.72) 0%,rgba(16,20,17,.4) 50%,rgba(16,20,17,.1) 100%)" }} />
        <span className="rh-hero-caption" style={{ position: "absolute", bottom: "16px", right: "18px", maxWidth: "min(46vw,300px)", textAlign: "right", lineHeight: 1.45, ...mono, fontSize: "11px", letterSpacing: ".04em", color: "rgba(255,255,255,.5)" }}>PHOTO — first light over a Sri Lankan coastline; community at dawn</span>
        <div style={{ position: "relative", maxWidth: "1240px", margin: "0 auto", padding: "120px 32px", width: "100%" }}>
          <div style={{ maxWidth: "760px" }}>
            <p data-reveal style={{ margin: "0 0 22px", ...mono, fontSize: "12.5px", letterSpacing: ".32em", textTransform: "uppercase", color: "var(--accent)" }}>Resplendent Hope · A Christian Ministry</p>
            <h1 data-reveal style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(48px,6.4vw,92px)", lineHeight: 1.02, letterSpacing: "-.015em", color: "#fff", textWrap: "balance" }}>Hope that reaches<br />beyond every border.</h1>
            <p data-reveal style={{ margin: "30px 0 0", fontSize: "clamp(18px,2vw,22px)", lineHeight: 1.55, color: "rgba(255,255,255,.82)", maxWidth: "620px", textWrap: "pretty" }}>Sri Lanka means <em style={{ fontStyle: "italic", color: "#fff" }}>the resplendent island.</em> We carry that light as <strong style={{ fontWeight: 600, color: "#fff" }}>resplendent hope</strong> — to widows, orphans, and the rescued across Sri Lanka, Cambodia, and beyond.</p>
            <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "40px" }}>
              <a href="#give" className="rh-cta" style={{ display: "inline-flex", alignItems: "center", gap: "9px", padding: "16px 30px", background: "var(--cta)", color: "#fff", borderRadius: "999px", textDecoration: "none", fontWeight: 600, fontSize: "16px", boxShadow: "0 14px 34px -12px var(--cta)" }}>Donate now <span style={{ fontSize: "18px" }}>→</span></a>
              <a href="#story" className="rh-ghost" style={{ display: "inline-flex", alignItems: "center", padding: "16px 30px", background: "rgba(255,255,255,.1)", color: "#fff", border: "1px solid rgba(255,255,255,.32)", borderRadius: "999px", textDecoration: "none", fontWeight: 500, fontSize: "16px", backdropFilter: "blur(4px)" }}>Read his story</a>
            </div>
            <p data-reveal style={{ margin: "46px 0 0", paddingLeft: "20px", borderLeft: "2px solid var(--accent)", fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "21px", lineHeight: 1.5, color: "rgba(255,255,255,.92)", maxWidth: "560px" }}>“He has sent me to bind up the brokenhearted, to proclaim freedom for the captives.”<span style={{ display: "block", fontFamily: "var(--font-body)", fontStyle: "normal", fontSize: "13px", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--accent)", marginTop: "12px" }}>Isaiah 61:1</span></p>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" style={{ padding: "108px 32px", background: "var(--bg)" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", textAlign: "center" }}>
          <p data-reveal style={eyebrow("--accent-deep")}>Our Approach</p>
          <h2 data-reveal style={sectionTitle("clamp(38px,5.2vw,68px)")}>We hit the ground listening.</h2>
          <p data-reveal style={{ margin: "26px auto 0", maxWidth: "760px", fontSize: "19px", color: "var(--muted)", lineHeight: 1.65, textWrap: "pretty" }}>We believe God has already appointed leaders in every part of the world. We seek out gifted local church leaders whose work shows the love of God — then partner with them, lending our assets and abilities so that each of us serves in unity.</p>
        </div>
        <div data-reveal className="rh-grid-3" style={{ maxWidth: "1080px", margin: "62px auto 0", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "22px" }}>
          {MISSION.map((m) => (
            <div key={m.n} style={{ padding: "36px 30px", ...card }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "42px", height: "42px", borderRadius: "50%", background: `var(${m.soft})`, color: `var(${m.deep})`, fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 600 }}>{m.n}</span>
              <h3 style={{ margin: "20px 0 8px", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "25px" }}>{m.title}</h3>
              <p style={{ margin: 0, color: "var(--muted)", fontSize: "15.5px" }}>{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOUNDER STORY */}
      <section id="story" data-screen-label="Founder story" style={{ padding: "104px 32px", background: "var(--surface2)" }}>
        <div className="rh-story-grid" style={{ maxWidth: "1180px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.05fr", gap: "64px", alignItems: "center" }}>
          <div data-reveal style={{ position: "relative", aspectRatio: "4/5", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--line)", background: photoBg("--accent2", "--accent3"), display: "flex", alignItems: "flex-end", padding: "22px" }}>
            <span style={{ ...mono, fontSize: "11.5px", letterSpacing: ".04em", color: "var(--muted)", background: "color-mix(in srgb,var(--surface) 80%,transparent)", padding: "7px 10px", borderRadius: "4px" }}>PHOTO — founder Dave Sprowl with Pastor Adrian DeVisser, Sri Lanka</span>
          </div>
          <div data-reveal>
            <p style={eyebrow("--accent-deep")}>Our Story</p>
            <h2 style={sectionTitle("clamp(34px,4vw,54px)")}>“To get his soul back.”</h2>
            <p style={{ margin: "24px 0 0", fontSize: "16.5px", color: "var(--ink)", lineHeight: 1.72 }}>After the tsunami of December 2004, Dave Sprowl traveled to Sri Lanka to do disaster-relief work. There he met Pastor Adrian DeVisser, a Sri Lankan Christian pastor who handed out cards printed with his own cell number: <em style={{ fontStyle: "italic" }}>if you need help, call this number.</em></p>
            <p style={{ margin: "16px 0 0", fontSize: "16.5px", color: "var(--muted)", lineHeight: 1.72 }}>That was the beginning of a lifelong commitment to empowering victims of poverty, trafficking, and natural disaster — the work we now carry forward as Resplendent Hope.</p>
            <blockquote style={{ margin: "30px 0 0", padding: "24px 28px", background: "var(--surface)", borderLeft: "3px solid var(--accent)", borderRadius: "0 6px 6px 0", fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "22px", lineHeight: 1.5, color: "var(--ink)" }}>He told me he was going to Sri Lanka — to get his soul back. More than twenty years later, that first trip had become schooling for thousands of children, freedom for hundreds of women, and dozens of schools, churches, and shelters across two continents.</blockquote>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" data-screen-label="Our work" style={{ padding: "108px 32px", background: "var(--bg)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <div data-reveal style={{ maxWidth: "680px" }}>
            <p style={eyebrow("--accent-deep")}>Our Work</p>
            <h2 style={sectionTitle("clamp(34px,4.4vw,58px)")}>Holistic ministry — for body and soul.</h2>
            <p style={{ margin: "20px 0 0", fontSize: "18px", color: "var(--muted)", lineHeight: 1.65 }}>The heart of holistic ministry is meeting the physical needs of food, clothing, and shelter together with sharing the gospel. The grace of giving joins the sharing of the message.</p>
          </div>
          <div data-reveal className="rh-grid-3" style={{ marginTop: "54px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "22px" }}>
            {WORK.map((w) => (
              <div key={w.title} style={{ padding: "34px 30px", ...card }}>
                <span style={{ display: "block", width: "11px", height: "11px", borderRadius: "2px", transform: "rotate(45deg)", background: `var(${w.color})`, marginBottom: "22px" }} />
                <h3 style={{ margin: "0 0 10px", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "26px" }}>{w.title}</h3>
                <p style={{ margin: 0, color: "var(--muted)", fontSize: "15.5px", lineHeight: 1.65 }}>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHERE WE SERVE */}
      <section id="serve" data-screen-label="Where we serve" style={{ padding: "104px 32px", background: "var(--surface2)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <div data-reveal style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto" }}>
            <p style={eyebrow("--accent2-deep")}>Where We Serve</p>
            <h2 style={sectionTitle("clamp(34px,4.4vw,58px)")}>Four nations. One unity.</h2>
            <p style={{ margin: "18px 0 0", fontSize: "18px", color: "var(--muted)", lineHeight: 1.65 }}>Through effective local Christian leaders, we serve those in need across South and Southeast Asia and into Africa.</p>
          </div>
          <div data-reveal className="rh-grid-4" style={{ marginTop: "52px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "18px" }}>
            {NATIONS.map((n) => (
              <div key={n.name} style={{ ...card, borderRadius: "8px", overflow: "hidden" }}>
                <div style={{ aspectRatio: "4/3", background: photoBg(n.c1, n.c2), display: "flex", alignItems: "flex-end", padding: "14px" }}>
                  <span style={{ ...mono, fontSize: "10.5px", color: "var(--muted)" }}>PHOTO — {n.name}</span>
                </div>
                <div style={{ padding: "22px" }}>
                  <h3 style={{ margin: "0 0 6px", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "24px" }}>{n.name}</h3>
                  <p style={{ margin: 0, color: "var(--muted)", fontSize: "14.5px", lineHeight: 1.6 }}>{n.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section style={{ padding: "96px 32px", background: "var(--bg)" }}>
        <div data-reveal className="rh-stats" style={{ maxWidth: "1180px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "14px", textAlign: "center" }}>
          {STATS.map((s) => (
            <div key={s.label} style={{ padding: "18px", borderLeft: s.border ? "1px solid var(--line)" : undefined }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(40px,5vw,64px)", lineHeight: 1, color: `var(${s.color})` }}>{s.value}</div>
              <p style={{ margin: "10px 0 0", fontSize: "13.5px", letterSpacing: ".02em", color: "var(--muted)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STORIES */}
      <section id="stories" data-screen-label="Stories" style={{ padding: "104px 32px", background: "var(--surface2)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <div data-reveal style={{ maxWidth: "680px" }}>
            <p style={eyebrow("--accent2-deep")}>Stories</p>
            <h2 style={sectionTitle("clamp(34px,4.4vw,58px)")}>Every gift has a face behind it.</h2>
          </div>
          <div data-reveal className="rh-grid-3" style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}>
            {STORIES.map((s) => (
              <article key={s.title} style={{ ...card, borderRadius: "8px", overflow: "hidden" }}>
                <div style={{ aspectRatio: "3/2", background: photoBg(s.c1, s.c2), display: "flex", alignItems: "flex-end", padding: "16px" }}>
                  <span style={{ ...mono, fontSize: "11px", color: "var(--muted)" }}>PHOTO — {s.photo}</span>
                </div>
                <div style={{ padding: "28px" }}>
                  <h3 style={{ margin: "0 0 10px", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "24px" }}>{s.title}</h3>
                  <p style={{ margin: 0, color: "var(--muted)", fontSize: "15px", lineHeight: 1.65 }}>{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAITH BAND */}
      <section data-screen-label="Faith and values" style={{ position: "relative", padding: "120px 32px", background: "linear-gradient(160deg,var(--dark1) 0%,var(--dark2) 100%)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(800px 500px at 50% -10%,color-mix(in srgb,var(--accent) 40%,transparent) 0%,transparent 60%)" }} />
        <div data-reveal style={{ position: "relative", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <span style={{ display: "inline-block", width: "40px", height: "40px", borderRadius: "50%", background: "radial-gradient(circle at 50% 45%,var(--accent),var(--accent-deep))", boxShadow: "0 0 28px -2px var(--accent)", marginBottom: "34px", animation: "rh-glow 5s ease-in-out infinite" }} />
          <p style={{ margin: 0, fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(28px,3.6vw,46px)", lineHeight: 1.4, color: "#fff", textWrap: "balance" }}>“Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress.”</p>
          <p style={{ margin: "26px 0 0", fontFamily: "var(--font-body)", fontSize: "14px", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--accent)" }}>James 1:27</p>
          <p style={{ margin: "40px auto 0", maxWidth: "680px", fontSize: "17px", lineHeight: 1.7, color: "rgba(255,255,255,.78)" }}>Our vision is service in unity — a partnership between leaders God has appointed in every part of the world, each lending the assets and abilities they possess. We give because compassion is not merely a feeling. It is a choice.</p>
        </div>
      </section>

      {/* WHERE YOUR GIFT GOES */}
      <section style={{ padding: "104px 32px", background: "var(--bg)" }}>
        <div className="rh-fund-grid" style={{ maxWidth: "1180px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
          <div data-reveal>
            <p style={eyebrow("--accent-deep")}>Where Your Gift Goes</p>
            <h2 style={sectionTitle("clamp(32px,4vw,52px)")}>Trusted hands, on the ground.</h2>
            <p style={{ margin: "22px 0 0", fontSize: "17px", color: "var(--muted)", lineHeight: 1.7 }}>We don’t parachute in. We channel your giving through established local Christian leaders we know personally — people already doing holistic ministry in their own communities. It means help arrives quickly, faithfully, and without waste.</p>
          </div>
          <div data-reveal style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {FUND_STEPS.map((f) => (
              <div key={f.n} style={{ display: "flex", gap: "20px", alignItems: "flex-start", padding: "24px 26px", ...card }}>
                <span style={{ flex: "none", fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 600, color: "#fff", width: "40px", height: "40px", borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>{f.n}</span>
                <div>
                  <h3 style={{ margin: "0 0 4px", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "22px" }}>{f.title}</h3>
                  <p style={{ margin: 0, color: "var(--muted)", fontSize: "15px", lineHeight: 1.6 }}>{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GIVE / DONATE */}
      <section id="give" data-screen-label="Give" style={{ padding: "108px 32px", background: "var(--surface2)" }}>
        <div style={{ maxWidth: "920px", margin: "0 auto", textAlign: "center" }}>
          <p data-reveal style={eyebrow("--accent-deep")}>Open Doors With Us</p>
          <h2 data-reveal style={sectionTitle("clamp(36px,4.8vw,62px)")}>Whatever you give doesn’t just change a life. It restores a soul.</h2>
          <p data-reveal style={{ margin: "22px auto 0", maxWidth: "620px", fontSize: "18px", color: "var(--muted)", lineHeight: 1.65 }}>Give because you believe in redemption that reaches beyond borders. Choose an amount — one-time or monthly — and join the work.</p>
          <div data-reveal style={{ margin: "44px auto 0", maxWidth: "560px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px" }}>
              {AMOUNTS.map(({ amt }) => {
                const active = amount === amt;
                return (
                  <button key={amt} type="button" onClick={() => setAmount(amt)} className="rh-amount" style={{ padding: "18px 8px", background: active ? "var(--cta)" : "var(--surface)", border: `1.5px solid ${active ? "var(--cta)" : "var(--line)"}`, borderRadius: "6px", cursor: "pointer", fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 600, color: active ? "#fff" : "var(--ink)", transition: "all .18s ease" }}>${amt}</button>
                );
              })}
            </div>
            <p style={{ margin: "18px 0 0", minHeight: "22px", fontSize: "15px", color: "var(--accent-deep)" }}>{activeNote}</p>
            <a href="#give" className="rh-cta" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginTop: "14px", padding: "18px 30px", background: "var(--cta)", color: "#fff", borderRadius: "999px", textDecoration: "none", fontWeight: 700, fontSize: "17px", letterSpacing: ".01em", boxShadow: "0 16px 36px -14px var(--cta)" }}>{amount ? `Give $${amount} today` : "Give today"} <span style={{ fontSize: "18px" }}>→</span></a>
            <p style={{ margin: "16px 0 0", fontSize: "13px", color: "var(--muted)" }}>Resplendent Hope is a registered 501(c)(3). Your gift is tax-deductible.</p>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{ padding: "84px 32px", background: "var(--bg)" }}>
        <div data-reveal style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(30px,3.6vw,46px)", lineHeight: 1.08 }}>Stay close to the work.</h2>
          <p style={{ margin: "14px 0 0", fontSize: "17px", color: "var(--muted)" }}>Stories from the field, updates from our partners, and ways to pray — a few times a year.</p>
          {subscribed ? (
            <p style={{ margin: "24px 0 0", fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "22px", color: "var(--accent-deep)" }}>Thank you — you’re on the journey with us.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }} style={{ margin: "30px auto 0", display: "flex", gap: "10px", maxWidth: "480px" }}>
              <input type="email" required placeholder="Your email address" className="rh-email" style={{ flex: 1, padding: "15px 18px", border: "1.5px solid var(--line)", borderRadius: "999px", background: "var(--surface)", color: "var(--ink)", fontFamily: "var(--font-body)", fontSize: "15.5px", outline: "none" }} />
              <button type="submit" style={{ flex: "none", padding: "15px 28px", background: "var(--ink)", color: "var(--bg)", border: "none", borderRadius: "999px", cursor: "pointer", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "15.5px" }}>Subscribe</button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "linear-gradient(160deg,var(--dark1) 0%,var(--dark2) 100%)", color: "rgba(255,255,255,.72)", padding: "72px 32px 40px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <div className="rh-footer-grid" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: "48px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
                <Logo size={30} footer />
                <span style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 600, color: "#fff" }}>Resplendent Hope</span>
              </div>
              <p style={{ margin: 0, maxWidth: "380px", fontSize: "14.5px", lineHeight: 1.65 }}>A Christian ministry serving widows, orphans, and the rescued through effective local leaders in Sri Lanka, Cambodia, Southeast Asia, and Zimbabwe.</p>
              <p style={{ margin: "18px 0 0", fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "17px", color: "rgba(255,255,255,.9)" }}>“Whatever you did for one of the least of these, you did for me.”<span style={{ display: "block", fontFamily: "var(--font-body)", fontStyle: "normal", fontSize: "12px", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--accent)", marginTop: "8px" }}>Matthew 25:40</span></p>
            </div>
            <div>
              <h4 style={{ margin: "0 0 16px", fontFamily: "var(--font-body)", fontSize: "12px", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--accent)" }}>Explore</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "11px", fontSize: "14.5px" }}>
                {[...NAV_LINKS.slice(0, 4), { href: "#give", label: "Donate" }].map((l) => (
                  <a key={l.href} href={l.href} className="rh-footer-link" style={{ color: "rgba(255,255,255,.72)", textDecoration: "none" }}>{l.label}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ margin: "0 0 16px", fontFamily: "var(--font-body)", fontSize: "12px", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--accent)" }}>Connect</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "11px", fontSize: "14.5px" }}>
                <a href="mailto:hello@resplendenthope.org" className="rh-footer-link" style={{ color: "rgba(255,255,255,.72)", textDecoration: "none" }}>hello@resplendenthope.org</a>
                <span>+1 (000) 000-0000</span>
                <span>PO Box 0000, Newport Beach, CA</span>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,.12)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "14px", fontSize: "12.5px", color: "rgba(255,255,255,.5)" }}>
            <span>© {year} Resplendent Hope · Formerly Grace Opens Doors</span>
            <span>A registered 501(c)(3) Christian nonprofit</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* logo mark — glowing sun cresting a horizon line */
function Logo({ size, footer }) {
  return (
    <span style={{ position: "relative", width: `${size}px`, height: `${size}px`, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <span style={{ position: "absolute", top: 0, width: `${size - 8}px`, height: `${size - 8}px`, borderRadius: "50%", background: "radial-gradient(circle at 50% 45%,var(--accent) 0%,var(--accent-deep) 95%)", boxShadow: footer ? undefined : "0 0 18px -2px var(--accent)", animation: footer ? undefined : "rh-glow 5s ease-in-out infinite" }} />
      <span style={{ position: "absolute", bottom: footer ? "1px" : "2px", width: `${size}px`, height: "2px", background: footer ? "rgba(255,255,255,.5)" : "var(--ink)", opacity: footer ? 1 : 0.55 }} />
    </span>
  );
}

/* global CSS: fonts, reset, keyframes, hover/focus states, responsive grids */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Mulish:wght@400;500;600;700&family=Spectral:ital,wght@0,400;0,500;0,600;1,400&family=Hanken+Grotesk:wght@400;500;600;700&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400&family=Karla:wght@400;500;600;700&display=swap');
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0}
::selection{background:var(--accent-soft);color:var(--accent-deep)}
@keyframes rh-glow{0%,100%{opacity:.85;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}}
@keyframes rh-rise{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
.rh-navlink:hover{color:var(--ink)}
.rh-cta:hover{background:var(--cta-deep)!important}
.rh-ghost:hover{background:rgba(255,255,255,.2)!important}
.rh-amount:hover{border-color:var(--accent)}
.rh-email:focus{border-color:var(--accent)!important}
.rh-footer-link:hover{color:#fff}
@media (max-width:860px){
  .rh-nav-desktop{display:none!important}
  .rh-nav-toggle{display:flex!important}
}
@media (min-width:861px){
  .rh-nav-drawer,.rh-nav-backdrop{display:none!important}
}
@media (max-width:920px){
  .rh-story-grid,.rh-fund-grid{grid-template-columns:1fr!important}
  .rh-grid-3{grid-template-columns:repeat(2,1fr)!important}
  .rh-grid-4{grid-template-columns:repeat(2,1fr)!important}
  .rh-stats{grid-template-columns:repeat(2,1fr)!important}
  .rh-footer-grid{grid-template-columns:1fr!important}
}
@media (max-width:600px){
  .rh-grid-1,.rh-grid-3,.rh-grid-4{grid-template-columns:1fr!important}
  .rh-hero-caption{display:none!important}
}
`;
