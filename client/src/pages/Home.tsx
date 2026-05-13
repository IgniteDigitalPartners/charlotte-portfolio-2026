/**
 * Charlotte Smith Portfolio 2026 — Home Page
 * Design: Cinematic Dark Luxury
 * Palette: Obsidian (#0D0D0D) · Copper (#C87941) · Cream (#F2EFEA)
 * Typography: Cormorant Garamond (display) + Outfit (body)
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight, Mail, Phone, Linkedin, MapPin, ExternalLink } from "lucide-react";
import { caseStudies, stats, capabilities, experience, operatingEnvironments } from "@/lib/data";

// ── Scroll-reveal hook ────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        <a href="#top" className="font-['Outfit'] text-sm font-500 tracking-wide text-[#F2EFEA]">
          Charlotte Smith <span className="text-[#C87941]">/</span> Senior Marketing
        </a>
        <div className="hidden md:flex items-center gap-8">
          {["approach", "work", "capabilities", "credentials", "contact"].map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className="font-['Outfit'] text-xs font-500 tracking-[0.15em] uppercase text-[#F2EFEA]/60 hover:text-[#C87941] transition-colors duration-200"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Cinematic background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310419663030957850/XsirEnBEEH4G2ticYyVv3a/hero_bg-abxXpk9fovBuJvHqQ7sMhh.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.7,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/60 to-[#0A0A0A]/30 pointer-events-none" />

      <div className="container relative z-10 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="block w-10 h-px bg-[#C87941]" />
              <span className="font-['Outfit'] text-[0.65rem] font-600 tracking-[0.18em] uppercase text-[#C87941]">
                Portfolio · 2026
              </span>
            </div>
            <h1 className="font-['Cormorant_Garamond'] text-[clamp(3rem,7vw,6rem)] font-600 leading-[1.05] text-[#F2EFEA] mb-6">
              Marketing built
              <br />
              for{" "}
              <em className="italic text-[#C87941]">commercial</em>
              <br />
              outcomes.
            </h1>
            <p className="font-['Outfit'] text-base text-[#F2EFEA]/65 leading-relaxed max-w-md mb-10">
              A senior marketing and brand strategist working at the intersection of brand, content,
              and growth. Nine years building communication systems that compound credibility, for
              founders, agencies, and listed companies across the EU, UK, and Canada.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C87941] text-[#0A0A0A] font-['Outfit'] text-sm font-600 tracking-wide hover:bg-[#d4894e] transition-colors duration-200 active:scale-[0.97]"
              >
                View Selected Work
                <ArrowUpRight size={16} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#F2EFEA]/20 text-[#F2EFEA] font-['Outfit'] text-sm font-500 tracking-wide hover:border-[#C87941] hover:text-[#C87941] transition-colors duration-200"
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Right: IDP hero image */}
          <div className="relative hidden lg:block">
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img
                src="/manus-storage/screenshot_idp_e8093138.png"
                alt="Ignite Digital Partners — Charlotte Smith's consultancy"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-['Outfit'] text-[0.6rem] tracking-[0.15em] uppercase text-[#C87941]">
                  Ignite Digital Partners — Founder
                </span>
              </div>
            </div>
            {/* Copper border accent */}
            <div className="absolute -bottom-2 -right-2 w-full h-full border border-[#C87941]/20 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Stats bar ─────────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <section className="bg-[#0F0F0F] border-y border-white/5">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
          {stats.map((s) => (
            <div key={s.label} className="py-8 px-6 text-center">
              <div className="font-['Cormorant_Garamond'] text-4xl font-600 text-[#C87941] mb-1">
                {s.value}
              </div>
              <div className="font-['Outfit'] text-[0.65rem] font-500 tracking-[0.15em] uppercase text-[#F2EFEA]/40">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Approach ──────────────────────────────────────────────────────────────────
function Approach() {
  const { ref, visible } = useReveal();
  return (
    <section id="approach" className="py-28 bg-[#0A0A0A]">
      <div className="container">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-10 h-px bg-[#C87941]" />
            <span className="font-['Outfit'] text-[0.65rem] font-600 tracking-[0.18em] uppercase text-[#C87941]">
              No. 01 / Approach
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,5vw,4rem)] font-600 text-[#F2EFEA] leading-tight mb-8">
                How I work, briefly.
              </h2>
              <p className="font-['Outfit'] text-base text-[#F2EFEA]/65 leading-relaxed mb-6">
                Most marketing fails not because the tactics are wrong, but because it's run as
                campaigns instead of systems. Campaigns create moments. Systems create momentum. I
                spend my time bridging that gap: brand work that compounds, content that earns its
                place in the system, measurement that connects activity to confidence.
              </p>
              <p className="font-['Outfit'] text-base text-[#F2EFEA]/65 leading-relaxed mb-6">
                My background spans nine years across performance marketing, brand positioning,
                investor relations, and capital markets communications. I work equally with founders
                preparing for growth and listed companies positioning to capital.
              </p>
              <p className="font-['Outfit'] text-base text-[#F2EFEA]/65 leading-relaxed">
                Beyond client work, I run two businesses: Ignite Digital Partners, the strategic
                communication systems consultancy I founded, and Ezsy Webs, an AI-powered website
                platform for agencies. Both inform how I think about marketing as a commercial
                discipline.
              </p>
            </div>
            <div className="space-y-6">
              <div className="border border-white/8 p-6">
                <div className="font-['Outfit'] text-[0.65rem] font-600 tracking-[0.15em] uppercase text-[#C87941] mb-4">
                  IDP · The Ignition Loop
                </div>
                {[
                  { num: "i.", label: "Clarity", desc: "Strategic foundation, brand positioning, messaging architecture." },
                  { num: "ii.", label: "Activation", desc: "System deployment across channels and content." },
                  { num: "iii.", label: "Growth", desc: "Compounding momentum from consistent execution." },
                  { num: "iv.", label: "Insight", desc: "Intelligence gathering that feeds back into strategy." },
                  { num: "∞", label: "Back to Clarity", desc: "Continuous improvement, not reset." },
                ].map((item) => (
                  <div key={item.num} className="flex gap-4 py-3 border-b border-white/5 last:border-0">
                    <span className="font-['Cormorant_Garamond'] text-[#C87941] text-lg w-6 shrink-0">
                      {item.num}
                    </span>
                    <div>
                      <span className="font-['Outfit'] text-sm font-500 text-[#F2EFEA]">{item.label}. </span>
                      <span className="font-['Outfit'] text-sm text-[#F2EFEA]/55">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Work grid ─────────────────────────────────────────────────────────────────
function WorkCard({ cs, index }: { cs: typeof caseStudies[0]; index: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <Link href={`/work/${cs.slug}`}>
        <div className="group relative overflow-hidden bg-[#111111] border border-white/5 card-lift cursor-pointer">
          {/* Screenshot */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <img
              src={cs.heroImage}
              alt={cs.client}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/20 to-transparent" />
            {/* Case number */}
            <div className="absolute top-4 left-4">
              <span className="font-['Outfit'] text-[0.6rem] font-600 tracking-[0.15em] uppercase text-[#C87941] bg-[#0A0A0A]/70 px-2 py-1">
                Case No. {cs.number}
              </span>
            </div>
            {/* Arrow on hover */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-8 h-8 bg-[#C87941] flex items-center justify-center">
                <ArrowUpRight size={16} className="text-[#0A0A0A]" />
              </div>
            </div>
          </div>
          {/* Text */}
          <div className="p-6">
            <div className="font-['Outfit'] text-[0.6rem] font-600 tracking-[0.15em] uppercase text-[#C87941] mb-2">
              {cs.category}
            </div>
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-600 text-[#F2EFEA] mb-2 leading-tight">
              {cs.client}
            </h3>
            <p className="font-['Outfit'] text-sm text-[#F2EFEA]/55 leading-relaxed mb-4">
              {cs.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {cs.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="font-['Outfit'] text-[0.6rem] font-500 tracking-wide uppercase px-2 py-1 border border-white/10 text-[#F2EFEA]/40"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="py-28 bg-[#080808]">
      <div className="container">
        <div className="flex items-center gap-3 mb-4">
          <span className="block w-10 h-px bg-[#C87941]" />
          <span className="font-['Outfit'] text-[0.65rem] font-600 tracking-[0.18em] uppercase text-[#C87941]">
            No. 02 / Selected Work
          </span>
        </div>
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,5vw,4rem)] font-600 text-[#F2EFEA] leading-tight">
            Six pieces,
            <br />
            each its own story.
          </h2>
          <p className="hidden md:block font-['Outfit'] text-sm text-[#F2EFEA]/40 max-w-xs text-right">
            Click any case study to read the full story, deliverables, and outcomes.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => (
            <WorkCard key={cs.slug} cs={cs} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Capabilities ──────────────────────────────────────────────────────────────
function Capabilities() {
  const { ref, visible } = useReveal();
  return (
    <section id="capabilities" className="py-28 bg-[#0A0A0A]">
      <div className="container">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-10 h-px bg-[#C87941]" />
            <span className="font-['Outfit'] text-[0.65rem] font-600 tracking-[0.18em] uppercase text-[#C87941]">
              No. 03 / Capabilities
            </span>
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,5vw,4rem)] font-600 text-[#F2EFEA] leading-tight mb-12">
            A senior practice,
            <br />
            fully stacked.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {capabilities.map((cap) => (
              <div key={cap.title} className="bg-[#0A0A0A] p-8 hover:bg-[#111111] transition-colors duration-200 group">
                <div className="font-['Cormorant_Garamond'] text-3xl text-[#C87941]/40 mb-4 group-hover:text-[#C87941]/70 transition-colors duration-200">
                  {cap.roman}
                </div>
                <h3 className="font-['Outfit'] text-sm font-600 text-[#F2EFEA] mb-3 tracking-wide">
                  {cap.title}
                </h3>
                <p className="font-['Outfit'] text-sm text-[#F2EFEA]/45 leading-relaxed">
                  {cap.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Credentials ───────────────────────────────────────────────────────────────
function Credentials() {
  const { ref, visible } = useReveal();
  return (
    <section id="credentials" className="py-28 bg-[#080808]">
      <div className="container">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-10 h-px bg-[#C87941]" />
            <span className="font-['Outfit'] text-[0.65rem] font-600 tracking-[0.18em] uppercase text-[#C87941]">
              No. 04 / Credentials
            </span>
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,5vw,4rem)] font-600 text-[#F2EFEA] leading-tight mb-12">
            Nine years, three companies,
            <br />
            one practice.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Experience timeline */}
            <div>
              <div className="font-['Outfit'] text-[0.65rem] font-600 tracking-[0.15em] uppercase text-[#C87941] mb-6">
                Experience
              </div>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-[#C87941]/20" />
                <div className="space-y-0">
                  {experience.map((e, i) => (
                    <div key={i} className="relative pl-6 pb-8 last:pb-0">
                      <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-[#C87941]" />
                      <div className="font-['Outfit'] text-[0.65rem] font-500 tracking-[0.1em] uppercase text-[#F2EFEA]/35 mb-1">
                        {e.period}
                      </div>
                      <div className="font-['Outfit'] text-base font-500 text-[#F2EFEA] mb-0.5">
                        {e.title}
                      </div>
                      <div className="font-['Outfit'] text-sm text-[#C87941]">
                        {e.url ? (
                          <a
                            href={e.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline inline-flex items-center gap-1"
                          >
                            {e.company}
                            <ExternalLink size={11} />
                          </a>
                        ) : (
                          e.company
                        )}
                        {e.note && (
                          <span className="text-[#F2EFEA]/35 ml-2">{e.note}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Operating environments */}
            <div>
              <div className="font-['Outfit'] text-[0.65rem] font-600 tracking-[0.15em] uppercase text-[#C87941] mb-6">
                Operating Environments
              </div>
              <div className="space-y-0">
                {operatingEnvironments.map((env) => (
                  <div
                    key={env.title}
                    className="flex items-start gap-4 py-4 border-b border-white/5 last:border-0"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C87941] mt-2 shrink-0" />
                    <div>
                      <div className="font-['Outfit'] text-sm font-500 text-[#F2EFEA] mb-0.5">
                        {env.title}
                      </div>
                      <div className="font-['Outfit'] text-sm text-[#F2EFEA]/45">
                        {env.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 border border-white/8">
                <p className="font-['Outfit'] text-sm text-[#F2EFEA]/45 italic">
                  Full references available on request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const { ref, visible } = useReveal();
  return (
    <section id="contact" className="py-28 bg-[#0A0A0A]">
      <div className="container">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-10 h-px bg-[#C87941]" />
            <span className="font-['Outfit'] text-[0.65rem] font-600 tracking-[0.18em] uppercase text-[#C87941]">
              Let's Talk
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,5vw,4.5rem)] font-600 text-[#F2EFEA] leading-tight mb-6">
                Currently exploring
                <br />
                <em className="italic text-[#C87941]">senior roles.</em>
              </h2>
              <p className="font-['Outfit'] text-base text-[#F2EFEA]/65 leading-relaxed max-w-md">
                Open to permanent, contract, and fractional engagements where strategic range,
                hands-on delivery, and commercial discipline matter equally.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: "charlotte_smith@outlook.com", href: "mailto:charlotte_smith@outlook.com" },
                { icon: Phone, label: "Phone", value: "+356 99020986", href: "tel:+35699020986" },
                { icon: Linkedin, label: "LinkedIn", value: "/charlotte-smith-marketing", href: "https://www.linkedin.com/in/charlotte-smith-marketing/" },
                { icon: MapPin, label: "Location", value: "Birkirkara, Malta · Remote", href: undefined },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4 py-4 border-b border-white/5">
                  <div className="w-8 h-8 border border-[#C87941]/30 flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-[#C87941]" />
                  </div>
                  <div>
                    <div className="font-['Outfit'] text-[0.6rem] font-600 tracking-[0.15em] uppercase text-[#F2EFEA]/30 mb-0.5">
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="font-['Outfit'] text-sm text-[#F2EFEA] hover:text-[#C87941] transition-colors duration-200"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="font-['Outfit'] text-sm text-[#F2EFEA]">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-8 bg-[#080808] border-t border-white/5">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-['Outfit'] text-[0.6rem] font-500 tracking-[0.15em] uppercase text-[#F2EFEA]/25">
          Charlotte Smith · Portfolio MMXXVI · Crafted in Malta
        </span>
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/charlotte-smith-marketing/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-['Outfit'] text-[0.6rem] font-500 tracking-[0.15em] uppercase text-[#F2EFEA]/25 hover:text-[#C87941] transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href="https://ignitedigitalpartners.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-['Outfit'] text-[0.6rem] font-500 tracking-[0.15em] uppercase text-[#F2EFEA]/25 hover:text-[#C87941] transition-colors duration-200"
          >
            IDP
          </a>
          <a
            href="https://ezsywebs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-['Outfit'] text-[0.6rem] font-500 tracking-[0.15em] uppercase text-[#F2EFEA]/25 hover:text-[#C87941] transition-colors duration-200"
          >
            Ezsy Webs
          </a>
        </div>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Nav />
      <Hero />
      <StatsBar />
      <Approach />
      <Work />
      <Capabilities />
      <Credentials />
      <Contact />
      <Footer />
    </div>
  );
}
